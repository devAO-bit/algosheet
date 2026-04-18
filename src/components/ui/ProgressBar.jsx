export default function ProgressBar({ value = 0, className = '', height = 3, showLabel = false }) {
  const pct = Math.min(100, Math.max(0, Math.round(value)))
  const complete = pct === 100

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div
        className="flex-1 rounded-full overflow-hidden"
        style={{ height, background: 'rgba(255,255,255,0.07)' }}
      >
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out ${complete ? 'bg-ok' : 'bg-accent'}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      {showLabel && (
        <span className="text-[12px] text-tx-2 font-medium tabular-nums min-w-[36px] text-right">
          {pct}%
        </span>
      )}
    </div>
  )
}
