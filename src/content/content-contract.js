export const CONTENT_TYPES = Object.freeze(['lesson', 'article', 'video', 'resource'])
export const CONTENT_DEPTHS = Object.freeze(['GLANCE', 'LEARN', 'BUILD'])
export const CONTENT_LIFECYCLE_STATES = Object.freeze(['draft', 'published', 'archived'])
export const RESUME_STRATEGIES = Object.freeze(['restart-safe', 'position-aware', 'external-platform'])
export const SOURCE_RELATIONSHIPS = Object.freeze([
  'repository-owned',
  'explicitly-licensed',
  'public-domain',
  'documented-partner-provided',
  'external-reference',
])
export const RIGHTS_ASSERTIONS = Object.freeze([
  'owned',
  'licensed',
  'public-domain',
  'partner-provided',
  'reference-only',
])

export const contentContract = Object.freeze({
  schema: 'kln.content.v1',
  contentTypes: CONTENT_TYPES,
  depths: CONTENT_DEPTHS,
  lifecycleStates: CONTENT_LIFECYCLE_STATES,
  resumeStrategies: RESUME_STRATEGIES,
  sourceRelationships: SOURCE_RELATIONSHIPS,
  depthObligations: Object.freeze({
    GLANCE: Object.freeze(['nextAction']),
    LEARN: Object.freeze(['learningObjective', 'resumeStrategy']),
    BUILD: Object.freeze(['buildTransition.expectedArtifact', 'buildTransition.acceptanceCondition', 'buildTransition.receiptPath']),
  }),
  publicationLaw: Object.freeze({
    publicCoreVisibility: 'public',
    publishedRequiresVerifiedProvenance: true,
    buildCompletionAuthority: 'receipt-required',
    externalMediaNormalizedIsNotAdmitted: true,
    providerNameDoesNotImplyEndorsement: true,
  }),
})

const RELATIONSHIP_RIGHTS = Object.freeze({
  'repository-owned': 'owned',
  'explicitly-licensed': 'licensed',
  'public-domain': 'public-domain',
  'documented-partner-provided': 'partner-provided',
  'external-reference': 'reference-only',
})

const FORBIDDEN_UNPROVEN_KEYS = new Set([
  'views',
  'viewCount',
  'completion',
  'completed',
  'completionRate',
  'endorsement',
  'partner',
  'partnership',
])

const ID_PATTERN = /^[a-z0-9][a-z0-9:._-]{2,95}$/

function nonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0
}

function validId(value) {
  return nonEmptyString(value) && ID_PATTERN.test(value)
}

function parseTimestamp(value) {
  if (!nonEmptyString(value)) return null
  const parsed = Date.parse(value)
  return Number.isFinite(parsed) ? parsed : null
}

function validHttpsUrl(value) {
  if (!nonEmptyString(value)) return false
  try {
    const url = new URL(value)
    return url.protocol === 'https:'
  } catch {
    return false
  }
}

function validPublicHref(value) {
  if (!nonEmptyString(value)) return false
  if (value.startsWith('/')) return true
  return validHttpsUrl(value)
}

function scanForbiddenKeys(value, path, errors) {
  if (!value || typeof value !== 'object') return
  if (Array.isArray(value)) {
    value.forEach((entry, index) => scanForbiddenKeys(entry, `${path}[${index}]`, errors))
    return
  }

  for (const [key, nested] of Object.entries(value)) {
    if (FORBIDDEN_UNPROVEN_KEYS.has(key)) {
      errors.push(`${path}.${key}: unsupported unproven metric/completion/relationship claim`)
    }
    scanForbiddenKeys(nested, `${path}.${key}`, errors)
  }
}

