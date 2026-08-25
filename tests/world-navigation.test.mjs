import assert from 'node:assert/strict'
import test from 'node:test'

import {
  DEFAULT_WORLD_LANE,
  cameraTargetForLane,
  canonicalLaneIds,
  isCanonicalLaneId,
  readLaneFromUrl,
  transitionWorldNavigation,
  withLaneInUrl,
  worldControlContract,
} from '../src/spatial/navigation.js'

const lanes = ['learn', 'build', 'community', 'opportunity']

test('canonical browser-addressable districts match governed journey lanes', () => {
  assert.deepEqual(canonicalLaneIds, lanes)
  for (const lane of lanes) assert.equal(isCanonicalLaneId(lane), true)
  assert.equal(isCanonicalLaneId('unknown'), false)
})

test('all canonical district deep links hydrate deterministically', () => {
  for (const lane of lanes) {
    assert.equal(readLaneFromUrl(`https://example.test/?lane=${lane}`), lane)
  }
})

test('invalid or missing deep link safely falls back to Learn', () => {
  assert.equal(readLaneFromUrl('https://example.test/?lane=garbage'), DEFAULT_WORLD_LANE)
  assert.equal(readLaneFromUrl('https://example.test/'), DEFAULT_WORLD_LANE)
})

test('setting lane preserves unrelated query and document anchor', () => {
  assert.equal(
    withLaneInUrl('https://example.test/?utm_source=proof#pathways', 'community'),
    '/?utm_source=proof&lane=community#pathways',
  )
})

test('selecting a new lane pushes one canonical history state', () => {
  assert.deepEqual(
    transitionWorldNavigation({
      currentLane: 'learn',
      currentUrl: 'https://example.test/?lane=learn#pathways',
      event: { type: 'select', lane: 'build' },
    }),
    {
      lane: 'build',
      historyAction: 'push',
      nextUrl: '/?lane=build#pathways',
    },
  )
})

test('reselecting current or invalid lane does not create duplicate history', () => {
  for (const lane of ['learn', 'invalid']) {
    assert.deepEqual(
      transitionWorldNavigation({
        currentLane: 'learn',
        currentUrl: 'https://example.test/?lane=learn',
        event: { type: 'select', lane },
      }),
      { lane: 'learn', historyAction: 'none', nextUrl: null },
    )
  }
})

test('popstate restores URL district without re-pushing history', () => {
  assert.deepEqual(
    transitionWorldNavigation({
      currentLane: 'community',
      currentUrl: 'https://example.test/?lane=community',
      event: { type: 'popstate', url: 'https://example.test/?lane=build' },
    }),
    { lane: 'build', historyAction: 'none', nextUrl: null },
  )
})

test('control contract keeps pointer and scroll out of lane mutation authority', () => {
  assert.equal(worldControlContract.pointer, 'camera-parallax-only-no-lane-mutation')
  assert.equal(worldControlContract.scroll, 'document-anchor-only-no-lane-mutation')
  assert.equal(worldControlContract.popstate, 'restore-district-without-history-push')
  assert.equal(worldControlContract.camera, 'derived-from-active-district-never-source-of-truth')
})

test('every canonical district has finite and distinct camera targets', () => {
  const targets = lanes.map((lane) => cameraTargetForLane(lane))
  assert.deepEqual(targets.map((target) => target.lane), lanes)

  for (const target of targets) {
    assert.equal(target.position.length, 3)
    assert.equal(target.lookAt.length, 3)
    assert.ok(target.position.every(Number.isFinite))
    assert.ok(target.lookAt.every(Number.isFinite))
  }

  assert.equal(new Set(targets.map((target) => target.position.join(','))).size, lanes.length)
  assert.equal(new Set(targets.map((target) => target.lookAt.join(','))).size, lanes.length)
})

test('unknown camera state resolves safely to Learn target', () => {
  assert.deepEqual(cameraTargetForLane('not-a-lane'), cameraTargetForLane('learn'))
})
