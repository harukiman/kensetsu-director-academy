import { DiagramFrame } from './DiagramFrame'
import { Box, Arrow, Note } from './primitives'

/** 道路の断面構成（路体→路床→路盤→舗装の積層） */
export function RoadStructure() {
  // 下から積み上げ。y は上端、h は厚さ。
  const layers = [
    { name: '表層', note: '交通に直接接する', y: 50, h: 25, fill: 'fill-slate-800', text: 'fill-white' },
    { name: '基層', note: '表層を支える', y: 75, h: 30, fill: 'fill-slate-600', text: 'fill-white' },
    { name: '上層路盤', note: '荷重を分散', y: 105, h: 40, fill: 'fill-amber-400', text: 'fill-amber-900' },
    { name: '下層路盤', note: '荷重を分散', y: 145, h: 45, fill: 'fill-amber-300', text: 'fill-amber-900' },
    { name: '路床', note: '路盤を支える地盤', y: 190, h: 50, fill: 'fill-stone-300', text: 'fill-stone-800' },
    { name: '路体', note: '盛土などの本体', y: 240, h: 55, fill: 'fill-stone-400', text: 'fill-stone-900' },
  ]
  const lx = 70
  const lw = 280
  return (
    <DiagramFrame
      title="道路の断面構成"
      caption="下から路体・路床・路盤（下層→上層）・舗装（基層→表層）を積層する。舗装と路盤の境が荷重伝達の要。"
    >
      <svg viewBox="0 0 560 320" role="img" aria-label="道路の断面構成の積層図">
        {layers.map((l) => (
          <g key={l.name}>
            <rect x={lx} y={l.y} width={lw} height={l.h} className={l.fill} />
            <text x={lx + lw / 2} y={l.y + l.h / 2 + 5} textAnchor="middle" className={l.text} fontSize={13} fontWeight="bold">
              {l.name}
            </text>
            {/* 右ラベル */}
            <text x={lx + lw + 16} y={l.y + l.h / 2 + 4} textAnchor="start" className="fill-slate-600 dark:fill-slate-300" fontSize={11}>
              {l.note}
            </text>
          </g>
        ))}

        {/* 舗装と路盤の境（y=105） */}
        <line x1={lx - 6} y1={105} x2={lx + lw + 6} y2={105} className="stroke-rose-500" strokeWidth={2.5} strokeDasharray="6 4" />
        <text x={lx - 12} y={101} textAnchor="end" className="fill-rose-600 dark:fill-rose-300" fontSize={11} fontWeight="bold">
          舗装と路盤の境
        </text>

        {/* 左グルーピング */}
        <line x1={52} y1={50} x2={52} y2={105} className="stroke-slate-500" strokeWidth={2} />
        <text x={30} y={80} textAnchor="middle" className="fill-slate-600 dark:fill-slate-300" fontSize={11} fontWeight="bold" transform="rotate(-90 30 80)">
          舗装
        </text>
        <line x1={52} y1={105} x2={52} y2={190} className="stroke-amber-600" strokeWidth={2} />
        <text x={30} y={148} textAnchor="middle" className="fill-amber-700 dark:fill-amber-300" fontSize={11} fontWeight="bold" transform="rotate(-90 30 148)">
          路盤
        </text>
      </svg>
    </DiagramFrame>
  )
}

