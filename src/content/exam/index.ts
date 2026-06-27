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

/** 章のグループ ID に対応する演習分野（章末の「関連演習」導線に使う） */
const GROUP_TO_CATEGORY: Record<string, string> = {
  L: '土工・施工',
  M: '専門土木',
  N: '専門土木',
  O: '専門土木',
  B: '法規',
  Q: '法規',
  C: '施工管理法',
  P: '施工管理法',
  H: '施工管理法',
  I: '共通工学',
  J: '共通工学',
  K: '共通工学',
}
export function examCategoryForGroup(groupId: string): string | null {
  const cat = GROUP_TO_CATEGORY[groupId]
  return cat && EXAM_CATEGORIES.includes(cat) ? cat : null
}
