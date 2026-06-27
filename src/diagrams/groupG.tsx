import { DiagramFrame } from './DiagramFrame'
import { Box, Arrow, Note } from './primitives'

/** 資格・キャリアパス（新卒→2級→主任→1級→監理技術者）の階段状 自作 SVG 図 */
export function ShikakuPath() {
  return (
    <DiagramFrame
      title="資格・キャリアパス（施工管理技士）"
      caption="新卒入社から2級・1級施工管理技士を取得し、主任技術者・監理技術者へ。技能講習や特別教育は随時取得する。"
    >
      <svg viewBox="0 0 560 320" role="img" aria-label="施工管理技士の資格とキャリアパスの階段図">
        {/* 階段（左下→右上に上昇） */}
        <Box x={12} y={246} w={135} h={44} lines={['新卒入社']} fill="fill-brand-400" fontSize={13} />
        <Box x={110} y={194} w={135} h={44} lines={['2級施工管理技士', '一次→技士補→二次']} fill="fill-brand-500" fontSize={13} />
        <Box x={208} y={142} w={135} h={44} lines={['主任技術者']} fill="fill-amber-500" fontSize={13} />
        <Box x={306} y={90} w={135} h={44} lines={['1級施工管理技士']} fill="fill-brand-600" fontSize={13} />
        <Box x={404} y={38} w={135} h={44} lines={['監理技術者']} fill="fill-emerald-500" fontSize={13} />

        {/* 上昇矢印 */}
        <Arrow x1={79} y1={246} x2={155} y2={238} />
        <Arrow x1={177} y1={194} x2={253} y2={186} />
        <Arrow x1={275} y1={142} x2={351} y2={134} />
        <Arrow x1={373} y1={90} x2={449} y2={82} />

        {/* 脇に：技能講習・特別教育 */}
        <rect
          x={12}
          y={20}
          width={230}
          height={70}
          rx={8}
          className="fill-amber-50 dark:fill-amber-900/30 stroke-amber-400"
          strokeWidth={1.5}
          strokeDasharray="4 3"
        />
        <Note x={127} y={42} cls="fill-amber-700 dark:fill-amber-300" size={12}>技能講習・特別教育</Note>
        <Note x={127} y={60} cls="fill-amber-600 dark:fill-amber-400" size={11}>玉掛け・足場・職長 等</Note>
        <Note x={127} y={78} cls="fill-amber-600 dark:fill-amber-400" size={11}>を随時取得</Note>
      </svg>
    </DiagramFrame>
  )
}
