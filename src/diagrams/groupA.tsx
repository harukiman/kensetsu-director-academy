import { DiagramFrame } from './DiagramFrame'
import { Box, Arrow, Note } from './primitives'

/** 公共工事ができるまでの流れ（発注→入札→契約→施工→検査→引渡し）の自作 SVG 図 */
export function PublicPrivateFlow() {
  return (
    <DiagramFrame
      title="公共工事ができるまでの流れ"
      caption="発注（入札公告・設計）から入札・契約を経て施工し、完成検査・引渡しで完了する。横フローは2段に折り返している。"
    >
      <svg viewBox="0 0 560 205" role="img" aria-label="公共工事の発注から引渡しまでの流れの図">
        {/* 上段（左→右） */}
        <Box x={12} y={20} w={150} h={54} lines={['発注', '入札公告・設計']} fill="fill-brand-600" />
        <Box x={205} y={20} w={150} h={54} lines={['入札・落札']} fill="fill-brand-500" />
        <Box x={398} y={20} w={150} h={54} lines={['契約']} fill="fill-brand-600" />
        {/* 下段（右→左に折り返し） */}
        <Box x={398} y={110} w={150} h={54} lines={['施工']} fill="fill-brand-500" />
        <Box x={205} y={110} w={150} h={54} lines={['完成検査']} fill="fill-emerald-500" />
        <Box x={12} y={110} w={150} h={54} lines={['引渡し・支払']} fill="fill-amber-500" />

        {/* 矢印：上段 */}
        <Arrow x1={162} y1={47} x2={205} y2={47} />
        <Arrow x1={355} y1={47} x2={398} y2={47} />
        {/* 折り返し（下へ） */}
        <Arrow x1={473} y1={74} x2={473} y2={110} />
        {/* 矢印：下段（右→左） */}
        <Arrow x1={398} y1={137} x2={355} y2={137} />
        <Arrow x1={205} y1={137} x2={162} y2={137} />

        <Note x={280} y={192} cls="fill-slate-500">
          ※民間工事は入札を行わず、相見積もり・特命発注が多い
        </Note>
      </svg>
    </DiagramFrame>
  )
}
