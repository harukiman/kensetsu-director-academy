import { useEffect, useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { chapterById, neighbors } from '../content'
import { groupById } from '../content/groups'
import { ChapterBody } from '../components/ChapterBody'
import { ReadingProgress } from '../components/ReadingProgress'
import { ChapterToc } from '../components/ChapterToc'
import { extractToc } from '../lib/markdown'
import { useProgress } from '../hooks/ProgressContext'
import { NotFoundPage } from './NotFoundPage'

export function ChapterPage() {
  const { id = '' } = useParams()
  const chapter = chapterById(id)
  const { isRead, markRead } = useProgress()
  const toc = useMemo(() => (chapter ? extractToc(chapter.body) : []), [chapter])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  if (!chapter) return <NotFoundPage />
  const group = groupById(chapter.groupId)
  const { prev, next } = neighbors(id)
  const read = isRead(id)

  return (
    <article className="mx-auto max-w-3xl">
      <ReadingProgress />
      <nav className="text-xs text-slate-400">
        <Link to="/" className="hover:underline">ホーム</Link>
        {group && <> ／ {group.id}. {group.title}</>}
      </nav>

      <header className="mt-2 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold leading-tight">{chapter.title}</h1>
        <p className="mt-3 text-slate-600 dark:text-slate-300">{chapter.summary}</p>
        <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-slate-500">
          <span>⏱ 約 {chapter.estMinutes} 分</span>
          <span>📝 クイズ {chapter.quiz.length} 問</span>
          <span>📖 用語 {chapter.terms.length}</span>
          {read && <span className="text-emerald-600 dark:text-emerald-400">✔ 読了済み</span>}
        </div>
      </header>

      {toc.length >= 3 && <ChapterToc items={toc} />}

      <ChapterBody body={chapter.body} />

      {/* 重要用語 */}
      {chapter.terms.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-3 text-lg font-bold">この章の重要用語</h2>
          <dl className="space-y-3">
            {chapter.terms.map((t) => (
              <div key={t.term} className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/40 p-3">
                <dt className="font-bold">{t.term}</dt>
                <dd className="mt-1 text-sm text-slate-600 dark:text-slate-300">{t.definition}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      {/* アクション */}
      <section className="no-print mt-10 flex flex-wrap items-center gap-3 border-t border-slate-200 dark:border-slate-700 pt-6">
        <button
          onClick={() => markRead(id)}
          disabled={read}
          className={
            read
              ? 'rounded-lg bg-emerald-100 px-4 py-2 text-sm font-bold text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300'
              : 'rounded-lg bg-brand-600 px-4 py-2 text-sm font-bold text-white hover:bg-brand-700'
          }
        >
          {read ? '✔ 読了済み' : 'この章を読了にする'}
        </button>
        {chapter.quiz.length > 0 && (
          <Link to={`/quiz/${id}`} className="rounded-lg border border-brand-500 px-4 py-2 text-sm font-bold text-brand-600 dark:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-900/20">
            この章のクイズに挑戦 →
          </Link>
        )}
      </section>

      {/* 前後ナビ */}
      <nav className="no-print mt-8 flex justify-between gap-3 text-sm">
        {prev ? (
          <Link to={`/chapter/${prev.id}`} className="flex-1 rounded-lg border border-slate-200 dark:border-slate-700 p-3 hover:bg-slate-100 dark:hover:bg-slate-800">
            <span className="block text-xs text-slate-400">← 前の章</span>
            {prev.title}
          </Link>
        ) : <span className="flex-1" />}
        {next ? (
          <Link to={`/chapter/${next.id}`} className="flex-1 rounded-lg border border-slate-200 dark:border-slate-700 p-3 text-right hover:bg-slate-100 dark:hover:bg-slate-800">
            <span className="block text-xs text-slate-400">次の章 →</span>
            {next.title}
          </Link>
        ) : <span className="flex-1" />}
      </nav>
    </article>
  )
}
