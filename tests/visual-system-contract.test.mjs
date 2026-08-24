import assert from 'node:assert/strict'
import test from 'node:test'

import {
  loadVisualContract,
  validateVisualSystem,
} from '../scripts/validate-visual-system.mjs'

function freshContract() {
  return structuredClone(loadVisualContract())
}

function expectError(mutator, fragment) {
  const contract = freshContract()
  mutator(contract)
  const errors = validateVisualSystem(contract)
  assert.ok(
    errors.some((error) => error.includes(fragment)),
    `expected an error containing ${JSON.stringify(fragment)} but got:\n${errors.join('\n')}`,
  )
}

test('canonical visual-system contract passes', () => {
  assert.deepEqual(validateVisualSystem(freshContract()), [])
})

test('missing lane identity is rejected', () => {
  expectError(
    (contract) => delete contract.palette.laneAccents.community,
    'missing/invalid lane accent: community',
  )
})

test('system status cannot be subordinated to lane accent', () => {
  expectError(
    (contract) => {
      contract.palette.precedence = ['lane-accent', 'interaction-state', 'system-status', 'decorative']
    },
    'system-status before lane-accent',
  )
})

test('colour collisions require a non-colour cue', () => {
  expectError(
    (contract) => {
      contract.palette.collisionPolicy.requireSecondaryCue = false
    },
    'secondary cue',
  )
})

test('BUILD cannot exist without an artefact/proof depth contract', () => {
  expectError(
    (contract) => delete contract.contentDepth.BUILD,
    'missing content depth: BUILD',
  )
})

test('lite mode cannot require WebGL', () => {
  expectError(
    (contract) => {
      contract.adaptive.tiers.lite.webgl = true
    },
    'lite tier must not require WebGL',
  )
})

test('asset admission cannot drop licence metadata', () => {
  expectError(
    (contract) => {
      contract.assets.requiredMetadata = contract.assets.requiredMetadata.filter((field) => field !== 'license')
    },
    'asset provenance metadata',
  )
})

test('low-contrast critical text is rejected', () => {
  expectError(
    (contract) => {
      contract.palette.foundation.textPrimary = '#0a1712'
    },
    'contrast palette.foundation.textPrimary',
  )
})

test('mobile cannot regress to shrink-only composition', () => {
  expectError(
    (contract) => {
      contract.composition.mobile.rearrangeNotShrink = false
    },
    'rearrange rather than shrink',
  )
})

test('S0.PC cannot silently admit src implementation changes', () => {
  expectError(
    (contract) => {
      contract.validation.srcImplementationChangesAllowedInThisRun = true
    },
    'forbid src implementation changes',
  )
})
