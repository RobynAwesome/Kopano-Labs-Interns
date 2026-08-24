import { lazy, Suspense } from 'react'
import StaticNetwork from './StaticNetwork.jsx'

const HeavyWorld = lazy(() => import('./HeavyWorld.jsx'))

export default function AdaptiveWorld({ activeLane, profile }) {
  if (profile.tier === 'lite' || profile.saveData) {
    return <StaticNetwork activeLane={activeLane} />
  }

  return (
    <Suspense fallback={<StaticNetwork activeLane={activeLane} />}>
      <HeavyWorld activeLane={activeLane} profile={profile} />
    </Suspense>
  )
}
