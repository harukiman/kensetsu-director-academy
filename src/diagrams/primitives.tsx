// 図の共通プリミティブ。marker の id 衝突を避けるため、矢印は
// その都度ポリゴンで描画する（複数 SVG が同一ページに乗っても安全）。
import type { ReactNode } from 'react'

/** 角丸ボックス＋中央テキスト（複数行対応） */
export function Box({
  x,
  y,
  w,
  h,
  lines,
  fill = 'fill-brand-600',
  text = 'fill-white',
  rx = 8,
  fontSize = 14,
}: {
  x: number
  y: number
  w: number
  h: number
  lines: string[]
  fill?: string
  text?: string
  rx?: number
  fontSize?: number
}) {
  const cx = x + w / 2
  const total = lines.length
  const lh = fontSize + 4
  const startY = y + h / 2 - ((total - 1) * lh) / 2 + fontSize / 3
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={rx} className={fill} />
      {lines.map((ln, i) => (
        <text
          key={i}
          x={cx}
          y={startY + i * lh}
          textAnchor="middle"
          className={text}
          fontSize={i === 0 ? fontSize : fontSize - 2}
          fontWeight={i === 0 ? 'bold' : 'normal'}
        >
          {ln}
        </text>
      ))}
    </g>
  )
}

/** 直線矢印（始点→終点）。三角の矢じり付き。 */
export function Arrow({
  x1,
  y1,
  x2,
  y2,
  cls = 'stroke-slate-400 fill-slate-400',
  width = 2,
  dashed = false,
}: {
  x1: number
  y1: number
  x2: number
  y2: number
  cls?: string
  width?: number
  dashed?: boolean
}) {
  const angle = Math.atan2(y2 - y1, x2 - x1)
  const size = 7
  // 線は矢じりの手前で止める
  const lx2 = x2 - Math.cos(angle) * size
  const ly2 = y2 - Math.sin(angle) * size
  const p1x = x2 - size * Math.cos(angle - Math.PI / 6)
  const p1y = y2 - size * Math.sin(angle - Math.PI / 6)
  const p2x = x2 - size * Math.cos(angle + Math.PI / 6)
  const p2y = y2 - size * Math.sin(angle + Math.PI / 6)
  return (
    <g className={cls}>
      <line
        x1={x1}
        y1={y1}
        x2={lx2}
        y2={ly2}
        strokeWidth={width}
        strokeDasharray={dashed ? '5 4' : undefined}
      />
      <polygon points={`${x2},${y2} ${p1x},${p1y} ${p2x},${p2y}`} stroke="none" />
    </g>
  )
}

/** 補足テキスト */
export function Note({
  x,
  y,
  children,
  cls = 'fill-slate-500',
  size = 11,
  anchor = 'middle',
}: {
  x: number
  y: number
  children: ReactNode
  cls?: string
  size?: number
  anchor?: 'start' | 'middle' | 'end'
}) {
  return (
    <text x={x} y={y} textAnchor={anchor} className={cls} fontSize={size}>
      {children}
    </text>
  )
}
