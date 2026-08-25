import { Component, lazy, Suspense, useMemo, useState } from 'react'
import { canUseWebGL, rendererAdmission } from '../spatial/render-policy.js'
import StaticNetwork from './StaticNetwork.jsx'

const HeavyWorld = lazy(() => import('./HeavyWorld.jsx'))

class SpatialErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { failed: false }
  }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch() {
    this.props.onFailure?.('webgl-error')
  }

  render() {
    if (this.state.failed) {
      return <StaticNetwork activeLane={this.props.activeLane} fallbackReason="webgl-error" />
    }
    return this.props.children
  }
}

export default function AdaptiveWorld({ activeLane, profile }) {
  const webglAvailable = useMemo(() => canUseWebGL(), [])
  const [runtimeFailure, setRuntimeFailure] = useState(null)
  const admission = rendererAdmission(profile, { webglAvailable })

  if (runtimeFailure) {
    return <StaticNetwork activeLane={activeLane} fallbackReason={runtimeFailure} />
  }

  if (admission.renderer === 'static') {
    return <StaticNetwork activeLane={activeLane} fallbackReason={admission.reason} />
  }

  return (
    <SpatialErrorBoundary activeLane={activeLane} onFailure={setRuntimeFailure}>
      <Suspense fallback={<StaticNetwork activeLane={activeLane} fallbackReason="webgl-loading" />}>
        <HeavyWorld
          activeLane={activeLane}
          profile={profile}
          onFailure={() => setRuntimeFailure('webgl-error')}
        />
      </Suspense>
    </SpatialErrorBoundary>
  )
}
