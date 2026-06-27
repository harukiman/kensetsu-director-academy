import { DiagramFrame } from './DiagramFrame'
import { Box, Arrow, Note } from './primitives'

/** 建設副産物の分類と行き先 */
export function ConstructionByproducts() {
  const items = [
    { ja: '建設発生土', fill: 'fill-amber-500' },
    { ja: 'コンクリート塊', fill: 'fill-slate-500' },
    { ja: 'アスファルト塊', fill: 'fill-slate-600' },
    { ja: '建設汚泥', fill: 'fill-orange-500' },
    { ja: '建設混合廃棄物', fill: 'fill-rose-500' },
  ]
  const boxW = 98
  const gap = 8
  const totalW = items.length * boxW + (items.length - 1) * gap
  const startX = (560 - totalW) / 2
  const topY = 40
  const topH = 50
  const destY = 222
  const destH = 50
  const recycleX = 70
  const recycleW = 190
  const disposalX = 300
  const disposalW = 190
  const cx = (x: number) => x + boxW / 2
  return (
    <DiagramFrame
      title="建設副産物の分類と行き先"
      caption="建設副産物は再資源化（リサイクル）と適正処理（産廃マニフェスト）に振り分けて管理する。"
    >
      <svg viewBox="0 0 560 300" role="img" aria-label="建設副産物の分類と再資源化・適正処理への流れの図">
        {items.map((it, i) => (
          <Box key={it.ja} x={startX + i * (boxW + gap)} y={topY} w={boxW} h={topH} lines={[it.ja]} fill={it.fill} fontSize={12} />
        ))}

        {/* 再資源化へ（発生土・コン塊・アス塊） */}
        {[0, 1, 2].map((i) => (
          <Arrow
            key={`r${i}`}
            x1={cx(startX + i * (boxW + gap))}
            y1={topY + topH}
            x2={recycleX + recycleW / 2}
            y2={destY}
            cls="stroke-emerald-500 fill-emerald-500"
            width={1.6}
          />
        ))}
        {/* 建設汚泥は両方へ */}
        <Arrow x1={cx(startX + 3 * (boxW + gap))} y1={topY + topH} x2={recycleX + recycleW / 2 + 30} y2={destY} cls="stroke-amber-500 fill-amber-500" width={1.6} />
        <Arrow x1={cx(startX + 3 * (boxW + gap))} y1={topY + topH} x2={disposalX + disposalW / 2 - 30} y2={destY} cls="stroke-amber-500 fill-amber-500" width={1.6} />
        {/* 混合廃棄物は適正処理へ */}
        <Arrow x1={cx(startX + 4 * (boxW + gap))} y1={topY + topH} x2={disposalX + disposalW / 2} y2={destY} cls="stroke-rose-500 fill-rose-500" width={1.6} />

        {/* 行き先 */}
        <Box x={recycleX} y={destY} w={recycleW} h={destH} lines={['再資源化', 'リサイクル']} fill="fill-emerald-600" fontSize={15} />
        <Box x={disposalX} y={destY} w={disposalW} h={destH} lines={['適正処理', '産廃マニフェスト']} fill="fill-rose-600" fontSize={15} />

        <Note x={280} y={296} cls="fill-slate-400">※ 建設汚泥は中間処理を経て再資源化または最終処分される</Note>
      </svg>
    </DiagramFrame>
  )
}

