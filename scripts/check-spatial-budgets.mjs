import { readFileSync, readdirSync } from 'node:fs'
import { gzipSync } from 'node:zlib'
import path from 'node:path'
import process from 'node:process'
import { spatialBundleBudgets } from '../src/spatial/render-policy.js'

const distDir = process.argv[2] ?? 'dist'
const assetsDir = path.join(distDir, 'assets')

function measure(filePath) {
  const bytes = readFileSync(filePath)
  return {
    rawBytes: bytes.byteLength,
    gzipBytes: gzipSync(bytes).byteLength,
  }
}

function assertWithin(label, measured, budget) {
  const failures = []
  if (measured.rawBytes > budget.rawBytes) {
    failures.push(`${label} raw ${measured.rawBytes} > ${budget.rawBytes}`)
  }
  if (measured.gzipBytes > budget.gzipBytes) {
    failures.push(`${label} gzip ${measured.gzipBytes} > ${budget.gzipBytes}`)
  }
  if (failures.length > 0) throw new Error(failures.join('; '))
}

function findEntryAsset() {
  const html = readFileSync(path.join(distDir, 'index.html'), 'utf8')
  const match = html.match(/<script[^>]+src="\/assets\/([^"?]+\.js)"/)
  if (!match) throw new Error('Unable to locate entry JS from dist/index.html')
  return match[1]
}

function findHeavyWorldAsset() {
  const matches = readdirSync(assetsDir).filter((name) => /^HeavyWorld-.*\.js$/.test(name))
  if (matches.length !== 1) {
    throw new Error(`Expected exactly one HeavyWorld JS asset, found ${matches.length}`)
  }
  return matches[0]
}

try {
  const entryAsset = findEntryAsset()
  const heavyWorldAsset = findHeavyWorldAsset()
  const entry = measure(path.join(assetsDir, entryAsset))
  const heavyWorld = measure(path.join(assetsDir, heavyWorldAsset))

  assertWithin('entry', entry, spatialBundleBudgets.entry)
  assertWithin('HeavyWorld', heavyWorld, spatialBundleBudgets.heavyWorld)

  process.stdout.write(`${JSON.stringify({
    schema: 's1_pc_spatial_bundle_budget_v1',
    verdict: 'pass',
    assets: {
      entry: { name: entryAsset, ...entry, budget: spatialBundleBudgets.entry },
      heavyWorld: { name: heavyWorldAsset, ...heavyWorld, budget: spatialBundleBudgets.heavyWorld },
    },
  }, null, 2)}\n`)
} catch (error) {
  console.error(`SPATIAL_BUDGET_FOC: ${error.message}`)
  process.exit(1)
}
