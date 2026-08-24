import assert from 'node:assert/strict'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import test from 'node:test'

import { validatePullRequest, validateRepository } from '../scripts/validate-governance.mjs'

const STATELESS = 'I_AM_STATELESS_RENTER_NOT_LANDLORD'

const validFiles = {
  'README.md': `# Kopano Labs Learning Network\nIssue #3\nNOW.md\n${STATELESS}\n`,
  'NOW.md': `# NOW.md\nCurrent-state authority\nMaster program\nIssue #3\nCURRENT STATE\nPRE-SEED\nScope OUT\nHOLD\n${STATELESS}\n`,
  'AGENTS.md': `# AGENTS\nCanonical renter entry order\nIssue #3\nNOW.md\nHOLD_AND_RECONCILE\nPRE-SEED\nPOST-SEED\n${STATELESS}\n`,
  'governance/EXECUTION_PROTOCOL.md': `# Protocol\nTemporal authority\nIssue #3\nHOLD_AND_RECONCILE\nPRE-SEED\nPOST-SEED\nexact reviewed head\nPOC_VALIDATED\n${STATELESS}\n`,
  '.github/PULL_REQUEST_TEMPLATE.md': `Master: #3\nSprint:\nRun:\nPRE-SEED:\nScope IN\nScope OUT\nAcceptance criteria\nValidation receipts\nExact reviewed head\nPOC/FOC verdict\nPOST-SEED:\n${STATELESS}\n`,
}

function withFixture(mutator) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'kopano-governance-'))

  try {
    for (const [relativePath, content] of Object.entries(validFiles)) {
      const absolutePath = path.join(root, relativePath)
      fs.mkdirSync(path.dirname(absolutePath), { recursive: true })
      fs.writeFileSync(absolutePath, content, 'utf8')
    }

    mutator?.(root)
    return validateRepository(root)
  } finally {
    fs.rmSync(root, { recursive: true, force: true })
  }
}

const validPrBody = `
Master: #3
Sprint: 0
Run: B
PRE-SEED: 986eb07
${STATELESS}

## Scope IN
Governance hardening only.

## Scope OUT
No visual or Sprint 1 work.

## Acceptance criteria
- [x] Deterministic governance gate.

## Validation receipts
- Exact reviewed head: abc123

POC/FOC verdict: POC_VALIDATED
POST-SEED: pending exact-head receipt
`

test('valid repository governance contract passes', () => {
  assert.deepEqual(withFixture(), [])
})

test('missing canonical governance surface is rejected', () => {
  const errors = withFixture((root) => fs.rmSync(path.join(root, 'NOW.md')))
  assert.ok(errors.some((error) => error.includes('missing required governance file: NOW.md')))
})

test('missing continuity marker is rejected', () => {
  const errors = withFixture((root) => {
    fs.writeFileSync(path.join(root, 'AGENTS.md'), '# AGENTS\nIssue #3\n', 'utf8')
  })
  assert.ok(errors.some((error) => error.includes('AGENTS.md: missing required marker: NOW.md')))
  assert.ok(errors.some((error) => error.includes(`AGENTS.md: missing required marker: ${STATELESS}`)))
})

test('stale README routing is rejected', () => {
  const errors = withFixture((root) => {
    fs.appendFileSync(path.join(root, 'README.md'), '\nPR1 is the next active implementation slice\n')
  })
  assert.ok(errors.some((error) => error.includes('README.md: contains stale/forbidden marker')))
})

test('valid canonical PR contract passes', () => {
  assert.deepEqual(
    validatePullRequest({
      title: 'S0.PB — Harden stateless renter governance',
      body: validPrBody,
    }),
    [],
  )
})

test('malformed PR title and body are rejected', () => {
  const errors = validatePullRequest({ title: 'Governance fixes', body: 'looks good' })
  assert.ok(errors.some((error) => error.includes('PR title must match')))
  assert.ok(errors.some((error) => error.includes('PR body missing required marker: Master: #3')))
  assert.ok(errors.some((error) => error.includes('PR body missing required marker: POST-SEED:')))
})
