import { useEffect, useMemo, useState } from 'react'
import { resolveAdaptiveProfile } from '../spatial/render-policy.js'

function readProfile() {
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection

  return resolveAdaptiveProfile({
    saveData: Boolean(connection?.saveData),
    reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    memory: Number(navigator.deviceMemory || 0),
    cores: Number(navigator.hardwareConcurrency || 0),
    online: navigator.onLine,
    effectiveType: connection?.effectiveType || null,
  })
}

export function useAdaptiveProfile() {
  const [profile, setProfile] = useState(() => readProfile())

  useEffect(() => {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const refresh = () => setProfile(readProfile())

    window.addEventListener('online', refresh)
    window.addEventListener('offline', refresh)
    connection?.addEventListener?.('change', refresh)
    media.addEventListener?.('change', refresh)

    return () => {
      window.removeEventListener('online', refresh)
      window.removeEventListener('offline', refresh)
      connection?.removeEventListener?.('change', refresh)
      media.removeEventListener?.('change', refresh)
    }
  }, [])

  return useMemo(() => profile, [profile])
}
