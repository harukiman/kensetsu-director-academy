import { useState } from 'react'
import { Link } from 'react-router-dom'
import { search } from '../lib/search'

export function SearchPage() {
  const [q, setQ] = useState('')
  const results = search(q)
  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-2xl font-bold">サイト内検索</h1>
      <input
        autoFocus
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="キーワードを入力（例：主任技術者、CCUS、KY）"
        className="mt-4 w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-3 text-base outline-none focus:border-brand-500"
      />
      {q && (
        <p className="mt-3 text-xs text-slate-400">{results.length} 件ヒット</p>
      )}
      <ul className="mt-2 space-y-2">
        {results.map((r, i) => (
          <li key={i}>
            <Link to={`/chapter/${r.id}`} className="block rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/40 p-3 hover:border-brand-400">
              <span className="mr-2 text-xs text-brand-500">{r.type === 'term' ? '用語' : '章'}</span>
              <span className="font-medium">{r.title}</span>
              <span className="mt-0.5 block text-sm text-slate-500">{r.subtitle}</span>
            </Link>
          </li>
        ))}
        {q && results.length === 0 && (
          <li className="py-10 text-center text-slate-400">該当する内容が見つかりませんでした。</li>
        )}
      </ul>
    </div>
  )
}
