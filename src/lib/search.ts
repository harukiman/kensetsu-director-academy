import Fuse from 'fuse.js'
import { CHAPTERS } from '../content'

export interface SearchDoc {
  type: 'chapter' | 'term'
  id: string // chapter id（用語も所属章へ飛ばす）
  title: string
  subtitle: string
  body: string
}

// 章と用語を 1 つの検索インデックスに統合
const docs: SearchDoc[] = [
  ...CHAPTERS.map((c) => ({
    type: 'chapter' as const,
    id: c.id,
    title: c.title,
    subtitle: c.summary,
    body: c.body + ' ' + c.terms.map((t) => `${t.term} ${t.definition}`).join(' '),
  })),
  ...CHAPTERS.flatMap((c) =>
    c.terms.map((t) => ({
      type: 'term' as const,
      id: c.id,
      title: t.term,
      subtitle: t.definition,
      body: t.definition,
    })),
  ),
]

const fuse = new Fuse(docs, {
  keys: [
    { name: 'title', weight: 0.5 },
    { name: 'subtitle', weight: 0.3 },
    { name: 'body', weight: 0.2 },
  ],
  threshold: 0.4,
  ignoreLocation: true,
  minMatchCharLength: 2,
})

export function search(query: string): SearchDoc[] {
  const q = query.trim()
  if (!q) return []
  return fuse.search(q, { limit: 20 }).map((r) => r.item)
}