/** アスファルト舗装の構成と転圧の流れ */
export function PavementSection() {
  const steps = [
    { ja: '初転圧', fill: 'fill-sky-500' },
    { ja: '二次転圧', fill: 'fill-amber-500' },
    { ja: '仕上げ転圧', fill: 'fill-emerald-500' },
  ]
  const bw = 96
  const gap = 30
  const startX = (560 - (steps.length * bw + (steps.length - 1) * gap)) / 2
  const lx = 80
  const lw = 400
  return (
    <DiagramFrame
      title="アスファルト舗装の構成と転圧"
      caption="表層・基層・路盤を敷き、ローラで初転圧→二次転圧→仕上げ転圧と段階的に締め固めて平坦に仕上げる。"
    >
      <svg viewBox="0 0 560 280" role="img" aria-label="アスファルト舗装の構成と転圧の図">
        {/* 転圧の流れ */}
        {steps.map((s, i) => {
          const x = startX + i * (bw + gap)
          return (
            <g key={s.ja}>
              <Box x={x} y={40} w={bw} h={36} lines={[s.ja]} fill={s.fill} fontSize={13} />
              {i < steps.length - 1 && (
                <Arrow x1={x + bw + 2} y1={58} x2={x + bw + gap - 2} y2={58} cls="stroke-slate-400 fill-slate-400" width={2} />
              )}
            </g>
          )
        })}

        {/* ローラ */}
        <g>
          <rect x={150} y={108} width={50} height={26} rx={4} className="fill-slate-700" />
          <circle cx={175} cy={150} r={16} className="fill-slate-500 stroke-slate-800" strokeWidth={3} />
          <Note x={175} y={102} cls="fill-slate-500" size={10}>ローラ</Note>
        </g>
        <Arrow x1={210} y1={150} x2={300} y2={150} cls="stroke-slate-400 fill-slate-400" width={2} dashed />

        {/* 舗装の構成（層） */}
        {[
          { name: '表層', y: 166, h: 26, fill: 'fill-slate-800', text: 'fill-white' },
          { name: '基層', y: 192, h: 26, fill: 'fill-slate-600', text: 'fill-white' },
          { name: '路盤', y: 218, h: 40, fill: 'fill-amber-300', text: 'fill-amber-900' },
        ].map((l) => (
          <g key={l.name}>
            <rect x={lx} y={l.y} width={lw} height={l.h} className={l.fill} />
            <text x={lx + lw / 2} y={l.y + l.h / 2 + 5} textAnchor="middle" className={l.text} fontSize={13} fontWeight="bold">
              {l.name}
            </text>
            <text x={lx + lw + 14} y={l.y + l.h / 2 + 4} textAnchor="start" className="fill-slate-500" fontSize={11}>
              {l.name === '路盤' ? '舗装を支える' : 'アスファルト混合物'}
            </text>
          </g>
        ))}
      </svg>
    </DiagramFrame>
  )
}

/** 法面保護工の使い分け（植生工と構造物工） */
export function SlopeProtectionTypes() {
  return (
    <DiagramFrame
      title="法面保護工の使い分け"
      caption="緩く崩れにくい法面は植生工、急で崩れやすい法面は吹付・法枠・アンカーなどの構造物工で保護する。"
    >
      <svg viewBox="0 0 560 280" role="img" aria-label="法面保護工の使い分けの図">
        <text x={143} y={26} textAnchor="middle" className="fill-emerald-600 dark:fill-emerald-300" fontSize={13} fontWeight="bold">
          植生工（緩い・浅い）
        </text>
        <text x={417} y={26} textAnchor="middle" className="fill-slate-600 dark:fill-slate-300" fontSize={13} fontWeight="bold">
          構造物工（急・崩れやすい）
        </text>

        {/* ───── 左：植生工（緩い法面） ───── */}
        <polygon points="12,230 12,110 70,110 264,230" className="fill-stone-300 dark:fill-stone-600" />
        {/* 緑（植生） */}
        {[
          [92, 152], [120, 168], [148, 184], [176, 200], [204, 216], [78, 148], [134, 176], [190, 208],
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r={6} className="fill-emerald-500" />
        ))}
        <Note x={150} y={252} cls="fill-emerald-700 dark:fill-emerald-300" size={11}>種子吹付・張芝</Note>

        {/* 仕切り */}
        <line x1={280} y1={40} x2={280} y2={262} className="stroke-slate-300 dark:stroke-slate-600" strokeWidth={1} strokeDasharray="4 4" />

        {/* ───── 右：構造物工（急な法面） ───── */}
        <polygon points="286,230 286,80 430,80 488,230" className="fill-stone-300 dark:fill-stone-600" />
        {/* 法枠（格子）：斜面に沿った格子線 */}
        {[0, 1, 2, 3].map((i) => {
          const t = i / 4
          // 斜面上端線 (430,80)->(488,230)
          const x1 = 430 + (488 - 430) * t
          const y1 = 80 + (230 - 80) * t
          return <line key={`a${i}`} x1={x1} y1={y1} x2={x1 - 26} y2={y1 + 18} className="stroke-slate-500" strokeWidth={2} />
        })}
        {[1, 2, 3, 4].map((i) => {
          const t = i / 5
          const x1 = 430 + (488 - 430) * t
          const y1 = 80 + (230 - 80) * t
          return <line key={`b${i}`} x1={x1} y1={y1} x2={x1 + 18} y2={y1 + 26} className="stroke-slate-500" strokeWidth={2} />
        })}
        {/* アンカー（地山へ） */}
        <Arrow x1={452} y1={150} x2={418} y2={196} cls="stroke-rose-500 fill-rose-500" width={2} />
        <Note x={417} y={252} cls="fill-slate-600 dark:fill-slate-300" size={11}>吹付・法枠・アンカー</Note>
      </svg>
    </DiagramFrame>
  )
}

