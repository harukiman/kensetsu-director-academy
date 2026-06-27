import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { search, type SearchDoc } from '../lib/search'

export function HeaderSearch() {
  const [q, setQ] = useState('')
  const [results, setResults] = useState<SearchDoc[]>([])
  const [open, setOpen] = useState(false)
  const boxRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    setResults(search(q).slice(0, 8))
  }, [q])

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  const go = (id: string) => {
    navigate(`/chapter/${id}`)
    setQ('')
    setOpen(false)
  }

  return (
    <div ref={boxRef} className="relative">
      <input
        value={q}
        onChange={(e) => {
          setQ(e.target.value)
          setOpen(true)
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && results[0]) go(results[0].id)
        }}
        placeholder="検索…"
        className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 px-3 py-1.5 text-sm outline-none focus:border-brand-500"
      />
      {open && q && (
        <div className="absolute right-0 mt-1 w-80 max-w-[90vw] overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-lg">
          {results.length === 0 ? (
            <p className="p-3 text-sm text-slate-400">該当なし</p>
          ) : (
            <ul className="max-h-80 overflow-y-auto">
              {results.map((r, i) => (
                <li key={i}>
                  <button
                    onClick={() => go(r.id)}
                    className="block w-full px-3 py-2 text-left hover:bg-slate-100 dark:hover:bg-slate-700"
                  >
                    <span className="mr-1 text-xs text-brand-500">
                      {r.type === 'term' ? '用語' : '章'}
                    </span>
                    <span className="text-sm font-medium">{r.title}</span>
                    <span className="block truncate text-xs text-slate-400">
                      {r.subtitle}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}
