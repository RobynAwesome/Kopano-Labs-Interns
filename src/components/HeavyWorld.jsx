import { Canvas, useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { worldLanes } from '../data/lanes.js'

const qualityByTier = {
  full: { dpr: [1, 1.75], particles: 180, shadows: true },
  balanced: { dpr: [1, 1.35], particles: 72, shadows: false },
  lite: { dpr: 1, particles: 18, shadows: false },
}

function WorldRig({ profile, children }) {
  const group = useRef()

  useFrame((state) => {
    if (!group.current || profile.reducedMotion) return

    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      state.pointer.x * 0.12,
      0.045,
    )
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      -state.pointer.y * 0.035,
      0.045,
    )

    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, state.pointer.x * 0.7, 0.025)
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, 4.4 + state.pointer.y * 0.22, 0.025)
    state.camera.lookAt(0, 0.75, 0)
  })

  return <group ref={group}>{children}</group>
}

function KnowledgeBeacon({ lane, index, activeLane, profile }) {
  const group = useRef()
  const halo = useRef()
  const active = lane.id === activeLane

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
      if (halo.current) halo.current.rotation.z = elapsed * (active ? 0.7 : 0.28) + index
    }
  })

  return (
    <group ref={group} position={lane.position} scale={[1, 0.08, 1]}>
      <mesh castShadow={profile.tier === 'full'} position={[0, 1.05, 0]}>
        <cylinderGeometry args={[0.28, 0.56, 2.1, profile.tier === 'lite' ? 8 : 16]} />
        <meshStandardMaterial
          color={lane.tone}
          roughness={0.48}
          metalness={0.08}
          emissive={lane.tone}
          emissiveIntensity={active ? 0.22 : 0.04}
        />
      </mesh>

      <mesh position={[0, 2.26, 0]}>
        <sphereGeometry args={[active ? 0.27 : 0.21, profile.tier === 'lite' ? 10 : 18, profile.tier === 'lite' ? 8 : 14]} />
        <meshStandardMaterial
          color="#f7fff9"
          emissive={lane.tone}
          emissiveIntensity={active ? 1.6 : 0.75}
        />
      </mesh>

      <mesh ref={halo} position={[0, 2.26, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[active ? 0.52 : 0.4, 0.018, 6, profile.tier === 'lite' ? 18 : 42]} />
        <meshBasicMaterial color={lane.tone} transparent opacity={active ? 0.95 : 0.36} />
      </mesh>
    </group>
  )
}

function PathNetwork() {
  const geometry = useMemo(() => {
    const points = worldLanes.map((lane) => new THREE.Vector3(lane.position[0], 0.06, lane.position[2]))
    return new THREE.BufferGeometry().setFromPoints(points)
  }, [])

  return (
    <line geometry={geometry}>
      <lineBasicMaterial color="#9de2c2" transparent opacity={0.28} />
    </line>
  )
}

function Atmosphere({ count, reducedMotion }) {
  const ref = useRef()
  const positions = useMemo(() => {
    const values = new Float32Array(count * 3)
    for (let i = 0; i < count; i += 1) {
      values[i * 3] = (Math.random() - 0.5) * 15
      values[i * 3 + 1] = 1.2 + Math.random() * 5.6
      values[i * 3 + 2] = (Math.random() - 0.5) * 11
    }
    return values
  }, [count])

  useFrame((state) => {
    if (!ref.current || reducedMotion) return
    ref.current.rotation.y = state.clock.getElapsedTime() * 0.012
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#dff9e8" size={0.028} transparent opacity={0.55} sizeAttenuation />
    </points>
  )
}

function WorldScene({ activeLane, profile, quality }) {
  return (
    <>
      <color attach="background" args={['#08130f']} />
      <fog attach="fog" args={['#08130f', 7.5, 18]} />
      <ambientLight intensity={0.72} />
      <directionalLight
        position={[5, 8, 4]}
        intensity={2.2}
        color="#fff2c2"
        castShadow={quality.shadows}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <pointLight position={[-4, 2.5, 2]} color="#ffce32" intensity={4} distance={7} />
      <pointLight position={[4, 2.3, -2]} color="#7dd3fc" intensity={3} distance={6} />

      <WorldRig profile={profile}>
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow={quality.shadows}>
          <circleGeometry args={[7.4, profile.tier === 'lite' ? 40 : 96]} />
          <meshStandardMaterial color="#0d2119" roughness={0.92} metalness={0.02} />
        </mesh>

        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.018, 0]}>
          <ringGeometry args={[2.8, 2.84, 96]} />
          <meshBasicMaterial color="#2b6d51" transparent opacity={0.42} />
        </mesh>

        <PathNetwork />
        {worldLanes.map((lane, index) => (
          <KnowledgeBeacon
            key={lane.id}
            lane={lane}
            index={index}
            activeLane={activeLane}
            profile={profile}
          />
        ))}
        <Atmosphere count={quality.particles} reducedMotion={profile.reducedMotion} />
      </WorldRig>
    </>
  )
}

export default function HeavyWorld({ activeLane, profile }) {
  const quality = qualityByTier[profile.tier] || qualityByTier.balanced

  return (
    <div className="world-canvas" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 4.4, 9.4], fov: 42, near: 0.1, far: 40 }}
        dpr={quality.dpr}
        shadows={quality.shadows}
        gl={{ antialias: profile.tier !== 'lite', powerPreference: profile.tier === 'full' ? 'high-performance' : 'default' }}
        fallback={<div className="world-fallback" />}
      >
        <WorldScene activeLane={activeLane} profile={profile} quality={quality} />
      </Canvas>
    </div>
  )
}
