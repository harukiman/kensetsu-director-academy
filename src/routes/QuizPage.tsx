import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ALL_QUESTIONS, chapterById, type IndexedQuestion } from '../content'
import { useProgress } from '../hooks/ProgressContext'

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function QuizPage() {
  const { id } = useParams()
  const { recordQuiz } = useProgress()

  const { title, pool } = useMemo(() => {
    if (id) {
      const c = chapterById(id)
      return {
        title: c ? `${c.title} のクイズ` : 'クイズ',
        pool: (c?.quiz ?? []).map((q) => ({ ...q, chapterId: id, chapterTitle: c?.title ?? '' })),
      }
    }
    // 全体テスト：最大 10 問ランダム
    return { title: '確認テスト（全体ランダム）', pool: shuffle(ALL_QUESTIONS).slice(0, 10) }
  }, [id])

  const [questions] = useState<IndexedQuestion[]>(pool)
  const [idx, setIdx] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [answers, setAnswers] = useState<boolean[]>([])
  const [done, setDone] = useState(false)

  if (questions.length === 0) {
    return (
      <Empty>
        この範囲のクイズはまだありません。
        <Link to="/" className="text-brand-600 hover:underline"> ホームへ戻る</Link>
      </Empty>
    )
  }

  const q = questions[idx]
  const isLast = idx === questions.length - 1

  const choose = (i: number) => {
    if (selected !== null) return
    setSelected(i)
  }

  const next = () => {
    const correct = selected === q.answerIndex
    const newAnswers = [...answers, correct]
    setAnswers(newAnswers)
    if (isLast) {
      const score = newAnswers.filter(Boolean).length
      if (id) {
        recordQuiz(id, { correct: score, total: questions.length, at: new Date().toISOString() })
      }
      setDone(true)
    } else {
      setIdx(idx + 1)
      setSelected(null)
    }
  }

  if (done) {
    const score = answers.filter(Boolean).length
    const pct = Math.round((score / questions.length) * 100)
    return (
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-2xl font-bold">{title}：結果</h1>
        <div className="my-8">
          <div className="text-5xl font-bold text-brand-600 dark:text-brand-400">{pct}%</div>
          <p className="mt-2 text-slate-500">{questions.length} 問中 {score} 問正解</p>
        </div>
        <div className="flex justify-center gap-3">
          <button
            onClick={() => { setIdx(0); setSelected(null); setAnswers([]); setDone(false) }}
            className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-bold text-white hover:bg-brand-700"
          >
            もう一度
          </button>
          <Link to="/dashboard" className="rounded-lg border border-slate-300 dark:border-slate-600 px-4 py-2 text-sm font-bold hover:bg-slate-100 dark:hover:bg-slate-800">
            ダッシュボードへ
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="flex items-center justify-between text-sm text-slate-500">
        <h1 className="font-bold">{title}</h1>
        <span>{idx + 1} / {questions.length}</span>
      </div>
      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
        <div className="h-full bg-brand-500 transition-all" style={{ width: `${((idx) / questions.length) * 100}%` }} />
      </div>

      <div className="mt-6 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/40 p-5">
        <p className="font-bold leading-relaxed">{q.question}</p>
        {!id && (
          <p className="mt-1 text-xs text-slate-400">出題範囲：{q.chapterTitle}</p>
        )}
        <ul className="mt-4 space-y-2">
          {q.choices.map((c, i) => {
            const isAnswer = i === q.answerIndex
            const isPicked = i === selected
            let cls = 'border-slate-300 dark:border-slate-600 hover:border-brand-400'
            if (selected !== null) {
              if (isAnswer) cls = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/30'
              else if (isPicked) cls = 'border-rose-500 bg-rose-50 dark:bg-rose-900/30'
              else cls = 'border-slate-200 dark:border-slate-700 opacity-60'
            }
            return (
              <li key={i}>
                <button
                  onClick={() => choose(i)}
                  disabled={selected !== null}
                  className={`flex w-full items-center gap-2 rounded-lg border-2 px-4 py-3 text-left text-sm transition-colors ${cls}`}
                >
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border text-xs">
                    {String.fromCharCode(65 + i)}
                  </span>
                  {c}
                  {selected !== null && isAnswer && <span className="ml-auto text-emerald-600">正解</span>}
                </button>
              </li>
            )
          })}
        </ul>

        {selected !== null && (
          <div className="mt-4 rounded-lg bg-slate-100 dark:bg-slate-800 p-4 text-sm">
            <span className="font-bold">{selected === q.answerIndex ? '⭕ 正解！' : '❌ 不正解'}</span>
            <p className="mt-1 text-slate-600 dark:text-slate-300">{q.explanation}</p>
          </div>
        )}

        <div className="mt-5 text-right">
          <button
            onClick={next}
            disabled={selected === null}
            className="rounded-lg bg-brand-600 px-5 py-2 text-sm font-bold text-white hover:bg-brand-700 disabled:opacity-40"
          >
            {isLast ? '結果を見る' : '次の問題 →'}
          </button>
        </div>
      </div>
    </div>
  )
}

function Empty({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto max-w-2xl py-16 text-center text-slate-500">{children}</div>
}
