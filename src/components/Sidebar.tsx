import { Link } from 'react-router-dom'
import { GROUPS, chaptersOfGroup } from '../content'
import { useProgress } from '../hooks/ProgressContext'

const TOOLS = [
  { to: '/dashboard', label: 'ダッシュボード', icon: '📊' },
  { to: '/roadmap', label: '学習ロードマップ', icon: '🗺️' },
  { to: '/quiz', label: 'クイズ・確認テスト', icon: '✅' },
  { to: '/flashcards', label: 'フラッシュカード', icon: '🃏' },
  { to: '/glossary', label: '用語集・略語', icon: '📖' },
  { to: '/checklist', label: '現場チェックリスト', icon: '📋' },
]

export function Sidebar({
  onNavigate,
  currentPath,
}: {
  onNavigate: () => void
  currentPath: string
}) {
  const { isRead } = useProgress()
  return (
    <nav className="space-y-5 text-sm">
      <div>
        <SectionTitle>学習ツール</SectionTitle>
        <ul className="space-y-0.5">
          {TOOLS.map((t) => (
            <li key={t.to}>
              <Link
                to={t.to}
                onClick={onNavigate}
                className={linkCls(currentPath === t.to)}
              >
                <span className="w-5 text-center">{t.icon}</span>
                {t.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <SectionTitle>学習コンテンツ</SectionTitle>
        <div className="space-y-3">
          {GROUPS.map((g) => {
            const chapters = chaptersOfGroup(g.id)
            if (chapters.length === 0) return null
            return (
              <div key={g.id}>
                <p className="px-2 py-1 text-xs font-bold text-brand-700 dark:text-brand-400">
                  {g.id}. {g.title}
                </p>
                <ul className="space-y-0.5">
                  {chapters.map((c) => {
                    const active = currentPath === `/chapter/${c.id}`
                    return (
                      <li key={c.id}>
                        <Link
                          to={`/chapter/${c.id}`}
                          onClick={onNavigate}
                          className={linkCls(active)}
                        >
                          <span className="w-5 text-center text-xs">
                            {isRead(c.id) ? '✔' : '○'}
                          </span>
                          <span className="leading-snug">{c.title}</span>
                        </Link>
                      </li>
                    )
                  })}
                </ul>
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
    <h2 className="mb-1 px-2 text-xs font-bold uppercase tracking-wide text-slate-400">
      {children}
    </h2>
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
