import { useEffect, useState } from 'react'

export function useRotatingWord(count: number, intervalMs: number, enabled: boolean): number {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (!enabled || count < 2) return
    const id = window.setInterval(() => setIndex((i) => (i + 1) % count), intervalMs)
    return () => window.clearInterval(id)
  }, [count, intervalMs, enabled])

  return enabled ? index : 0
}
