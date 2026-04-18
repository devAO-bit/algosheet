export default function StatCard({ label, value, accent = false }) {
  return (
    <div className="card p-4">
      <div className="text-[11px] font-medium text-tx-2 uppercase tracking-[0.5px] mb-1.5">
        {label}
      </div>
      <div className={`text-[22px] font-bold tracking-tight tabular-nums ${accent ? 'text-accent-2' : 'text-tx'}`}>
        {value ?? '—'}
      </div>
    </div>
  )
}
