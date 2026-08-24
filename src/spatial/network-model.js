import { worldLanes } from '../data/lanes.js'

export const spatialVocabulary = Object.freeze([
  'node',
  'route',
  'beacon',
  'district',
  'growth-mark',
])

export const networkNodes = Object.freeze(
  worldLanes.map((lane) => Object.freeze({
    id: lane.id,
    index: lane.index,
    label: lane.label,
    title: lane.title,
    description: lane.description,
    proof: lane.proof,
    tone: lane.tone,
    position: Object.freeze([...lane.position]),
    districtId: `${lane.id}-district`,
    kind: 'lane-anchor',
  })),
)

const journeyPairs = [
  ['learn', 'build'],
  ['build', 'community'],
  ['community', 'opportunity'],
]

export const networkRoutes = Object.freeze(
  journeyPairs.map(([from, to], index) => Object.freeze({
    id: `${from}-to-${to}`,
    index: index + 1,
    from,
    to,
    kind: 'journey-relationship',
    direction: 'forward',
    completionSemantics: 'none',
    evidenceRequiredForProgression: true,
  })),
)

export const networkDistricts = Object.freeze(
  networkNodes.map((node) => Object.freeze({
    id: node.districtId,
    nodeId: node.id,
    label: `${node.label} district`,
    tone: node.tone,
    position: node.position,
    kind: 'stable-lane-group',
  })),
)

export function getNetworkNode(id) {
  return networkNodes.find((node) => node.id === id) ?? networkNodes[0]
}

export function getRouteNodes(route) {
  return {
    from: getNetworkNode(route.from),
    to: getNetworkNode(route.to),
  }
}

export function projectToStatic(position) {
  return Object.freeze([position[0], -position[2]])
}

export function routeMidpoint(route) {
  const { from, to } = getRouteNodes(route)
  return Object.freeze([
    (from.position[0] + to.position[0]) / 2,
    (from.position[1] + to.position[1]) / 2,
    (from.position[2] + to.position[2]) / 2,
  ])
}

export function isRouteActive(route, activeLane) {
  return route.from === activeLane || route.to === activeLane
}
