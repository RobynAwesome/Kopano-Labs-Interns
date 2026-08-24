import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

const STATELESS = 'I_AM_STATELESS_RENTER_NOT_LANDLORD'

export const GOVERNANCE_FILES = [
  'README.md',
  'NOW.md',
  'AGENTS.md',
  'governance/EXECUTION_PROTOCOL.md',
  '.github/PULL_REQUEST_TEMPLATE.md',
]

const FILE_CONTRACTS = [
  {
    file: 'README.md',
    required: ['# Kopano Labs Learning Network', 'Issue #3', 'NOW.md', STATELESS],
    forbidden: ['PR1 is the next active implementation slice', 'PR2 learning/video model       NEXT'],
  },
  {
    file: 'NOW.md',
    required: [
      'Current-state authority',
      'Master program',
      'Issue #3',
      'CURRENT STATE',
      'PRE-SEED',
      'Scope OUT',
      'HOLD',
      STATELESS,
    ],
  },
  {
    file: 'AGENTS.md',
    required: [
      'Canonical renter entry order',
      'Issue #3',
      'NOW.md',
      'HOLD_AND_RECONCILE',
      'PRE-SEED',
      'POST-SEED',
      STATELESS,
    ],
  },
  {
    file: 'governance/EXECUTION_PROTOCOL.md',
    required: [
      'Temporal authority',
      'Issue #3',
      'HOLD_AND_RECONCILE',
      'PRE-SEED',
      'POST-SEED',
      'exact reviewed head',
      'POC_VALIDATED',
      STATELESS,
    ],
  },
  {
    file: '.github/PULL_REQUEST_TEMPLATE.md',
    required: [
      'Master: #3',
      'Sprint:',
      'Run:',
      'PRE-SEED:',
      'Scope IN',
      'Scope OUT',
      'Acceptance criteria',
      'Validation receipts',
      'Exact reviewed head',
      'POC/FOC verdict',
      'POST-SEED:',
      STATELESS,
    ],
  },
]

function readText(root, relativePath) {
  const absolutePath = path.join(root, relativePath)
  if (!fs.existsSync(absolutePath)) {
    return { error: `missing required governance file: ${relativePath}` }
  }
  if (!fs.statSync(absolutePath).isFile()) {
    return { error: `governance path is not a file: ${relativePath}` }
  }
  return { text: fs.readFileSync(absolutePath, 'utf8') }
}

export function validateRepository(root = process.cwd()) {
  const errors = []

  for (const contract of FILE_CONTRACTS) {
    const result = readText(root, contract.file)
    if (result.error) {
      errors.push(result.error)
      continue
    }

    for (const token of contract.required) {
      if (!result.text.includes(token)) {
        errors.push(`${contract.file}: missing required marker: ${token}`)
      }
    }

    for (const token of contract.forbidden ?? []) {
      if (result.text.includes(token)) {
        errors.push(`${contract.file}: contains stale/forbidden marker: ${token}`)
      }
    }
  }

  return errors
}

export function validatePullRequest({ title = '', body = '' } = {}) {
  const errors = []
  const titlePattern = /^S\d+\.P[ABC]\s+—\s+.+/u

  if (!titlePattern.test(title.trim())) {
    errors.push('PR title must match: S{N}.P{A|B|C} — <bounded title>')
  }

  const requiredBodyMarkers = [
    'Master: #3',
    'Sprint:',
    'Run:',
    'PRE-SEED:',
    'Scope IN',
    'Scope OUT',
    'Acceptance criteria',
    'Validation receipts',
    'Exact reviewed head',
    'POC/FOC verdict',
    'POST-SEED:',
    STATELESS,
  ]

  for (const marker of requiredBodyMarkers) {
    if (!body.includes(marker)) {
      errors.push(`PR body missing required marker: ${marker}`)
    }
  }

  return errors
}

function printErrors(errors) {
  for (const error of errors) {
    console.error(`GOVERNANCE_FOC: ${error}`)
  }
}

function main() {
  const args = new Set(process.argv.slice(2))
  const errors = validateRepository(process.cwd())

  if (args.has('--pr-env')) {
    errors.push(
      ...validatePullRequest({
        title: process.env.PR_TITLE ?? '',
        body: process.env.PR_BODY ?? '',
      }),
    )
  }

  if (errors.length > 0) {
    printErrors(errors)
    console.error(`Governance validation failed with ${errors.length} error(s).`)
    process.exit(1)
  }

  console.log('Governance validation passed.')
}

const invokedDirectly = process.argv[1]
  && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url))

if (invokedDirectly) {
  main()
}
