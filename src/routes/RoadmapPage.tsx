import { Link } from 'react-router-dom'
import { CHAPTERS } from '../content'
import { useProgress } from '../hooks/ProgressContext'

interface Phase {
  period: string
  title: string
  goal: string
  groupIds: string[]
}

// 新卒〜3ヶ月のオンボーディング順。現場で必要になる順に並べている。
const PHASES: Phase[] = [
  { period: '入社〜2週目', title: 'まず全体像と安全を', goal: '業界構造を理解し、現場で命を守る安全の基本を最優先で押さえる', groupIds: ['A'] },
  { period: '1ヶ月目', title: '建設業法の骨格', goal: '許可・技術者・契約・下請保護など、現場を縛る基本ルールを理解する', groupIds: ['B'] },
  { period: '2ヶ月目', title: '工事管理の実務（QCDSE）', goal: '品質・原価・工程・安全・環境の管理の流れを掴む', groupIds: ['C'] },
  { period: '2〜3ヶ月目', title: '書類・施工体制（ディレクター中核）', goal: '施工体制台帳・写真・電子納品など、自分の主担当業務を習得', groupIds: ['D'] },
  { period: '3ヶ月目以降', title: '制度と最新動向', goal: '建退共・CCUS・2024年問題・改正建設業法まで視野を広げる', groupIds: ['E', 'F'] },
  { period: '実務①（現場の数値とお金）', title: '測量・出来形・品質・積算', goal: '丁張り・出来形管理・品質試験と、積算・数量・原価の実務を身につける', groupIds: ['H', 'I'] },
  { period: '実務②（図面と書類）', title: 'CAD・ICT・契約書類', goal: 'CAD/CIM・ICT施工・電子納品と、標準請負約款・施工計画書・検査の書類実務を習得', groupIds: ['J', 'K'] },
  { period: '実務③（施工技術・工種）', title: '共通施工技術と工種別の施工', goal: '土工・基礎・コンクリート・仮設と、道路/河川/橋梁・トンネル等の工種別施工を深める', groupIds: ['L', 'M', 'N', 'O'] },
  { period: '実務④（安全と環境・法令）', title: '安全衛生と環境・関連法令・維持管理', goal: '掘削・足場・建機の安全、産廃・騒音振動、関連法令、インフラ点検まで広げる', groupIds: ['P', 'Q'] },
  { period: '実務⑤（対人・マネジメント）', title: '現場マネジメント・対人スキル', goal: '初現場の動き方、報連相・折衝・苦情対応、工事成績評定、メンタル・ハラスメントまで身につける', groupIds: ['R'] },
]

export function RoadmapPage() {
  const { state } = useProgress()
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-2xl font-bold">新卒・未経験者の学習ロードマップ</h1>
      <p className="mt-2 text-sm text-slate-500">
        現場で必要になる順に並べた推奨学習順です。上から順に進めれば、未経験でも無理なく全体を習得できます。
      </p>

      <ol className="mt-6 space-y-6">
        {PHASES.map((phase, i) => {
          const chapters = CHAPTERS.filter((c) => phase.groupIds.includes(c.groupId))
          const read = chapters.filter((c) => state.readChapters.includes(c.id)).length
          const allDone = chapters.length > 0 && read === chapters.length
          return (
            <li key={i} className="relative rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/40 p-5">
              <div className="flex items-center gap-3">
                <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-sm font-bold ${allDone ? 'bg-emerald-500 text-white' : 'bg-brand-600 text-white'}`}>
                  {allDone ? '✔' : i + 1}
                </span>
                <div>
                  <div className="text-xs text-brand-600 dark:text-brand-400">{phase.period}</div>
                  <h2 className="font-bold">{phase.title}</h2>
                </div>
                {chapters.length > 0 && (
                  <span className="ml-auto text-xs text-slate-400">{read}/{chapters.length} 章</span>
                )}
              </div>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">🎯 {phase.goal}</p>
              {chapters.length > 0 ? (
                <ul className="mt-3 space-y-1">
                  {chapters.map((c) => (
                    <li key={c.id}>
                      <Link to={`/chapter/${c.id}`} className="text-sm text-brand-600 dark:text-brand-400 hover:underline">
                        {state.readChapters.includes(c.id) ? '✔' : '○'} {c.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-3 text-xs text-slate-400">（コンテンツ準備中）</p>
              )}
            </li>
          )
        })}
      </ol>
    </div>
  )
}
