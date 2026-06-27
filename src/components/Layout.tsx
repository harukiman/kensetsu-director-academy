import { useState, type ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'
import { Sidebar } from './Sidebar'
import { HeaderSearch } from './HeaderSearch'

export function Layout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const { theme, toggle } = useTheme()
  const loc = useLocation()

  // ルート変更時にモバイルドロワーを閉じる
  const close = () => setOpen(false)

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 dark:bg-slate-900 dark:text-slate-100">
      {/* ヘッダー */}
      <header className="no-print sticky top-0 z-30 border-b border-slate-200 dark:border-slate-700 bg-white/90 dark:bg-slate-900/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-3 py-2 sm:px-4">
          <button
            className="rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="メニュー"
          >
            <Bars />
          </button>
          <Link to="/" className="flex items-center gap-2 font-bold" onClick={close}>
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-600 text-white">建</span>
            <span className="text-sm sm:text-base leading-tight">
              建設ディレクター<br className="sm:hidden" />学習アプリ
            </span>
          </Link>
          <div className="ml-auto flex items-center gap-1 sm:gap-2">
            <div className="hidden sm:block w-48 md:w-64">
              <HeaderSearch />
            </div>
            <Link
              to="/search"
              className="rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-slate-800 sm:hidden"
              aria-label="検索"
            >
              <SearchIcon />
            </Link>
            <button
              onClick={toggle}
              className="rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="テーマ切替"
            >
              {theme === 'dark' ? <Sun /> : <Moon />}
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl">
        {/* デスクトップ用サイドバー */}
        <aside className="no-print hidden lg:block w-72 shrink-0 border-r border-slate-200 dark:border-slate-700">
          <div className="sticky top-[57px] max-h-[calc(100vh-57px)] overflow-y-auto p-3">
            <Sidebar onNavigate={close} currentPath={loc.pathname} />
          </div>
        </aside>

        {/* モバイル用ドロワー */}
        {open && (
          <div className="no-print fixed inset-0 z-40 lg:hidden">
            <div className="absolute inset-0 bg-black/40" onClick={close} />
            <div className="absolute left-0 top-0 h-full w-72 max-w-[85%] overflow-y-auto bg-white dark:bg-slate-900 p-3 shadow-xl">
              <Sidebar onNavigate={close} currentPath={loc.pathname} />
            </div>
          </div>
        )}

        {/* メイン */}
        <main className="min-w-0 flex-1 px-3 py-5 sm:px-6 sm:py-8">{children}</main>
      </div>

      <footer className="no-print border-t border-slate-200 dark:border-slate-700 py-6 text-center text-xs text-slate-400">
        建設ディレクター・工事管理 学習アプリ ｜ 学習目的の解説です。実務では必ず最新の法令・公式情報をご確認ください。
      </footer>
    </div>
  )
}

// --- インライン SVG アイコン（外部依存なし） ---
const Bars = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" /></svg>
)
const Moon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z" strokeLinecap="round" strokeLinejoin="round" /></svg>
)
const Sun = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M19 5l-1.5 1.5M6.5 17.5L5 19" strokeLinecap="round" /></svg>
)
const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4-4" strokeLinecap="round" /></svg>
)
