import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <div className="mx-auto max-w-lg py-20 text-center">
      <div className="text-5xl font-bold text-brand-500">404</div>
      <p className="mt-3 text-slate-500">ページが見つかりませんでした。</p>
      <Link to="/" className="mt-6 inline-block rounded-lg bg-brand-600 px-4 py-2 text-sm font-bold text-white hover:bg-brand-700">
        ホームへ戻る
      </Link>
    </div>
  )
}
