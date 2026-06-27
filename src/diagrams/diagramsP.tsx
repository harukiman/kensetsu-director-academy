import { DiagramFrame } from './DiagramFrame'
import { Box, Arrow, Note } from './primitives'

/** 明り掘削の安全 — 掘削断面の勾配・高さ・崩壊防止・点検 */
export function ExcavationSlope() {
  // 掘削断面の主要点
  const surfaceY = 90
  const bottomY = 210
  const lTop = 180 // 左のり肩
  const lBot = 250 // 左のり尻
  const rBot = 360 // 右のり尻
  const rTop = 430 // 右のり肩
  return (
    <DiagramFrame
      title="明り掘削の安全（のり面勾配）"
      caption="地山の崩壊を防ぐため、掘削面はゆるやかな勾配にする。作業前・大雨後・地震後には必ず点検する。"
    >
      <svg viewBox="0 0 560 280" role="img" aria-label="明り掘削の断面と安全な勾配の図">
        {/* 地山（土の断面） */}
        <path
          d={`M40,${surfaceY} L${lTop},${surfaceY} L${lBot},${bottomY} L${rBot},${bottomY} L${rTop},${surfaceY} L520,${surfaceY} L520,250 L40,250 Z`}
          className="fill-amber-200 stroke-amber-500 dark:fill-amber-900/40"
          strokeWidth={2}
        />
        {/* 地表ライン */}
        <line x1={40} y1={surfaceY} x2={lTop} y2={surfaceY} className="stroke-emerald-600" strokeWidth={3} />
        <line x1={rTop} y1={surfaceY} x2={520} y2={surfaceY} className="stroke-emerald-600" strokeWidth={3} />
        {/* のり面（勾配）強調 */}
        <line x1={lTop} y1={surfaceY} x2={lBot} y2={bottomY} className="stroke-rose-500" strokeWidth={3} strokeDasharray="6 4" />

        {/* 掘削高さ 寸法 */}
        <line x1={150} y1={surfaceY} x2={150} y2={bottomY} className="stroke-slate-500" strokeWidth={1.5} />
        <line x1={143} y1={surfaceY} x2={157} y2={surfaceY} className="stroke-slate-500" strokeWidth={1.5} />
        <line x1={143} y1={bottomY} x2={157} y2={bottomY} className="stroke-slate-500" strokeWidth={1.5} />
        <Note x={120} y={144} anchor="end" cls="fill-slate-600 dark:fill-slate-300">掘削</Note>
        <Note x={120} y={160} anchor="end" cls="fill-slate-600 dark:fill-slate-300">高さ</Note>

        {/* 勾配角度の表示 */}
        <path d={`M${lBot - 36},${bottomY} A36,36 0 0 1 ${lBot - 21},${bottomY - 31}`} className="fill-none stroke-rose-500" strokeWidth={1.5} />
        <Note x={lBot - 30} y={bottomY - 10} cls="fill-rose-600" size={12}>θ</Note>
        <Note x={300} y={150} cls="fill-rose-600" size={11}>安全な勾配（緩く）</Note>

        {/* ラベル */}
        <Note x={285} y={232} cls="fill-amber-700 dark:fill-amber-300" size={12}>掘削底</Note>
        <Note x={280} y={262}>勾配を緩くして地山の崩壊を防ぐ／点検は作業前・大雨後・地震後</Note>
      </svg>
    </DiagramFrame>
  )
}

