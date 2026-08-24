import { lazy, Suspense } from 'react'

const HeavyWorld = lazy(() => import('./HeavyWorld.jsx'))

function StaticWorld() {
  return (
    <div className="world-canvas" aria-hidden="true">
      <div className="world-fallback" />
    </div>
  )
}

export default function AdaptiveWorld({ activeLane, profile }) {
  if (profile.tier === 'lite') {
    return <StaticWorld />
  }

  return (
    <Suspense fallback={<StaticWorld />}>
      <HeavyWorld activeLane={activeLane} profile={profile} />
    </Suspense>
  )
}
