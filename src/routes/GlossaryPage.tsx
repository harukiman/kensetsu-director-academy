import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ALL_TERMS } from '../content'

// 50音の行頭かな
const KANA_ROWS: { label: string; heads: string[] }[] = [
  { label: 'あ', heads: ['あ', 'い', 'う', 'え', 'お'] },
  { label: 'か', heads: ['か', 'き', 'く', 'け', 'こ', 'が', 'ぎ', 'ぐ', 'げ', 'ご'] },
  { label: 'さ', heads: ['さ', 'し', 'す', 'せ', 'そ', 'ざ', 'じ', 'ず', 'ぜ', 'ぞ'] },
  { label: 'た', heads: ['た', 'ち', 'つ', 'て', 'と', 'だ', 'ぢ', 'づ', 'で', 'ど'] },
  { label: 'な', heads: ['な', 'に', 'ぬ', 'ね', 'の'] },
  { label: 'は', heads: ['は', 'ひ', 'ふ', 'へ', 'ほ', 'ば', 'び', 'ぶ', 'べ', 'ぼ', 'ぱ', 'ぴ', 'ぷ', 'ぺ', 'ぽ'] },
  { label: 'ま', heads: ['ま', 'み', 'む', 'め', 'も'] },
  { label: 'や', heads: ['や', 'ゆ', 'よ'] },
  { label: 'ら', heads: ['ら', 'り', 'る', 'れ', 'ろ'] },
  { label: 'わ', heads: ['わ', 'を', 'ん'] },
  { label: '英', heads: [] },
]

export function GlossaryPage() {
  const [q, setQ] = useState('')
  const [row, setRow] = useState<string | null>(null)

  const filtered = useMemo(() => {
    let items = ALL_TERMS
    if (q.trim()) {
      const s = q.trim()
      items = items.filter(
        (t) => t.term.includes(s) || (t.reading ?? '').includes(s) || t.definition.includes(s),
      )
    }
    if (row) {
      const def = KANA_ROWS.find((r) => r.label === row)
      if (def) {
        if (row === '英') {
          items = items.filter((t) => /^[A-Za-z]/.test(t.reading ?? t.term))
        } else {
          items = items.filter((t) => def.heads.some((h) => (t.reading ?? t.term).startsWith(h)))
        }
      }
    }
    return items
  }, [q, row])

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-2xl font-bold">用語集・略語辞典</h1>
      <p className="mt-2 text-sm text-slate-500">建設・法令の用語を読み（ふりがな）付きで収録。{ALL_TERMS.length} 語。</p>

      <div className="sticky top-[57px] z-10 mt-4 -mx-3 bg-slate-50/95 px-3 py-2 dark:bg-slate-900/95 sm:mx-0 sm:rounded-xl sm:px-2">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="用語・読み・意味で検索…"
          className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2 text-sm outline-none focus:border-brand-500"
        />
        <div className="mt-2 flex flex-wrap gap-1">
          <Chip active={row === null} onClick={() => setRow(null)}>全て</Chip>
          {KANA_ROWS.map((r) => (
            <Chip key={r.label} active={row === r.label} onClick={() => setRow(r.label)}>
              {r.label}
            </Chip>
          ))}
        </div>
      </div>

      <p className="mt-4 text-xs text-slate-400">{filtered.length} 件</p>
      <dl className="mt-2 space-y-3">
        {filtered.map((t) => (
          <div key={t.term} className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/40 p-3">
            <dt className="flex flex-wrap items-baseline gap-2 font-bold">
              {t.term}
              {t.reading && <span className="text-xs font-normal text-slate-400">{t.reading}</span>}
              {t.chapterId && (
                <Link to={`/chapter/${t.chapterId}`} className="ml-auto text-xs font-normal text-brand-500 hover:underline">
                  {t.chapterTitle} →
                </Link>
              )}
            </dt>
            <dd className="mt-1 text-sm text-slate-600 dark:text-slate-300">{t.definition}</dd>
          </div>
        ))}
        {filtered.length === 0 && <p className="py-10 text-center text-slate-400">該当する用語がありません。</p>}
      </dl>
    </div>
  )
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={
        'rounded-full px-3 py-1 text-xs font-medium ' +
        (active
          ? 'bg-brand-600 text-white'
          : 'border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800')
      }
    >
      {children}
    </button>
  )
}
