import { DiagramFrame } from './DiagramFrame'
import { Arrow, Note } from './primitives'

/** 河川護岸の構成（断面） */
export function RevetmentStructure() {
  // スレッショルド座標（左＝陸 / 右＝川）
  return (
    <DiagramFrame
      title="河川護岸の構成（断面）"
      caption="法面を法覆工で覆い、その足元を基礎工で支え、川底側の根固工で洗掘を防ぐ三点セットで護岸を守る。"
    >
      <svg viewBox="0 0 560 290" role="img" aria-label="河川護岸の断面構成の図">
        <Note x={280} y={18} cls="fill-slate-500">河川護岸の断面（左＝陸地 ／ 右＝川）</Note>

        {/* 土（堤体・地盤） */}
        <polygon points="40,60 170,60 330,210 520,210 520,262 40,262" className="fill-amber-200 dark:fill-amber-900/40" />
        {/* 川の水 */}
        <polygon points="277,160 520,160 520,210 330,210" className="fill-sky-300 dark:fill-sky-700/60" opacity={0.7} />
        <line x1={277} y1={160} x2={520} y2={160} className="stroke-sky-500" strokeWidth={2} />

        {/* 法覆工（法面を覆う表面） */}
        <polygon points="170,60 330,210 338.9,200.5 178.9,50.5" className="fill-slate-400 dark:fill-slate-500" />
        {/* 基礎工（法尻を支える） */}
        <rect x={306} y={198} width={48} height={34} rx={3} className="fill-slate-600" />
        {/* 根固工（川底側の保護ブロック） */}
        {[356, 379, 402, 425, 448].map((x) => (
          <rect key={x} x={x} y={206} width={20} height={13} rx={2} className="fill-stone-500" />
        ))}

        {/* ラベル */}
        <Note x={150} y={150} cls="fill-amber-800 dark:fill-amber-200" size={12}>法面</Note>

        <Arrow x1={432} y1={86} x2={262} y2={138} cls="stroke-slate-500 fill-slate-500" width={1.5} />
        <Note x={465} y={80} cls="fill-slate-700 dark:fill-slate-200" size={12}>法覆工（表面）</Note>

        <Arrow x1={185} y1={243} x2={312} y2={214} cls="stroke-slate-500 fill-slate-500" width={1.5} />
        <Note x={150} y={246} cls="fill-slate-700 dark:fill-slate-200" size={12}>基礎工</Note>

        <Arrow x1={460} y1={205} x2={420} y2={211} cls="stroke-stone-600 fill-stone-600" width={1.5} />
        <Note x={490} y={200} cls="fill-stone-700 dark:fill-stone-200" size={12}>根固工</Note>

        <Note x={410} y={152} cls="fill-sky-600 dark:fill-sky-300" size={12}>水面</Note>
      </svg>
    </DiagramFrame>
  )
}

