import { DiagramFrame } from './DiagramFrame'
import { Box, Arrow, Note } from './primitives'

/** 建設業許可の区分（一般／特定・大臣／知事）の2軸対比図 */
export function PermitTypes() {
  return (
    <DiagramFrame
      title="建設業許可の区分（2つの軸）"
      caption="「一般／特定」は下請に出す金額の大きさ、「大臣／知事」は営業所が複数都道府県にあるかで決まる。"
    >
      <svg viewBox="0 0 560 300" role="img" aria-label="建設業許可の区分を示す図">
        {/* 軸1：一般 / 特定 */}
        <Note x={20} y={28} anchor="start" cls="fill-slate-600 dark:fill-slate-300" size={13}>
          軸1：請負形態による区分
        </Note>
        <Box x={20} y={42} w={250} h={88} fill="fill-brand-500" rx={10}
          lines={['一般建設業', '下請に出す額が', '一定額未満']} fontSize={15} />
        <Box x={290} y={42} w={250} h={88} fill="fill-brand-600" rx={10}
          lines={['特定建設業', '発注者から直接請負い', '下請発注額が大きい']} fontSize={15} />

        {/* 軸2：大臣 / 知事 */}
        <Note x={20} y={172} anchor="start" cls="fill-slate-600 dark:fill-slate-300" size={13}>
          軸2：営業所の所在による区分
        </Note>
        <Box x={20} y={186} w={250} h={88} fill="fill-slate-600" rx={10}
          lines={['国土交通大臣許可', '営業所が', '複数都道府県']} fontSize={15} />
        <Box x={290} y={186} w={250} h={88} fill="fill-slate-500" rx={10}
          lines={['都道府県知事許可', '営業所が', '1都道府県のみ']} fontSize={15} />
      </svg>
    </DiagramFrame>
  )
}

/** 建設業許可の主な要件（5つ）を格子で並べる図 */
export function PermitRequirements() {
  const items: { lines: string[]; cls: string }[] = [
    { lines: ['経営業務の', '管理責任者等'], cls: 'fill-brand-600' },
    { lines: ['専任技術者'], cls: 'fill-brand-600' },
    { lines: ['財産的基礎', '（自己資本）'], cls: 'fill-brand-500' },
    { lines: ['誠実性'], cls: 'fill-brand-500' },
    { lines: ['欠格要件に', '該当しない'], cls: 'fill-slate-600' },
  ]
  return (
    <DiagramFrame
      title="建設業許可の主な要件"
      caption="これらをすべて満たして初めて許可が下りる。経営体制・技術力・財産・人的要件の総合判断。"
    >
      <svg viewBox="0 0 560 240" role="img" aria-label="建設業許可の主な要件を示す図">
        {/* 上段3つ */}
        {items.slice(0, 3).map((it, i) => (
          <Box key={i} x={20 + i * 180} y={24} w={160} h={84} fill={it.cls} rx={10}
            lines={it.lines} fontSize={15} />
        ))}
        {/* 下段2つ（中央寄せ） */}
        {items.slice(3).map((it, i) => (
          <Box key={i} x={110 + i * 180} y={128} w={160} h={84} fill={it.cls} rx={10}
            lines={it.lines} fontSize={15} />
        ))}
      </svg>
    </DiagramFrame>
  )
}

