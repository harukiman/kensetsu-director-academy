import { Link } from 'react-router-dom'
import {
  GROUPS,
  CHAPTERS,
  chaptersOfGroup,
  totalChapters,
  ALL_FLASHCARDS,
} from '../content'
import { useProgress } from '../hooks/ProgressContext'
import { calcStreak } from '../lib/progress'

export function DashboardPage() {
  const { state, resetAll } = useProgress()
  const readCount = state.readChapters.length
  const pct = totalChapters ? Math.round((readCount / totalChapters) * 100) : 0
  const streak = calcStreak(state.studyDays)

  const quizEntries = Object.entries(state.quizResults)
  const avgQuiz = quizEntries.length
    ? Math.round(
        (quizEntries.reduce((s, [, r]) => s + r.correct / r.total, 0) / quizEntries.length) * 100,
      )
    : 0

  const mastered = Object.values(state.flashcards).filter((v) => v === 2).length

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <h1 className="text-2xl font-bold">学習ダッシュボード</h1>

      {/* サマリーカード */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Card label="読了" value={`${readCount}/${totalChapters}`} sub={`${pct}%`} />
        <Card label="連続学習" value={`${streak}`} sub="日" />
        <Card label="クイズ平均" value={`${avgQuiz}%`} sub={`${quizEntries.length} 回`} />
        <Card label="暗記済カード" value={`${mastered}`} sub={`/ ${ALL_FLASHCARDS.length}`} />
      </div>

      {/* 章別進捗 */}
      <section>
        <h2 className="mb-3 text-lg font-bold">グループ別の進捗</h2>
        <div className="space-y-3">
          {GROUPS.map((g) => {
            const chapters = chaptersOfGroup(g.id)
            if (chapters.length === 0) return null
            const read = chapters.filter((c) => state.readChapters.includes(c.id)).length
            const p = Math.round((read / chapters.length) * 100)
            return (
              <div key={g.id} className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/40 p-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-bold">{g.id}. {g.title}</span>
                  <span className="text-slate-500">{read}/{chapters.length}</span>
                </div>
                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                  <div className="h-full rounded-full bg-brand-500 transition-all" style={{ width: `${p}%` }} />
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* クイズ履歴 */}
      <section>
        <h2 className="mb-3 text-lg font-bold">クイズ結果</h2>
        {quizEntries.length === 0 ? (
          <p className="text-sm text-slate-400">まだクイズを受けていません。<Link to="/quiz" className="text-brand-500 hover:underline">確認テストを受ける →</Link></p>
        ) : (
          <div className="table-wrap">
            <table className="w-full text-sm">
              <thead>
                <tr><th className="px-3 py-2 text-left">章</th><th className="px-3 py-2">スコア</th><th className="px-3 py-2">受験日</th></tr>
              </thead>
              <tbody>
                {quizEntries.map(([cid, r]) => {
                  const c = CHAPTERS.find((x) => x.id === cid)
                  return (
                    <tr key={cid} className="border-t border-slate-100 dark:border-slate-700">
                      <td className="px-3 py-2">
                        <Link to={`/chapter/${cid}`} className="text-brand-600 hover:underline">{c?.title ?? cid}</Link>
                      </td>
                      <td className="px-3 py-2 text-center">{r.correct}/{r.total}（{Math.round((r.correct / r.total) * 100)}%）</td>
                      <td className="px-3 py-2 text-center text-xs text-slate-400">{new Date(r.at).toLocaleDateString('ja-JP')}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* 演習の分野別成績 */}
      <section>
        <h2 className="mb-3 text-lg font-bold">演習・模擬試験の分野別成績</h2>
        {Object.keys(state.examStats).length === 0 ? (
          <p className="text-sm text-slate-400">
            まだ演習を受けていません。<Link to="/exam" className="text-brand-500 hover:underline">演習・模擬試験に挑戦する →</Link>
          </p>
        ) : (
          <div className="table-wrap">
            <table className="w-full text-sm">
              <thead>
                <tr><th className="px-3 py-2 text-left">分野</th><th className="px-3 py-2">ベスト</th><th className="px-3 py-2">直近</th><th className="px-3 py-2">挑戦</th></tr>
              </thead>
              <tbody>
                {Object.entries(state.examStats).map(([cat, s]) => (
                  <tr key={cat} className="border-t border-slate-100 dark:border-slate-700">
                    <td className="px-3 py-2">{cat}</td>
                    <td className="px-3 py-2 text-center font-bold text-brand-600 dark:text-brand-400">{s.bestPct}%</td>
                    <td className="px-3 py-2 text-center">{s.lastPct}%</td>
                    <td className="px-3 py-2 text-center text-xs text-slate-400">{s.attempts} 回</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="no-print border-t border-slate-200 dark:border-slate-700 pt-6">
        <button
          onClick={() => { if (confirm('学習記録（進捗・スコア・カード）をすべて消去します。よろしいですか？')) resetAll() }}
          className="rounded-lg border border-rose-300 px-4 py-2 text-sm font-bold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20"
        >
          学習記録をリセット
        </button>
        <p className="mt-2 text-xs text-slate-400">記録はこの端末のブラウザ（localStorage）にのみ保存されます。</p>
      </section>
    </div>
  )
}

function Card({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/40 p-4 text-center">
      <div className="text-xs text-slate-500">{label}</div>
      <div className="mt-1 text-2xl font-bold text-brand-600 dark:text-brand-400">{value}</div>
      <div className="text-xs text-slate-400">{sub}</div>
    </div>
  )
}