/** 砂防堰堤の構成（縦断面） */
export function SaboDamStructure() {
  return (
    <DiagramFrame
      title="砂防堰堤の構成（縦断面）"
      caption="天端中央の水通しから水を流し、両端の袖で越流を防ぐ。下流側は前庭保護工（水叩き・副堰堤）で落下水のえぐれを防ぐ。"
    >
      <svg viewBox="0 0 560 300" role="img" aria-label="砂防堰堤の縦断面構成の図">
        <Note x={280} y={18} cls="fill-slate-500">砂防堰堤の断面（左＝上流 ／ 右＝下流）</Note>

        {/* 地盤 */}
        <rect x={40} y={240} width={480} height={48} className="fill-amber-200 dark:fill-amber-900/40" />

        {/* 上流側の堆砂 */}
        <polygon points="60,200 263,108 263,240 60,240" className="fill-amber-300 dark:fill-amber-700/50" />
        <Note x={150} y={170} cls="fill-amber-800 dark:fill-amber-200" size={12}>堆砂</Note>

        {/* 堰堤本体（台形・天端に水通しの切欠き） */}
        <path
          d="M240,240 L263,90 L283,90 L283,104 L307,104 L307,90 L327,90 L350,240 Z"
          className="fill-slate-400 dark:fill-slate-500"
        />
        <Note x={295} y={185} cls="fill-white" size={13}>砂防堰堤</Note>

        {/* 前庭保護工：水叩き */}
        <rect x={352} y={232} width={120} height={12} rx={2} className="fill-slate-500" />
        {/* 前庭保護工：副堰堤 */}
        <polygon points="455,240 460,206 486,206 492,240" className="fill-slate-500" />

        {/* ラベル */}
        <Arrow x1={295} y1={56} x2={295} y2={100} cls="stroke-sky-600 fill-sky-600" width={2} />
        <Note x={295} y={48} cls="fill-sky-600 dark:fill-sky-300" size={12}>水通し</Note>

        <Arrow x1={330} y1={64} x2={320} y2={88} cls="stroke-slate-500 fill-slate-500" width={1.5} />
        <Note x={345} y={58} cls="fill-slate-700 dark:fill-slate-200" size={11} anchor="start">袖（両端）</Note>

        <Arrow x1={430} y1={150} x2={410} y2={228} cls="stroke-emerald-600 fill-emerald-600" width={1.5} />
        <Arrow x1={445} y1={150} x2={472} y2={210} cls="stroke-emerald-600 fill-emerald-600" width={1.5} />
        <Note x={440} y={140} cls="fill-emerald-700 dark:fill-emerald-300" size={12}>前庭保護工</Note>
        <Note x={395} y={270} cls="fill-slate-500" size={10}>水叩き</Note>
        <Note x={473} y={270} cls="fill-slate-500" size={10}>副堰堤</Note>
      </svg>
    </DiagramFrame>
  )
}

/** 開削による管布設（断面） */
export function PipeLaying() {
  return (
    <DiagramFrame
      title="開削による管布設（断面）"
      caption="溝を掘り、土留めで側面を支えながら管基礎の上に管を据え、埋戻し・路面復旧で元の道路に戻す。"
    >
      <svg viewBox="0 0 560 300" role="img" aria-label="開削による管布設の断面の図">
        <Note x={280} y={18} cls="fill-slate-500">掘削溝に管を据える（左右対称の断面）</Note>

        {/* 地盤（溝の左右と底） */}
        <rect x={40} y={70} width={160} height={196} className="fill-amber-200 dark:fill-amber-900/40" />
        <rect x={360} y={70} width={160} height={196} className="fill-amber-200 dark:fill-amber-900/40" />
        {/* 既設の路面（地盤上面） */}
        <rect x={40} y={66} width={160} height={6} className="fill-slate-700" />
        <rect x={360} y={66} width={160} height={6} className="fill-slate-700" />

        {/* 埋戻し（溝内） */}
        <rect x={205} y={110} width={150} height={140} className="fill-amber-300 dark:fill-amber-700/50" />
        {/* 路面復旧（上層：表層＋路盤） */}
        <rect x={200} y={84} width={160} height={26} className="fill-slate-400" />
        <rect x={200} y={70} width={160} height={14} className="fill-slate-700" />

        {/* 土留め（両側の鋼矢板） */}
        <rect x={196} y={70} width={8} height={180} className="fill-zinc-500" />
        <rect x={356} y={70} width={8} height={180} className="fill-zinc-500" />

        {/* 管基礎 */}
        <rect x={205} y={236} width={150} height={14} rx={2} className="fill-slate-500" />
        {/* 管 */}
        <circle cx={280} cy={205} r={30} className="fill-slate-400 stroke-slate-600" strokeWidth={3} />
        <circle cx={280} cy={205} r={18} className="fill-white dark:fill-slate-800" />

        {/* ラベル */}
        <Arrow x1={438} y1={88} x2={362} y2={78} cls="stroke-slate-600 fill-slate-600" width={1.5} />
        <Note x={490} y={92} cls="fill-slate-700 dark:fill-slate-200" size={12}>路面復旧</Note>

        <Arrow x1={120} y1={150} x2={208} y2={168} cls="stroke-amber-700 fill-amber-700" width={1.5} />
        <Note x={95} y={146} cls="fill-amber-800 dark:fill-amber-200" size={12}>埋戻し</Note>

        <Arrow x1={448} y1={205} x2={314} y2={205} cls="stroke-slate-600 fill-slate-600" width={1.5} />
        <Note x={490} y={209} cls="fill-slate-700 dark:fill-slate-200" size={12}>管</Note>

        <Arrow x1={448} y1={243} x2={358} y2={243} cls="stroke-slate-600 fill-slate-600" width={1.5} />
        <Note x={490} y={247} cls="fill-slate-700 dark:fill-slate-200" size={12}>管基礎</Note>

        <Arrow x1={120} y1={232} x2={198} y2={210} cls="stroke-zinc-600 fill-zinc-600" width={1.5} />
        <Note x={95} y={236} cls="fill-zinc-700 dark:fill-zinc-300" size={12}>土留め</Note>
      </svg>
    </DiagramFrame>
  )
}

