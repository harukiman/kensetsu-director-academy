import { DiagramFrame } from './DiagramFrame'
import { Box, Arrow, Note } from './primitives'

/** 施工体制台帳・施工体系図と再下請負通知書の流れの自作 SVG 図 */
export function ConstructionSystemDoc() {
  return (
    <DiagramFrame
      title="施工体制台帳・施工体系図のしくみ"
      caption="元請（特定建設業者）が台帳・体系図を作成。各下請は『再下請負通知書』を上位へ提出し、その内容が台帳に反映される。"
    >
      <svg viewBox="0 0 560 315" role="img" aria-label="施工体制台帳と再下請負通知書の流れの図">
        {/* 元請（上） */}
        <Box x={40} y={20} w={200} h={56} lines={['元請', '特定建設業者']} fill="fill-brand-600" />
        {/* 元請が作成する書類（右） */}
        <Box x={330} y={16} w={190} h={36} lines={['施工体制台帳']} fill="fill-emerald-500" fontSize={13} />
        <Box x={330} y={60} w={190} h={36} lines={['施工体系図']} fill="fill-emerald-500" fontSize={13} />
        {/* 下請（下に連なる） */}
        <Box x={40} y={150} w={200} h={50} lines={['一次下請']} fill="fill-brand-500" />
        <Box x={40} y={240} w={200} h={50} lines={['二次下請']} fill="fill-brand-400" />

        {/* 元請 → 書類を作成 */}
        <Arrow x1={240} y1={38} x2={330} y2={34} cls="stroke-emerald-500 fill-emerald-500" />
        <Arrow x1={240} y1={58} x2={330} y2={78} cls="stroke-emerald-500 fill-emerald-500" />
        <Note x={285} y={12} cls="fill-emerald-600" size={11}>作成</Note>

        {/* 再下請負通知書（下→上、点線） */}
        <Arrow x1={140} y1={240} x2={140} y2={202} dashed cls="stroke-amber-500 fill-amber-500" />
        <Arrow x1={140} y1={150} x2={140} y2={78} dashed cls="stroke-amber-500 fill-amber-500" />
        <Note x={150} y={224} cls="fill-amber-600" size={11} anchor="start">再下請負通知書</Note>
        <Note x={150} y={117} cls="fill-amber-600" size={11} anchor="start">再下請負通知書</Note>

        <Note x={280} y={308} cls="fill-slate-500">
          ※下請からの通知書をまとめ、元請が台帳・体系図を最新に保つ
        </Note>
      </svg>
    </DiagramFrame>
  )
}

/** 工事写真・書類の電子納品（CALS/EC）までの流れの自作 SVG 図 */
export function DocumentFlow() {
  return (
    <DiagramFrame
      title="工事写真・書類の流れ（電子納品）"
      caption="現場で撮影・記録した写真を電子小黒板で整え、電子納品（CALS/EC）として発注者へ。建設ディレクターが整理・支援する。"
    >
      <svg viewBox="0 0 560 165" role="img" aria-label="工事写真の撮影から電子納品までの流れの図">
        <Box x={12} y={20} w={118} h={60} lines={['現場', '撮影・記録']} fill="fill-brand-600" />
        <Box x={151} y={20} w={118} h={60} lines={['電子小黒板', 'デジタル写真']} fill="fill-brand-500" />
        <Box x={290} y={20} w={118} h={60} lines={['電子納品', 'CALS/EC']} fill="fill-brand-600" />
        <Box x={429} y={20} w={118} h={60} lines={['発注者']} fill="fill-emerald-500" />

        <Arrow x1={130} y1={50} x2={151} y2={50} />
        <Arrow x1={269} y1={50} x2={290} y2={50} />
        <Arrow x1={408} y1={50} x2={429} y2={50} />

        {/* 建設ディレクターの支援範囲（中央2工程） */}
        <rect
          x={151}
          y={98}
          width={257}
          height={44}
          rx={8}
          className="fill-amber-50 dark:fill-amber-900/30 stroke-amber-400"
          strokeWidth={1.5}
          strokeDasharray="4 3"
        />
        <Note x={279} y={116} cls="fill-amber-700 dark:fill-amber-300" size={12}>
          建設ディレクターが
        </Note>
        <Note x={279} y={132} cls="fill-amber-600 dark:fill-amber-400" size={11}>
          写真・書類を整理・支援
        </Note>
      </svg>
    </DiagramFrame>
  )
}
