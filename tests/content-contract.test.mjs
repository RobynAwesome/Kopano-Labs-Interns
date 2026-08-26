import test from 'node:test'
import assert from 'node:assert/strict'
import {
  CONTENT_DEPTHS,
  CONTENT_LIFECYCLE_STATES,
  CONTENT_TYPES,
  RESUME_STRATEGIES,
  RIGHTS_ASSERTIONS,
  SOURCE_RELATIONSHIPS,
  assertContentItem,
  contentContract,
  isContentItemValid,
  validateContentItem,
} from '../src/content/content-contract.js'
import { adaptYouTubeReference, isCanonicalYouTubeVideoId } from '../src/content/youtube-reference.js'

function ownedProvenance(overrides = {}) {
  return {
    sourceId: 'kopano-labs',
    relationship: 'repository-owned',
    owner: 'Kopano Labs',
    canonicalUrl: null,
    rights: { assertion: 'owned', license: null },
    attribution: { required: false, text: null },
    verifiedAt: '2026-08-26T00:00:00.000Z',
    evidenceUrl: null,
    ...overrides,
  }
}

function publishedLifecycle(overrides = {}) {
  return {
    state: 'published',
    createdAt: '2026-08-25T20:00:00.000Z',
    updatedAt: '2026-08-26T00:10:00.000Z',
    publishedAt: '2026-08-26T00:05:00.000Z',
    archivedAt: null,
    archiveReason: null,
    ...overrides,
  }
}

function draftLifecycle(overrides = {}) {
  return {
    state: 'draft',
    createdAt: '2026-08-25T20:00:00.000Z',
    updatedAt: '2026-08-25T20:10:00.000Z',
    publishedAt: null,
    archivedAt: null,
    archiveReason: null,
    ...overrides,
  }
}

function validLearn(overrides = {}) {
  return {
    id: 'fixture-learn-001',
    type: 'lesson',
    depth: 'LEARN',
    title: 'Synthetic contract fixture',
    summary: 'Synthetic data used only to prove the content contract.',
    access: 'public',
    depthMeta: {
      learningObjective: 'Prove that LEARN requires a learning objective.',
      resumeStrategy: 'restart-safe',
    },
    provenance: ownedProvenance(),
    lifecycle: publishedLifecycle(),
    ...overrides,
  }
}

function validExternalGlance(overrides = {}) {
  return {
    id: 'fixture-glance-001',
    type: 'article',
    depth: 'GLANCE',
    title: 'Synthetic external reference',
    summary: 'Synthetic external reference fixture.',
    access: 'public',
    depthMeta: { nextAction: 'Open the referenced source.' },
    provenance: {
      sourceId: 'external-fixture',
      relationship: 'external-reference',
      owner: 'Synthetic Source',
      canonicalUrl: 'https://source.invalid/article',
      rights: { assertion: 'reference-only', license: null },
      attribution: { required: true, text: 'Synthetic Source' },
      verifiedAt: null,
      evidenceUrl: null,
    },
    lifecycle: draftLifecycle(),
    ...overrides,
  }
}

function validBuild(overrides = {}) {
  return validLearn({
    id: 'fixture-build-001',
    depth: 'BUILD',
    depthMeta: {
      buildTransition: {
        expectedArtifact: 'A synthetic proof artefact.',
        acceptanceCondition: 'Artefact satisfies the synthetic validator.',
        receiptPath: '/proof/fixture-build-001',
        completionAuthority: 'receipt-required',
      },
    },
    ...overrides,
  })
}

