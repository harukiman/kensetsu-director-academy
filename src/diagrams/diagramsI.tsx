import { DiagramFrame } from './DiagramFrame'
import { Arrow, Note } from './primitives'

/** 工事費の構成。各費用を積み上げて請負工事費に至る階層を、棒とブラケットで表す。 */
export function CostStructure() {
  // 横棒の5区分（左→右に積み上げ）
  const segs = [
    { name: '直接工事費', w: 200, fill: 'fill-brand-600', fs: 12 },
    { name: '共通仮設費', w: 60, fill: 'fill-brand-400', fs: 9 },
    { name: '現場管理費', w: 90, fill: 'fill-sky-500', fs: 9 },
    { name: '一般管理費等', w: 80, fill: 'fill-emerald-500', fs: 9 },
    { name: '消費税', w: 50, fill: 'fill-amber-500', fs: 9 },
  ]
  const x0 = 40
  const barY = 52
  const barH = 40
  // 累積の境界x
  let acc = x0
  const edge: number[] = [x0]
  segs.forEach((s) => {
    acc += s.w
    edge.push(acc)
  })
  // ブラケット：純工事費(〜2)、工事原価(〜3)、工事価格(〜4)、請負工事費(〜5)
  const brackets = [
    { to: edge[2], y: 128, label: '純工事費', cls: 'stroke-brand-500 fill-brand-600' },
    { to: edge[3], y: 162, label: '工事原価', cls: 'stroke-sky-500 fill-sky-600' },
    { to: edge[4], y: 196, label: '工事価格', cls: 'stroke-emerald-500 fill-emerald-600' },
    { to: edge[5], y: 230, label: '請負工事費', cls: 'stroke-amber-500 fill-amber-600' },
  ]
  return (
    <DiagramFrame
      title="工事費の構成"
      caption="直接工事費に各費用を順に積み上げ、純工事費→工事原価→工事価格→請負工事費（税込）へと積算していく。"
    >
      <svg viewBox="0 0 560 280" role="img" aria-label="工事費の構成の積み上げ図">
        {/* 積み上げ棒 */}
        {segs.map((s, i) => (
          <g key={s.name}>
            <rect x={edge[i]} y={barY} width={s.w} height={barH} className={s.fill} stroke="white" strokeWidth={1} />
            <text x={edge[i] + s.w / 2} y={barY + barH / 2 + 4} textAnchor="middle" className="fill-white" fontSize={s.fs} fontWeight="bold">
              {s.name}
            </text>
          </g>
        ))}
        {/* 境界の案内線 */}
        {edge.slice(1).map((ex, i) => (
          <line key={i} x1={ex} y1={barY + barH} x2={ex} y2={240} className="stroke-slate-200 dark:stroke-slate-600" strokeWidth={1} strokeDasharray="3 3" />
        ))}
        {/* ブラケット（累積） */}
        {brackets.map((b) => (
          <g key={b.label} className={b.cls}>
            <line x1={x0} y1={b.y} x2={b.to} y2={b.y} strokeWidth={2} />
            <line x1={x0} y1={b.y - 5} x2={x0} y2={b.y + 5} strokeWidth={2} />
            <line x1={b.to} y1={b.y - 5} x2={b.to} y2={b.y + 5} strokeWidth={2} />
            <text x={(x0 + b.to) / 2} y={b.y - 8} textAnchor="middle" fontSize={11} fontWeight="bold" stroke="none">
              {b.label}
            </text>
          </g>
        ))}
        <Note x={280} y={266} cls="fill-slate-400">下段ほど範囲が広がり、最終的に消費税を加えた「請負工事費」が契約金額になる</Note>
      </svg>
    </DiagramFrame>
  )
}

/** 土量変化率。地山→ほぐした土(L)→締め固めた土(C)を体積の違うブロックで示す。 */
export function EarthworkVolume() {
  const baseY = 200
  const blocks = [
    { name: '地山', sub: '1.0', h: 90, fill: 'fill-amber-600' },
    { name: 'ほぐした土', sub: 'L=1.2', h: 108, fill: 'fill-amber-400' },
    { name: '締め固めた土', sub: 'C=0.9', h: 81, fill: 'fill-orange-600' },
  ]
  const w = 120
  const xs = [50, 220, 390]
  return (
    <DiagramFrame
      title="土量変化率（L・C）"
      caption="同じ土でも、掘り起こすと体積が増え（ほぐし率L）、締め固めると締まる（締固め率C）。土量計算の基礎となる。"
    >
      <svg viewBox="0 0 560 280" role="img" aria-label="土量変化率の図">
        {/* 基準ライン */}
        <line x1={30} y1={baseY} x2={530} y2={baseY} className="stroke-slate-300" strokeWidth={1.5} />
        {blocks.map((b, i) => (
          <g key={b.name}>
            <rect x={xs[i]} y={baseY - b.h} width={w} height={b.h} rx={3} className={b.fill} stroke="white" strokeWidth={1} />
            <text x={xs[i] + w / 2} y={baseY - b.h / 2} textAnchor="middle" className="fill-white" fontSize={13} fontWeight="bold">
              {b.name}
            </text>
            <text x={xs[i] + w / 2} y={baseY + 20} textAnchor="middle" className="fill-slate-600 dark:fill-slate-300" fontSize={13} fontWeight="bold">
              {b.sub}
            </text>
          </g>
        ))}
        {/* 矢印と工程ラベル */}
        <Arrow x1={172} y1={165} x2={218} y2={165} cls="stroke-slate-400 fill-slate-400" width={2} />
        <text x={195} y={156} textAnchor="middle" className="fill-slate-500" fontSize={11} fontWeight="bold">ほぐす</text>
        <Arrow x1={342} y1={165} x2={388} y2={165} cls="stroke-slate-400 fill-slate-400" width={2} />
        <text x={365} y={156} textAnchor="middle" className="fill-slate-500" fontSize={11} fontWeight="bold">締固め</text>

        <Note x={280} y={246} cls="fill-slate-500">L＝ほぐした土量 ÷ 地山土量（体積は増える）</Note>
        <Note x={280} y={266} cls="fill-slate-500">C＝締め固めた土量 ÷ 地山土量（体積は締まる）</Note>
      </svg>
    </DiagramFrame>
  )
}
