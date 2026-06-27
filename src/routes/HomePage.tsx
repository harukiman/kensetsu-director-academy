import { Link } from 'react-router-dom'
import {
  GROUPS,
  chaptersOfGroup,
  totalChapters,
  totalQuestions,
  totalTerms,
  totalFlashcards,
} from '../content'
import { useProgress } from '../hooks/ProgressContext'

export function HomePage() {
  const { state } = useProgress()
  const readCount = state.readChapters.length
  const pct = totalChapters ? Math.round((readCount / totalChapters) * 100) : 0

  return (
    <div className="space-y-8">
      {/* ヒーロー */}
      <section className="rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 p-6 sm:p-10 text-white">
        <h1 className="text-2xl sm:text-3xl font-bold leading-tight">
          土木・建設の現場で働くための<br />
          建設業法 &amp; 工事管理 学習アプリ
        </h1>
        <p className="mt-3 max-w-2xl text-sm sm:text-base text-white/90">
          新卒・未経験から「建設ディレクター／工事管理者」として現場に立つために必要な知識を、
          基礎から最近の法改正・将来動向まで、図とクイズでやさしく学べます。
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link to="/roadmap" className="rounded-lg bg-white px-4 py-2 text-sm font-bold text-brand-700 hover:bg-brand-50">
            学習を始める（ロードマップ）
          </Link>
          <Link to="/dashboard" className="rounded-lg border border-white/60 px-4 py-2 text-sm font-bold text-white hover:bg-white/10">
            進捗を見る
          </Link>
        </div>
      </section>

      {/* 統計 */}
      <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label="章" value={totalChapters} />
        <Stat label="クイズ問題" value={totalQuestions} />
        <Stat label="用語" value={totalTerms} />
        <Stat label="フラッシュカード" value={totalFlashcards} />
      </section>

      {/* 進捗バー */}
      <section className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/40 p-5">
        <div className="flex items-center justify-between text-sm">
          <span className="font-bold">学習の進捗</span>
          <span className="text-slate-500">{readCount} / {totalChapters} 章（{pct}%）</span>
        </div>
        <div className="mt-2 h-3 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
          <div className="h-full rounded-full bg-brand-500 transition-all" style={{ width: `${pct}%` }} />
        </div>
      </section>

      {/* 章立て */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold">学習コンテンツ（章立て）</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {GROUPS.map((g) => {
            const chapters = chaptersOfGroup(g.id)
            return (
              <div key={g.id} className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/40 p-4">
                <div className="flex items-baseline gap-2">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-brand-600 text-sm font-bold text-white">{g.id}</span>
                  <h3 className="font-bold">{g.title}</h3>
                </div>
                <p className="mt-1 text-xs text-slate-500">{g.description}</p>
                {chapters.length > 0 ? (
                  <ul className="mt-3 space-y-1">
                    {chapters.map((c) => (
                      <li key={c.id}>
                        <Link to={`/chapter/${c.id}`} className="text-sm text-brand-600 dark:text-brand-400 hover:underline">
                          ・{c.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-3 text-xs text-slate-400">（コンテンツ準備中）</p>
                )}
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/40 p-4 text-center">
      <div className="text-2xl font-bold text-brand-600 dark:text-brand-400">{value}</div>
      <div className="text-xs text-slate-500">{label}</div>
    </div>
  )
}
