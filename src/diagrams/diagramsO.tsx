import { DiagramFrame } from './DiagramFrame'
import { Arrow, Note } from './primitives'

/** 橋の構成（側面図）と力の流れ */
export function BridgeParts() {
  return (
    <DiagramFrame
      title="橋の構成（側面図）"
      caption="上部工（桁・床版）の荷重は支承を介して下部工（橋台・橋脚）へ伝わり、基礎から地盤へ流れる。"
    >
      <svg viewBox="0 0 560 320" role="img" aria-label="橋の構成と力の流れの図">
        {/* 地盤 */}
        <rect x={20} y={250} width={520} height={56} className="fill-amber-200 dark:fill-amber-900/40" />
        <line x1={20} y1={250} x2={540} y2={250} className="stroke-amber-700" strokeWidth={1.5} />

        {/* 上部工：床版＋桁 */}
        <rect x={40} y={92} width={480} height={14} rx={2} className="fill-slate-300 dark:fill-slate-400" />
        <rect x={40} y={106} width={480} height={20} className="fill-slate-500" />

        {/* 支承（上部工と下部工の間） */}
        {[72, 280, 488].map((x) => (
          <rect key={x} x={x - 9} y={126} width={18} height={10} className="fill-rose-500" />
        ))}

        {/* 下部工：橋台（両端）＋橋脚（中間） */}
        <polygon points="42,136 102,136 96,250 48,250" className="fill-slate-400 dark:fill-slate-500" />
        <polygon points="518,136 458,136 464,250 512,250" className="fill-slate-400 dark:fill-slate-500" />
        <rect x={258} y={136} width={44} height={114} className="fill-slate-400 dark:fill-slate-500" />

        {/* 基礎（フーチング） */}
        <rect x={36} y={250} width={72} height={22} rx={2} className="fill-slate-600" />
        <rect x={452} y={250} width={72} height={22} rx={2} className="fill-slate-600" />
        <rect x={246} y={250} width={68} height={22} rx={2} className="fill-slate-600" />

        {/* 構造体ラベル */}
        <text x={72} y={166} textAnchor="middle" className="fill-white" fontSize={11} fontWeight="bold">橋台</text>
        <text x={280} y={196} textAnchor="middle" className="fill-white" fontSize={11} fontWeight="bold">橋脚</text>
        <text x={488} y={166} textAnchor="middle" className="fill-white" fontSize={11} fontWeight="bold">橋台</text>

        <Arrow x1={400} y1={60} x2={330} y2={96} cls="stroke-slate-600 fill-slate-600" width={1.5} />
        <Note x={445} y={56} cls="fill-slate-700 dark:fill-slate-200" size={12}>上部工（桁・床版）</Note>

        <Arrow x1={185} y1={150} x2={272} y2={132} cls="stroke-rose-600 fill-rose-600" width={1.5} />
        <Note x={150} y={154} cls="fill-rose-600 dark:fill-rose-300" size={12}>支承</Note>

        <Arrow x1={170} y1={290} x2={248} y2={262} cls="stroke-slate-600 fill-slate-600" width={1.5} />
        <Note x={135} y={294} cls="fill-slate-700 dark:fill-slate-200" size={12}>基礎</Note>

        {/* 力の流れ（橋脚を貫く） */}
        <Arrow x1={345} y1={140} x2={345} y2={248} cls="stroke-emerald-600 fill-emerald-600" width={2} dashed />
        <Note x={400} y={210} cls="fill-emerald-700 dark:fill-emerald-300" size={11} anchor="start">荷重の伝達</Note>
        <Note x={280} y={300} cls="fill-emerald-600 dark:fill-emerald-300" size={11}>
          力：上部工 → 支承 → 下部工 → 基礎 → 地盤
        </Note>
      </svg>
    </DiagramFrame>
  )
}

