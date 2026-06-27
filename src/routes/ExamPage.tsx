import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { EXAM_QUESTIONS, EXAM_CATEGORIES, type ExamQuestion } from '../content/exam'
import { useProgress } from '../hooks/ProgressContext'

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function ExamPage() {
  const { recordExam } = useProgress()
  const [params] = useSearchParams()
  const presetCat = params.get('cat')
  const [cat, setCat] = useState<string>(
    presetCat && EXAM_CATEGORIES.includes(presetCat) ? presetCat : 'all',
  )
  const [count, setCount] = useState<number>(10)
  const [deck, setDeck] = useState<ExamQuestion[] | null>(null)
  const [idx, setIdx] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [picks, setPicks] = useState<number[]>([])
  const [done, setDone] = useState(false)

  const pool = useMemo(
    () => (cat === 'all' ? EXAM_QUESTIONS : EXAM_QUESTIONS.filter((q) => q.category === cat)),
    [cat],
  )

  const start = () => {
    setDeck(shuffle(pool).slice(0, count))
    setIdx(0)
    setSelected(null)
    setPicks([])
    setDone(false)
  }
  const reset = () => setDeck(null)

  if (EXAM_QUESTIONS.length === 0) {
    return <div className="py-16 text-center text-slate-500">演習問題は準備中です。</div>
  }

  // セットアップ画面
  if (!deck) {
    return (
      <div className="mx-auto max-w-xl">
        <h1 className="text-2xl font-bold">演習・模擬試験</h1>
        <p className="mt-2 text-sm text-slate-500">
          施工管理技士スタイルの4択演習。分野と問題数を選んで挑戦できます（全{EXAM_QUESTIONS.length}問）。
        </p>
        <div className="mt-6 space-y-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/40 p-5">
          <div>
            <label className="text-sm font-bold">分野</label>
            <select
              value={cat}
              onChange={(e) => setCat(e.target.value)}
              className="mt-2 w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2 text-sm"
            >
              <option value="all">全分野（{EXAM_QUESTIONS.length}問）</option>
              {EXAM_CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}（{EXAM_QUESTIONS.filter((q) => q.category === c).length}問）
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm font-bold">問題数</label>
            <div className="mt-2 flex gap-2">
              {[10, 20, 30].map((n) => (
                <button
                  key={n}
                  onClick={() => setCount(n)}
                  className={
                    'flex-1 rounded-lg border py-2 text-sm font-medium ' +
                    (count === n
                      ? 'border-brand-500 bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-200'
                      : 'border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800')
                  }
                >
                  {n}問
                </button>
              ))}
            </div>
            <p className="mt-1 text-xs text-slate-400">
              選択中の分野には {pool.length} 問。実際の出題は最大 {Math.min(count, pool.length)} 問。
            </p>
          </div>
          <button onClick={start} className="w-full rounded-lg bg-brand-600 py-2.5 text-sm font-bold text-white hover:bg-brand-700">
            開始する
          </button>
        </div>
      </div>
    )
  }

  // 結果画面
  if (done) {
    const score = deck.filter((q, i) => picks[i] === q.answerIndex).length
    const pct = Math.round((score / deck.length) * 100)
    const wrong = deck.map((q, i) => ({ q, i })).filter((x) => picks[x.i] !== x.q.answerIndex)
    return (
      <div className="mx-auto max-w-2xl">
        <div className="text-center">
          <h1 className="text-2xl font-bold">演習結果</h1>
          <div className="my-6">
            <div className="text-5xl font-bold text-brand-600 dark:text-brand-400">{pct}%</div>
            <p className="mt-2 text-slate-500">{deck.length} 問中 {score} 問正解</p>
          </div>
          <div className="flex justify-center gap-3">
            <button onClick={start} className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-bold text-white hover:bg-brand-700">
              同じ条件でもう一度
            </button>
            <button onClick={reset} className="rounded-lg border border-slate-300 dark:border-slate-600 px-4 py-2 text-sm font-bold hover:bg-slate-100 dark:hover:bg-slate-800">
              条件を変える
            </button>
          </div>
        </div>
        {wrong.length > 0 ? (
          <section className="mt-10">
            <h2 className="mb-3 text-lg font-bold">間違えた問題の復習（{wrong.length} 問）</h2>
            <div className="space-y-4">
              {wrong.map(({ q, i }) => (
                <div key={i} className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/40 p-4">
                  <span className="mb-1 inline-block rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-500 dark:bg-slate-700 dark:text-slate-300">{q.category}</span>
                  <p className="font-bold">{q.question}</p>
                  <p className="mt-2 text-sm text-rose-600 dark:text-rose-400">
                    あなたの回答：{picks[i] >= 0 ? q.choices[picks[i]] : '（無回答）'}
                  </p>
                  <p className="mt-1 text-sm text-emerald-600 dark:text-emerald-400">正解：{q.choices[q.answerIndex]}</p>
                  <p className="mt-2 rounded-lg bg-slate-100 dark:bg-slate-800 p-3 text-sm text-slate-600 dark:text-slate-300">{q.explanation}</p>
                </div>
              ))}
            </div>
          </section>
        ) : (
          <p className="mt-8 text-center text-emerald-600 dark:text-emerald-400">全問正解！すばらしい 🎉</p>
        )}
      </div>
    )
  }

  // 出題画面
  const q = deck[idx]
  const isLast = idx === deck.length - 1
  const choose = (i: number) => {
    if (selected !== null) return
    setSelected(i)
  }
  const next = () => {
    const finalPicks = [...picks, selected ?? -1]
    setPicks(finalPicks)
    if (isLast) {
      // 分野別に正答を集計して記録
      const per: Record<string, { correct: number; total: number }> = {}
      deck.forEach((qq, i) => {
        const c = per[qq.category] ?? { correct: 0, total: 0 }
        c.total++
        if (finalPicks[i] === qq.answerIndex) c.correct++
        per[qq.category] = c
      })
      recordExam(per)
      setDone(true)
    } else {
      setIdx(idx + 1)
      setSelected(null)
    }
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="flex items-center justify-between text-sm text-slate-500">
        <h1 className="font-bold">演習（{q.category}）</h1>
        <span>{idx + 1} / {deck.length}</span>
      </div>
      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
        <div className="h-full bg-brand-500 transition-all" style={{ width: `${(idx / deck.length) * 100}%` }} />
      </div>

      <div className="mt-6 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/40 p-5">
        <p className="font-bold leading-relaxed">{q.question}</p>
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
      <div className="mt-4 text-center">
        <button onClick={reset} className="text-xs text-slate-400 hover:underline">中断して条件選択へ戻る</button>
      </div>
    </div>
  )
}