const youtubeRaw = {
  id: 'dQw4w9WgXcQ',
  snippet: {
    title: 'Synthetic YouTube Metadata Fixture',
    description: 'Used only to test normalization boundaries.',
    channelTitle: 'Synthetic Channel',
    channelId: 'UC_x5XG1OV2P6uZZ5FSM9Ttw',
    publishedAt: '2026-08-20T10:00:00Z',
    thumbnails: {
      default: {
        url: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/default.jpg',
        width: 120,
        height: 90,
      },
      invalid: {
        url: 'http://insecure.invalid/thumb.jpg',
        width: 320,
        height: 180,
      },
    },
  },
  statistics: { viewCount: '999999999', likeCount: '999999' },
  contentDetails: { duration: 'PT42M' },
}

test('canonical content vocabulary is closed and explicit', () => {
  assert.deepEqual(CONTENT_TYPES, ['lesson', 'article', 'video', 'resource'])
  assert.deepEqual(CONTENT_DEPTHS, ['GLANCE', 'LEARN', 'BUILD'])
  assert.deepEqual(CONTENT_LIFECYCLE_STATES, ['draft', 'published', 'archived'])
  assert.deepEqual(RESUME_STRATEGIES, ['restart-safe', 'position-aware', 'external-platform'])
  assert.deepEqual(SOURCE_RELATIONSHIPS, [
    'repository-owned',
    'explicitly-licensed',
    'public-domain',
    'documented-partner-provided',
    'external-reference',
  ])
  assert.deepEqual(RIGHTS_ASSERTIONS, ['owned', 'licensed', 'public-domain', 'partner-provided', 'reference-only'])
  assert.equal(contentContract.publicationLaw.providerNameDoesNotImplyEndorsement, true)
})

test('valid first-party published LEARN content passes', () => {
  const item = validLearn()
  assert.equal(isContentItemValid(item), true)
  assert.equal(assertContentItem(item), item)
})

test('valid external-reference GLANCE draft passes without inventing licence', () => {
  const item = validExternalGlance()
  assert.equal(isContentItemValid(item), true)
  assert.equal(item.provenance.rights.license, null)
})

test('valid BUILD content passes only with explicit receipt-required transition', () => {
  assert.equal(isContentItemValid(validBuild()), true)
})

test('unknown type depth and lifecycle state are rejected', () => {
  const errors = validateContentItem(validLearn({
    type: 'livestream',
    depth: 'MASTERED',
    lifecycle: publishedLifecycle({ state: 'promoted' }),
  }))
  assert.ok(errors.some((error) => error.includes('type: unsupported')))
  assert.ok(errors.some((error) => error.includes('depth: unsupported')))
  assert.ok(errors.some((error) => error.includes('lifecycle.state: unsupported')))
})

test('identity title summary and public-core access are mandatory', () => {
  const errors = validateContentItem(validLearn({ id: 'INVALID ID', title: '', summary: ' ', access: 'login-required' }))
  assert.ok(errors.some((error) => error.startsWith('id:')))
  assert.ok(errors.some((error) => error.startsWith('title:')))
  assert.ok(errors.some((error) => error.startsWith('summary:')))
  assert.ok(errors.some((error) => error.startsWith('access:')))
})

test('GLANCE without a clear next action is rejected', () => {
  const errors = validateContentItem(validExternalGlance({ depthMeta: {} }))
  assert.ok(errors.some((error) => error.includes('GLANCE requires clear next action')))
})

test('LEARN without learning objective or resume strategy is rejected', () => {
  const errors = validateContentItem(validLearn({ depthMeta: {} }))
  assert.ok(errors.some((error) => error.includes('LEARN requires learning objective')))
  assert.ok(errors.some((error) => error.includes('LEARN requires governed resume strategy')))
})

test('BUILD without artefact acceptance receipt path and receipt authority is rejected', () => {
  const errors = validateContentItem(validBuild({
    depthMeta: { buildTransition: { expectedArtifact: '', acceptanceCondition: '', receiptPath: '', completionAuthority: 'self-asserted' } },
  }))
  assert.ok(errors.some((error) => error.includes('expected artefact')))
  assert.ok(errors.some((error) => error.includes('acceptance condition')))
  assert.ok(errors.some((error) => error.includes('receipt path')))
  assert.ok(errors.some((error) => error.includes('receipt-required')))
})

