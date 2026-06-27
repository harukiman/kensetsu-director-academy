// ============================================================
// 学習進捗・クイズスコア・フラッシュカード習熟度を localStorage に保存。
// サーバ不要で GitHub Pages 上でも動作する。
// ============================================================

const KEY = 'kda:progress:v1'

export interface QuizResult {
  /** 正答数 */
  correct: number
  /** 出題数 */
  total: number
  /** 最終受験日（ISO 文字列） */
  at: string
}

export interface ProgressState {
  /** 読了した章 ID */
  readChapters: string[]
  /** 章 ID -> 直近クイズ結果 */
  quizResults: Record<string, QuizResult>
  /** フラッシュカード ID -> 習熟度（0:未, 1:あいまい, 2:覚えた） */
  flashcards: Record<string, 0 | 1 | 2>
  /** 学習した日付（YYYY-MM-DD）の配列。連続日数算出に使う */
  studyDays: string[]
}

const empty: ProgressState = {
  readChapters: [],
  quizResults: {},
  flashcards: {},
  studyDays: [],
}

export function loadProgress(): ProgressState {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return { ...empty }
    const parsed = JSON.parse(raw)
    return { ...empty, ...parsed }
  } catch {
    return { ...empty }
  }
}

export function saveProgress(state: ProgressState): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(state))
  } catch {
    /* 容量超過等は無視 */
  }
}

/** 今日の日付（ローカル, YYYY-MM-DD） */
export function todayStr(): string {
  const d = new Date()
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

/** 学習アクティビティを記録（その日を studyDays に追加） */
export function touchStudyDay(state: ProgressState): ProgressState {
  const t = todayStr()
  if (state.studyDays.includes(t)) return state
  return { ...state, studyDays: [...state.studyDays, t] }
}

/** 連続学習日数（今日 or 昨日を起点に遡る） */
export function calcStreak(days: string[]): number {
  if (days.length === 0) return 0
  const set = new Set(days)
  const d = new Date()
  // 今日が無ければ昨日起点で許容
  if (!set.has(fmt(d))) {
    d.setDate(d.getDate() - 1)
    if (!set.has(fmt(d))) return 0
  }
  let streak = 0
  while (set.has(fmt(d))) {
    streak++
    d.setDate(d.getDate() - 1)
  }
  return streak
}

function fmt(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}
