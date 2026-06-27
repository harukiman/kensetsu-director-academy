import { marked } from 'marked'
import DOMPurify from 'dompurify'

marked.setOptions({
  gfm: true,
  breaks: false,
})

/**
 * Markdown 文字列を安全な HTML に変換する。
 * - marked で GFM パース（表・リスト等）
 * - DOMPurify でサニタイズ（XSS 防止）
 * - 表は `.table-wrap` で包み、横スクロール化（はみ出し防止）
 */
export function renderMarkdown(md: string): string {
  const rawHtml = marked.parse(md, { async: false }) as string
  const clean = DOMPurify.sanitize(rawHtml, {
    ADD_ATTR: ['target', 'rel'],
  })
  // <table> を横スクロール用ラッパで包む
  return clean.replace(
    /<table>/g,
    '<div class="table-wrap"><table>',
  ).replace(/<\/table>/g, '</table></div>')
}

/** 本文の `## 見出し` を抽出して目次データを作る（id はレンダリング側と一致させる） */
export interface TocItem {
  text: string
  id: string
}
export function extractToc(body: string): TocItem[] {
  const out: TocItem[] = []
  let i = 0
  for (const line of body.split('\n')) {
    const m = line.match(/^##\s+(.+)$/) // `###` は \s 不一致で除外される
    if (m) {
      out.push({ text: m[1].trim(), id: `sec-${i}` })
      i++
    }
  }
  return out
}

/** レンダリング済み HTML の `<h2>` に通し番号 id を付与（目次ジャンプ用） */
export function injectHeadingIds(
  html: string,
  start: number,
): { html: string; count: number } {
  let n = start
  const out = html.replace(/<h2>/g, () => `<h2 id="sec-${n++}">`)
  return { html: out, count: n - start }
}

/** 本文を「Markdown 断片」と「図キー」に分割する。 */
export type BodySegment =
  | { type: 'md'; content: string }
  | { type: 'diagram'; key: string }

const DIAGRAM_RE = /^\s*\[\[diagram:([\w-]+)\]\]\s*$/

/**
 * 本文を行単位で走査し、`[[diagram:キー]]` 単独行で
 * Markdown と図コンポーネントを交互に並べられるよう分割する。
 */
export function splitBody(body: string): BodySegment[] {
  const segments: BodySegment[] = []
  const lines = body.split('\n')
  let buffer: string[] = []
  const flush = () => {
    if (buffer.length) {
      const content = buffer.join('\n').trim()
      if (content) segments.push({ type: 'md', content })
      buffer = []
    }
  }
  for (const line of lines) {
    const m = line.match(DIAGRAM_RE)
    if (m) {
      flush()
      segments.push({ type: 'diagram', key: m[1] })
    } else {
      buffer.push(line)
    }
  }
  flush()
  return segments
}
