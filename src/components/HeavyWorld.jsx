import { Canvas, useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import {
  networkDistricts,
  networkNodes,
  networkRoutes,
} from '../spatial/network-model.js'
import { cameraTargetForLane } from '../spatial/navigation.js'
import {
  KopanoBeacon,
  KopanoDistrict,
  KopanoGrowthMark,
  KopanoNode,
  KopanoRoute,
} from './spatial/KopanoPrimitives.jsx'

const qualityByTier = {
  full: { dpr: [1, 1.75], particles: 180, shadows: true },
  balanced: { dpr: [1, 1.35], particles: 72, shadows: false },
  lite: { dpr: 1, particles: 18, shadows: false },
}

function WorldRig({ profile, activeLane, children }) {
  const group = useRef()
  const target = useMemo(() => cameraTargetForLane(activeLane), [activeLane])
  const targetLook = useMemo(() => new THREE.Vector3(...target.lookAt), [target])
  const currentLook = useRef(new THREE.Vector3(0, 0.75, 0))

  useFrame((state) => {
    if (!group.current) return

    const pointerX = profile.reducedMotion ? 0 : state.pointer.x
    const pointerY = profile.reducedMotion ? 0 : state.pointer.y
    const alpha = profile.reducedMotion ? 1 : 0.045

    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      pointerX * 0.08,
      alpha,
    )
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      -pointerY * 0.025,
      alpha,
    )

    state.camera.position.x = THREE.MathUtils.lerp(
      state.camera.position.x,
      target.position[0] + pointerX * 0.42,
      alpha,
    )
    state.camera.position.y = THREE.MathUtils.lerp(
      state.camera.position.y,
      target.position[1] + pointerY * 0.16,
      alpha,
    )
    state.camera.position.z = THREE.MathUtils.lerp(
      state.camera.position.z,
      target.position[2],
      alpha,
    )

    currentLook.current.lerp(targetLook, profile.reducedMotion ? 1 : 0.055)
    state.camera.lookAt(currentLook.current)
  })

  return <group ref={group}>{children}</group>
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

      <WorldRig profile={profile} activeLane={activeLane}>
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow={quality.shadows}>
          <circleGeometry args={[7.4, profile.tier === 'lite' ? 40 : 96]} />
          <meshStandardMaterial color="#0d2119" roughness={0.92} metalness={0.02} />
        </mesh>

        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.018, 0]}>
          <ringGeometry args={[2.8, 2.84, 96]} />
          <meshBasicMaterial color="#2b6d51" transparent opacity={0.42} />
        </mesh>

        {networkDistricts.map((district) => (
          <KopanoDistrict
            key={district.id}
            district={district}
            active={district.nodeId === activeLane}
          />
        ))}

        {networkRoutes.map((route) => (
          <KopanoRoute key={route.id} route={route} activeLane={activeLane} />
        ))}

        {networkRoutes.map((route) => (
          <KopanoGrowthMark key={`${route.id}-growth`} route={route} activeLane={activeLane} />
        ))}

        {networkNodes.map((node, index) => (
          <KopanoNode
            key={node.id}
            node={node}
            index={index}
            active={node.id === activeLane}
            profile={profile}
          />
        ))}

        {networkNodes.map((node, index) => (
          <KopanoBeacon
            key={`${node.id}-beacon`}
            node={node}
            index={index}
            active={node.id === activeLane}
            reducedMotion={profile.reducedMotion}
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
    <div
      className="world-canvas"
      aria-hidden="true"
      data-spatial-renderer="webgl"
      data-camera-lane={activeLane}
    >
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