/** 主任技術者 vs 監理技術者の配置分岐図 */
export function EngineerPlacement() {
  return (
    <DiagramFrame
      title="主任技術者と監理技術者の配置"
      caption="特定建設業者が元請として下請に大きく発注する工事では監理技術者、それ以外は主任技術者を配置する。"
    >
      <svg viewBox="0 0 560 320" role="img" aria-label="技術者配置の分岐を示す図">
        {/* 起点 */}
        <Box x={180} y={20} w={200} h={56} fill="fill-slate-600" rx={10}
          lines={['工事を請け負う']} fontSize={15} />

        {/* 分岐の説明 */}
        <Note x={280} y={104} cls="fill-slate-500" size={12}>
          元請か／下請発注額は大きいか
        </Note>

        {/* 分岐矢印 */}
        <Arrow x1={250} y1={84} x2={150} y2={150} cls="stroke-brand-500 fill-brand-500" width={2} />
        <Arrow x1={310} y1={84} x2={410} y2={150} cls="stroke-slate-400 fill-slate-400" width={2} />

        {/* 左：監理技術者 */}
        <Box x={30} y={154} w={240} h={70} fill="fill-brand-600" rx={10}
          lines={['監理技術者', '特定建設業者の元請で', '下請発注額が大きい']} fontSize={14} />
        {/* 右：主任技術者 */}
        <Box x={290} y={154} w={240} h={70} fill="fill-brand-400" rx={10}
          lines={['主任技術者', 'それ以外の請負', '（下請を含む）']} fontSize={14} />

        <Note x={150} y={254} cls="fill-slate-500" size={11}>
          下請を適切に統括・指導
        </Note>
        <Note x={410} y={254} cls="fill-slate-500" size={11}>
          自社施工を技術管理
        </Note>
        <Note x={280} y={296} cls="fill-amber-600 dark:fill-amber-400" size={12}>
          ※ 一定の重要工事では現場ごとに専任が必要
        </Note>
      </svg>
    </DiagramFrame>
  )
}

/** 請負契約書のおもな記載事項を一覧化した図 */
export function ContractElements() {
  const items = [
    '工事内容',
    '請負代金の額',
    '工期（着手・完成）',
    '代金の支払方法・時期',
    '変更・中止の取扱い',
    '検査・引渡しの時期',
  ]
  return (
    <DiagramFrame
      title="請負契約書のおもな記載事項"
      caption="建設工事の請負契約は、これらの事項を書面（または電子）で明示することが求められる。"
    >
      <svg viewBox="0 0 560 250" role="img" aria-label="請負契約書の記載事項を示す図">
        {items.map((label, i) => {
          const col = i % 2
          const row = Math.floor(i / 2)
          return (
            <Box key={i} x={20 + col * 280} y={24 + row * 72} w={260} h={56}
              fill={col === 0 ? 'fill-brand-600' : 'fill-brand-500'} rx={9}
              lines={[label]} fontSize={15} />
          )
        })}
      </svg>
    </DiagramFrame>
  )
}

/** 下請保護の3本柱を示す図 */
export function SubcontractProtection() {
  const pillars: { lines: string[]; note: string[]; cls: string }[] = [
    {
      lines: ['一括下請負', '（丸投げ）の禁止'],
      note: ['工事を実質まるごと', '他社へ出すのは不可'],
      cls: 'fill-brand-600',
    },
    {
      lines: ['下請代金の', '適正・期日内支払'],
      note: ['特定建設業者は引渡し', '申出から50日以内'],
      cls: 'fill-emerald-500',
    },
    {
      lines: ['施工体制台帳', '・下請指導'],
      note: ['体制を記録し', '下請を適切に指導'],
      cls: 'fill-slate-600',
    },
  ]
  return (
    <DiagramFrame
      title="下請保護の3本柱"
      caption="弱い立場の下請を守るための柱。とくに代金支払いの期日（50日以内）は重要ポイント。"
    >
      <svg viewBox="0 0 560 240" role="img" aria-label="下請保護の3本柱を示す図">
        <Note x={280} y={26} cls="fill-slate-600 dark:fill-slate-300" size={14}>
          建設業法による下請保護
        </Note>
        {pillars.map((p, i) => (
          <g key={i}>
            <Box x={20 + i * 180} y={44} w={160} h={84} fill={p.cls} rx={10}
              lines={p.lines} fontSize={15} />
            {p.note.map((nl, j) => (
              <Note key={j} x={100 + i * 180} y={152 + j * 16} cls="fill-slate-500 dark:fill-slate-400" size={11}>
                {nl}
              </Note>
            ))}
          </g>
        ))}
      </svg>
    </DiagramFrame>
  )
}