/** 擁壁の種類（重力式・L型・補強土壁）の断面対比 */
export function RetainingWallTypes() {
  const panels = [
    { px: 12, title: '重力式', type: 'gravity', tcls: 'fill-slate-600 dark:fill-slate-300' },
    { px: 192, title: 'L型（片持ばり）', type: 'lshape', tcls: 'fill-sky-600 dark:fill-sky-300' },
    { px: 372, title: '補強土壁', type: 'rsoil', tcls: 'fill-emerald-600 dark:fill-emerald-300' },
  ] as const
  return (
    <DiagramFrame
      title="擁壁の種類"
      caption="重力式は自重で、L型は底版上の土の重さで、補強土壁は引張材で土を一体化して土圧に抵抗する。"
    >
      <svg viewBox="0 0 560 260" role="img" aria-label="擁壁の種類の断面対比の図">
        {panels.map((p) => {
          const cx = p.px + 86
          return (
            <g key={p.title}>
              <text x={cx} y={34} textAnchor="middle" className={p.tcls} fontSize={13} fontWeight="bold">
                {p.title}
              </text>
              {/* 地盤線 */}
              <line x1={p.px + 8} y1={210} x2={p.px + 164} y2={210} className="stroke-slate-400" strokeWidth={1.5} />

              {p.type === 'gravity' && (
                <g>
                  {/* 裏込め土 */}
                  <rect x={p.px + 80} y={70} width={84} height={140} className="fill-amber-200 dark:fill-amber-800" />
                  {/* 重力式擁壁（台形） */}
                  <polygon points={`${p.px + 36},210 ${p.px + 84},210 ${p.px + 70},70 ${p.px + 52},70`} className="fill-slate-500" />
                  {/* 水抜き */}
                  <Arrow x1={p.px + 60} y1={190} x2={p.px + 38} y2={196} cls="stroke-sky-500 fill-sky-500" width={1.5} />
                  <Note x={p.px + 120} y={130} cls="fill-amber-800 dark:fill-amber-200" size={10}>裏込め</Note>
                  <Note x={p.px + 30} y={186} anchor="end" cls="fill-sky-600 dark:fill-sky-300" size={10}>水抜き</Note>
                </g>
              )}
              {p.type === 'lshape' && (
                <g>
                  {/* 裏込め土（踵版上） */}
                  <rect x={p.px + 60} y={70} width={104} height={126} className="fill-amber-200 dark:fill-amber-800" />
                  {/* 底版 */}
                  <rect x={p.px + 40} y={196} width={100} height={14} className="fill-slate-500" />
                  {/* 縦壁（たて版） */}
                  <rect x={p.px + 48} y={70} width={14} height={126} className="fill-slate-500" />
                  <Arrow x1={p.px + 56} y1={185} x2={p.px + 34} y2={190} cls="stroke-sky-500 fill-sky-500" width={1.5} />
                  <Note x={p.px + 112} y={135} cls="fill-amber-800 dark:fill-amber-200" size={10}>裏込め</Note>
                  <Note x={p.px + 28} y={182} anchor="end" cls="fill-sky-600 dark:fill-sky-300" size={10}>水抜き</Note>
                </g>
              )}
              {p.type === 'rsoil' && (
                <g>
                  {/* 補強土（盛土） */}
                  <rect x={p.px + 42} y={70} width={122} height={140} className="fill-amber-200 dark:fill-amber-800" />
                  {/* 壁面材 */}
                  <rect x={p.px + 34} y={70} width={10} height={140} className="fill-emerald-600" />
                  {/* 補強材（横引張材） */}
                  {[92, 116, 140, 164, 188].map((y) => (
                    <line key={y} x1={p.px + 44} y1={y} x2={p.px + 150} y2={y} className="stroke-emerald-700" strokeWidth={2} strokeDasharray="3 3" />
                  ))}
                  <Note x={p.px + 110} y={64} cls="fill-emerald-700 dark:fill-emerald-300" size={10}>補強材で土を一体化</Note>
                </g>
              )}
            </g>
          )
        })}
      </svg>
    </DiagramFrame>
  )
}
