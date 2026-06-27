import { DiagramFrame } from './DiagramFrame'
import { Box, Arrow, Note } from './primitives'

/** 施工管理の5本柱 QCDSE（品質・原価・工程・安全・環境） */
export function Qcdse() {
  const pillars = [
    { en: 'Q', ja: '品質', note: '規格・仕様を満たす', fill: 'fill-sky-500' },
    { en: 'C', ja: '原価', note: '予算内で利益確保', fill: 'fill-emerald-500' },
    { en: 'D', ja: '工程', note: '工期を守る', fill: 'fill-amber-500' },
    { en: 'S', ja: '安全', note: '災害ゼロを目指す', fill: 'fill-rose-500' },
    { en: 'E', ja: '環境', note: '騒音・廃棄物に配慮', fill: 'fill-violet-500' },
  ]
  const colW = 100
  const gap = 6
  const totalW = pillars.length * colW + (pillars.length - 1) * gap
  const startX = (560 - totalW) / 2
  return (
    <DiagramFrame
      title="施工管理の5本柱（QCDSE）"
      caption="施工管理は Q品質・C原価・D工程・S安全・E環境の5要素をバランスよく管理すること。"
    >
      <svg viewBox="0 0 560 280" role="img" aria-label="施工管理の5本柱QCDSEの図">
        {/* 中央の柱（施工管理） */}
        <Box x={200} y={20} w={160} h={48} lines={['施工管理']} fill="fill-brand-600" fontSize={18} />
        {pillars.map((p, i) => {
          const x = startX + i * (colW + gap)
          return (
            <g key={p.en}>
              <Arrow x1={280} y1={68} x2={x + colW / 2} y2={108} cls="stroke-slate-400 fill-slate-400" width={1.5} />
              <rect x={x} y={110} width={colW} height={120} rx={8} className={p.fill} />
              <text x={x + colW / 2} y={150} textAnchor="middle" className="fill-white" fontSize={34} fontWeight="bold">
                {p.en}
              </text>
              <text x={x + colW / 2} y={184} textAnchor="middle" className="fill-white" fontSize={16} fontWeight="bold">
                {p.ja}
              </text>
              <text x={x + colW / 2} y={208} textAnchor="middle" className="fill-white/90" fontSize={11}>
                {p.note}
              </text>
            </g>
          )
        })}
        <Note x={280} y={262}>5要素は相互に関係し、どれか1つに偏らない調整が要となる</Note>
      </svg>
    </DiagramFrame>
  )
}

/** 工程表のイメージ（簡易ガントチャート） */
export function ProcessChart() {
  const tasks = [
    { name: '準備工', start: 0, span: 2, fill: 'fill-slate-400' },
    { name: '土工', start: 1, span: 3, fill: 'fill-amber-500' },
    { name: '構造物工', start: 3, span: 4, fill: 'fill-sky-500' },
    { name: '舗装工', start: 6, span: 2, fill: 'fill-emerald-500' },
    { name: '片付け', start: 8, span: 2, fill: 'fill-violet-500' },
  ]
  const months = 10
  const chartX = 110
  const chartW = 400
  const cellW = chartW / months
  const rowH = 30
  const top = 50
  return (
    <DiagramFrame
      title="工程表（ガントチャート）のイメージ"
      caption="縦に作業項目、横に時間をとり、各作業の開始〜完了を横棒で表す。重なりや並行作業も一目で分かる。"
    >
      <svg viewBox="0 0 560 250" role="img" aria-label="工程表ガントチャートの図">
        {/* 時間軸 */}
        {Array.from({ length: months + 1 }).map((_, i) => (
          <line
            key={i}
            x1={chartX + i * cellW}
            y1={top - 6}
            x2={chartX + i * cellW}
            y2={top + tasks.length * rowH}
            className="stroke-slate-200"
            strokeWidth={1}
          />
        ))}
        {Array.from({ length: months }).map((_, i) => (
          <text key={i} x={chartX + i * cellW + cellW / 2} y={top - 12} textAnchor="middle" className="fill-slate-400" fontSize={10}>
            {i + 1}月
          </text>
        ))}
        {/* 作業行 */}
        {tasks.map((t, i) => {
          const y = top + i * rowH
          return (
            <g key={t.name}>
              <text x={chartX - 10} y={y + rowH / 2 + 4} textAnchor="end" className="fill-slate-600 dark:fill-slate-300" fontSize={12} fontWeight="bold">
                {t.name}
              </text>
              <rect x={chartX} y={y + 4} width={chartW} height={rowH - 8} rx={3} className="fill-slate-50 dark:fill-slate-700/40" />
              <rect x={chartX + t.start * cellW + 2} y={y + 6} width={t.span * cellW - 4} height={rowH - 12} rx={4} className={t.fill} />
            </g>
          )
        })}
        <Note x={chartX + chartW / 2} y={top + tasks.length * rowH + 30}>
          横軸＝工期（月）／横棒の長さ＝各作業に要する期間
        </Note>
      </svg>
    </DiagramFrame>
  )
}

