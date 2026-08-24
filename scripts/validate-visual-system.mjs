import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

export const DEFAULT_CONTRACT = 'governance/visual-system/visual-system.contract.json'

const REQUIRED_TOP_LEVEL = [
  'schema',
  'status',
  'authority',
  'thesis',
  'palette',
  'typography',
  'contentDepth',
  'spatialGrammar',
  'editorialGrammar',
  'composition',
  'adaptive',
  'assets',
  'accessibility',
  'validation',
]

const REQUIRED_LANES = ['learn', 'build', 'community', 'opportunity']
const REQUIRED_STATES = ['knowledge', 'positive', 'navigation', 'warning', 'experiment']
const REQUIRED_DEPTHS = ['GLANCE', 'LEARN', 'BUILD']
const REQUIRED_SPATIAL = ['node', 'route', 'beacon', 'district', 'progression']
const REQUIRED_EDITORIAL = ['feature', 'short-form', 'explainer', 'video', 'project', 'event', 'challenge']
const REQUIRED_ASSET_METADATA = ['source', 'owner', 'license', 'altStrategy', 'performanceBudget']

function isObject(value) {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value)
}

function includesAll(values, required) {
  return Array.isArray(values) && required.every((item) => values.includes(item))
}

function isHex(value) {
  return typeof value === 'string' && /^#[0-9a-f]{6}$/iu.test(value)
}

function hexToRgb(hex) {
  const normalized = hex.slice(1)
  return [0, 2, 4].map((offset) => Number.parseInt(normalized.slice(offset, offset + 2), 16) / 255)
}

function relativeLuminance(hex) {
  return hexToRgb(hex)
    .map((channel) => (channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4))
    .reduce((sum, channel, index) => sum + channel * [0.2126, 0.7152, 0.0722][index], 0)
}

export function contrastRatio(foreground, background) {
  const [lighter, darker] = [relativeLuminance(foreground), relativeLuminance(background)].sort((a, b) => b - a)
  return (lighter + 0.05) / (darker + 0.05)
}

function resolvePath(object, dottedPath) {
  return dottedPath.split('.').reduce((value, key) => (value == null ? undefined : value[key]), object)
}

export function loadVisualContract(filePath = DEFAULT_CONTRACT, root = process.cwd()) {
  const absolute = path.resolve(root, filePath)
  return JSON.parse(fs.readFileSync(absolute, 'utf8'))
}

