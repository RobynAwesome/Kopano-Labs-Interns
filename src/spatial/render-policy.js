export const ADAPTIVE_TIERS = Object.freeze(['full', 'balanced', 'lite'])

export const spatialRenderBudgets = Object.freeze({
  full: Object.freeze({
    renderer: 'webgl',
    dpr: Object.freeze([1, 1.6]),
    particles: 128,
    shadows: true,
    antialias: true,
    powerPreference: 'high-performance',
    groundSegments: 72,
    worldRingSegments: 72,
    districtRingSegments: 40,
    districtFillSegments: 32,
    nodeRadialSegments: 12,
    beaconTubularSegments: 32,
    beaconRingSegments: 28,
    leafWidthSegments: 10,
    leafHeightSegments: 8,
  }),
  balanced: Object.freeze({
    renderer: 'webgl',
    dpr: Object.freeze([1, 1.25]),
    particles: 48,
    shadows: false,
    antialias: false,
    powerPreference: 'default',
    groundSegments: 48,
    worldRingSegments: 48,
    districtRingSegments: 28,
    districtFillSegments: 24,
    nodeRadialSegments: 10,
    beaconTubularSegments: 24,
    beaconRingSegments: 20,
    leafWidthSegments: 8,
    leafHeightSegments: 6,
  }),
  lite: Object.freeze({
    renderer: 'static',
    dpr: 1,
    particles: 0,
    shadows: false,
    antialias: false,
    powerPreference: 'low-power',
    groundSegments: 0,
    worldRingSegments: 0,
    districtRingSegments: 0,
    districtFillSegments: 0,
    nodeRadialSegments: 0,
    beaconTubularSegments: 0,
    beaconRingSegments: 0,
    leafWidthSegments: 0,
    leafHeightSegments: 0,
  }),
})

export const spatialBundleBudgets = Object.freeze({
  entry: Object.freeze({ rawBytes: 220_000, gzipBytes: 70_000 }),
  heavyWorld: Object.freeze({ rawBytes: 900_000, gzipBytes: 245_000 }),
})

const LITE_EFFECTIVE_TYPES = new Set(['slow-2g', '2g'])
const BALANCED_EFFECTIVE_TYPES = new Set(['3g'])

function finitePositive(value) {
  const number = Number(value)
  return Number.isFinite(number) && number > 0 ? number : null
}

export function normalizeAdaptiveSignals(signals = {}) {
  return Object.freeze({
    saveData: Boolean(signals.saveData),
    reducedMotion: Boolean(signals.reducedMotion),
    memory: finitePositive(signals.memory),
    cores: finitePositive(signals.cores),
    online: signals.online !== false,
    effectiveType: typeof signals.effectiveType === 'string' && signals.effectiveType.length > 0
      ? signals.effectiveType.toLowerCase()
      : null,
  })
}

export function resolveAdaptiveTier(signals = {}) {
  const profile = normalizeAdaptiveSignals(signals)

  if (
    profile.saveData
    || profile.reducedMotion
    || !profile.online
    || LITE_EFFECTIVE_TYPES.has(profile.effectiveType)
    || (profile.memory !== null && profile.memory <= 2)
    || (profile.cores !== null && profile.cores <= 2)
  ) {
    return 'lite'
  }

  if (
    BALANCED_EFFECTIVE_TYPES.has(profile.effectiveType)
    || (profile.memory !== null && profile.memory <= 4)
    || (profile.cores !== null && profile.cores <= 6)
  ) {
    return 'balanced'
  }

  return 'full'
}

export function resolveAdaptiveProfile(signals = {}) {
  const normalized = normalizeAdaptiveSignals(signals)
  return Object.freeze({
    ...normalized,
    tier: resolveAdaptiveTier(normalized),
  })
}

export function fallbackReasonForProfile(profile) {
  if (profile?.saveData) return 'save-data'
  if (profile?.reducedMotion) return 'reduced-motion'
  if (profile?.online === false) return 'offline'
  if (profile?.tier === 'lite') return 'policy-lite'
  return null
}

export function rendererAdmission(profile, { webglAvailable = true } = {}) {
  const policyReason = fallbackReasonForProfile(profile)
  if (policyReason) {
    return Object.freeze({ renderer: 'static', reason: policyReason })
  }

  if (!webglAvailable) {
    return Object.freeze({ renderer: 'static', reason: 'webgl-unavailable' })
  }

  return Object.freeze({ renderer: 'webgl', reason: null })
}

export function renderBudgetForTier(tier) {
  return spatialRenderBudgets[tier] ?? spatialRenderBudgets.balanced
}

export function webglBudgetForTier(tier) {
  return tier === 'full' ? spatialRenderBudgets.full : spatialRenderBudgets.balanced
}

export function canUseWebGL(documentRef = globalThis.document) {
  if (!documentRef?.createElement) return false

  try {
    const canvas = documentRef.createElement('canvas')
    const context = canvas.getContext?.('webgl2') || canvas.getContext?.('webgl')
    if (!context) return false
    context.getExtension?.('WEBGL_lose_context')?.loseContext?.()
    return true
  } catch {
    return false
  }
}