/** 足場の部材と墜落防止（側面図） */
export function ScaffoldParts() {
  const lPost = 170
  const rPost = 400
  const floorY = 205
  const railY = 95
  const midY = 150
  // 右側ラベルの引き出し
  const rightLabel = (y: number, txt: string) => (
    <g>
      <line x1={rPost} y1={y} x2={460} y2={y} className="stroke-slate-300" strokeWidth={1} strokeDasharray="3 3" />
      <Note x={466} y={y + 4} anchor="start" cls="fill-slate-600 dark:fill-slate-300" size={12}>{txt}</Note>
    </g>
  )
  const leftLabel = (y: number, txt: string) => (
    <g>
      <line x1={lPost} y1={y} x2={110} y2={y} className="stroke-slate-300" strokeWidth={1} strokeDasharray="3 3" />
      <Note x={104} y={y + 4} anchor="end" cls="fill-slate-600 dark:fill-slate-300" size={12}>{txt}</Note>
    </g>
  )
  return (
    <DiagramFrame
      title="足場の部材と墜落防止"
      caption="建地・布・腕木で骨組みを組み、作業床に手すり（85cm以上）・中さん・幅木を設けて墜落と落下を防ぐ。"
    >
      <svg viewBox="0 0 560 300" role="img" aria-label="足場の部材と墜落防止設備の側面図">
        {/* 建地（柱） */}
        <line x1={lPost} y1={50} x2={lPost} y2={275} className="stroke-slate-500" strokeWidth={6} />
        <line x1={rPost} y1={50} x2={rPost} y2={275} className="stroke-slate-500" strokeWidth={6} />
        {/* 手すり・中さん */}
        <line x1={lPost} y1={railY} x2={rPost} y2={railY} className="stroke-sky-500" strokeWidth={5} />
        <line x1={lPost} y1={midY} x2={rPost} y2={midY} className="stroke-sky-400" strokeWidth={4} />
        {/* 作業床 */}
        <rect x={lPost} y={floorY} width={rPost - lPost} height={14} className="fill-amber-400 stroke-amber-600" strokeWidth={1.5} />
        {/* 腕木（作業床を支える横材） */}
        <line x1={lPost} y1={floorY + 22} x2={rPost} y2={floorY + 22} className="stroke-slate-400" strokeWidth={4} />
        {/* 布（下段の横つなぎ材） */}
        <line x1={lPost} y1={258} x2={rPost} y2={258} className="stroke-slate-400" strokeWidth={4} />
        {/* 幅木（足元の板） */}
        <rect x={lPost} y={floorY - 20} width={10} height={20} className="fill-rose-400 stroke-rose-600" strokeWidth={1} />
        <rect x={rPost - 10} y={floorY - 20} width={10} height={20} className="fill-rose-400 stroke-rose-600" strokeWidth={1} />

        {/* 手すり高さ寸法 */}
        <line x1={150} y1={floorY} x2={150} y2={railY} className="stroke-slate-500" strokeWidth={1.2} />
        <line x1={144} y1={floorY} x2={156} y2={floorY} className="stroke-slate-500" strokeWidth={1.2} />
        <line x1={144} y1={railY} x2={156} y2={railY} className="stroke-slate-500" strokeWidth={1.2} />

        {/* ラベル */}
        {rightLabel(railY, '手すり 85cm以上')}
        {rightLabel(midY, '中さん')}
        {rightLabel(floorY + 7, '作業床')}
        {rightLabel(258, '布')}
        {leftLabel(70, '建地（柱）')}
        {leftLabel(floorY + 22, '腕木')}
        <Note x={250} y={180} cls="fill-rose-600" size={11}>幅木</Note>
        <line x1={228} y1={184} x2={180} y2={floorY - 12} className="stroke-rose-300" strokeWidth={1} strokeDasharray="3 3" />

        <Note x={280} y={292}>作業床は幅40cm以上・床材のすき間3cm以下が基準</Note>
      </svg>
    </DiagramFrame>
  )
}

