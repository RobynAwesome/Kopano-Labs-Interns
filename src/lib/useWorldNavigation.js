import { useCallback, useEffect, useRef, useState } from 'react'
import {
  DEFAULT_WORLD_LANE,
  readLaneFromUrl,
  transitionWorldNavigation,
} from '../spatial/navigation.js'

function currentHref() {
  if (typeof window === 'undefined') return `https://kopano.local/?lane=${DEFAULT_WORLD_LANE}`
  return window.location.href
}

export function useWorldNavigation() {
  const initialLane = readLaneFromUrl(currentHref())
  const [activeLane, setActiveLane] = useState(initialLane)
  const laneRef = useRef(initialLane)

  useEffect(() => {
    laneRef.current = activeLane
  }, [activeLane])

  useEffect(() => {
    if (typeof window === 'undefined') return undefined

    const onPopState = () => {
      const transition = transitionWorldNavigation({
        currentLane: laneRef.current,
        currentUrl: window.location.href,
        event: { type: 'popstate', url: window.location.href },
      })
      laneRef.current = transition.lane
      setActiveLane(transition.lane)
    }

    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  const selectLane = useCallback((lane) => {
    if (typeof window === 'undefined') {
      laneRef.current = lane
      setActiveLane(lane)
      return
    }

    const transition = transitionWorldNavigation({
      currentLane: laneRef.current,
      currentUrl: window.location.href,
      event: { type: 'select', lane },
    })

    if (transition.historyAction === 'push' && transition.nextUrl) {
      window.history.pushState({ lane: transition.lane }, '', transition.nextUrl)
    }

    laneRef.current = transition.lane
    setActiveLane(transition.lane)
  }, [])

  return { activeLane, selectLane }
}
