import test from 'node:test'
import assert from 'node:assert/strict'
import {
  ADAPTIVE_TIERS,
  canUseWebGL,
  fallbackReasonForProfile,
  normalizeAdaptiveSignals,
  rendererAdmission,
  renderBudgetForTier,
  resolveAdaptiveProfile,
  resolveAdaptiveTier,
  spatialBundleBudgets,
  spatialRenderBudgets,
  webglBudgetForTier,
} from '../src/spatial/render-policy.js'

const capable = Object.freeze({
  saveData: false,
  reducedMotion: false,
  memory: 8,
  cores: 8,
  online: true,
  effectiveType: '4g',
})

test('adaptive tier vocabulary is closed and canonical', () => {
  assert.deepEqual(ADAPTIVE_TIERS, ['full', 'balanced', 'lite'])
})

test('capable unconstrained profile resolves to full', () => {
  const profile = resolveAdaptiveProfile(capable)
  assert.equal(profile.tier, 'full')
  assert.equal(profile.online, true)
  assert.equal(profile.effectiveType, '4g')
})

test('moderate device or 3g profile resolves to balanced', () => {
  assert.equal(resolveAdaptiveTier({ ...capable, memory: 4 }), 'balanced')
  assert.equal(resolveAdaptiveTier({ ...capable, cores: 6 }), 'balanced')
  assert.equal(resolveAdaptiveTier({ ...capable, effectiveType: '3g' }), 'balanced')
})

test('every governed hard constraint resolves to lite', () => {
  const cases = [
    { saveData: true },
    { reducedMotion: true },
    { online: false },
    { effectiveType: 'slow-2g' },
    { effectiveType: '2g' },
    { memory: 2 },
    { cores: 2 },
  ]

  for (const constraint of cases) {
    assert.equal(resolveAdaptiveTier({ ...capable, ...constraint }), 'lite', JSON.stringify(constraint))
  }
})

test('unknown hardware hints remain unknown instead of becoming fake zero-capacity claims', () => {
  const normalized = normalizeAdaptiveSignals({ memory: 0, cores: Number.NaN, online: true })
  assert.equal(normalized.memory, null)
  assert.equal(normalized.cores, null)
  assert.equal(resolveAdaptiveTier(normalized), 'full')
})

test('fallback reason preserves the strongest explicit user/system constraint', () => {
  assert.equal(fallbackReasonForProfile({ tier: 'lite', saveData: true, reducedMotion: true, online: false }), 'save-data')
  assert.equal(fallbackReasonForProfile({ tier: 'lite', saveData: false, reducedMotion: true, online: false }), 'reduced-motion')
  assert.equal(fallbackReasonForProfile({ tier: 'lite', saveData: false, reducedMotion: false, online: false }), 'offline')
  assert.equal(fallbackReasonForProfile({ tier: 'lite', saveData: false, reducedMotion: false, online: true }), 'policy-lite')
})

test('lite policy can never admit WebGL even when WebGL exists', () => {
  const profile = resolveAdaptiveProfile({ ...capable, cores: 2 })
  assert.deepEqual(rendererAdmission(profile, { webglAvailable: true }), {
    renderer: 'static',
    reason: 'policy-lite',
  })
})

test('capable profile falls back cleanly when WebGL is unavailable', () => {
  const profile = resolveAdaptiveProfile(capable)
  assert.deepEqual(rendererAdmission(profile, { webglAvailable: false }), {
    renderer: 'static',
    reason: 'webgl-unavailable',
  })
})

test('capable profile admits WebGL only when policy and capability both allow it', () => {
  const profile = resolveAdaptiveProfile(capable)
  assert.deepEqual(rendererAdmission(profile, { webglAvailable: true }), {
    renderer: 'webgl',
    reason: null,
  })
})

test('balanced budget is materially cheaper than full while preserving WebGL semantics', () => {
  const full = renderBudgetForTier('full')
  const balanced = renderBudgetForTier('balanced')

  assert.equal(full.renderer, 'webgl')
  assert.equal(balanced.renderer, 'webgl')
  assert.equal(full.shadows, true)
  assert.equal(balanced.shadows, false)
  assert.ok(full.dpr[1] > balanced.dpr[1])
  assert.ok(full.particles > balanced.particles)
  assert.ok(full.groundSegments > balanced.groundSegments)
  assert.ok(full.beaconTubularSegments > balanced.beaconTubularSegments)
})

test('lite budget is static and allocates no Three.js scene budget', () => {
  const lite = spatialRenderBudgets.lite
  assert.equal(lite.renderer, 'static')
  assert.equal(lite.particles, 0)
  assert.equal(lite.shadows, false)
  assert.equal(lite.groundSegments, 0)
  assert.equal(webglBudgetForTier('lite'), spatialRenderBudgets.balanced)
})

test('Sprint 1 bundle ceilings remain explicit machine-readable guardrails', () => {
  assert.deepEqual(spatialBundleBudgets, {
    entry: { rawBytes: 220_000, gzipBytes: 70_000 },
    heavyWorld: { rawBytes: 900_000, gzipBytes: 245_000 },
  })
})

test('WebGL capability preflight handles supported, unsupported and exceptional canvases', () => {
  const supportedDocument = {
    createElement() {
      return {
        getContext(name) {
          if (name === 'webgl2') return { getExtension: () => null }
          return null
        },
      }
    },
  }
  const unsupportedDocument = {
    createElement() {
      return { getContext: () => null }
    },
  }
  const throwingDocument = {
    createElement() {
      throw new Error('canvas unavailable')
    },
  }

  assert.equal(canUseWebGL(supportedDocument), true)
  assert.equal(canUseWebGL(unsupportedDocument), false)
  assert.equal(canUseWebGL(throwingDocument), false)
  assert.equal(canUseWebGL(null), false)
})
