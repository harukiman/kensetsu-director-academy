import { DiagramFrame } from './DiagramFrame'
import { Box, Arrow, Note } from './primitives'

/** 「請負」と「常用（偽装請負）」の指揮命令の違いを対比する図。 */
export function UkeoiVsJoyo() {
  return (
    <DiagramFrame
      title="請負と常用（偽装請負）の違い"
      caption="適法な請負では下請が自社の作業員を指揮する。注文者が下請の作業員へ直接指示すると偽装請負（労働者供給）となり違法。"
    >
      <svg viewBox="0 0 600 300" role="img" aria-label="請負と偽装請負の指揮命令の違いの図">
        {/* 中央の仕切り */}
        <line x1={300} y1={16} x2={300} y2={284} className="stroke-slate-200 dark:stroke-slate-600" strokeWidth={1.5} strokeDasharray="4 4" />

        {/* ── 左：適法な請負 ── */}
        <text x={120} y={24} textAnchor="middle" className="fill-emerald-600 dark:fill-emerald-300" fontSize={13} fontWeight="bold">○ 適法な請負</text>
        <Box x={40} y={40} w={160} h={46} lines={['注文者（元請）']} fill="fill-brand-600" fontSize={13} />
        <Box x={40} y={122} w={160} h={46} lines={['下請の職長']} fill="fill-emerald-500" fontSize={13} />
        <Box x={40} y={204} w={160} h={46} lines={['下請の作業員']} fill="fill-slate-500" fontSize={13} />
        <Arrow x1={120} y1={86} x2={120} y2={120} cls="stroke-slate-500 fill-slate-500" width={2} />
        <text x={128} y={107} textAnchor="start" className="fill-slate-500" fontSize={10} fontWeight="bold">①指示</text>
        <Arrow x1={120} y1={168} x2={120} y2={202} cls="stroke-emerald-500 fill-emerald-500" width={2} />
        <text x={128} y={189} textAnchor="start" className="fill-emerald-600" fontSize={10} fontWeight="bold">②指揮命令</text>

        {/* ── 右：偽装請負（常用） ── */}
        <text x={425} y={24} textAnchor="middle" className="fill-rose-600 dark:fill-rose-300" fontSize={13} fontWeight="bold">× 偽装請負（常用）</text>
        <Box x={350} y={40} w={150} h={46} lines={['注文者']} fill="fill-brand-600" fontSize={13} />
        <Box x={350} y={122} w={150} h={46} lines={['下請の職長']} fill="fill-slate-300" text="fill-slate-500" fontSize={13} />
        <Box x={350} y={204} w={150} h={46} lines={['下請の作業員']} fill="fill-slate-500" fontSize={13} />
        {/* 本来の指揮系統（機能していない＝×） */}
        <line x1={425} y1={86} x2={425} y2={120} className="stroke-slate-300" strokeWidth={2} strokeDasharray="4 4" />
        <line x1={425} y1={168} x2={425} y2={202} className="stroke-slate-300" strokeWidth={2} strokeDasharray="4 4" />
        <text x={425} y={108} textAnchor="middle" className="fill-slate-400" fontSize={13} fontWeight="bold">×</text>
        <text x={425} y={190} textAnchor="middle" className="fill-slate-400" fontSize={13} fontWeight="bold">×</text>
        {/* 注文者が作業員へ直接指示（違法・点線） */}
        <line x1={500} y1={62} x2={532} y2={84} className="stroke-rose-500" strokeWidth={2.5} strokeDasharray="5 4" />
        <line x1={532} y1={84} x2={532} y2={226} className="stroke-rose-500" strokeWidth={2.5} strokeDasharray="5 4" />
        <Arrow x1={532} y1={226} x2={503} y2={240} cls="stroke-rose-500 fill-rose-500" width={2.5} dashed />
        <text x={538} y={148} textAnchor="start" className="fill-rose-600" fontSize={10} fontWeight="bold">直接</text>
        <text x={538} y={164} textAnchor="start" className="fill-rose-600" fontSize={10} fontWeight="bold">指示</text>
        <text x={538} y={180} textAnchor="start" className="fill-rose-600" fontSize={10} fontWeight="bold">＝違法</text>

        <Note x={300} y={278} cls="fill-slate-400">適法＝注文者は職長へ、職長が作業員へ／違法＝注文者が下請作業員へ直接指示（指揮命令）</Note>
      </svg>
    </DiagramFrame>
  )
}
