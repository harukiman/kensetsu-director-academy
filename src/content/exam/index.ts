import type { ExamQuestion } from './types'
import { examPart1 } from './part1'
import { examPart2 } from './part2'
import { examPart3 } from './part3'
import { examPart4 } from './part4'

export type { ExamQuestion }

export const EXAM_QUESTIONS: ExamQuestion[] = [
  ...examPart1,
  ...examPart2,
  ...examPart3,
  ...examPart4,
]

/** 出題分野（設問が存在する category を出現順で） */
export const EXAM_CATEGORIES: string[] = Array.from(
  new Set(EXAM_QUESTIONS.map((q) => q.category)),
)

export const totalExamQuestions = EXAM_QUESTIONS.length