/** ネットワーク工程表とクリティカルパス */
export function CriticalPath() {
  // ノード座標
  const nodes = [
    { id: 1, x: 60, y: 130 },
    { id: 2, x: 200, y: 60 },
    { id: 3, x: 200, y: 200 },
    { id: 4, x: 360, y: 130 },
    { id: 5, x: 500, y: 130 },
  ]
  const r = 22
  const pos = (id: number) => nodes.find((n) => n.id === id)!
  // クリティカルパス: 1→3→4→5（最長）
  const edges = [
    { a: 1, b: 2, label: 'A 2日', crit: false },
    { a: 1, b: 3, label: 'B 4日', crit: true },
    { a: 2, b: 4, label: 'C 3日', crit: false },
    { a: 3, b: 4, label: 'D 5日', crit: true },
    { a: 4, b: 5, label: 'E 3日', crit: true },
  ]
  return (
    <DiagramFrame
      title="ネットワーク工程表とクリティカルパス"
      caption="作業を矢印、節目を丸で表す。最も時間がかかる経路（赤）がクリティカルパスで、全体工期を決める。"
    >
      <svg viewBox="0 0 560 290" role="img" aria-label="ネットワーク工程表とクリティカルパスの図">
        {edges.map((e, i) => {
          const a = pos(e.a)
          const b = pos(e.b)
          const ang = Math.atan2(b.y - a.y, b.x - a.x)
          const x1 = a.x + Math.cos(ang) * r
          const y1 = a.y + Math.sin(ang) * r
          const x2 = b.x - Math.cos(ang) * r
          const y2 = b.y - Math.sin(ang) * r
          const mx = (x1 + x2) / 2
          const my = (y1 + y2) / 2
          return (
            <g key={i}>
              <Arrow
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                cls={e.crit ? 'stroke-rose-500 fill-rose-500' : 'stroke-slate-400 fill-slate-400'}
                width={e.crit ? 3 : 1.8}
              />
              <text x={mx} y={my - 6} textAnchor="middle" className={e.crit ? 'fill-rose-600' : 'fill-slate-500'} fontSize={11} fontWeight="bold">
                {e.label}
              </text>
            </g>
          )
        })}
        {nodes.map((n) => (
          <g key={n.id}>
            <circle cx={n.x} cy={n.y} r={r} className="fill-white stroke-slate-500 dark:fill-slate-700" strokeWidth={2} />
            <text x={n.x} y={n.y + 5} textAnchor="middle" className="fill-slate-700 dark:fill-slate-200" fontSize={15} fontWeight="bold">
              {n.id}
            </text>
          </g>
        ))}
        {/* 凡例 */}
        <line x1={60} y1={258} x2={100} y2={258} className="stroke-rose-500" strokeWidth={3} />
        <text x={108} y={262} textAnchor="start" className="fill-rose-600" fontSize={11} fontWeight="bold">
          クリティカルパス（最長経路）
        </text>
        <line x1={320} y1={258} x2={360} y2={258} className="stroke-slate-400" strokeWidth={2} />
        <text x={368} y={262} textAnchor="start" className="fill-slate-500" fontSize={11}>
          余裕のある作業
        </text>
      </svg>
    </DiagramFrame>
  )
}

