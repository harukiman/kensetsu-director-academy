import { DiagramFrame } from './DiagramFrame'

/** 重層下請構造（発注者→元請→一次→二次）のオリジナル SVG 図 */
export function SubcontractStructure() {
  return (
    <DiagramFrame
      title="重層下請構造（発注から下請への流れ）"
      caption="工事は発注者→元請→一次下請→二次下請…と階層的に流れる。自社（弊社派）は一次・二次下請の位置にある。"
    >
      <svg viewBox="0 0 560 360" role="img" aria-label="重層下請構造の図">
        <defs>
          <marker id="arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
            <path d="M0,0 L8,3 L0,6 Z" className="fill-slate-400" />
          </marker>
        </defs>
        {[
          { y: 20, label: '発注者', sub: '国・自治体・民間', cls: 'fill-slate-600' },
          { y: 100, label: '元請（元請負人）', sub: '発注者と直接契約', cls: 'fill-brand-600' },
          { y: 180, label: '一次下請', sub: '元請から請負', cls: 'fill-brand-500' },
          { y: 260, label: '二次下請', sub: '一次下請から請負', cls: 'fill-brand-400' },
        ].map((box, i) => (
          <g key={i}>
            <rect x="160" y={box.y} width="240" height="56" rx="8" className={box.cls} />
            <text x="280" y={box.y + 24} textAnchor="middle" className="fill-white" fontSize="17" fontWeight="bold">
              {box.label}
            </text>
            <text x="280" y={box.y + 44} textAnchor="middle" className="fill-white/90" fontSize="12">
              {box.sub}
            </text>
            {i < 3 && (
              <line
                x1="280" y1={box.y + 56} x2="280" y2={box.y + 80}
                className="stroke-slate-400" strokeWidth="2" markerEnd="url(#arrow)"
              />
            )}
          </g>
        ))}
        {/* 自社の位置を示す吹き出し */}
        <g>
          <rect x="420" y="184" width="120" height="120" rx="8" className="fill-amber-50 dark:fill-amber-900/30 stroke-amber-400" strokeWidth="1.5" strokeDasharray="4 3" />
          <text x="480" y="210" textAnchor="middle" className="fill-amber-700 dark:fill-amber-300" fontSize="13" fontWeight="bold">自社の</text>
          <text x="480" y="228" textAnchor="middle" className="fill-amber-700 dark:fill-amber-300" fontSize="13" fontWeight="bold">立ち位置</text>
          <text x="480" y="256" textAnchor="middle" className="fill-amber-600 dark:fill-amber-400" fontSize="11">一次・二次</text>
          <text x="480" y="272" textAnchor="middle" className="fill-amber-600 dark:fill-amber-400" fontSize="11">下請として</text>
          <text x="480" y="288" textAnchor="middle" className="fill-amber-600 dark:fill-amber-400" fontSize="11">施工を担う</text>
        </g>
        <text x="280" y="346" textAnchor="middle" className="fill-slate-400" fontSize="11">
          ※ 矢印は「契約・指示」の流れ。下にいくほど発注者から遠い
        </text>
      </svg>
    </DiagramFrame>
  )
}
