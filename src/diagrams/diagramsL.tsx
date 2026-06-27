import { DiagramFrame } from './DiagramFrame'
import { Arrow, Note } from './primitives'

/** 基礎の種類：直接基礎（浅い）と杭基礎（深い）の断面対比 */
export function PileFoundationTypes() {
  return (
    <DiagramFrame
      title="基礎の種類（直接基礎と杭基礎）"
      caption="支持層が浅ければ直接基礎で直接載せ、深ければ杭基礎で杭を支持層まで届かせて荷重を伝える。"
    >
      <svg viewBox="0 0 560 300" role="img" aria-label="直接基礎と杭基礎の断面対比の図">
        {/* 見出し */}
        <text x={143} y={22} textAnchor="middle" className="fill-brand-600 dark:fill-brand-300" fontSize={13} fontWeight="bold">
          直接基礎（浅い）
        </text>
        <text x={417} y={22} textAnchor="middle" className="fill-emerald-600 dark:fill-emerald-300" fontSize={13} fontWeight="bold">
          杭基礎（深い）
        </text>

        {/* ───── 左：直接基礎 ───── */}
        {/* 軟弱地盤（浅い） */}
        <rect x={12} y={50} width={262} height={80} className="fill-stone-200 dark:fill-stone-700" />
        {/* 支持層（浅い位置） */}
        <rect x={12} y={130} width={262} height={140} className="fill-amber-300 dark:fill-amber-700" />
        <Note x={143} y={205} cls="fill-amber-800 dark:fill-amber-200" size={13}>支持層（固い地盤）</Note>
        {/* 上部構造の柱 */}
        <rect x={128} y={58} width={30} height={50} className="fill-slate-500" />
        {/* フーチング（支持層に直接） */}
        <rect x={98} y={108} width={90} height={22} className="fill-slate-600" />
        <Note x={143} y={150} cls="fill-white" size={11}>フーチング</Note>
        <Note x={143} y={45} cls="fill-slate-500" size={10}>地表近くの支持層に直接</Note>

        {/* 中央仕切り */}
        <line x1={280} y1={30} x2={280} y2={278} className="stroke-slate-300 dark:stroke-slate-600" strokeWidth={1} strokeDasharray="4 4" />

        {/* ───── 右：杭基礎 ───── */}
        {/* 軟弱地盤（厚い） */}
        <rect x={286} y={50} width={262} height={180} className="fill-stone-200 dark:fill-stone-700" />
        <Note x={417} y={150} cls="fill-stone-500" size={11}>軟弱地盤</Note>
        {/* 支持層（深い位置） */}
        <rect x={286} y={230} width={262} height={40} className="fill-amber-300 dark:fill-amber-700" />
        <Note x={417} y={256} cls="fill-amber-800 dark:fill-amber-200" size={12}>支持層（深い）</Note>
        {/* 柱 */}
        <rect x={402} y={58} width={30} height={50} className="fill-slate-500" />
        {/* 杭頭フーチング */}
        <rect x={372} y={108} width={90} height={22} className="fill-slate-600" />
        {/* 杭（支持層まで到達） */}
        <rect x={388} y={130} width={11} height={105} className="fill-slate-700 dark:fill-slate-300" />
        <rect x={435} y={130} width={11} height={105} className="fill-slate-700 dark:fill-slate-300" />
        <Note x={417} y={45} cls="fill-slate-500" size={10}>深い支持層まで杭で到達</Note>
      </svg>
    </DiagramFrame>
  )
}