/** 関連法令の横断マップ（放射状） */
export function RelatedLaws() {
  const cx = 280
  const cy = 170
  const rx = 205
  const ry = 120
  const laws = [
    { ja: '建設業法', rel: '許可・契約' },
    { ja: '労働安全衛生法', rel: '現場の安全' },
    { ja: '建設リサイクル法', rel: '分別解体' },
    { ja: '道路法', rel: '道路占用' },
    { ja: '河川法', rel: '河川区域' },
    { ja: '廃棄物処理法', rel: '産廃の処理' },
    { ja: '騒音・振動規制法', rel: '特定建設作業' },
  ]
  const boxW = 116
  const boxH = 44
  return (
    <DiagramFrame
      title="土木工事に関わる関連法令"
      caption="土木工事は多くの法令が横断的に関わる。中央の工事を取り巻く各法のポイントを押さえる。"
    >
      <svg viewBox="0 0 560 340" role="img" aria-label="土木工事に関わる関連法令の放射状マップ">
        {laws.map((_, i) => {
          const ang = (-90 + i * (360 / laws.length)) * (Math.PI / 180)
          const px = cx + rx * Math.cos(ang)
          const py = cy + ry * Math.sin(ang)
          return <line key={`l${i}`} x1={cx} y1={cy} x2={px} y2={py} className="stroke-slate-300" strokeWidth={1.5} />
        })}
        {laws.map((l, i) => {
          const ang = (-90 + i * (360 / laws.length)) * (Math.PI / 180)
          const px = cx + rx * Math.cos(ang)
          const py = cy + ry * Math.sin(ang)
          return (
            <Box
              key={l.ja}
              x={px - boxW / 2}
              y={py - boxH / 2}
              w={boxW}
              h={boxH}
              lines={[l.ja, l.rel]}
              fill="fill-sky-600"
              fontSize={11}
            />
          )
        })}
        {/* 中央 */}
        <Box x={cx - 64} y={cy - 28} w={128} h={56} lines={['土木工事']} fill="fill-brand-600" fontSize={18} />
      </svg>
    </DiagramFrame>
  )
}

/** インフラ維持管理サイクル（点検→診断→措置→記録） */
export function InspectionCycle() {
  const nodes = [
    { x: 280, y: 40, w: 150, h: 56, lines: ['点検', '5年に1回・近接目視'], fill: 'fill-sky-600' },
    { x: 470, y: 160, w: 140, h: 56, lines: ['診断', '判定区分 I〜IV'], fill: 'fill-brand-600' },
    { x: 280, y: 280, w: 150, h: 56, lines: ['措置', '補修・補強'], fill: 'fill-emerald-600' },
    { x: 90, y: 160, w: 140, h: 56, lines: ['記録', '次回点検へ'], fill: 'fill-slate-500' },
  ]
  const ranks = [
    { r: 'I', t: '健全', fill: 'fill-emerald-500' },
    { r: 'II', t: '予防', fill: 'fill-brand-500' },
    { r: 'III', t: '早期', fill: 'fill-amber-500' },
    { r: 'IV', t: '緊急', fill: 'fill-rose-500' },
  ]
  return (
    <DiagramFrame
      title="インフラ維持管理サイクル"
      caption="点検→診断→措置→記録を繰り返してインフラを長く保つ。診断の判定区分I（健全）〜IV（緊急）で対応を決める。"
    >
      <svg viewBox="0 0 560 320" role="img" aria-label="インフラ維持管理の点検診断措置記録の循環図">
        {/* 循環の矢印（時計回り） */}
        <Arrow x1={358} y1={58} x2={418} y2={132} cls="stroke-slate-400 fill-slate-400" width={2.5} />
        <Arrow x1={462} y1={188} x2={352} y2={262} cls="stroke-slate-400 fill-slate-400" width={2.5} />
        <Arrow x1={208} y1={282} x2={108} y2={188} cls="stroke-slate-400 fill-slate-400" width={2.5} />
        <Arrow x1={122} y1={132} x2={210} y2={60} cls="stroke-slate-400 fill-slate-400" width={2.5} />

        {nodes.map((n) => (
          <Box key={n.lines[0]} x={n.x - n.w / 2} y={n.y - n.h / 2} w={n.w} h={n.h} lines={n.lines} fill={n.fill} fontSize={16} />
        ))}

        {/* 判定区分 凡例（中央） */}
        <Note x={280} y={138} cls="fill-slate-500" size={11}>判定区分（健全→緊急）</Note>
        {ranks.map((rk, i) => {
          const x = 214 + i * 44
          return (
            <g key={rk.r}>
              <rect x={x} y={150} width={26} height={22} rx={4} className={rk.fill} />
              <text x={x + 13} y={166} textAnchor="middle" className="fill-white" fontSize={11} fontWeight="bold">{rk.r}</text>
              <text x={x + 13} y={186} textAnchor="middle" className="fill-slate-500 dark:fill-slate-400" fontSize={9}>{rk.t}</text>
            </g>
          )
        })}
      </svg>
    </DiagramFrame>
  )
}
