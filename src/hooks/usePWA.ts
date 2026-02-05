import { useState, useEffect } from 'react'
import { registerSW } from 'virtual:pwa-register'

export const usePWA = () => {
  const [offline, setOffline] = useState(!navigator.onLine)
  const [needsRefresh, setNeedsRefresh] = useState(false)
  const [updateSWFn, setUpdateSWFn] = useState<((reloadPage?: boolean) => Promise<void>) | undefined>(undefined)

  useEffect(() => {
    const handleOnline = () => setOffline(false)
    const handleOffline = () => setOffline(true)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    const updateSW = registerSW({
      onNeedRefresh() {
        setNeedsRefresh(true)
      },
      onOfflineReady() {
        // Optional: show "ready for offline" toast
      },
    })
    
    setUpdateSWFn(() => updateSW)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  const reloadPWA = () => {
    updateSWFn?.(true)
  }

  return { offline, needsRefresh, reloadPWA }
}
