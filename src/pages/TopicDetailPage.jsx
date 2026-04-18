import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import ProblemRow from '../components/ProblemRow'
import ProgressBar from '../components/ui/ProgressBar'
import { ProblemRowSkeleton } from '../components/ui/Skeleton'
import { useProgress } from '../context/ProgressContext'
import { useTopicProblems, useTopics } from '../hooks/useTopics'
import { TOPICS } from '../data/topics'

const DIFF_ORDER = { easy: 0, medium: 1, hard: 2 }
const FILTER_LABELS = ['All', 'Easy', 'Medium', 'Hard']

import { useState } from 'react'

export default function TopicDetailPage() {
  const { topicId } = useParams()
  const navigate = useNavigate()
  const { isSolved } = useProgress()
  const { problems, loading } = useTopicProblems(topicId)
  const { topics } = useTopics()
  const [filter, setFilter] = useState('All')

  const topicMeta =
    topics.find(t => String(t.id) === String(topicId)) ??
    TOPICS.find(t => t.id === Number(topicId))

  const solvedCount = problems.filter(p => isSolved(p.id)).length
  const total = problems.length
  const pct = total > 0 ? (solvedCount / total) * 100 : 0

  const displayed = problems.filter(p => {
    if (filter === 'All') return true
    return p.difficulty === filter.toLowerCase()
  })

  return (
    <div className="flex flex-col h-full bg-bg">
      <Navbar />

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-[820px] mx-auto px-5 sm:px-6 py-7 animate-fade-in">

          {/* Back */}
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-1.5 text-[13px] text-tx-2 hover:text-tx
                       transition-colors mb-5 cursor-pointer"
          >
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
            Back to Dashboard
          </button>

          {/* Topic header */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-1.5">
              {topicMeta?.icon && (
                <span className="text-xl">{topicMeta.icon}</span>
              )}
              <h1 className="text-[22px] font-bold text-tx tracking-tight">
                {topicMeta?.name ?? 'Topic'}
              </h1>
            </div>
            <div className="flex items-center gap-4 text-[13px] text-tx-2 mb-4">
              <span className="flex items-center gap-1.5">
                <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
                </svg>
                {total} problems
              </span>
              <span>{solvedCount} solved</span>
            </div>

            {/* Progress */}
            <ProgressBar value={pct} height={4} showLabel className="mb-1" />
            <p className="text-[12px] text-tx-3">
              {solvedCount} of {total} completed
              {pct === 100 && (
                <span className="ml-2 text-ok font-medium">— Topic complete!</span>
              )}
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex items-center gap-1.5 mb-4">
            {FILTER_LABELS.map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-[5px] text-[12px] font-medium rounded-md border transition-all duration-150 cursor-pointer
                  ${filter === f
                    ? 'bg-surface-2 border-white/[0.18] text-tx'
                    : 'bg-transparent border-white/[0.07] text-tx-2 hover:text-tx hover:border-white/[0.12]'
                  }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Problems */}
          <div className="flex flex-col gap-1.5">
            {loading
              ? Array.from({ length: 6 }).map((_, i) => <ProblemRowSkeleton key={i} />)
              : displayed.length === 0
              ? (
                <div className="py-16 text-center">
                  <p className="text-[13px] text-tx-3">No {filter.toLowerCase()} problems found.</p>
                </div>
              )
              : displayed.map((p, i) => (
                <ProblemRow key={p.id} problem={p} index={problems.indexOf(p)} />
              ))
            }
          </div>
        </div>
      </main>
    </div>
  )
}
