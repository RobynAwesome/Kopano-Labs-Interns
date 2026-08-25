const VIDEO_ID_PATTERN = /^[A-Za-z0-9_-]{11}$/
const CHANNEL_ID_PATTERN = /^UC[A-Za-z0-9_-]{22}$/

function nonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0
}

function validTimestamp(value) {
  return nonEmptyString(value) && Number.isFinite(Date.parse(value))
}

function validHttpsUrl(value) {
  if (!nonEmptyString(value)) return false
  try {
    return new URL(value).protocol === 'https:'
  } catch {
    return false
  }
}

function extractVideoId(raw) {
  if (typeof raw?.id === 'string') return raw.id
  if (typeof raw?.id?.videoId === 'string') return raw.id.videoId
  return null
}

function normalizeThumbnails(thumbnails) {
  if (!thumbnails || typeof thumbnails !== 'object') return []

  return Object.entries(thumbnails)
    .map(([variant, value]) => ({
      variant,
      url: value?.url,
      width: Number.isFinite(Number(value?.width)) ? Number(value.width) : null,
      height: Number.isFinite(Number(value?.height)) ? Number(value.height) : null,
      admissionState: 'unadmitted',
    }))
    .filter((candidate) => validHttpsUrl(candidate.url))
}

export function adaptYouTubeReference(raw) {
  const videoId = extractVideoId(raw)
  const snippet = raw?.snippet
  const errors = []

  if (!VIDEO_ID_PATTERN.test(videoId ?? '')) errors.push('video id must be canonical 11-character YouTube id')
  if (!snippet || typeof snippet !== 'object' || Array.isArray(snippet)) errors.push('snippet metadata required')
  if (!nonEmptyString(snippet?.title)) errors.push('snippet.title required')
  if (!nonEmptyString(snippet?.channelTitle)) errors.push('snippet.channelTitle required')
  if (!CHANNEL_ID_PATTERN.test(snippet?.channelId ?? '')) errors.push('snippet.channelId must be canonical YouTube channel id')
  if (!validTimestamp(snippet?.publishedAt)) errors.push('snippet.publishedAt must be valid timestamp')

  if (errors.length > 0) {
    throw new Error(`YOUTUBE_ADAPTER_FOC:\n- ${errors.join('\n- ')}`)
  }

  const canonicalUrl = `https://www.youtube.com/watch?v=${videoId}`
  const ownerUrl = `https://www.youtube.com/channel/${snippet.channelId}`
  const thumbnailCandidates = normalizeThumbnails(snippet.thumbnails)

  return Object.freeze({
    provider: 'youtube',
    externalVideoId: videoId,
    externalChannelId: snippet.channelId,
    title: snippet.title.trim(),
    description: typeof snippet.description === 'string' ? snippet.description : '',
    sourcePublishedAt: new Date(snippet.publishedAt).toISOString(),
    canonicalUrl,
    ownerUrl,
    provenance: Object.freeze({
      sourceId: 'youtube',
      relationship: 'external-reference',
      owner: snippet.channelTitle.trim(),
      canonicalUrl,
      rights: Object.freeze({
        assertion: 'reference-only',
        license: null,
      }),
      attribution: Object.freeze({
        required: true,
        text: `${snippet.channelTitle.trim()} · YouTube`,
      }),
      verifiedAt: null,
      evidenceUrl: null,
    }),
    media: Object.freeze({
      provider: 'youtube',
      externalId: videoId,
      canonicalUrl,
      admissionState: 'unadmitted',
      thumbnailCandidates: Object.freeze(thumbnailCandidates.map((candidate) => Object.freeze(candidate))),
    }),
  })
}

export function isCanonicalYouTubeVideoId(value) {
  return VIDEO_ID_PATTERN.test(value ?? '')
}
