import process from 'node:process'

const debuggerBase = process.argv[2] ?? 'http://127.0.0.1:9222'
const appOrigin = process.argv[3] ?? 'http://127.0.0.1:4173'

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function getPageTarget() {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    try {
      const response = await fetch(`${debuggerBase}/json/list`)
      if (response.ok) {
        const targets = await response.json()
        const page = targets.find((target) => target.type === 'page' && target.url.startsWith(appOrigin))
        if (page?.webSocketDebuggerUrl) return page
      }
    } catch {
      // Browser debugger may still be starting.
    }
    await sleep(250)
  }
  throw new Error(`No Chrome page target found for ${appOrigin}`)
}

function createCdpClient(webSocketDebuggerUrl) {
  const socket = new WebSocket(webSocketDebuggerUrl)
  let nextId = 1
  const pending = new Map()

  const ready = new Promise((resolve, reject) => {
    socket.addEventListener('open', resolve, { once: true })
    socket.addEventListener('error', () => reject(new Error('CDP websocket failed to open')), { once: true })
  })

  socket.addEventListener('message', (event) => {
    const message = JSON.parse(String(event.data))
    if (!message.id) return
    const resolver = pending.get(message.id)
    if (!resolver) return
    pending.delete(message.id)
    if (message.error) resolver.reject(new Error(message.error.message ?? JSON.stringify(message.error)))
    else resolver.resolve(message.result)
  })

  async function send(method, params = {}) {
    await ready
    const id = nextId
    nextId += 1
    const response = new Promise((resolve, reject) => pending.set(id, { resolve, reject }))
    socket.send(JSON.stringify({ id, method, params }))
    return response
  }

  async function evaluate(expression) {
    const result = await send('Runtime.evaluate', {
      expression,
      awaitPromise: true,
      returnByValue: true,
      userGesture: true,
    })
    if (result.exceptionDetails) {
      throw new Error(result.exceptionDetails.text ?? 'Runtime.evaluate failed')
    }
    return result.result?.value
  }

  function close() {
    socket.close()
  }

  return { send, evaluate, close }
}

async function waitFor(evaluate, expression, label, timeoutMs = 8000) {
  const started = Date.now()
  while (Date.now() - started < timeoutMs) {
    if (await evaluate(expression)) return
    await sleep(100)
  }
  throw new Error(`Timed out waiting for ${label}`)
}

function appStateExpression() {
  return `(() => {
    const app = document.querySelector('[data-active-lane]')
    const world = document.querySelector('[data-camera-lane]')
    return {
      lane: app?.dataset.activeLane ?? null,
      cameraLane: world?.dataset.cameraLane ?? null,
      search: location.search,
      hash: location.hash,
      href: location.href,
      historyLength: history.length
    }
  })()`
}

async function main() {
  const page = await getPageTarget()
  const client = createCdpClient(page.webSocketDebuggerUrl)
  const proof = { schema: 's1_pb_world_navigation_browser_v1', steps: [] }

  try {
    await client.send('Runtime.enable')
    await client.send('Page.enable')

    await waitFor(
      client.evaluate,
      `document.querySelector('[data-active-lane]')?.dataset.activeLane === 'learn'`,
      'initial Learn deep link hydration',
    )
    await waitFor(
      client.evaluate,
      `document.querySelector('[data-camera-lane]')?.dataset.cameraLane === 'learn'`,
      'initial camera lane binding',
    )
    proof.steps.push({ name: 'initial', ...(await client.evaluate(appStateExpression())) })

    await client.evaluate(`document.querySelector('[data-world-lane="build"]')?.click()`)
    await waitFor(
      client.evaluate,
      `document.querySelector('[data-active-lane]')?.dataset.activeLane === 'build' && new URLSearchParams(location.search).get('lane') === 'build'`,
      'Build selection + pushState',
    )
    await waitFor(
      client.evaluate,
      `document.querySelector('[data-camera-lane]')?.dataset.cameraLane === 'build'`,
      'Build camera binding',
    )
    proof.steps.push({ name: 'select-build', ...(await client.evaluate(appStateExpression())) })

    await client.evaluate(`document.querySelector('[data-world-lane="community"]')?.click()`)
    await waitFor(
      client.evaluate,
      `document.querySelector('[data-active-lane]')?.dataset.activeLane === 'community' && new URLSearchParams(location.search).get('lane') === 'community'`,
      'Community selection + pushState',
    )
    proof.steps.push({ name: 'select-community', ...(await client.evaluate(appStateExpression())) })

    await client.evaluate('history.back()')
    await waitFor(
      client.evaluate,
      `document.querySelector('[data-active-lane]')?.dataset.activeLane === 'build' && new URLSearchParams(location.search).get('lane') === 'build'`,
      'Back restores Build without re-push',
    )
    proof.steps.push({ name: 'back', ...(await client.evaluate(appStateExpression())) })

    await client.evaluate('history.forward()')
    await waitFor(
      client.evaluate,
      `document.querySelector('[data-active-lane]')?.dataset.activeLane === 'community' && new URLSearchParams(location.search).get('lane') === 'community'`,
      'Forward restores Community',
    )
    proof.steps.push({ name: 'forward', ...(await client.evaluate(appStateExpression())) })

    const historyLengthBeforeAnchor = await client.evaluate('history.length')
    await client.evaluate(`document.querySelector('a[href="#pathways"]')?.click()`)
    await waitFor(client.evaluate, `location.hash === '#pathways'`, 'anchor navigation')
    await waitFor(
      client.evaluate,
      `document.querySelector('[data-active-lane]')?.dataset.activeLane === 'community' && new URLSearchParams(location.search).get('lane') === 'community'`,
      'anchor preserves district state',
    )
    const afterAnchor = await client.evaluate(appStateExpression())
    proof.steps.push({ name: 'anchor-pathways', ...afterAnchor })

    if (afterAnchor.hash !== '#pathways') throw new Error('Anchor hash did not update')
    if (afterAnchor.lane !== 'community') throw new Error('Anchor navigation changed active lane')
    if (!afterAnchor.search.includes('lane=community')) throw new Error('Anchor navigation lost lane query state')
    if (afterAnchor.historyLength < historyLengthBeforeAnchor) throw new Error('Browser history length regressed unexpectedly')

    const backStep = proof.steps.find((step) => step.name === 'back')
    const forwardStep = proof.steps.find((step) => step.name === 'forward')
    if (backStep?.lane !== 'build' || forwardStep?.lane !== 'community') {
      throw new Error('Back/Forward did not restore canonical district state')
    }

    proof.verdict = 'pass'
    process.stdout.write(`${JSON.stringify(proof, null, 2)}\n`)
  } finally {
    client.close()
  }
}

main().catch((error) => {
  console.error(`WORLD_NAVIGATION_FOC: ${error.stack ?? error.message}`)
  process.exit(1)
})
