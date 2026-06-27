// 演習（模擬試験）用の設問。章のクイズとは別に、分野別の演習バンクを持つ。
export interface ExamQuestion {
  id: string
  /** 分野。フィルタ表示に使う（例：土工・施工 / 専門土木 / 法規 / 施工管理法 / 共通工学） */
  category: string
  question: string
  choices: string[]
  answerIndex: number
  explanation: string
}
