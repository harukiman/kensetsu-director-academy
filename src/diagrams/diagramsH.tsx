import { DiagramFrame } from './DiagramFrame'
import { Box, Arrow, Note } from './primitives'

/** 丁張り（遣り方）の断面イメージ。杭・水貫で基準を出し、法肩/法尻・勾配を現地表示。 */
export function TomihariSetup() {
  return (
    <DiagramFrame
      title="丁張り（遣り方）の仕組み"
      caption="地面に杭を立て水貫を渡して基準高を出し、法肩の位置や法面の勾配を現地に表示する。点線が掘削の出来上がり形状。"
    >
      <svg viewBox="0 0 560 300" role="img" aria-label="丁張り遣り方の断面の図">
        {/* 残る地山（土の塊） */}
        <polygon
          points="40,130 240,130 375,220 510,220 510,272 40,272"
          className="fill-amber-100 dark:fill-amber-900/30 stroke-slate-300"
          strokeWidth={1}
        />
        {/* 既存地盤線 */}
        <line x1={40} y1={130} x2={240} y2={130} className="stroke-slate-500" strokeWidth={2} />
        {/* 掘削の出来上がり形状（計画線・点線） */}
        <line x1={240} y1={130} x2={375} y2={220} className="stroke-brand-500" strokeWidth={2.5} strokeDasharray="6 4" />
        <line x1={375} y1={220} x2={510} y2={220} className="stroke-brand-500" strokeWidth={2.5} strokeDasharray="6 4" />

        {/* 丁張り：杭2本 */}
        <rect x={107} y={55} width={6} height={75} className="fill-amber-700" />
        <rect x={167} y={55} width={6} height={75} className="fill-amber-700" />
        {/* 水貫（水平の板） */}
        <rect x={96} y={78} width={88} height={8} rx={2} className="fill-orange-500" />
        {/* 法貫（勾配を示す斜めの板：法面に平行 1:1.5） */}
        <line x1={170} y1={72} x2={262} y2={133} className="stroke-orange-600" strokeWidth={6} strokeLinecap="round" />

        {/* ラベル */}
        <Note x={110} y={48} cls="fill-amber-700" size={11}>杭</Note>
        <Note x={92} y={84} anchor="end" cls="fill-orange-600" size={11}>水貫</Note>
        <Note x={210} y={96} anchor="start" cls="fill-orange-700" size={11}>法貫</Note>
        <Note x={240} y={122} cls="fill-brand-700 dark:fill-brand-300" size={11}>法肩</Note>
        <Note x={384} y={236} anchor="start" cls="fill-brand-700 dark:fill-brand-300" size={11}>法尻</Note>
        <Note x={305} y={172} cls="fill-brand-600" size={11}>勾配 1:1.5</Note>

        {/* 掘削深さの寸法線 */}
        <line x1={455} y1={132} x2={455} y2={218} className="stroke-slate-500" strokeWidth={1.2} />
        <line x1={449} y1={134} x2={461} y2={134} className="stroke-slate-500" strokeWidth={1.2} />
        <line x1={449} y1={216} x2={461} y2={216} className="stroke-slate-500" strokeWidth={1.2} />
        <Note x={466} y={178} anchor="start" cls="fill-slate-500" size={11}>掘削深さ</Note>

        <Note x={250} y={290} cls="fill-slate-400">点線＝掘削の出来上がり形状（計画線）／杭と水貫で基準を現地に表示</Note>
      </svg>
    </DiagramFrame>
  )
}

