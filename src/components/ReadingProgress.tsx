import { useEffect, useState } from 'react'

/** 章の読み進み度を画面最上部に細いバーで表示する */
export function ReadingProgress() {
  const [pct, setPct] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement
      const max = el.scrollHeight - el.clientHeight
      setPct(max > 0 ? Math.min(100, (el.scrollTop / max) * 100) : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])
  return (
    <div className="no-print fixed left-0 top-0 z-40 h-1 w-full bg-transparent">
      <div className="h-full bg-brand-500 transition-[width] duration-75" style={{ width: `${pct}%` }} />
    </div>
  )
}
