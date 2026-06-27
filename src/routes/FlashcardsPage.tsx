import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ALL_FLASHCARDS, GROUPS, CHAPTERS, type IndexedCard } from '../content'
import { useProgress } from '../hooks/ProgressContext'

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function FlashcardsPage() {
  const { state, setFlashcard } = useProgress()
  const [groupId, setGroupId] = useState<string>('all')
  const [deck, setDeck] = useState<IndexedCard[] | null>(null)
  const [idx, setIdx] = useState(0)
  const [flipped, setFlipped] = useState(false)

  const availableGroups = useMemo(
    () => GROUPS.filter((g) => CHAPTERS.some((c) => c.groupId === g.id && c.flashcards.length > 0)),
    [],
  )

  const start = () => {
    const pool = groupId === 'all'
      ? ALL_FLASHCARDS
      : ALL_FLASHCARDS.filter((c) => {
          const ch = CHAPTERS.find((x) => x.id === c.chapterId)
          return ch?.groupId === groupId
        })
    setDeck(shuffle(pool))
    setIdx(0)
    setFlipped(false)
  }

  if (ALL_FLASHCARDS.length === 0) {
    return <div className="py-16 text-center text-slate-500">フラッシュカードは準備中です。</div>
  }

  // セットアップ画面
  if (!deck) {
    return (
      <div className="mx-auto max-w-xl">
        <h1 className="text-2xl font-bold">フラッシュカード</h1>
        <p className="mt-2 text-sm text-slate-500">用語・要点を反復暗記。カードをめくって「覚えた / あいまい」を記録できます。</p>
        <div className="mt-6 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/40 p-5">
          <label className="text-sm font-bold">出題範囲</label>
          <select
            value={groupId}
            onChange={(e) => setGroupId(e.target.value)}
            className="mt-2 w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2 text-sm"
          >
            <option value="all">全範囲（{ALL_FLASHCARDS.length} 枚）</option>
            {availableGroups.map((g) => (
              <option key={g.id} value={g.id}>{g.id}. {g.title}</option>
            ))}
          </select>
          <button onClick={start} className="mt-4 w-full rounded-lg bg-brand-600 py-2.5 text-sm font-bold text-white hover:bg-brand-700">
            開始する
          </button>
        </div>
      </div>
    )
  }

  // デッキ終了
  if (idx >= deck.length) {
    return (
      <div className="mx-auto max-w-xl py-10 text-center">
        <h1 className="text-2xl font-bold">完了！</h1>
        <p className="mt-2 text-slate-500">{deck.length} 枚を学習しました。</p>
        <div className="mt-6 flex justify-center gap-3">
          <button onClick={start} className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-bold text-white hover:bg-brand-700">もう一周</button>
          <button onClick={() => setDeck(null)} className="rounded-lg border border-slate-300 dark:border-slate-600 px-4 py-2 text-sm font-bold">範囲を変える</button>
        </div>
      </div>
    )
  }

  const card = deck[idx]
  const level = state.flashcards[card.id] ?? 0

  const grade = (lv: 0 | 1 | 2) => {
    setFlashcard(card.id, lv)
    setIdx(idx + 1)
    setFlipped(false)
  }

  return (
    <div className="mx-auto max-w-xl">
      <div className="flex items-center justify-between text-sm text-slate-500">
        <button onClick={() => setDeck(null)} className="hover:underline">← 範囲選択</button>
        <span>{idx + 1} / {deck.length}</span>
      </div>

      <button
        onClick={() => setFlipped((f) => !f)}
        className="mt-4 flex min-h-[16rem] w-full flex-col items-center justify-center rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 p-6 text-center shadow-sm transition hover:shadow-md"
      >
        <span className="text-xs text-slate-400">{flipped ? '答え' : '問題'}（タップでめくる）</span>
        <span className="mt-4 text-lg font-medium leading-relaxed">{flipped ? card.back : card.front}</span>
        <Link
          to={`/chapter/${card.chapterId}`}
          onClick={(e) => e.stopPropagation()}
          className="mt-4 text-xs text-brand-500 hover:underline"
        >
          出典：{card.chapterTitle}
        </Link>
      </button>

      {level > 0 && (
        <p className="mt-2 text-center text-xs text-slate-400">
          前回：{level === 2 ? '覚えた' : 'あいまい'}
        </p>
      )}

      <div className="mt-5 grid grid-cols-3 gap-2">
        <button onClick={() => grade(0)} className="rounded-lg border border-rose-300 py-2.5 text-sm font-bold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20">まだ</button>
        <button onClick={() => grade(1)} className="rounded-lg border border-amber-300 py-2.5 text-sm font-bold text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/20">あいまい</button>
        <button onClick={() => grade(2)} className="rounded-lg border border-emerald-300 py-2.5 text-sm font-bold text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20">覚えた</button>
      </div>
    </div>
  )
}
