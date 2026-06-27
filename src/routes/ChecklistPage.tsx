import { useState } from 'react'

interface ChecklistDef {
  title: string
  note: string
  items: string[]
}

// 現場で使う実務チェックリスト（学習＋実務補助）。
const CHECKLISTS: ChecklistDef[] = [
  {
    title: '新規入場時に準備するもの',
    note: '初めて入る現場で求められる書類・手続き。元請の指示で内容は前後する。',
    items: [
      '新規入場者教育の受講',
      '作業員名簿・施工体制への登録',
      '社会保険の加入状況の確認資料',
      'CCUS カードの登録・タッチ',
      '健康診断結果（必要に応じ）',
      '保護具（ヘルメット・安全帯／フルハーネス・安全靴）の確認',
    ],
  },
  {
    title: '毎朝（朝礼・作業開始前）',
    note: '安全管理の基本サイクル。KY と体調確認を欠かさない。',
    items: [
      'ラジオ体操・健康状態の確認（体調・アルコール）',
      '当日の作業内容・工程の共有',
      'KY（危険予知）活動の実施',
      '使用する重機・工具・足場の始業前点検',
      '関係者・他職との作業調整（合図・立入禁止）',
      '当日の気象（熱中症・強風・降雨）への対応確認',
    ],
  },
  {
    title: '作業終了時',
    note: '片付けと翌日への引き継ぎ。',
    items: [
      '整理整頓・清掃（4S）',
      '工具・重機の終業点検と施錠',
      '出来高・進捗の記録、工事写真の撮影',
      '翌日の段取り・資材手配の確認',
      'ヒヤリハットの報告',
    ],
  },
  {
    title: '主要書類の提出タイミング',
    note: '提出先・期限は契約・元請ルールにより異なるため必ず確認すること。',
    items: [
      '着工前：施工計画書・施工体制台帳・再下請負通知書',
      '着工前：作業員名簿・有資格者の資格証写し',
      '随時：工事写真（出来形・品質・安全）',
      '随時：材料の品質証明・ミルシート等',
      '完成時：出来形管理資料・竣工図・各種検査記録',
      '完成後：電子納品データ（公共工事）',
    ],
  },
]

export function ChecklistPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">現場チェックリスト</h1>
        <button
          onClick={() => window.print()}
          className="no-print rounded-lg border border-slate-300 dark:border-slate-600 px-3 py-1.5 text-sm hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          🖨 印刷
        </button>
      </div>
      <p className="mt-2 text-sm text-slate-500">
        実務で使える確認リスト。チェックは一時的な目印で、保存はされません。提出先・期限は必ず元請・契約で確認してください。
      </p>

      <div className="mt-6 space-y-6">
        {CHECKLISTS.map((cl, i) => (
          <Checklist key={i} def={cl} />
        ))}
      </div>
    </div>
  )
}

function Checklist({ def }: { def: ChecklistDef }) {
  const [checked, setChecked] = useState<boolean[]>(() => def.items.map(() => false))
  const doneCount = checked.filter(Boolean).length
  return (
    <section className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/40 p-5">
      <div className="flex items-center justify-between">
        <h2 className="font-bold">{def.title}</h2>
        <span className="text-xs text-slate-400">{doneCount}/{def.items.length}</span>
      </div>
      <p className="mt-1 text-xs text-slate-500">{def.note}</p>
      <ul className="mt-3 space-y-1.5">
        {def.items.map((item, i) => (
          <li key={i}>
            <label className="flex cursor-pointer items-start gap-2 rounded-lg px-2 py-1.5 hover:bg-slate-100 dark:hover:bg-slate-800">
              <input
                type="checkbox"
                checked={checked[i]}
                onChange={() => setChecked((prev) => prev.map((v, j) => (j === i ? !v : v)))}
                className="mt-1 h-4 w-4 accent-brand-600"
              />
              <span className={`text-sm ${checked[i] ? 'text-slate-400 line-through' : ''}`}>{item}</span>
            </label>
          </li>
        ))}
      </ul>
    </section>
  )
}
