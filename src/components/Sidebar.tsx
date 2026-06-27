import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { GROUPS, chaptersOfGroup } from '../content'
import { useProgress } from '../hooks/ProgressContext'

const TOOLS = [
  { to: '/dashboard', label: 'ダッシュボード', icon: '📊' },
  { to: '/roadmap', label: '学習ロードマップ', icon: '🗺️' },
  { to: '/quiz', label: 'クイズ・確認テスト', icon: '✅' },
  { to: '/exam', label: '演習・模擬試験', icon: '📝' },
  { to: '/flashcards', label: 'フラッシュカード', icon: '🃏' },
  { to: '/glossary', label: '用語集・略語', icon: '📖' },
  { to: '/checklist', label: '現場チェックリスト', icon: '📋' },
]

/** 現在のパスから所属グループ ID を求める（/chapter/o2 → "O"） */
function currentGroupId(path: string): string | null {
  const m = path.match(/^\/chapter\/([a-z])/i)
  return m ? m[1].toUpperCase() : null
}

export function Sidebar({
  onNavigate,
  currentPath,
}: {
  onNavigate: () => void
  currentPath: string
}) {
  const { isRead } = useProgress()
  const activeGroup = currentGroupId(currentPath)
  // 開いているグループ。初期は現在の章のグループのみ開く。
  const [open, setOpen] = useState<Set<string>>(() => new Set(activeGroup ? [activeGroup] : ['A']))

  // 章へ遷移したら、その章のグループを自動で開く
  useEffect(() => {
    if (activeGroup) setOpen((prev) => (prev.has(activeGroup) ? prev : new Set(prev).add(activeGroup)))
  }, [activeGroup])

  const toggle = (id: string) =>
    setOpen((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })

  return (
    <nav className="space-y-5 text-sm">
      <div>
        <SectionTitle>学習ツール</SectionTitle>
        <ul className="space-y-0.5">
          {TOOLS.map((t) => (
            <li key={t.to}>
              <Link to={t.to} onClick={onNavigate} className={linkCls(currentPath === t.to)}>
                <span className="w-5 text-center">{t.icon}</span>
                {t.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <SectionTitle>学習コンテンツ</SectionTitle>
        <div className="space-y-1">
          {GROUPS.map((g) => {
            const chapters = chaptersOfGroup(g.id)
            if (chapters.length === 0) return null
            const readN = chapters.filter((c) => isRead(c.id)).length
            const isOpen = open.has(g.id)
            const isActiveGroup = activeGroup === g.id
            return (
              <div key={g.id}>
                <button
                  onClick={() => toggle(g.id)}
                  aria-expanded={isOpen}
                  className={
                    'flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left transition-colors ' +
                    (isActiveGroup
                      ? 'bg-brand-50 text-brand-800 dark:bg-brand-900/30 dark:text-brand-200'
                      : 'hover:bg-slate-100 dark:hover:bg-slate-800')
                  }
                >
                  <Chevron open={isOpen} />
                  <span className="flex-1 text-xs font-bold text-brand-700 dark:text-brand-400">
                    {g.id}. {g.title}
                  </span>
                  <span
                    className={
                      'shrink-0 rounded-full px-1.5 py-0.5 text-[10px] font-medium ' +
                      (readN === chapters.length
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300'
                        : 'bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-300')
                    }
                  >
                    {readN}/{chapters.length}
                  </span>
                </button>
                {isOpen && (
                  <ul className="mb-1 ml-2 space-y-0.5 border-l border-slate-200 pl-2 dark:border-slate-700">
                    {chapters.map((c) => {
                      const active = currentPath === `/chapter/${c.id}`
                      return (
                        <li key={c.id}>
                          <Link to={`/chapter/${c.id}`} onClick={onNavigate} className={linkCls(active)}>
                            <span className="w-4 shrink-0 text-center text-xs">
                              {isRead(c.id) ? '✔' : '○'}
                            </span>
                            <span className="leading-snug">{c.title}</span>
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </nav>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-1 px-2 text-xs font-bold uppercase tracking-wide text-slate-400">{children}</h2>
  )
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"
      className={'shrink-0 text-slate-400 transition-transform ' + (open ? 'rotate-90' : '')}
    >
      <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function linkCls(active: boolean) {
  return [
    'flex items-start gap-2 rounded-lg px-2 py-1.5 transition-colors',
    active
      ? 'bg-brand-100 text-brand-800 dark:bg-brand-900/40 dark:text-brand-200 font-medium'
      : 'hover:bg-slate-100 dark:hover:bg-slate-800',
  ].join(' ')
}
