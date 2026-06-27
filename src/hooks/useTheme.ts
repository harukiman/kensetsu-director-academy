import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark'
const KEY = 'kda:theme'

function getInitial(): Theme {
  const saved = localStorage.getItem(KEY)
  if (saved === 'light' || saved === 'dark') return saved
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

/** ダークモードの状態管理。<html> に class="dark" を付与する。 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitial)

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') root.classList.add('dark')
    else root.classList.remove('dark')
    localStorage.setItem(KEY, theme)
  }, [theme])

  const toggle = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))
  return { theme, toggle }
}
