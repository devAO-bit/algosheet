import { useProgress } from '../context/ProgressContext'
import { useToast } from '../context/ToastContext'
import DifficultyBadge from './ui/DifficultyBadge'

const IconYT = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
)

const IconCode = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
  </svg>
)

const IconArticle = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
    <polyline points="10 9 9 9 8 9"/>
  </svg>
)

const CheckIcon = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)

export default function ProblemRow({ problem, index }) {
  const { isSolved, toggle } = useProgress()
  const toast = useToast()
  const solved = isSolved(problem.id)

  const handleToggle = async () => {
    await toggle(problem.id)
    toast(solved ? 'Marked as unsolved' : 'Problem solved!', 'success')
  }

  return (
    <div
      className={`flex items-center gap-3 px-[14px] py-[11px] border rounded-lg transition-all duration-150
        ${solved
          ? 'bg-ok/[0.03] border-ok/10 hover:border-ok/20'
          : 'bg-surface border-white/[0.07] hover:bg-surface-2 hover:border-white/[0.12]'
        }`}
    >
      <button
        onClick={handleToggle}
        aria-label={solved ? 'Mark as unsolved' : 'Mark as solved'}
        className={`w-[18px] h-[18px] rounded-[4px] flex items-center justify-center flex-shrink-0
                   border transition-all duration-150 cursor-pointer bg-transparent
                   ${solved ? 'bg-ok border-ok' : 'border-white/20 hover:border-white/40'}`}
      >
        {solved && <CheckIcon />}
      </button>

      <span className="text-[12px] text-tx-3 font-mono tabular-nums w-6 flex-shrink-0">
        {String(index + 1).padStart(2, '0')}
      </span>

      <span
        className={`flex-1 text-[13px] font-medium leading-snug cursor-pointer select-none
                   ${solved ? 'text-tx-3 line-through decoration-tx-3/50' : 'text-tx'}`}
        onClick={handleToggle}
      >
        {problem.title}
      </span>

      <DifficultyBadge difficulty={problem.difficulty} />

      <div className="hidden sm:flex items-center gap-1.5">
        {problem.youtubeUrl && (
          <a href={problem.youtubeUrl} target="_blank" rel="noopener noreferrer"
             title="Watch Tutorial" className="btn-icon hover:!text-danger hover:!border-danger/30">
            <IconYT />
          </a>
        )}
        {problem.practiceUrl && (
          <a href={problem.practiceUrl} target="_blank" rel="noopener noreferrer"
             title="Practice on LeetCode" className="btn-icon hover:!text-warn hover:!border-warn/30">
            <IconCode />
          </a>
        )}
        {problem.articleUrl && (
          <a href={problem.articleUrl} target="_blank" rel="noopener noreferrer"
             title="Read Article" className="btn-icon hover:!text-accent-2 hover:!border-accent/30">
            <IconArticle />
          </a>
        )}
      </div>
    </div>
  )
}