/** コンクリートの代表的な不具合（ジャンカ・コールドジョイント・レイタンス・ひび割れ） */
export function ConcreteDefects() {
  return (
    <DiagramFrame
      title="コンクリートの代表的な不具合"
      caption="施工不良や乾燥収縮で生じる代表的な欠陥。位置と原因を押さえ、適切な打設・締固め・養生で防ぐ。"
    >
      <svg viewBox="0 0 560 300" role="img" aria-label="コンクリートの代表的な不具合の図">
        {/* コンクリート断面 */}
        <rect x={70} y={60} width={180} height={200} className="fill-slate-300 dark:fill-slate-600" rx={2} />

        {/* レイタンス（上面の脆弱層） */}
        <rect x={70} y={60} width={180} height={12} className="fill-stone-200 dark:fill-stone-400" />
        {/* コールドジョイント（打重ねの継ぎ目） */}
        <line x1={70} y1={140} x2={250} y2={140} className="stroke-violet-500" strokeWidth={3} strokeDasharray="6 4" />
        {/* ひび割れ */}
        <polyline points="178,72 168,110 186,150 172,200 184,258" className="stroke-rose-500" strokeWidth={2.5} fill="none" />
        {/* ジャンカ（豆板・骨材露出） */}
        {[
          [98, 232], [112, 230], [104, 244], [120, 242], [94, 246], [128, 232],
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r={5} className="fill-orange-400 stroke-orange-700" strokeWidth={1} />
        ))}

        {/* 引き出し線と注記 */}
        {/* レイタンス */}
        <Arrow x1={300} y1={80} x2={252} y2={66} cls="stroke-stone-500 fill-stone-500" width={1.5} />
        <text x={306} y={78} textAnchor="start" className="fill-stone-600 dark:fill-stone-300" fontSize={13} fontWeight="bold">レイタンス</text>
        <Note x={306} y={94} anchor="start" cls="fill-slate-500">上面に浮く脆弱な層</Note>

        {/* コールドジョイント */}
        <Arrow x1={300} y1={135} x2={252} y2={140} cls="stroke-violet-500 fill-violet-500" width={1.5} />
        <text x={306} y={133} textAnchor="start" className="fill-violet-600 dark:fill-violet-300" fontSize={13} fontWeight="bold">コールドジョイント</text>
        <Note x={306} y={149} anchor="start" cls="fill-slate-500">打重ね遅れの継ぎ目</Note>

        {/* ひび割れ */}
        <Arrow x1={300} y1={195} x2={186} y2={195} cls="stroke-rose-500 fill-rose-500" width={1.5} />
        <text x={306} y={193} textAnchor="start" className="fill-rose-600 dark:fill-rose-300" fontSize={13} fontWeight="bold">ひび割れ</text>
        <Note x={306} y={209} anchor="start" cls="fill-slate-500">乾燥収縮などの亀裂</Note>

        {/* ジャンカ */}
        <Arrow x1={300} y1={245} x2={132} y2={240} cls="stroke-orange-500 fill-orange-500" width={1.5} />
        <text x={306} y={243} textAnchor="start" className="fill-orange-600 dark:fill-orange-300" fontSize={13} fontWeight="bold">ジャンカ（豆板）</text>
        <Note x={306} y={259} anchor="start" cls="fill-slate-500">締固め不足で骨材露出</Note>
      </svg>
    </DiagramFrame>
  )
}

/** 土留め支保工の形式：自立式・切梁式・アンカー式の断面対比 */
export function EarthRetainingTypes() {
  const panels = [
    { px: 12, title: '自立式', type: 'self', tcls: 'fill-sky-600 dark:fill-sky-300' },
    { px: 192, title: '切梁式', type: 'strut', tcls: 'fill-emerald-600 dark:fill-emerald-300' },
    { px: 372, title: 'アンカー式', type: 'anchor', tcls: 'fill-rose-600 dark:fill-rose-300' },
  ] as const
  return (
    <DiagramFrame
      title="土留め支保工の形式"
      caption="掘削の深さや地山の条件に応じ、自立式・切梁式・アンカー式を使い分けて土留め壁を支える。"
    >
      <svg viewBox="0 0 560 260" role="img" aria-label="土留め支保工の形式の断面対比の図">
        {panels.map((p) => {
          const cx = p.px + 86
          const wallX = p.px + 96
          return (
            <g key={p.title}>
              <text x={cx} y={36} textAnchor="middle" className={p.tcls} fontSize={13} fontWeight="bold">
                {p.title}
              </text>
              {/* 背面地山（保持する土） */}
              <rect x={p.px + 104} y={66} width={68} height={164} className="fill-amber-200 dark:fill-amber-800" />
              {/* 掘削側（開放）＋掘削床 */}
              <rect x={p.px + 8} y={66} width={88} height={164} className="fill-sky-50 dark:fill-sky-900/30" />
              <rect x={p.px + 8} y={190} width={88} height={40} className="fill-stone-300 dark:fill-stone-600" />
              {/* 土留め壁 */}
              <rect x={wallX} y={58} width={8} height={172} className="fill-slate-600 dark:fill-slate-300" />

              {/* 形式別の支保部材 */}
              {p.type === 'self' && (
                <Note x={p.px + 50} y={120} cls="fill-slate-500" size={10}>支保工なし</Note>
              )}
              {p.type === 'strut' && (
                <g>
                  {/* 腹起し */}
                  <rect x={p.px + 86} y={128} width={8} height={34} className="fill-emerald-600" />
                  {/* 切梁 */}
                  <rect x={p.px + 14} y={140} width={72} height={9} className="fill-emerald-500" />
                  <Note x={p.px + 50} y={134} cls="fill-emerald-700 dark:fill-emerald-300" size={10}>切梁</Note>
                  <Note x={p.px + 92} y={120} anchor="start" cls="fill-emerald-700 dark:fill-emerald-300" size={10}>腹起し</Note>
                </g>
              )}
              {p.type === 'anchor' && (
                <g>
                  <Arrow x1={wallX} y1={104} x2={p.px + 162} y2={168} cls="stroke-rose-500 fill-rose-500" width={2} />
                  <circle cx={p.px + 162} cy={168} r={5} className="fill-rose-500" />
                  <Note x={p.px + 130} y={150} cls="fill-rose-600 dark:fill-rose-300" size={10}>アンカー</Note>
                </g>
              )}
            </g>
          )
        })}
        <Note x={150} y={252} cls="fill-amber-700 dark:fill-amber-300" size={10}>■ 背面地山</Note>
        <Note x={360} y={252} cls="fill-sky-600 dark:fill-sky-300" size={10}>■ 掘削側</Note>
      </svg>
    </DiagramFrame>
  )
}
