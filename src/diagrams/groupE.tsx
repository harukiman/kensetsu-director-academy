import { DiagramFrame } from './DiagramFrame'
import { Box, Arrow, Note } from './primitives'

/** 建退共（建設業退職金共済）の仕組み */
export function TaikyoFlow() {
  return (
    <DiagramFrame
      title="建退共（建設業退職金共済）の仕組み"
      caption="事業主が掛金を負担し、就労実績を記録。業界内で転職しても通算され、退職時に退職金を受け取れる。"
    >
      <svg viewBox="0 0 560 300" role="img" aria-label="建退共の仕組みの図">
        <Box x={30} y={40} w={150} h={64} lines={['事業主', '掛金を負担']} fill="fill-brand-600" />
        <Box x={205} y={20} w={150} h={50} lines={['従来：共済証紙', '退職金手帳に貼付']} fill="fill-slate-500" fontSize={12} />
        <Box x={205} y={80} w={150} h={50} lines={['近年：電子申請', '就労日数を記録']} fill="fill-blue-500" fontSize={12} />
        <Box x={380} y={40} w={150} h={64} lines={['労働者', '実績を積み上げ']} fill="fill-brand-500" />

        <Arrow x1={180} y1={62} x2={205} y2={45} />
        <Arrow x1={180} y1={82} x2={205} y2={105} />
        <Arrow x1={355} y1={45} x2={380} y2={62} />
        <Arrow x1={355} y1={105} x2={380} y2={82} />

        <Box x={150} y={170} w={260} h={56} lines={['業界内で転職しても通算', '（A社→B社→C社）']} fill="fill-slate-400" fontSize={13} />
        <Arrow x1={455} y1={104} x2={410} y2={172} />
        <Box x={150} y={246} w={260} h={42} lines={['退職時に退職金を受け取る']} fill="fill-amber-400" text="fill-slate-900" fontSize={13} />
        <Arrow x1={280} y1={226} x2={280} y2={246} />
      </svg>
    </DiagramFrame>
  )
}

/** CCUS 技能者レベル4段階 */
export function CcusLevels() {
  const levels = [
    { y: 198, lv: 'レベル1', label: '初級技能者', fill: 'fill-slate-100 stroke-slate-400', text: 'fill-slate-700' },
    { y: 148, lv: 'レベル2', label: '中堅技能者', fill: 'fill-blue-500', text: 'fill-white' },
    { y: 98, lv: 'レベル3', label: '職長クラス', fill: 'fill-slate-400', text: 'fill-white' },
    { y: 48, lv: 'レベル4', label: '登録基幹技能者', fill: 'fill-amber-400', text: 'fill-slate-900' },
  ]
  return (
    <DiagramFrame
      title="CCUS 技能者レベル（4段階）"
      caption="建設キャリアアップシステムは就業履歴・保有資格でレベルを判定。経験を積み下から上へレベルアップする。"
    >
      <svg viewBox="0 0 560 280" role="img" aria-label="CCUS技能者レベルの図">
        {levels.map((l) => (
          <g key={l.lv}>
            <rect x={150} y={l.y} width={260} height={42} rx={8} className={l.fill} strokeWidth={1.5} />
            <text x={210} y={l.y + 26} textAnchor="middle" className={l.text} fontSize={14} fontWeight="bold">{l.lv}</text>
            <text x={330} y={l.y + 26} textAnchor="middle" className={l.text} fontSize={12}>{l.label}</text>
          </g>
        ))}
        <Arrow x1={430} y1={220} x2={430} y2={48} cls="stroke-brand-500 fill-brand-500" width={2.5} />
        <Note x={446} y={140} anchor="start" cls="fill-brand-600" size={11}>経験・資格で</Note>
        <Note x={446} y={156} anchor="start" cls="fill-brand-600" size={11}>レベルアップ</Note>
        <Note x={280} y={266} cls="fill-slate-500">白→青→銀→金の順に技能・処遇が高まる</Note>
      </svg>
    </DiagramFrame>
  )
}

/** 建設業の社会保険3点と加入の重要性 */
export function InsuranceCoverage() {
  const items = [
    { x: 30, label: '雇用保険', sub: '失業に備える', fill: 'fill-brand-500' },
    { x: 205, label: '健康保険', sub: '医療費を補助', fill: 'fill-brand-600' },
    { x: 380, label: '厚生年金', sub: '老後の年金', fill: 'fill-brand-700' },
  ]
  return (
    <DiagramFrame
      title="建設業の社会保険3点と加入の重要性"
      caption="社会保険への加入は建設業許可や現場入場の要件。未加入だと現場に入れない場合がある。"
    >
      <svg viewBox="0 0 560 240" role="img" aria-label="社会保険3点の図">
        <Note x={280} y={28} cls="fill-slate-600" size={13}>社会保険3点セット</Note>
        {items.map((it) => (
          <Box key={it.label} x={it.x} y={48} w={150} h={64} lines={[it.label, it.sub]} fill={it.fill} />
        ))}
        <Arrow x1={105} y1={112} x2={230} y2={150} />
        <Arrow x1={280} y1={112} x2={280} y2={150} />
        <Arrow x1={455} y1={112} x2={330} y2={150} />
        <rect x={130} y={152} width={300} height={64} rx={8} className="fill-amber-50 dark:fill-amber-900/30 stroke-amber-400" strokeWidth={1.5} />
        <text x={280} y={178} textAnchor="middle" className="fill-amber-700 dark:fill-amber-300" fontSize={14} fontWeight="bold">許可・現場入場の要件</text>
        <text x={280} y={200} textAnchor="middle" className="fill-amber-600 dark:fill-amber-400" fontSize={12}>未加入は許可更新・入場に支障</text>
      </svg>
    </DiagramFrame>
  )
}
