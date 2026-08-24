import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { getRouteNodes, isRouteActive, routeMidpoint } from '../../spatial/network-model.js'

export function KopanoDistrict({ district, active = false }) {
  return (
    <group position={district.position}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.024, 0]}>
        <ringGeometry args={[active ? 0.88 : 0.7, active ? 0.94 : 0.75, 48]} />
        <meshBasicMaterial color={district.tone} transparent opacity={active ? 0.34 : 0.14} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.012, 0]}>
        <circleGeometry args={[active ? 0.86 : 0.68, 40]} />
        <meshBasicMaterial color={district.tone} transparent opacity={active ? 0.055 : 0.022} depthWrite={false} />
      </mesh>
    </group>
  )
}

export function KopanoNode({ node, index, active, profile }) {
  const group = useRef()

  useFrame((state) => {
    if (!group.current) return

    const elapsed = state.clock.getElapsedTime()
    const reveal = profile.reducedMotion
      ? 1
      : THREE.MathUtils.clamp((elapsed - index * 0.22) / 1.15, 0.08, 1)
    const targetScale = active ? 1.13 : 1

    group.current.scale.y = THREE.MathUtils.lerp(group.current.scale.y, reveal * targetScale, 0.08)
    group.current.scale.x = THREE.MathUtils.lerp(group.current.scale.x, targetScale, 0.08)
    group.current.scale.z = THREE.MathUtils.lerp(group.current.scale.z, targetScale, 0.08)

    if (!profile.reducedMotion) {
      group.current.position.y = Math.sin(elapsed * 0.7 + index) * 0.045
    }
  })

  return (
    <group ref={group} position={node.position} scale={[1, 0.08, 1]}>
      <mesh castShadow={profile.tier === 'full'} position={[0, 0.8, 0]}>
        <cylinderGeometry args={[0.34, 0.52, 1.6, 12]} />
        <meshStandardMaterial
          color={node.tone}
          roughness={0.52}
          metalness={0.06}
          emissive={node.tone}
          emissiveIntensity={active ? 0.19 : 0.035}
        />
      </mesh>

      <mesh position={[0, 1.72, 0]}>
        <octahedronGeometry args={[active ? 0.31 : 0.24, 0]} />
        <meshStandardMaterial
          color="#f7fff9"
          emissive={node.tone}
          emissiveIntensity={active ? 1.35 : 0.62}
          roughness={0.38}
        />
      </mesh>
    </group>
  )
}

export function KopanoBeacon({ node, index, active, reducedMotion }) {
  const halo = useRef()

  useFrame((state) => {
    if (!halo.current || reducedMotion) return
    const elapsed = state.clock.getElapsedTime()
    halo.current.rotation.z = elapsed * (active ? 0.7 : 0.28) + index
  })

  return (
    <group position={node.position}>
      <mesh ref={halo} position={[0, 1.72, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[active ? 0.55 : 0.42, 0.018, 6, 42]} />
        <meshBasicMaterial color={node.tone} transparent opacity={active ? 0.95 : 0.3} />
      </mesh>
      <mesh position={[0, 1.72, 0]}>
        <ringGeometry args={[active ? 0.66 : 0.52, active ? 0.675 : 0.535, 36]} />
        <meshBasicMaterial color={node.tone} transparent opacity={active ? 0.45 : 0.12} side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}

export function KopanoRoute({ route, activeLane }) {
  const geometry = useMemo(() => {
    const { from, to } = getRouteNodes(route)
    return new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(from.position[0], 0.08, from.position[2]),
      new THREE.Vector3(to.position[0], 0.08, to.position[2]),
    ])
  }, [route])

  const active = isRouteActive(route, activeLane)

  return (
    <line geometry={geometry}>
      <lineBasicMaterial color={active ? '#dff9e8' : '#9de2c2'} transparent opacity={active ? 0.58 : 0.24} />
    </line>
  )
}

export function KopanoGrowthMark({ route, activeLane }) {
  const { from, to } = getRouteNodes(route)
  const midpoint = routeMidpoint(route)
  const angle = Math.atan2(
    to.position[0] - from.position[0],
    to.position[2] - from.position[2],
  )
  const active = isRouteActive(route, activeLane)

  return (
    <group position={[midpoint[0], 0.13, midpoint[2]]} rotation={[0, angle, 0]}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.12, 0.3, 3]} />
        <meshBasicMaterial color={active ? '#f7fff9' : '#a7f3d0'} transparent opacity={active ? 0.92 : 0.48} />
      </mesh>
      <mesh position={[-0.13, 0, 0.03]} rotation={[0, 0, -0.55]} scale={[0.16, 0.06, 0.08]}>
        <sphereGeometry args={[1, 10, 8]} />
        <meshBasicMaterial color="#a7f3d0" transparent opacity={active ? 0.72 : 0.34} />
      </mesh>
      <mesh position={[0.13, 0, 0.03]} rotation={[0, 0, 0.55]} scale={[0.16, 0.06, 0.08]}>
        <sphereGeometry args={[1, 10, 8]} />
        <meshBasicMaterial color="#a7f3d0" transparent opacity={active ? 0.72 : 0.34} />
      </mesh>
    </group>
  )
}
