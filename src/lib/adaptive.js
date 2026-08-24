import { useEffect, useMemo, useState } from 'react'

function readProfile() {
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection
  const saveData = Boolean(connection?.saveData)
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const memory = Number(navigator.deviceMemory || 0)
  const cores = Number(navigator.hardwareConcurrency || 0)
  const online = navigator.onLine

  let tier = 'full'

  if (saveData || reducedMotion || (memory > 0 && memory <= 2) || (cores > 0 && cores <= 2)) {
    tier = 'lite'
  } else if ((memory > 0 && memory <= 4) || (cores > 0 && cores <= 6)) {
    tier = 'balanced'
  }

  return {
    tier,
    saveData,
    reducedMotion,
    memory: memory || null,
    cores: cores || null,
    online,
    effectiveType: connection?.effectiveType || null,
  }
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
