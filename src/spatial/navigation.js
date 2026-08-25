import { getNetworkNode, networkNodes } from './network-model.js'

export const WORLD_LANE_PARAM = 'lane'
export const DEFAULT_WORLD_LANE = 'learn'

export const worldControlContract = Object.freeze({
  tap: 'select-district-and-push-history',
  pointer: 'camera-parallax-only-no-lane-mutation',
  scroll: 'document-anchor-only-no-lane-mutation',
  popstate: 'restore-district-without-history-push',
  deepLink: '?lane=<canonical-lane-id>',
  camera: 'derived-from-active-district-never-source-of-truth',
})

export const canonicalLaneIds = Object.freeze(networkNodes.map((node) => node.id))

export function isCanonicalLaneId(value) {
  return canonicalLaneIds.includes(value)
}

function toUrl(urlLike) {
  return new URL(urlLike, 'https://kopano.local')
}

export function readLaneFromUrl(urlLike, fallback = DEFAULT_WORLD_LANE) {
  const url = toUrl(urlLike)
  const lane = url.searchParams.get(WORLD_LANE_PARAM)
  return isCanonicalLaneId(lane) ? lane : fallback
}

export function withLaneInUrl(urlLike, lane) {
  if (!isCanonicalLaneId(lane)) {
    throw new Error(`Unknown world lane: ${lane}`)
  }

  const url = toUrl(urlLike)
  url.searchParams.set(WORLD_LANE_PARAM, lane)
  return `${url.pathname}${url.search}${url.hash}`
}

export function transitionWorldNavigation({ currentLane, currentUrl, event }) {
  if (event?.type === 'popstate') {
    return {
      lane: readLaneFromUrl(event.url ?? currentUrl),
      historyAction: 'none',
      nextUrl: null,
    }
  }

  if (event?.type === 'select') {
    if (!isCanonicalLaneId(event.lane) || event.lane === currentLane) {
      return { lane: currentLane, historyAction: 'none', nextUrl: null }
    }

    return {
      lane: event.lane,
      historyAction: 'push',
      nextUrl: withLaneInUrl(currentUrl, event.lane),
    }
  }

  return { lane: currentLane, historyAction: 'none', nextUrl: null }
}

export function cameraTargetForLane(laneId) {
  const node = getNetworkNode(isCanonicalLaneId(laneId) ? laneId : DEFAULT_WORLD_LANE)
  const [x, , z] = node.position

  return Object.freeze({
    lane: node.id,
    position: Object.freeze([
      x * 0.38,
      4.35,
      8.85 + z * 0.18,
    ]),
    lookAt: Object.freeze([
      x * 0.52,
      0.86,
      z * 0.52,
    ]),
  })
}
