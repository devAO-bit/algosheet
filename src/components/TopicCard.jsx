import { useNavigate } from 'react-router-dom'
import { useProgress } from '../context/ProgressContext'
import ProgressBar from './ui/ProgressBar'

export default function TopicCard({ topic }) {
  const navigate = useNavigate()
  const { isSolved } = useProgress()

  const problems = topic.problems ?? []
  const solvedCount = problems.filter(p => isSolved(p.id)).length
  const total = problems.length
  const pct = total > 0 ? (solvedCount / total) * 100 : 0
  const complete = pct === 100
  const started = solvedCount > 0
  const label = complete ? '✓ Completed' : started ? 'Continue' : 'Start'

  return (
    <div
      onClick={() => navigate(`/topic/${topic.id}`)}
      className="card p-[18px] cursor-pointer transition-all duration-150
                 hover:border-white/[0.12] hover:bg-surface-2 group"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="w-[34px] h-[34px] rounded-lg bg-accent/10 border border-accent/25
                        flex items-center justify-center text-base flex-shrink-0">
          {topic.icon}
        </div>
        <span className={`text-[11px] font-semibold tabular-nums ${complete ? 'text-ok' : 'text-tx-2'}`}>
          {Math.round(pct)}%
        </span>
      </div>

      <h3 className="text-[15px] font-semibold text-tx tracking-tight mb-1 leading-snug">
        {topic.name}
      </h3>
      <p className="text-[12px] text-tx-2 mb-3">
        {total} problems &mdash; {solvedCount} solved
      </p>

      <ProgressBar value={pct} height={3} className="mb-3.5" />

      <button
        className={`w-full py-2 text-[12px] font-medium rounded-lg border transition-all duration-150
          ${complete
            ? 'bg-ok/10 border-ok/25 text-ok'
            : 'bg-bg-3 border-white/[0.07] text-tx-2 group-hover:border-accent/30 group-hover:bg-accent/10 group-hover:text-accent-2'
          }`}
      >
        {label}
      </button>
    </div>
  )
}
