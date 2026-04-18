import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-bg flex items-center justify-center p-6">
      <div className="text-center animate-fade-in">
        <div className="text-[64px] font-bold text-surface-2 mb-4 leading-none">404</div>
        <h1 className="text-[18px] font-semibold text-tx mb-2">Page not found</h1>
        <p className="text-[13px] text-tx-2 mb-8">
          The page you're looking for doesn't exist.
        </p>
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-accent text-white
                     text-[13px] font-semibold rounded-lg hover:opacity-90 transition-opacity no-underline"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  )
}