/** 出来形の度数表（ヒストグラム）。規格値の上下限内に分布が収まるイメージ。 */
export function DekigataHistogram() {
  const bins = [1, 2, 4, 7, 9, 7, 4, 2, 1]
  const baseY = 215
  const topPad = 45
  const barW = 36
  const startX = 140
  const unit = 16 // 度数1あたりの高さ
  return (
    <DiagramFrame
      title="出来形の度数表（ヒストグラム）"
      caption="多数の測定値を度数分布で表す。規格下限〜上限の中に山なりの分布が収まれば、ばらつきが管理されている。"
    >
      <svg viewBox="0 0 560 280" role="img" aria-label="出来形ヒストグラムの図">
        {/* 軸 */}
        <line x1={90} y1={baseY} x2={510} y2={baseY} className="stroke-slate-400" strokeWidth={1.5} />
        <line x1={90} y1={topPad} x2={90} y2={baseY} className="stroke-slate-400" strokeWidth={1.5} />
        {/* y目盛り */}
        {[0, 3, 6, 9].map((f) => (
          <g key={f}>
            <line x1={86} y1={baseY - f * unit} x2={90} y2={baseY - f * unit} className="stroke-slate-400" strokeWidth={1} />
            <text x={80} y={baseY - f * unit + 4} textAnchor="end" className="fill-slate-400" fontSize={10}>{f}</text>
          </g>
        ))}
        {/* 棒 */}
        {bins.map((f, i) => {
          const x = startX + i * barW
          const h = f * unit
          return (
            <rect key={i} x={x + 2} y={baseY - h} width={barW - 4} height={h} className="fill-brand-500" />
          )
        })}
        {/* 規格下限・上限ライン */}
        <line x1={122} y1={topPad} x2={122} y2={baseY} className="stroke-rose-500" strokeWidth={2} strokeDasharray="5 4" />
        <line x1={482} y1={topPad} x2={482} y2={baseY} className="stroke-rose-500" strokeWidth={2} strokeDasharray="5 4" />
        <text x={122} y={topPad - 14} textAnchor="middle" className="fill-rose-600" fontSize={10} fontWeight="bold">規格下限</text>
        <text x={482} y={topPad - 14} textAnchor="middle" className="fill-rose-600" fontSize={10} fontWeight="bold">規格上限</text>

        {/* 軸ラベル */}
        <text x={300} y={baseY + 24} textAnchor="middle" className="fill-slate-500" fontSize={11}>測定値（小 ← → 大）</text>
        <text x={40} y={130} textAnchor="middle" className="fill-slate-500" fontSize={11} transform="rotate(-90 40 130)">度数</text>
        <Note x={300} y={266} cls="fill-slate-400">分布の山が規格幅の中央に収まり、上下限に余裕があるほど品質は安定</Note>
      </svg>
    </DiagramFrame>
  )
}

/** 品質の合否判定フロー。試験→規格値と比較→合格／不合格は是正・再試験。 */
export function QualityJudgmentFlow() {
  return (
    <DiagramFrame
      title="品質の合否判定フロー"
      caption="試験・測定した結果を規格値と比較し、合格なら記録、不合格なら是正処置を行い再試験する。"
    >
      <svg viewBox="0 0 560 300" role="img" aria-label="品質の合否判定フローの図">
        {/* 試験・測定 */}
        <Box x={180} y={26} w={140} h={44} lines={['試験・測定']} fill="fill-sky-500" fontSize={14} />
        {/* 判定（ひし形） */}
        <polygon points="250,98 322,135 250,172 178,135" className="fill-amber-500" />
        <text x={250} y={131} textAnchor="middle" className="fill-white" fontSize={12} fontWeight="bold">規格値と</text>
        <text x={250} y={147} textAnchor="middle" className="fill-white" fontSize={12} fontWeight="bold">比較</text>
        {/* 合格ボックス */}
        <Box x={400} y={113} w={130} h={44} lines={['合格・記録']} fill="fill-emerald-500" fontSize={14} />
        {/* 是正処置 */}
        <Box x={180} y={212} w={140} h={44} lines={['是正処置']} fill="fill-rose-500" fontSize={14} />

        {/* 矢印：試験→判定 */}
        <Arrow x1={250} y1={70} x2={250} y2={96} cls="stroke-slate-400 fill-slate-400" width={2} />
        {/* 判定→合格 */}
        <Arrow x1={322} y1={135} x2={400} y2={135} cls="stroke-emerald-500 fill-emerald-500" width={2} />
        <text x={360} y={126} textAnchor="middle" className="fill-emerald-600" fontSize={11} fontWeight="bold">合格</text>
        {/* 判定→是正 */}
        <Arrow x1={250} y1={172} x2={250} y2={210} cls="stroke-rose-500 fill-rose-500" width={2} />
        <text x={264} y={194} textAnchor="start" className="fill-rose-600" fontSize={11} fontWeight="bold">不合格</text>

        {/* 再試験ループ：是正→試験 */}
        <line x1={180} y1={234} x2={92} y2={234} className="stroke-rose-400" strokeWidth={2} strokeDasharray="5 4" />
        <line x1={92} y1={234} x2={92} y2={48} className="stroke-rose-400" strokeWidth={2} strokeDasharray="5 4" />
        <Arrow x1={92} y1={48} x2={178} y2={48} cls="stroke-rose-400 fill-rose-400" width={2} dashed />
        <text x={86} y={145} textAnchor="end" className="fill-rose-500" fontSize={11} fontWeight="bold">再試験</text>

        <Note x={300} y={288} cls="fill-slate-400">合格＝出来形・品質を確認して記録／不合格＝原因を是正し再び試験する</Note>
      </svg>
    </DiagramFrame>
  )
}