function validateProvenance(provenance, errors) {
  if (!provenance || typeof provenance !== 'object' || Array.isArray(provenance)) {
    errors.push('provenance: required object')
    return
  }

  if (!validId(provenance.sourceId)) errors.push('provenance.sourceId: stable source id required')
  if (!SOURCE_RELATIONSHIPS.includes(provenance.relationship)) {
    errors.push('provenance.relationship: unsupported relationship')
  }
  if (!nonEmptyString(provenance.owner)) errors.push('provenance.owner: explicit owner required')

  const expectedRights = RELATIONSHIP_RIGHTS[provenance.relationship]
  if (!provenance.rights || typeof provenance.rights !== 'object' || Array.isArray(provenance.rights)) {
    errors.push('provenance.rights: required object')
  } else {
    if (!RIGHTS_ASSERTIONS.includes(provenance.rights.assertion)) {
      errors.push('provenance.rights.assertion: unsupported rights assertion')
    } else if (expectedRights && provenance.rights.assertion !== expectedRights) {
      errors.push(`provenance.rights.assertion: ${provenance.relationship} requires ${expectedRights}`)
    }

    if (provenance.relationship === 'explicitly-licensed' && !nonEmptyString(provenance.rights.license)) {
      errors.push('provenance.rights.license: explicitly licensed content requires licence text/id')
    }
    if (provenance.relationship === 'public-domain' && provenance.rights.license !== 'public-domain') {
      errors.push('provenance.rights.license: public-domain content must state public-domain')
    }
    if (provenance.relationship === 'external-reference' && provenance.rights.license != null) {
      errors.push('provenance.rights.license: external reference must not invent a licence')
    }
  }

  if (provenance.relationship !== 'repository-owned' && !validHttpsUrl(provenance.canonicalUrl)) {
    errors.push('provenance.canonicalUrl: external source requires canonical HTTPS URL')
  } else if (provenance.canonicalUrl != null && !validHttpsUrl(provenance.canonicalUrl)) {
    errors.push('provenance.canonicalUrl: must be HTTPS when supplied')
  }

  if (provenance.relationship === 'documented-partner-provided' && !validHttpsUrl(provenance.evidenceUrl)) {
    errors.push('provenance.evidenceUrl: partner-provided relationship requires HTTPS evidence URL')
  } else if (provenance.evidenceUrl != null && !validHttpsUrl(provenance.evidenceUrl)) {
    errors.push('provenance.evidenceUrl: must be HTTPS when supplied')
  }

  if (!provenance.attribution || typeof provenance.attribution !== 'object' || Array.isArray(provenance.attribution)) {
    errors.push('provenance.attribution: required object')
  } else if (provenance.attribution.required === true && !nonEmptyString(provenance.attribution.text)) {
    errors.push('provenance.attribution.text: required when attribution is required')
  }

  if (provenance.verifiedAt != null && parseTimestamp(provenance.verifiedAt) == null) {
    errors.push('provenance.verifiedAt: must be null or ISO-compatible timestamp')
  }
}

function validateLifecycle(lifecycle, provenance, errors) {
  if (!lifecycle || typeof lifecycle !== 'object' || Array.isArray(lifecycle)) {
    errors.push('lifecycle: required object')
    return
  }

  if (!CONTENT_LIFECYCLE_STATES.includes(lifecycle.state)) {
    errors.push('lifecycle.state: unsupported lifecycle state')
    return
  }

  const createdAt = parseTimestamp(lifecycle.createdAt)
  const updatedAt = parseTimestamp(lifecycle.updatedAt)
  const publishedAt = lifecycle.publishedAt == null ? null : parseTimestamp(lifecycle.publishedAt)
  const archivedAt = lifecycle.archivedAt == null ? null : parseTimestamp(lifecycle.archivedAt)

  if (createdAt == null) errors.push('lifecycle.createdAt: valid timestamp required')
  if (updatedAt == null) errors.push('lifecycle.updatedAt: valid timestamp required')
  if (createdAt != null && updatedAt != null && updatedAt < createdAt) {
    errors.push('lifecycle.updatedAt: cannot precede createdAt')
  }

  if (lifecycle.state === 'draft') {
    if (lifecycle.publishedAt != null) errors.push('lifecycle.publishedAt: draft must not claim publication')
    if (lifecycle.archivedAt != null) errors.push('lifecycle.archivedAt: draft must not claim archive state')
    if (lifecycle.archiveReason != null) errors.push('lifecycle.archiveReason: draft must not claim archive reason')
  }

  if (lifecycle.state === 'published') {
    if (publishedAt == null) errors.push('lifecycle.publishedAt: published content requires timestamp')
    if (lifecycle.archivedAt != null) errors.push('lifecycle.archivedAt: published content cannot also be archived')
    if (lifecycle.archiveReason != null) errors.push('lifecycle.archiveReason: published content cannot carry archive reason')
    if (parseTimestamp(provenance?.verifiedAt) == null) {
      errors.push('provenance.verifiedAt: published content requires verified provenance')
    }
  }

  if (lifecycle.state === 'archived') {
    if (archivedAt == null) errors.push('lifecycle.archivedAt: archived content requires timestamp')
    if (!nonEmptyString(lifecycle.archiveReason)) {
      errors.push('lifecycle.archiveReason: archived content requires reason')
    }
  }

  if (createdAt != null && publishedAt != null && publishedAt < createdAt) {
    errors.push('lifecycle.publishedAt: cannot precede createdAt')
  }
  if (publishedAt != null && updatedAt != null && updatedAt < publishedAt) {
    errors.push('lifecycle.updatedAt: cannot precede publishedAt')
  }
  if (createdAt != null && archivedAt != null && archivedAt < createdAt) {
    errors.push('lifecycle.archivedAt: cannot precede createdAt')
  }
  if (publishedAt != null && archivedAt != null && archivedAt < publishedAt) {
    errors.push('lifecycle.archivedAt: cannot precede publishedAt')
  }
  if (archivedAt != null && updatedAt != null && updatedAt < archivedAt) {
    errors.push('lifecycle.updatedAt: cannot precede archivedAt')
  }
}