test('unsupported metric completion endorsement and partnership claim keys are rejected', () => {
  for (const key of ['views', 'viewCount', 'completion', 'completed', 'completionRate', 'endorsement', 'partner', 'partnership']) {
    const errors = validateContentItem(validLearn({ [key]: key === 'completed' ? true : 'synthetic' }))
    assert.ok(errors.some((error) => error.includes(`.${key}: unsupported`)), key)
  }
})

test('published state requires publication timestamp and verified provenance', () => {
  const errors = validateContentItem(validLearn({
    provenance: ownedProvenance({ verifiedAt: null }),
    lifecycle: publishedLifecycle({ publishedAt: null }),
  }))
  assert.ok(errors.some((error) => error.includes('published content requires timestamp')))
  assert.ok(errors.some((error) => error.includes('published content requires verified provenance')))
})

test('archived state requires archive timestamp and explicit reason', () => {
  const errors = validateContentItem(validLearn({
    lifecycle: publishedLifecycle({ state: 'archived', archivedAt: null, archiveReason: null }),
  }))
  assert.ok(errors.some((error) => error.includes('archived content requires timestamp')))
  assert.ok(errors.some((error) => error.includes('archived content requires reason')))
})

test('impossible lifecycle timestamp ordering is rejected', () => {
  const errors = validateContentItem(validLearn({
    lifecycle: publishedLifecycle({
      createdAt: '2026-08-26T00:10:00Z',
      publishedAt: '2026-08-26T00:05:00Z',
      updatedAt: '2026-08-26T00:04:00Z',
    }),
  }))
  assert.ok(errors.some((error) => error.includes('updatedAt: cannot precede createdAt')))
  assert.ok(errors.some((error) => error.includes('publishedAt: cannot precede createdAt')))
  assert.ok(errors.some((error) => error.includes('updatedAt: cannot precede publishedAt')))
})

test('external reference requires explicit owner canonical HTTPS source and reference-only rights', () => {
  const errors = validateContentItem(validExternalGlance({
    provenance: {
      ...validExternalGlance().provenance,
      owner: '',
      canonicalUrl: 'http://source.invalid/article',
      rights: { assertion: 'owned', license: 'invented' },
    },
  }))
  assert.ok(errors.some((error) => error.includes('explicit owner required')))
  assert.ok(errors.some((error) => error.includes('canonical HTTPS URL')))
  assert.ok(errors.some((error) => error.includes('external-reference requires reference-only')))
  assert.ok(errors.some((error) => error.includes('must not invent a licence')))
})

test('explicitly licensed provenance requires a real licence assertion', () => {
  const errors = validateContentItem(validExternalGlance({
    provenance: {
      ...validExternalGlance().provenance,
      relationship: 'explicitly-licensed',
      rights: { assertion: 'licensed', license: '' },
    },
  }))
  assert.ok(errors.some((error) => error.includes('requires licence text/id')))
})

test('documented partner-provided provenance requires evidence URL rather than name inference', () => {
  const errors = validateContentItem(validExternalGlance({
    provenance: {
      ...validExternalGlance().provenance,
      relationship: 'documented-partner-provided',
      rights: { assertion: 'partner-provided', license: null },
      evidenceUrl: null,
    },
  }))
  assert.ok(errors.some((error) => error.includes('partner-provided relationship requires HTTPS evidence URL')))
})

test('required attribution without attribution text is rejected', () => {
  const errors = validateContentItem(validExternalGlance({
    provenance: {
      ...validExternalGlance().provenance,
      attribution: { required: true, text: '' },
    },
  }))
  assert.ok(errors.some((error) => error.includes('required when attribution is required')))
})