/** 推進工法（非開削）のイメージ（横断面） */
export function PipeJacking() {
  return (
    <DiagramFrame
      title="推進工法（非開削）のイメージ"
      caption="発進立坑の元押しジャッキで管を地中に押し込み、到達立坑まで一直線に進める。地表の道路を掘り返さない。"
    >
      <svg viewBox="0 0 560 280" role="img" aria-label="推進工法の横断面の図">
        {/* 地盤 */}
        <rect x={20} y={70} width={520} height={185} className="fill-amber-200 dark:fill-amber-900/40" />
        {/* 地表の道路（壊さない） */}
        <rect x={20} y={64} width={520} height={8} className="fill-slate-700" />
        <Note x={280} y={52} cls="fill-slate-600 dark:fill-slate-300" size={12}>道路（地表）はそのまま</Note>

        {/* 発進立坑 */}
        <rect x={50} y={72} width={80} height={158} className="fill-white dark:fill-slate-800 stroke-zinc-500" strokeWidth={3} />
        {/* 到達立坑 */}
        <rect x={440} y={72} width={80} height={158} className="fill-white dark:fill-slate-800 stroke-zinc-500" strokeWidth={3} />

        {/* 推進管（地中を一直線に） */}
        <rect x={130} y={150} width={310} height={36} className="fill-slate-400 stroke-slate-600" strokeWidth={2} />
        {[170, 210, 250, 290, 330, 370, 410].map((x) => (
          <line key={x} x1={x} y1={150} x2={x} y2={186} className="stroke-slate-600" strokeWidth={1.5} />
        ))}
        {/* 先端（刃口・推進機） */}
        <polygon points="440,150 440,186 458,168" className="fill-slate-600" />

        {/* 元押しジャッキ（発進立坑側で押す） */}
        <rect x={108} y={156} width={22} height={24} className="fill-rose-500" />
        <Arrow x1={120} y1={210} x2={155} y2={210} cls="stroke-rose-600 fill-rose-600" width={2.5} />
        <Note x={150} y={140} cls="fill-rose-600 dark:fill-rose-300" size={11}>元押しジャッキ</Note>

        {/* ラベル */}
        <Note x={90} y={248} cls="fill-zinc-700 dark:fill-zinc-300" size={12}>発進立坑</Note>
        <Note x={480} y={248} cls="fill-zinc-700 dark:fill-zinc-300" size={12}>到達立坑</Note>
        <Note x={285} y={210} cls="fill-slate-700 dark:fill-slate-200" size={12}>推進管を順次押し込む</Note>

        <Note x={280} y={272} cls="fill-emerald-600 dark:fill-emerald-300" size={11}>
          ※ 非開削：地表の交通を止めずに管を布設できる
        </Note>
      </svg>
    </DiagramFrame>
  )
}