/** 移動式クレーンの定格荷重と作業半径 */
export function CraneLoadRadius() {
  const pivotX = 150
  const pivotY = 180
  const tipX = 430
  const tipY = 80
  const loadX = 430
  const groundY = 240
  const dimY = 268
  return (
    <DiagramFrame
      title="移動式クレーンの定格荷重と作業半径"
      caption="作業半径（旋回中心から吊り荷までの水平距離）が大きいほど、吊れる定格総荷重は小さくなる。"
    >
      <svg viewBox="0 0 560 300" role="img" aria-label="移動式クレーンの作業半径と吊り荷の側面図">
        {/* 地面 */}
        <line x1={20} y1={groundY} x2={540} y2={groundY} className="stroke-slate-400" strokeWidth={2} />
        {/* アウトリガ */}
        <line x1={75} y1={216} x2={40} y2={groundY} className="stroke-slate-500" strokeWidth={3} />
        <rect x={26} y={groundY - 2} width={28} height={7} className="fill-slate-500" />
        <line x1={185} y1={216} x2={220} y2={groundY} className="stroke-slate-500" strokeWidth={3} />
        <rect x={206} y={groundY - 2} width={28} height={7} className="fill-slate-500" />
        {/* 車体 */}
        <rect x={62} y={184} width={130} height={42} rx={6} className="fill-brand-600" />
        <circle cx={92} cy={228} r={11} className="fill-slate-700" />
        <circle cx={160} cy={228} r={11} className="fill-slate-700" />
        {/* 運転室・旋回体 */}
        <rect x={118} y={152} width={46} height={34} rx={5} className="fill-brand-500" />
        {/* ブーム */}
        <line x1={pivotX} y1={pivotY} x2={tipX} y2={tipY} className="stroke-amber-500" strokeWidth={9} strokeLinecap="round" />
        {/* 巻きロープ */}
        <line x1={tipX} y1={tipY} x2={loadX} y2={203} className="stroke-slate-500" strokeWidth={1.5} />
        {/* 吊り荷 */}
        <rect x={loadX - 26} y={203} width={52} height={32} rx={4} className="fill-rose-500" />
        <text x={loadX} y={223} textAnchor="middle" className="fill-white" fontSize={11} fontWeight="bold">吊り荷</text>

        {/* 作業半径 寸法 */}
        <line x1={pivotX} y1={pivotY} x2={pivotX} y2={dimY} className="stroke-slate-300" strokeWidth={1} strokeDasharray="3 3" />
        <line x1={loadX} y1={235} x2={loadX} y2={dimY} className="stroke-slate-300" strokeWidth={1} strokeDasharray="3 3" />
        <Arrow x1={pivotX} y1={dimY} x2={loadX} y2={dimY} cls="stroke-slate-500 fill-slate-500" width={1.5} />
        <Arrow x1={loadX} y1={dimY} x2={pivotX} y2={dimY} cls="stroke-slate-500 fill-slate-500" width={1.5} />
        <Note x={(pivotX + loadX) / 2} y={dimY - 6} cls="fill-slate-600 dark:fill-slate-300" size={12}>作業半径（水平距離）</Note>

        {/* ラベル */}
        <Note x={300} y={118} cls="fill-amber-600" size={12}>ブーム</Note>
        <Note x={280} y={292} cls="fill-rose-600">半径が大きいほど定格総荷重は小さい／アウトリガは最大張出し</Note>
      </svg>
    </DiagramFrame>
  )
}

/** 資格の区分（特別教育→技能講習→免許→作業主任者） */
export function LicenseMatrix() {
  const steps = [
    { ja: '特別教育', ex: '研削といし等', fill: 'fill-sky-500' },
    { ja: '技能講習', ex: '玉掛け・足場', fill: 'fill-amber-500' },
    { ja: '免許', ex: '移動式クレーン', fill: 'fill-orange-500' },
    { ja: '作業主任者', ex: '土止め支保工', fill: 'fill-rose-500' },
  ]
  const boxW = 130
  const boxH = 44
  const bottoms = [254, 214, 174, 134]
  const xs = [30, 152, 274, 396]
  return (
    <DiagramFrame
      title="資格の区分（難易度・危険度の階段）"
      caption="作業の危険度が上がるほど必要な資格区分も上がる。特別教育→技能講習→免許→作業主任者の順。"
    >
      <svg viewBox="0 0 560 280" role="img" aria-label="資格区分を階段状に並べた図">
        {/* 難易度・危険度 方向 */}
        <Arrow x1={40} y1={64} x2={520} y2={64} cls="stroke-slate-400 fill-slate-400" width={2} />
        <Note x={280} y={52} cls="fill-slate-500">難易度・危険度が高くなる →</Note>

        {/* 階段の輪郭 */}
        <polyline
          points="30,254 160,254 160,214 282,214 282,174 404,174 404,134 526,134"
          className="fill-none stroke-slate-300"
          strokeWidth={2}
        />

        {steps.map((s, i) => (
          <Box
            key={s.ja}
            x={xs[i]}
            y={bottoms[i] - boxH}
            w={boxW}
            h={boxH}
            lines={[s.ja, s.ex]}
            fill={s.fill}
            fontSize={14}
          />
        ))}

        <Note x={280} y={274} cls="fill-slate-400">※ 作業主任者は技能講習・免許の修了者から選任して指揮させる</Note>
      </svg>
    </DiagramFrame>
  )
}
