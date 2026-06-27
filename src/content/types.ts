// ============================================================
// 学習コンテンツのデータモデル
// 1 章 = メタ情報 + 本文(Markdown) + クイズ + 用語 + フラッシュカード
// クイズ / 用語集 / フラッシュカード / 検索インデックスはすべて
// この Chapter 配列から導出され、内容との整合性を担保する。
// ============================================================

/** 確認クイズ 1 問（4 択） */
export interface QuizQuestion {
  id: string
  question: string
  choices: string[]
  /** choices 配列中の正解インデックス */
  answerIndex: number
  /** 正誤に関わらず表示する解説 */
  explanation: string
}

/** 用語集の 1 項目 */
export interface Term {
  term: string
  definition: string
}

/** 暗記用フラッシュカード */
export interface Flashcard {
  id: string
  front: string
  back: string
}

/** 章が属する大グループ（A〜G） */
export interface ChapterGroup {
  id: string // "A"
  title: string // "業界・全体像"
  description: string
}

/** 1 章 */
export interface Chapter {
  /** 一意な URL スラッグ。例 "a1" */
  id: string
  /** 所属グループ ID（A〜G） */
  groupId: string
  title: string
  /** 一覧・検索で使う 1〜2 文の要約 */
  summary: string
  /** 推定学習時間（分） */
  estMinutes: number
  /**
   * 本文（Markdown）。図を挿入したい位置に
   * `[[diagram:キー]]` を 1 行で書くと該当 SVG が描画される。
   */
  body: string
  quiz: QuizQuestion[]
  terms: Term[]
  flashcards: Flashcard[]
}
