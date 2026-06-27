import { useState } from 'react'
import type { TocItem } from '../lib/markdown'

/**
 * 章内の目次。`## 見出し` へジャンプする。
 * HashRouter と競合しないよう、アンカーではなく scrollIntoView を使う。
 */
export function ChapterToc({ items }: { items: TocItem[] }) {
  const [open, setOpen] = useState(false)

  const jump = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <nav className="no-print mb-6 rounded-xl border border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800/40">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm font-bold"
      >
        <span>📑 目次</span>
        <span className="text-xs font-normal text-slate-400">（{items.length} 項目）</span>
        <svg
          width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"
          className={'ml-auto text-slate-400 transition-transform ' + (open ? 'rotate-90' : '')}
        >
          <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <ol className="space-y-0.5 border-t border-slate-200 px-2 pb-3 pt-2 dark:border-slate-700">
          {items.map((it, i) => (
            <li key={it.id}>
              <button
                onClick={() => jump(it.id)}
                className="flex w-full gap-2 rounded-lg px-2 py-1.5 text-left text-sm hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                <span className="shrink-0 text-xs text-brand-500">{i + 1}.</span>
                <span>{it.text}</span>
              </button>
            </li>
          ))}
        </ol>
      )}
    </nav>
  )
}
