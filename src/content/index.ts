import type { Chapter, Flashcard, QuizQuestion, Term } from './types'
import { GROUPS } from './groups'
import { chaptersA } from './chapters/groupA'
import { chaptersB } from './chapters/groupB'
import { chaptersC } from './chapters/groupC'
import { chaptersD } from './chapters/groupD'
import { chaptersE } from './chapters/groupE'
import { chaptersF } from './chapters/groupF'
import { chaptersG } from './chapters/groupG'
import { EXTRA_TERMS } from './glossaryExtra'

/** 全章（章立て順） */
export const CHAPTERS: Chapter[] = [
  ...chaptersA,
  ...chaptersB,
  ...chaptersC,
  ...chaptersD,
  ...chaptersE,
  ...chaptersF,
  ...chaptersG,
]

export const chapterById = (id: string) => CHAPTERS.find((c) => c.id === id)

export const chaptersOfGroup = (groupId: string) =>
  CHAPTERS.filter((c) => c.groupId === groupId)

/** 前後の章（章ナビ用） */
export function neighbors(id: string): { prev?: Chapter; next?: Chapter } {
  const i = CHAPTERS.findIndex((c) => c.id === id)
  if (i < 0) return {}
  return { prev: CHAPTERS[i - 1], next: CHAPTERS[i + 1] }
}

// ===== 派生データ（章から導出） =====

/** 全クイズ（章 ID を付与） */
export interface IndexedQuestion extends QuizQuestion {
  chapterId: string
  chapterTitle: string
}
export const ALL_QUESTIONS: IndexedQuestion[] = CHAPTERS.flatMap((c) =>
  c.quiz.map((q) => ({ ...q, chapterId: c.id, chapterTitle: c.title })),
)

/** 全フラッシュカード */
export interface IndexedCard extends Flashcard {
  chapterId: string
  chapterTitle: string
}
export const ALL_FLASHCARDS: IndexedCard[] = CHAPTERS.flatMap((c) =>
  c.flashcards.map((f) => ({ ...f, chapterId: c.id, chapterTitle: c.title })),
)

/** 用語集（章の用語 + 追加用語を統合し、読み順でソート） */
export interface IndexedTerm extends Term {
  chapterId?: string
  chapterTitle?: string
}
export const ALL_TERMS: IndexedTerm[] = (() => {
  const fromChapters: IndexedTerm[] = CHAPTERS.flatMap((c) =>
    c.terms.map((t) => ({ ...t, chapterId: c.id, chapterTitle: c.title })),
  )
  const merged = [...fromChapters, ...EXTRA_TERMS]
  // 同名用語は最初の定義を優先して重複排除
  const seen = new Set<string>()
  const out: IndexedTerm[] = []
  for (const t of merged) {
    if (seen.has(t.term)) continue
    seen.add(t.term)
    out.push(t)
  }
  return out.sort((a, b) =>
    (a.reading ?? a.term).localeCompare(b.reading ?? b.term, 'ja'),
  )
})()

export const totalChapters = CHAPTERS.length
export const totalQuestions = ALL_QUESTIONS.length
export const totalTerms = ALL_TERMS.length
export const totalFlashcards = ALL_FLASHCARDS.length

export { GROUPS }