export function validateVisualSystem(contract) {
  const errors = []

  if (!isObject(contract)) {
    return ['contract must be a JSON object']
  }

  for (const key of REQUIRED_TOP_LEVEL) {
    if (!(key in contract)) errors.push(`missing top-level section: ${key}`)
  }

  if (contract.schema !== 'kln.visual-system.v1') {
    errors.push('schema must equal kln.visual-system.v1')
  }

  if (contract.status !== 'truth-lock') {
    errors.push('status must equal truth-lock')
  }

  if (contract.authority?.masterIssue !== 3 || contract.authority?.run !== 'S0.PC') {
    errors.push('authority must bind the contract to Issue #3 / S0.PC')
  }

  if (!includesAll(contract.thesis?.journey, REQUIRED_LANES)) {
    errors.push('thesis journey must include learn/build/community/opportunity')
  }

  const foundation = contract.palette?.foundation ?? {}
  const laneAccents = contract.palette?.laneAccents ?? {}
  const semanticStates = contract.palette?.semanticStates ?? {}

  for (const [groupName, group] of Object.entries({ foundation, laneAccents, semanticStates })) {
    if (!isObject(group)) {
      errors.push(`palette.${groupName} must be an object`)
      continue
    }
    for (const [token, value] of Object.entries(group)) {
      if (!isHex(value)) errors.push(`palette.${groupName}.${token} must be a six-digit hex colour`)
    }
  }

  for (const lane of REQUIRED_LANES) {
    if (!isHex(laneAccents[lane])) errors.push(`missing/invalid lane accent: ${lane}`)
  }

  for (const state of REQUIRED_STATES) {
    if (!isHex(semanticStates[state])) errors.push(`missing/invalid semantic state: ${state}`)
  }

  const precedence = contract.palette?.precedence ?? []
  const statusIndex = precedence.indexOf('system-status')
  const laneIndex = precedence.indexOf('lane-accent')
  if (statusIndex < 0 || laneIndex < 0 || statusIndex >= laneIndex) {
    errors.push('palette precedence must place system-status before lane-accent')
  }

  if (contract.palette?.collisionPolicy?.systemStatusOverridesLaneAccent !== true) {
    errors.push('system status must override lane accent when meanings collide')
  }

  if (contract.palette?.collisionPolicy?.requireSecondaryCue !== true) {
    errors.push('lane/status colour collisions must require a secondary cue')
  }

  for (const depth of REQUIRED_DEPTHS) {
    const definition = contract.contentDepth?.[depth]
    if (!isObject(definition)) {
      errors.push(`missing content depth: ${depth}`)
      continue
    }
    if (!definition.intent || !definition.timeScale || !Array.isArray(definition.must) || definition.must.length < 2) {
      errors.push(`${depth} must define intent, timeScale and at least two mandatory behaviors`)
    }
  }

  if (!includesAll(contract.spatialGrammar?.primitives, REQUIRED_SPATIAL)) {
    errors.push('spatial grammar must include node/route/beacon/district/progression')
  }

  if (!Array.isArray(contract.spatialGrammar?.threeJsMustEncodeAtLeastOne) || contract.spatialGrammar.threeJsMustEncodeAtLeastOne.length === 0) {
    errors.push('Three.js must be required to encode product information/state')
  }

  if (!includesAll(contract.spatialGrammar?.staticFallbackMustPreserve, ['lane identity', 'active context', 'primary navigation'])) {
    errors.push('static fallback must preserve lane identity, active context and primary navigation')
  }

  if (!includesAll(contract.editorialGrammar?.moduleTypes, REQUIRED_EDITORIAL)) {
    errors.push('editorial grammar is missing canonical Knowledge Stream module types')
  }

  if (contract.composition?.mobile?.rearrangeNotShrink !== true) {
    errors.push('mobile composition must explicitly rearrange rather than shrink')
  }

  if (contract.composition?.mobile?.thumbReachablePrimaryNavigation !== true) {
    errors.push('mobile composition must require thumb-reachable primary navigation')
  }

  if ((contract.composition?.mobile?.minimumTargetPx ?? 0) < 44) {
    errors.push('mobile minimum target size must be at least 44px')
  }

  const tiers = contract.adaptive?.tiers ?? {}
  for (const tier of ['full', 'balanced', 'lite']) {
    if (!isObject(tiers[tier])) errors.push(`missing adaptive tier: ${tier}`)
  }

  if (tiers.lite?.webgl !== false) {
    errors.push('lite tier must not require WebGL')
  }

  if (contract.adaptive?.reducedMotion?.motionOnlyMeaningForbidden !== true) {
    errors.push('reduced-motion contract must forbid motion-only meaning')
  }

  if (contract.adaptive?.saveData?.heavySpatialChunkForbidden !== true) {
    errors.push('Save-Data contract must forbid requiring the heavy spatial chunk')
  }

  if (!includesAll(contract.assets?.requiredMetadata, REQUIRED_ASSET_METADATA)) {
    errors.push('asset provenance metadata must require source/owner/license/altStrategy/performanceBudget')
  }

  if (contract.assets?.rules?.userReferenceIsDirectionNotLicence !== true) {
    errors.push('user reference imagery must be direction, not automatic production licence')
  }

  if (contract.assets?.rules?.towersSourceOrArtworkCopyForbidden !== true) {
    errors.push('Towers source/artwork copying must remain explicitly forbidden')
  }

  if (contract.accessibility?.statusRequiresNonColorCue !== true) {
    errors.push('status must require a non-colour cue')
  }

  if (contract.accessibility?.keyboardCoreNavigationRequired !== true) {
    errors.push('core navigation must remain keyboard-operable')
  }

  const contrastPairs = contract.accessibility?.contrastPairs
  if (!Array.isArray(contrastPairs) || contrastPairs.length < 2) {
    errors.push('accessibility must define critical contrast pairs')
  } else {
    for (const pair of contrastPairs) {
      const foreground = resolvePath(contract, pair.foreground)
      const background = resolvePath(contract, pair.background)
      const minimum = Number(pair.minimum)
      if (!isHex(foreground) || !isHex(background) || !Number.isFinite(minimum)) {
        errors.push(`invalid contrast pair: ${pair.foreground} on ${pair.background}`)
        continue
      }
      const ratio = contrastRatio(foreground, background)
      if (ratio + 1e-9 < minimum) {
        errors.push(`contrast ${pair.foreground} on ${pair.background} is ${ratio.toFixed(2)}:1; requires ${minimum}:1`)
      }
    }
  }

  const fontPolicy = contract.typography?.productionFontPolicy ?? ''
  if (!/licen[cs]|rights/iu.test(fontPolicy)) {
    errors.push('typography must explicitly address production font licensing/rights')
  }

  if (contract.validation?.contractRequiredForFutureVisualPRs !== true) {
    errors.push('future visual PRs must be bound to the visual contract')
  }

  if (contract.validation?.srcImplementationChangesAllowedInThisRun !== false) {
    errors.push('S0.PC contract must forbid src implementation changes in this run')
  }

  return errors
}

function main() {
  const filePath = process.argv[2] || DEFAULT_CONTRACT
  let contract
  try {
    contract = loadVisualContract(filePath)
  } catch (error) {
    console.error(`VISUAL_SYSTEM_FOC: unable to load ${filePath}: ${error.message}`)
    process.exit(1)
  }

  const errors = validateVisualSystem(contract)
  if (errors.length > 0) {
    for (const error of errors) console.error(`VISUAL_SYSTEM_FOC: ${error}`)
    console.error(`Visual system validation failed with ${errors.length} error(s).`)
    process.exit(1)
  }

  console.log('Visual system contract validation passed.')
}

const invokedDirectly = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
if (invokedDirectly) main()