test('video content requires unadmitted external media reference in S2.PA', () => {
  const noMedia = validateContentItem(validLearn({ type: 'video' }))
  assert.ok(noMedia.some((error) => error.includes('video requires media reference')))

  const admitted = validateContentItem(validLearn({
    type: 'video',
    media: {
      provider: 'youtube',
      externalId: 'dQw4w9WgXcQ',
      canonicalUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      admissionState: 'admitted',
    },
  }))
  assert.ok(admitted.some((error) => error.includes('must remain unadmitted')))
})

test('resource content requires public href and explicit format', () => {
  const errors = validateContentItem(validLearn({
    type: 'resource',
    resource: { href: 'ftp://source.invalid/file', format: '' },
  }))
  assert.ok(errors.some((error) => error.includes('public relative or HTTPS href required')))
  assert.ok(errors.some((error) => error.includes('resource.format: required')))
})

test('YouTube adapter normalizes identity and provenance but does not publish or infer claims', () => {
  const adapted = adaptYouTubeReference(youtubeRaw)

  assert.equal(adapted.provider, 'youtube')
  assert.equal(adapted.externalVideoId, 'dQw4w9WgXcQ')
  assert.equal(adapted.externalChannelId, 'UC_x5XG1OV2P6uZZ5FSM9Ttw')
  assert.equal(adapted.canonicalUrl, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ')
  assert.equal(adapted.provenance.relationship, 'external-reference')
  assert.equal(adapted.provenance.owner, 'Synthetic Channel')
  assert.equal(adapted.provenance.rights.assertion, 'reference-only')
  assert.equal(adapted.provenance.rights.license, null)
  assert.equal(adapted.provenance.verifiedAt, null)
  assert.equal(adapted.media.admissionState, 'unadmitted')

  for (const forbidden of ['depth', 'lifecycle', 'views', 'viewCount', 'statistics', 'duration', 'contentDetails', 'partnership', 'endorsement']) {
    assert.equal(Object.hasOwn(adapted, forbidden), false, forbidden)
  }
})

test('YouTube thumbnail candidates remain unadmitted and insecure candidates are dropped', () => {
  const adapted = adaptYouTubeReference(youtubeRaw)
  assert.equal(adapted.media.thumbnailCandidates.length, 1)
  assert.equal(adapted.media.thumbnailCandidates[0].variant, 'default')
  assert.equal(adapted.media.thumbnailCandidates[0].admissionState, 'unadmitted')
  assert.ok(adapted.media.thumbnailCandidates[0].url.startsWith('https://'))
})

test('YouTube adapter rejects malformed video channel and publication identity', () => {
  assert.equal(isCanonicalYouTubeVideoId('dQw4w9WgXcQ'), true)
  assert.equal(isCanonicalYouTubeVideoId('bad'), false)

  assert.throws(() => adaptYouTubeReference({ ...youtubeRaw, id: 'bad' }), /YOUTUBE_ADAPTER_FOC/)
  assert.throws(() => adaptYouTubeReference({
    ...youtubeRaw,
    snippet: { ...youtubeRaw.snippet, channelId: 'bad-channel' },
  }), /YOUTUBE_ADAPTER_FOC/)
  assert.throws(() => adaptYouTubeReference({
    ...youtubeRaw,
    snippet: { ...youtubeRaw.snippet, publishedAt: 'not-a-date' },
  }), /YOUTUBE_ADAPTER_FOC/)
  assert.throws(() => adaptYouTubeReference({ id: 'dQw4w9WgXcQ', snippet: null }), /YOUTUBE_ADAPTER_FOC/)
})

test('normalized YouTube reference becomes valid content only after editorial depth/lifecycle admission', () => {
  const adapted = adaptYouTubeReference(youtubeRaw)
  const item = validLearn({
    id: 'fixture-video-001',
    type: 'video',
    media: adapted.media,
    provenance: {
      ...adapted.provenance,
      verifiedAt: '2026-08-26T00:00:00Z',
    },
  })

  assert.equal(isContentItemValid(item), true)
})
