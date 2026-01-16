'use client'

import { useEffect, useState } from 'react'

interface Props {
  containerRef: React.RefObject<HTMLDivElement | null>
}

export function ScrollProgressBar({ containerRef }: Props) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container
      const maxScroll = scrollHeight - clientHeight
      if (maxScroll <= 0) {
        setProgress(0)
        return
      }
      const currentProgress = scrollTop / maxScroll
      setProgress(Math.min(Math.max(currentProgress, 0), 1))
    }

    // Initial calculation
    handleScroll()

    container.addEventListener('scroll', handleScroll)
    return () => container.removeEventListener('scroll', handleScroll)
  }, [containerRef])

  return (
    <div className="sticky top-0 left-0 right-0 h-1 bg-transparent z-10">
      <div
        className="h-full bg-stone-400 transition-[width] duration-75"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  )
}
