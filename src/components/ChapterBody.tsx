import { useMemo } from 'react'
import { renderMarkdown, splitBody, injectHeadingIds } from '../lib/markdown'
import { DIAGRAMS, MissingDiagram } from '../diagrams/registry'

/** 章本文（Markdown + 図マーカー）をレンダリングする */
export function ChapterBody({ body }: { body: string }) {
  const segments = useMemo(() => splitBody(body), [body])
  // 章全体で <h2> に通し番号 id を付与（目次ジャンプと一致させる）
  let h2Index = 0
  return (
    <div className="article max-w-prose">
      {segments.map((seg, i) => {
        if (seg.type === 'diagram') {
          const Cmp = DIAGRAMS[seg.key]
          return Cmp ? <Cmp key={i} /> : <MissingDiagram key={i} diagramKey={seg.key} />
        }
        const { html, count } = injectHeadingIds(renderMarkdown(seg.content), h2Index)
        h2Index += count
        return <div key={i} dangerouslySetInnerHTML={{ __html: html }} />
      })}
    </div>
  )
}