/** 橋梁の架設工法（代表3種） */
export function BridgeErection() {
  return (
    <DiagramFrame
      title="橋梁の架設工法（代表3種）"
      caption="現場条件に応じて、クレーンベント・送出し・張出しなどの架設工法を使い分ける。"
    >
      <svg viewBox="0 0 580 250" role="img" aria-label="橋梁の架設工法3種の図">
        {/* 仕切り線 */}
        <line x1={195} y1={30} x2={195} y2={200} className="stroke-slate-200 dark:stroke-slate-600" strokeWidth={1} />
        <line x1={388} y1={30} x2={388} y2={200} className="stroke-slate-200 dark:stroke-slate-600" strokeWidth={1} />

        {/* ① クレーンベント架設 */}
        <line x1={20} y1={190} x2={188} y2={190} className="stroke-amber-700" strokeWidth={2} />
        {/* ベント（仮支柱） */}
        <rect x={96} y={120} width={16} height={70} className="fill-zinc-400" />
        <line x1={96} y1={120} x2={112} y2={190} className="stroke-zinc-500" strokeWidth={1.5} />
        <line x1={112} y1={120} x2={96} y2={190} className="stroke-zinc-500" strokeWidth={1.5} />
        {/* 桁（ベント上） */}
        <rect x={70} y={108} width={70} height={10} className="fill-slate-500" />
        {/* クレーン */}
        <rect x={40} y={120} width={8} height={70} className="fill-rose-500" />
        <line x1={44} y1={120} x2={120} y2={96} className="stroke-rose-500" strokeWidth={2.5} />
        <line x1={120} y1={96} x2={120} y2={112} className="stroke-slate-500" strokeWidth={1.5} />
        <rect x={112} y={112} width={26} height={8} className="fill-slate-400" />
        <Note x={104} y={222} cls="fill-slate-700 dark:fill-slate-200" size={12}>クレーンベント架設</Note>
        <Note x={104} y={238} cls="fill-slate-500" size={10}>仮支柱に桁を載せる</Note>

        {/* ② 送出し架設 */}
        <line x1={210} y1={190} x2={372} y2={190} className="stroke-amber-700" strokeWidth={2} />
        {/* 橋台（後方） */}
        <rect x={210} y={140} width={26} height={50} className="fill-slate-400" />
        {/* 橋脚（前方） */}
        <rect x={346} y={150} width={20} height={40} className="fill-slate-400" />
        {/* 送り出される桁 */}
        <rect x={224} y={124} width={120} height={12} className="fill-slate-500" />
        <Arrow x1={300} y1={112} x2={358} y2={112} cls="stroke-rose-600 fill-rose-600" width={2.5} />
        <Note x={290} y={222} cls="fill-slate-700 dark:fill-slate-200" size={12}>送出し架設</Note>
        <Note x={290} y={238} cls="fill-slate-500" size={10}>後方から押し出す</Note>

        {/* ③ 張出し架設 */}
        <line x1={400} y1={190} x2={560} y2={190} className="stroke-amber-700" strokeWidth={2} />
        {/* 橋脚（中央） */}
        <rect x={472} y={120} width={20} height={70} className="fill-slate-400" />
        {/* 左右へ張り出す桁 */}
        <rect x={418} y={108} width={64} height={12} className="fill-slate-500" />
        <rect x={482} y={108} width={64} height={12} className="fill-slate-500" />
        <Arrow x1={448} y1={96} x2={420} y2={96} cls="stroke-rose-600 fill-rose-600" width={2.5} />
        <Arrow x1={516} y1={96} x2={544} y2={96} cls="stroke-rose-600 fill-rose-600" width={2.5} />
        <Note x={482} y={222} cls="fill-slate-700 dark:fill-slate-200" size={12}>張出し架設</Note>
        <Note x={482} y={238} cls="fill-slate-500" size={10}>橋脚から左右へ</Note>
      </svg>
    </DiagramFrame>
  )
}

/** 山岳トンネルNATMの支保（断面） */
export function NatmSupport() {
  return (
    <DiagramFrame
      title="山岳トンネルNATMの支保（断面）"
      caption="地山自体を支保材として活かす。吹付コンクリート・ロックボルト・鋼アーチ支保工で地山を安定させ、内側を覆工コンクリートで仕上げる。"
    >
      <svg viewBox="0 0 560 300" role="img" aria-label="NATMトンネルの支保構造の断面の図">
        {/* 地山 */}
        <rect x={20} y={30} width={520} height={250} className="fill-stone-300 dark:fill-stone-700/60" />
        <Note x={95} y={52} cls="fill-stone-700 dark:fill-stone-200" size={12}>地山（岩盤）</Note>

        {/* ロックボルト（地山へ放射状） */}
        {[
          { ix: 369, iy: 148, ox: 402, oy: 136 },
          { ix: 334, iy: 109, ox: 355, oy: 81 },
          { ix: 280, iy: 95, ox: 280, oy: 60 },
          { ix: 226, iy: 109, ox: 205, oy: 81 },
          { ix: 191, iy: 148, ox: 158, oy: 136 },
        ].map((b, i) => (
          <g key={i}>
            <line x1={b.ix} y1={b.iy} x2={b.ox} y2={b.oy} className="stroke-amber-700" strokeWidth={2.5} />
            <circle cx={b.ox} cy={b.oy} r={4} className="fill-amber-700" />
          </g>
        ))}

        {/* 吹付コンクリート（外側リング） */}
        <path d="M185,250 L185,175 A95,80 0 0 1 375,175 L375,250 Z" className="fill-slate-400 dark:fill-slate-500" />
        {/* 鋼アーチ支保工（中間の鋼アーチ） */}
        <path d="M196,250 L196,176 A84,71 0 0 1 364,176 L364,250" className="fill-none stroke-zinc-600" strokeWidth={5} />
        {/* 覆工コンクリート（内側） */}
        <path d="M205,250 L205,178 A75,63 0 0 1 355,178 L355,250 Z" className="fill-slate-200 dark:fill-slate-300" />
        {/* トンネル空間 */}
        <path d="M216,250 L216,180 A64,53 0 0 1 344,180 L344,250 Z" className="fill-white dark:fill-slate-800" />
        <Note x={280} y={235} cls="fill-slate-500" size={12}>トンネル空間</Note>

        {/* ラベル */}
        <Arrow x1={450} y1={108} x2={392} y2={130} cls="stroke-amber-700 fill-amber-700" width={1.5} />
        <Note x={490} y={104} cls="fill-amber-800 dark:fill-amber-200" size={11}>ロックボルト</Note>

        <Arrow x1={95} y1={165} x2={188} y2={195} cls="stroke-slate-600 fill-slate-600" width={1.5} />
        <Note x={62} y={161} cls="fill-slate-700 dark:fill-slate-200" size={11} anchor="start">吹付コンクリート</Note>

        <Arrow x1={470} y1={185} x2={362} y2={205} cls="stroke-zinc-700 fill-zinc-700" width={1.5} />
        <Note x={478} y={181} cls="fill-zinc-700 dark:fill-zinc-300" size={11} anchor="start">鋼アーチ支保工</Note>

        <Arrow x1={95} y1={232} x2={208} y2={212} cls="stroke-slate-600 fill-slate-600" width={1.5} />
        <Note x={60} y={236} cls="fill-slate-700 dark:fill-slate-200" size={11} anchor="start">覆工コンクリート</Note>
      </svg>
    </DiagramFrame>
  )
}