function validateDepth(item, errors) {
  const meta = item.depthMeta
  if (!meta || typeof meta !== 'object' || Array.isArray(meta)) {
    errors.push('depthMeta: required object')
    return
  }

  if (item.depth === 'GLANCE') {
    if (!nonEmptyString(meta.nextAction)) errors.push('depthMeta.nextAction: GLANCE requires clear next action')
  }

  if (item.depth === 'LEARN') {
    if (!nonEmptyString(meta.learningObjective)) {
      errors.push('depthMeta.learningObjective: LEARN requires learning objective')
    }
    if (!RESUME_STRATEGIES.includes(meta.resumeStrategy)) {
      errors.push('depthMeta.resumeStrategy: LEARN requires governed resume strategy')
    }
  }

  if (item.depth === 'BUILD') {
    const build = meta.buildTransition
    if (!build || typeof build !== 'object' || Array.isArray(build)) {
      errors.push('depthMeta.buildTransition: BUILD requires explicit build transition')
      return
    }
    if (!nonEmptyString(build.expectedArtifact)) {
      errors.push('depthMeta.buildTransition.expectedArtifact: BUILD requires expected artefact')
    }
    if (!nonEmptyString(build.acceptanceCondition)) {
      errors.push('depthMeta.buildTransition.acceptanceCondition: BUILD requires acceptance condition')
    }
    if (!nonEmptyString(build.receiptPath)) {
      errors.push('depthMeta.buildTransition.receiptPath: BUILD requires receipt path')
    }
    if (build.completionAuthority !== 'receipt-required') {
      errors.push('depthMeta.buildTransition.completionAuthority: must be receipt-required')
    }
  }
}

function validateTypeSpecific(item, errors) {
  if (item.type === 'video') {
    if (!item.media || typeof item.media !== 'object' || Array.isArray(item.media)) {
      errors.push('media: video requires media reference')
    } else {
      if (!nonEmptyString(item.media.provider)) errors.push('media.provider: required')
      if (!nonEmptyString(item.media.externalId)) errors.push('media.externalId: required')
      if (!validHttpsUrl(item.media.canonicalUrl)) errors.push('media.canonicalUrl: HTTPS URL required')
      if (item.media.admissionState !== 'unadmitted') {
        errors.push('media.admissionState: S2.PA external media must remain unadmitted')
      }
    }
  }

  if (item.type === 'resource') {
    if (!item.resource || typeof item.resource !== 'object' || Array.isArray(item.resource)) {
      errors.push('resource: resource content requires resource reference')
    } else {
      if (!validPublicHref(item.resource.href)) errors.push('resource.href: public relative or HTTPS href required')
      if (!nonEmptyString(item.resource.format)) errors.push('resource.format: required')
    }
  }
}

export function validateContentItem(item) {
  const errors = []

  if (!item || typeof item !== 'object' || Array.isArray(item)) {
    return ['content: required object']
  }

  scanForbiddenKeys(item, 'content', errors)

  if (!validId(item.id)) errors.push('id: stable lowercase content id required')
  if (!CONTENT_TYPES.includes(item.type)) errors.push('type: unsupported content type')
  if (!CONTENT_DEPTHS.includes(item.depth)) errors.push('depth: unsupported content depth')
  if (!nonEmptyString(item.title)) errors.push('title: required')
  if (!nonEmptyString(item.summary)) errors.push('summary: required')
  if (item.access !== 'public') errors.push('access: public learning core content must be public')

  validateProvenance(item.provenance, errors)
  validateLifecycle(item.lifecycle, item.provenance, errors)
  validateDepth(item, errors)
  validateTypeSpecific(item, errors)

  return errors
}

export function assertContentItem(item) {
  const errors = validateContentItem(item)
  if (errors.length > 0) {
    throw new Error(`CONTENT_CONTRACT_FOC:\n- ${errors.join('\n- ')}`)
  }
  return item
}

export function isContentItemValid(item) {
  return validateContentItem(item).length === 0
}
