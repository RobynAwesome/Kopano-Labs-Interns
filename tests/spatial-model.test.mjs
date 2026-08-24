import assert from 'node:assert/strict'
import test from 'node:test'

import {
  getRouteNodes,
  networkDistricts,
  networkNodes,
  networkRoutes,
  projectToStatic,
  spatialVocabulary,
} from '../src/spatial/network-model.js'

const laneOrder = ['learn', 'build', 'community', 'opportunity']
const requiredVocabulary = ['node', 'route', 'beacon', 'district', 'growth-mark']

test('spatial vocabulary contains every governed primitive', () => {
  for (const primitive of requiredVocabulary) {
    assert.ok(spatialVocabulary.includes(primitive), `missing ${primitive}`)
  }
})

test('network nodes preserve canonical journey order and unique identity', () => {
  assert.deepEqual(networkNodes.map((node) => node.id), laneOrder)
  assert.equal(new Set(networkNodes.map((node) => node.id)).size, networkNodes.length)
  for (const node of networkNodes) {
    assert.equal(node.kind, 'lane-anchor')
    assert.equal(node.position.length, 3)
    assert.ok(node.position.every(Number.isFinite))
    assert.match(node.tone, /^#[0-9a-f]{6}$/i)
  }
})

test('routes express only canonical forward journey relationships', () => {
  assert.deepEqual(
    networkRoutes.map((route) => [route.from, route.to]),
    [
      ['learn', 'build'],
      ['build', 'community'],
      ['community', 'opportunity'],
    ],
  )

  for (const route of networkRoutes) {
    assert.equal(route.kind, 'journey-relationship')
    assert.equal(route.direction, 'forward')
    assert.equal(route.completionSemantics, 'none')
    assert.equal(route.evidenceRequiredForProgression, true)
  }
})

test('every route endpoint resolves to a canonical node', () => {
  for (const route of networkRoutes) {
    const { from, to } = getRouteNodes(route)
    assert.equal(from.id, route.from)
    assert.equal(to.id, route.to)
    assert.notEqual(from.id, to.id)
  }
})

test('district identity maps one-to-one to canonical nodes', () => {
  assert.equal(networkDistricts.length, networkNodes.length)
  assert.deepEqual(
    networkDistricts.map((district) => district.nodeId),
    laneOrder,
  )
  assert.equal(new Set(networkDistricts.map((district) => district.id)).size, networkDistricts.length)
})

test('static projection preserves a finite representation of every node', () => {
  for (const node of networkNodes) {
    const point = projectToStatic(node.position)
    assert.equal(point.length, 2)
    assert.ok(point.every(Number.isFinite))
  }
})

test('spatial model contains no fabricated learner completion state', () => {
  const serialized = JSON.stringify({ networkNodes, networkRoutes, networkDistricts }).toLowerCase()
  assert.equal(serialized.includes('completed'), false)
  assert.equal(serialized.includes('completionsemantics":"complete'), false)
  assert.ok(networkRoutes.every((route) => route.completionSemantics === 'none'))
})
