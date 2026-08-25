import process from 'node:process'

const debuggerBase = process.argv[2] ?? 'http://127.0.0.1:9223'
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
        const page = targets.find((target) => target.type === 'page')
        if (page?.webSocketDebuggerUrl) return page
      }
    } catch {
      // Debugger may still be starting.
    }
    await sleep(250)
  }
  throw new Error('No Chrome page target found for adaptive proof')
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
    })
    if (result.exceptionDetails) throw new Error(result.exceptionDetails.text ?? 'Runtime.evaluate failed')
    return result.result?.value
  }

  return {
    send,
    evaluate,
    close() {
      socket.close()
    },
  }
}

async function waitFor(evaluate, expression, label, timeoutMs = 10000) {
  const started = Date.now()
  while (Date.now() - started < timeoutMs) {
    if (await evaluate(expression)) return
    await sleep(100)
  }
  throw new Error(`Timed out waiting for ${label}`)
}

const preload = `(() => {
  const params = () => new URL(location.href).searchParams;
  const numberParam = (name, fallback) => {
    const value = Number(params().get(name));
    return Number.isFinite(value) && value > 0 ? value : fallback;
  };
  const boolParam = (name, fallback = false) => {
    const value = params().get(name);
    if (value === null) return fallback;
    return value === '1' || value === 'true';
  };
  const define = (name, getter) => {
    try {
      Object.defineProperty(navigator, name, { configurable: true, get: getter });
    } catch {
      try { Object.defineProperty(Navigator.prototype, name, { configurable: true, get: getter }); } catch {}
    }
  };

  define('deviceMemory', () => numberParam('__memory', 8));
  define('hardwareConcurrency', () => numberParam('__cores', 8));
  define('onLine', () => boolParam('__online', true));

  const connection = {
    get saveData() { return boolParam('__saveData', false); },
    get effectiveType() { return params().get('__effectiveType') || '4g'; },
    addEventListener() {},
    removeEventListener() {},
  };
  define('connection', () => connection);
  define('mozConnection', () => connection);
  define('webkitConnection', () => connection);

  const nativeMatchMedia = window.matchMedia.bind(window);
  window.matchMedia = (query) => {
    if (query === '(prefers-reduced-motion: reduce)') {
      const matches = boolParam('__reducedMotion', false);
      return {
        matches,
        media: query,
        onchange: null,
        addEventListener() {},
        removeEventListener() {},
        addListener() {},
        removeListener() {},
        dispatchEvent() { return true; },
      };
    }
    return nativeMatchMedia(query);
  };

  const nativeGetContext = HTMLCanvasElement.prototype.getContext;
  HTMLCanvasElement.prototype.getContext = function(type, ...args) {
    if (params().get('__webgl') === 'off' && ['webgl', 'webgl2', 'experimental-webgl'].includes(type)) {
      return null;
    }
    return nativeGetContext.call(this, type, ...args);
  };
})()`

const cases = [
  {
    name: 'full',
    query: '__memory=8&__cores=8&__online=1&__effectiveType=4g',
    expected: { tier: 'full', renderer: 'webgl', budget: 'full', heavyRequested: true, fallbackReason: null },
  },
  {
    name: 'balanced',
    query: '__memory=8&__cores=4&__online=1&__effectiveType=4g',
    expected: { tier: 'balanced', renderer: 'webgl', budget: 'balanced', heavyRequested: true, fallbackReason: null },
  },
  {
    name: 'lite-low-device',
    query: '__memory=2&__cores=2&__online=1&__effectiveType=4g',
    expected: { tier: 'lite', renderer: 'static', budget: 'lite', heavyRequested: false, fallbackReason: 'policy-lite' },
  },
  {
    name: 'save-data',
    query: '__memory=8&__cores=8&__online=1&__effectiveType=4g&__saveData=1',
    expected: { tier: 'lite', renderer: 'static', budget: 'lite', heavyRequested: false, fallbackReason: 'save-data' },
  },
  {
    name: 'reduced-motion',
    query: '__memory=8&__cores=8&__online=1&__effectiveType=4g&__reducedMotion=1',
    expected: { tier: 'lite', renderer: 'static', budget: 'lite', heavyRequested: false, fallbackReason: 'reduced-motion' },
  },
  {
    name: 'offline-signal',
    query: '__memory=8&__cores=8&__online=0&__effectiveType=4g',
    expected: { tier: 'lite', renderer: 'static', budget: 'lite', heavyRequested: false, fallbackReason: 'offline' },
  },
  {
    name: 'webgl-unavailable',
    query: '__memory=8&__cores=8&__online=1&__effectiveType=4g&__webgl=off',
    expected: { tier: 'full', renderer: 'static', budget: 'lite', heavyRequested: false, fallbackReason: 'webgl-unavailable' },
  },
]

function stateExpression() {
  return `(() => {
    const app = document.querySelector('[data-tier]');
    const renderer = document.querySelector('[data-spatial-renderer]');
    return {
      tier: app?.dataset.tier ?? null,
      renderer: renderer?.dataset.spatialRenderer ?? null,
      budget: renderer?.dataset.spatialBudget ?? null,
      fallbackReason: renderer?.dataset.spatialFallbackReason ?? null,
      dprMax: renderer?.dataset.spatialDprMax ?? null,
      heavyRequested: performance.getEntriesByType('resource').some((entry) => entry.name.includes('/HeavyWorld-')),
      activeLane: app?.dataset.activeLane ?? null,
    };
  })()`
}

async function main() {
  const page = await getPageTarget()
  const client = createCdpClient(page.webSocketDebuggerUrl)
  const proof = { schema: 's1_pc_adaptive_runtime_v1', cases: [] }

  try {
    await client.send('Runtime.enable')
    await client.send('Page.enable')
    await client.send('Page.addScriptToEvaluateOnNewDocument', { source: preload })

    for (const testCase of cases) {
      const url = `${appOrigin}/?lane=learn&${testCase.query}`
      await client.send('Page.navigate', { url })
      await waitFor(client.evaluate, `document.readyState === 'complete'`, `${testCase.name} document load`)
      await waitFor(
        client.evaluate,
        `document.querySelector('[data-tier]')?.dataset.tier === ${JSON.stringify(testCase.expected.tier)}`,
        `${testCase.name} tier`,
      )
      await waitFor(
        client.evaluate,
        `document.querySelector('[data-spatial-renderer]')?.dataset.spatialRenderer === ${JSON.stringify(testCase.expected.renderer)}`,
        `${testCase.name} renderer`,
      )

      const observed = await client.evaluate(stateExpression())
      proof.cases.push({ name: testCase.name, expected: testCase.expected, observed })

      for (const key of ['tier', 'renderer', 'budget', 'heavyRequested', 'fallbackReason']) {
        if (observed[key] !== testCase.expected[key]) {
          throw new Error(`${testCase.name}: ${key} expected ${JSON.stringify(testCase.expected[key])}, got ${JSON.stringify(observed[key])}`)
        }
      }
      if (observed.activeLane !== 'learn') {
        throw new Error(`${testCase.name}: adaptive proof changed canonical navigation state`)
      }
    }

    proof.verdict = 'pass'
    process.stdout.write(`${JSON.stringify(proof, null, 2)}\n`)
  } finally {
    client.close()
  }
}

main().catch((error) => {
  console.error(`ADAPTIVE_RUNTIME_FOC: ${error.stack ?? error.message}`)
  process.exit(1)
})
