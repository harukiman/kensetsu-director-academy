import { useMemo } from 'react'
import { renderMarkdown, splitBody } from '../lib/markdown'
import { DIAGRAMS, MissingDiagram } from '../diagrams/registry'

/** 章本文（Markdown + 図マーカー）をレンダリングする */
export function ChapterBody({ body }: { body: string }) {
  const segments = useMemo(() => splitBody(body), [body])
  return (
    <div className="article max-w-prose">
      {segments.map((seg, i) => {
        if (seg.type === 'diagram') {
          const Cmp = DIAGRAMS[seg.key]
          return Cmp ? (
            <Cmp key={i} />
          ) : (
            <MissingDiagram key={i} diagramKey={seg.key} />
          )
        }
        return (
          <div
            key={i}
            dangerouslySetInnerHTML={{ __html: renderMarkdown(seg.content) }}
          />
        )
      })}
    </div>
  )
}