/** ボーリング柱状図のイメージ。深さで地層を色分けし、右にN値の棒を並べる。 */
export function BoringLog() {
  const colX = 120
  const colW = 70
  const top = 50
  const ppm = 12 // 1mあたりpx
  const strata = [
    { name: '埋土', m0: 0, m1: 2, fill: 'fill-amber-600', n: 3 },
    { name: '砂', m0: 2, m1: 6, fill: 'fill-yellow-400', n: 8 },
    { name: '粘土', m0: 6, m1: 11, fill: 'fill-teal-600', n: 15 },
    { name: '礫', m0: 11, m1: 15, fill: 'fill-orange-500', n: 30 },
    { name: '岩', m0: 15, m1: 20, fill: 'fill-slate-500', n: 50 },
  ]
  const nX = 320 // N値棒の基点
  const nScale = 3.6 // N値1あたりpx
  return (
    <DiagramFrame
      title="ボーリング柱状図のイメージ"
      caption="深さ方向に地層を色分けし、右側にN値（標準貫入試験の打撃回数）を棒で示す。深いほど地盤は締まりN値は大きくなる。"
    >
      <svg viewBox="0 0 560 320" role="img" aria-label="ボーリング柱状図とN値の図">
        {/* 深さ軸 */}
        <line x1={colX - 26} y1={top} x2={colX - 26} y2={top + 20 * ppm} className="stroke-slate-400" strokeWidth={1.2} />
        {[0, 5, 10, 15, 20].map((m) => (
          <g key={m}>
            <line x1={colX - 30} y1={top + m * ppm} x2={colX - 26} y2={top + m * ppm} className="stroke-slate-400" strokeWidth={1} />
            <text x={colX - 34} y={top + m * ppm + 4} textAnchor="end" className="fill-slate-400" fontSize={10}>{m}</text>
          </g>
        ))}
        <text x={colX - 34} y={top - 14} textAnchor="end" className="fill-slate-500" fontSize={10}>深さ(m)</text>

        {/* 地層の柱 */}
        {strata.map((s) => {
          const y = top + s.m0 * ppm
          const h = (s.m1 - s.m0) * ppm
          return (
            <g key={s.name}>
              <rect x={colX} y={y} width={colW} height={h} className={s.fill} stroke="white" strokeWidth={1} />
              <text x={colX + colW / 2} y={y + h / 2 + 4} textAnchor="middle" className="fill-white" fontSize={12} fontWeight="bold">{s.name}</text>
              {/* N値の横棒 */}
              <rect x={nX} y={y + h / 2 - 9} width={s.n * nScale} height={18} rx={2} className="fill-sky-500" />
              <text x={nX + s.n * nScale + 6} y={y + h / 2 + 4} textAnchor="start" className="fill-sky-700 dark:fill-sky-300" fontSize={10} fontWeight="bold">N={s.n}</text>
            </g>
          )
        })}

        {/* N値軸 */}
        <line x1={nX} y1={top} x2={nX} y2={top + 20 * ppm} className="stroke-slate-400" strokeWidth={1.2} />
        {[0, 25, 50].map((n) => (
          <g key={n}>
            <line x1={nX + n * nScale} y1={top + 20 * ppm} x2={nX + n * nScale} y2={top + 20 * ppm + 4} className="stroke-slate-400" strokeWidth={1} />
            <text x={nX + n * nScale} y={top + 20 * ppm + 16} textAnchor="middle" className="fill-slate-400" fontSize={10}>{n}</text>
          </g>
        ))}
        <text x={nX + 90} y={top - 14} textAnchor="middle" className="fill-slate-500" fontSize={11} fontWeight="bold">N値（打撃回数）</text>
        <text x={colX + colW / 2} y={top - 14} textAnchor="middle" className="fill-slate-500" fontSize={11} fontWeight="bold">地層</text>
      </svg>
    </DiagramFrame>
  )
}
