import type { ReactNode } from 'react'

/**
 * 図の共通フレーム。タイトル・キャプション付き。
 * SVG は viewBox + width:100% でレスポンシブ（.diagram svg ルール）。
 */
export function DiagramFrame({
  title,
  caption,
  children,
}: {
  title: string
  caption?: string
  children: ReactNode
}) {
  return (
    <figure className="diagram my-6 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/40 p-4">
      <figcaption className="mb-3 text-sm font-bold text-brand-700 dark:text-brand-300">
        図：{title}
      </figcaption>
      {children}
      {caption && (
        <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">{caption}</p>
      )}
    </figure>
  )
}
