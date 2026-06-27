import { DiagramFrame } from './DiagramFrame'
import { Box, Arrow, Note } from './primitives'

/** 2024年問題（時間外労働の上限規制） */
export function WorkStyle2024() {
  return (
    <DiagramFrame
      title="2024年問題（時間外労働の上限規制）"
      caption="建設業にも2024年4月から時間外労働の上限規制が適用。原則と特別条項の上限を超えられない。"
    >
      <svg viewBox="0 0 560 270" role="img" aria-label="2024年問題 時間外労働上限の図">
        <Note x={280} y={30} cls="fill-rose-600" size={14}>2024年4月 建設業に適用</Note>

        <rect x={40} y={56} width={220} height={150} rx={8} className="fill-slate-100 dark:fill-slate-700/40 stroke-slate-300" strokeWidth={1.5} />
        <text x={150} y={84} textAnchor="middle" className="fill-slate-700 dark:fill-slate-200" fontSize={13} fontWeight="bold">原則</text>
        <rect x={70} y={150} width={160} height={40} rx={6} className="fill-brand-500" />
        <text x={150} y={175} textAnchor="middle" className="fill-white" fontSize={13} fontWeight="bold">月45h / 年360h</text>
        <text x={150} y={118} textAnchor="middle" className="fill-slate-500 dark:fill-slate-400" fontSize={11}>通常の上限</text>

        <rect x={300} y={56} width={220} height={150} rx={8} className="fill-rose-50 dark:fill-rose-900/30 stroke-rose-300" strokeWidth={1.5} />
        <text x={410} y={84} textAnchor="middle" className="fill-rose-700 dark:fill-rose-300" fontSize={13} fontWeight="bold">特別条項</text>
        <rect x={320} y={120} width={180} height={70} rx={6} className="fill-rose-500" />
        <text x={410} y={150} textAnchor="middle" className="fill-white" fontSize={13} fontWeight="bold">年720h 以内</text>
        <text x={410} y={172} textAnchor="middle" className="fill-white/90" fontSize={11}>これを超えると違反</text>

        <Note x={280} y={236} cls="fill-slate-500">罰則付き。工期設定・週休2日など働き方改革が必須に</Note>
      </svg>
    </DiagramFrame>
  )
}

/** 担い手3法の変遷タイムライン */
export function Ninote3Law() {
  return (
    <DiagramFrame
      title="担い手3法の変遷"
      caption="2014年の担い手3法から改正を重ね、2024年の第3次改正で標準労務費やスライド協議が導入された。"
    >
      <svg viewBox="0 0 580 230" role="img" aria-label="担い手3法の変遷タイムラインの図">
        <line x1={40} y1={70} x2={540} y2={70} className="stroke-slate-300" strokeWidth={3} />

        <Box x={30} y={44} w={150} h={52} lines={['2014', '担い手3法']} fill="fill-brand-400" fontSize={13} />
        <Box x={205} y={44} w={150} h={52} lines={['2019', '新・担い手3法']} fill="fill-brand-500" fontSize={13} />
        <Box x={400} y={44} w={150} h={52} lines={['2024', '第3次（改正建設業法）']} fill="fill-brand-700" fontSize={12} />

        <Arrow x1={180} y1={70} x2={205} y2={70} />
        <Arrow x1={355} y1={70} x2={400} y2={70} />

        <rect x={355} y={120} width={195} height={86} rx={8} className="fill-amber-50 dark:fill-amber-900/30 stroke-amber-400" strokeWidth={1.5} />
        <text x={452} y={144} textAnchor="middle" className="fill-amber-700 dark:fill-amber-300" fontSize={12} fontWeight="bold">第3次のポイント</text>
        <text x={452} y={164} textAnchor="middle" className="fill-amber-600 dark:fill-amber-400" fontSize={11}>・標準労務費</text>
        <text x={452} y={181} textAnchor="middle" className="fill-amber-600 dark:fill-amber-400" fontSize={11}>・スライド協議</text>
        <text x={452} y={198} textAnchor="middle" className="fill-amber-600 dark:fill-amber-400" fontSize={11}>・働き方改革</text>
        <Arrow x1={475} y1={96} x2={460} y2={120} />

        <Note x={200} y={150} cls="fill-slate-500" size={11}>担い手の確保・育成と</Note>
        <Note x={200} y={166} cls="fill-slate-500" size={11}>処遇改善を段階的に強化</Note>
      </svg>
    </DiagramFrame>
  )
}

/** 建設DX（i-Construction）の全体像 */
export function IConstruction() {
  const flow = [
    { x: 20, label: '調査・測量', sub: 'ドローン測量', fill: 'fill-brand-400' },
    { x: 165, label: '設計', sub: '3次元設計データ', fill: 'fill-brand-500' },
    { x: 310, label: '施工', sub: 'ICT建機', fill: 'fill-brand-600' },
    { x: 455, label: '管理', sub: '3次元出来形管理', fill: 'fill-brand-700' },
  ]
  return (
    <DiagramFrame
      title="建設DX・i-Construction の全体像"
      caption="調査・測量から管理まで3次元データで一貫処理。ICT施工とBIM/CIMで省人化と生産性向上を図る。"
    >
      <svg viewBox="0 0 580 250" role="img" aria-label="i-Construction 建設DXの図">
        <Note x={290} y={26} cls="fill-brand-700" size={13}>i-Construction（ICT施工の流れ）</Note>
        {flow.map((f, i) => (
          <g key={f.label}>
            <Box x={f.x} y={48} w={105} h={64} lines={[f.label, f.sub]} fill={f.fill} fontSize={13} />
            {i < flow.length - 1 && <Arrow x1={f.x + 105} y1={80} x2={f.x + 145} y2={80} />}
          </g>
        ))}

        <rect x={90} y={140} width={400} height={44} rx={8} className="fill-slate-100 dark:fill-slate-700/40 stroke-slate-300" strokeWidth={1.5} />
        <text x={290} y={167} textAnchor="middle" className="fill-slate-700 dark:fill-slate-200" fontSize={13} fontWeight="bold">BIM / CIM（3次元モデルで全工程を統合）</text>
        <Arrow x1={290} y1={112} x2={290} y2={140} />

        <Note x={290} y={214} cls="fill-emerald-600" size={12}>省人化・生産性向上を実現</Note>
      </svg>
    </DiagramFrame>
  )
}