/** 現場の安全衛生管理体制（元請・下請の階層） */
export function SafetyHierarchy() {
  return (
    <DiagramFrame
      title="現場の安全衛生管理体制"
      caption="元請（統括安全衛生責任者）が現場全体を統括し、下請の安全衛生責任者・職長が連携して災害を防ぐ。"
    >
      <svg viewBox="0 0 560 300" role="img" aria-label="安全衛生管理体制の階層の図">
        {/* 元請側ラベル */}
        <text x={150} y={18} textAnchor="middle" className="fill-brand-600 dark:fill-brand-300" fontSize={12} fontWeight="bold">
          ── 元請側 ──
        </text>
        {/* 下請側ラベル */}
        <text x={410} y={18} textAnchor="middle" className="fill-emerald-600 dark:fill-emerald-300" fontSize={12} fontWeight="bold">
          ── 下請側 ──
        </text>

        {/* 元請ツリー */}
        <Box x={60} y={36} w={180} h={56} lines={['統括安全衛生', '責任者', '現場全体を統括']} fill="fill-brand-600" fontSize={14} />
        <Arrow x1={150} y1={92} x2={150} y2={132} cls="stroke-slate-400 fill-slate-400" width={2} />
        <Box x={60} y={134} w={180} h={56} lines={['元方安全衛生', '管理者', '技術的事項を管理']} fill="fill-brand-500" fontSize={14} />

        {/* 下請ツリー */}
        <Box x={320} y={36} w={180} h={56} lines={['安全衛生責任者', '統括責任者と連絡']} fill="fill-emerald-600" fontSize={14} />
        <Arrow x1={410} y1={92} x2={410} y2={132} cls="stroke-slate-400 fill-slate-400" width={2} />
        <Box x={320} y={134} w={180} h={56} lines={['職長', '作業員を直接指揮']} fill="fill-emerald-500" fontSize={14} />

        {/* 元請⇔下請の連携（横の点線） */}
        <line x1={240} y1={64} x2={320} y2={64} className="stroke-amber-400" strokeWidth={2} strokeDasharray="5 4" />
        <text x={280} y={56} textAnchor="middle" className="fill-amber-600" fontSize={10} fontWeight="bold">
          連絡・調整
        </text>

        <Note x={280} y={240}>元請が「統括」し、下請各社の責任者・職長が縦に指揮系統をつくる</Note>
        <Note x={280} y={262} cls="fill-slate-400">※ 同じ場所で複数社が作業するため、横の連携（連絡・調整）が不可欠</Note>
      </svg>
    </DiagramFrame>
  )
}

/** リスクアセスメントの手順（5ステップ） */
export function RiskAssessment() {
  const steps = [
    { ja: '危険性の特定', note: '潜む危険を洗い出す', fill: 'fill-sky-500' },
    { ja: 'リスクの見積り', note: '重大性×頻度で評価', fill: 'fill-amber-500' },
    { ja: '優先度の設定', note: '対策の順位づけ', fill: 'fill-orange-500' },
    { ja: '対策の検討・実施', note: '除去・低減する', fill: 'fill-rose-500' },
    { ja: '記録', note: '次に活かす', fill: 'fill-emerald-500' },
  ]
  const boxW = 92
  const boxH = 90
  const gap = 24
  const totalW = steps.length * boxW + (steps.length - 1) * gap
  const startX = (560 - totalW) / 2
  const top = 70
  return (
    <DiagramFrame
      title="リスクアセスメントの手順"
      caption="作業に潜む危険性を特定し、リスクを見積って優先度を決め、対策を実施・記録する一連の流れ。"
    >
      <svg viewBox="0 0 560 220" role="img" aria-label="リスクアセスメントの手順の図">
        {steps.map((s, i) => {
          const x = startX + i * (boxW + gap)
          return (
            <g key={s.ja}>
              <rect x={x} y={top} width={boxW} height={boxH} rx={8} className={s.fill} />
              <text x={x + boxW / 2} y={top + 16} textAnchor="middle" className="fill-white/80" fontSize={11} fontWeight="bold">
                STEP{i + 1}
              </text>
              <text x={x + boxW / 2} y={top + 44} textAnchor="middle" className="fill-white" fontSize={13} fontWeight="bold">
                {s.ja}
              </text>
              <text x={x + boxW / 2} y={top + 70} textAnchor="middle" className="fill-white/90" fontSize={10}>
                {s.note}
              </text>
              {i < steps.length - 1 && (
                <Arrow
                  x1={x + boxW + 2}
                  y1={top + boxH / 2}
                  x2={x + boxW + gap - 2}
                  y2={top + boxH / 2}
                  cls="stroke-slate-400 fill-slate-400"
                  width={2}
                />
              )}
            </g>
          )
        })}
        <Note x={280} y={40}>危険を「見える化」し、優先度の高いものから確実に対策する</Note>
        <Note x={280} y={190} cls="fill-slate-400">※ 記録は再発防止と次工事のノウハウとして蓄積する</Note>
      </svg>
    </DiagramFrame>
  )
}
