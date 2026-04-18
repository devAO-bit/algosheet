import { useState } from 'react'
import Navbar from '../components/layout/Navbar'
import TopicCard from '../components/TopicCard'
import StatCard from '../components/ui/StatCard'
import { TopicCardSkeleton, StatCardSkeleton } from '../components/ui/Skeleton'
import { useAuth } from '../context/AuthContext'
import { useProgress } from '../context/ProgressContext'
import { useTopics } from '../hooks/useTopics'
import { TOTAL_PROBLEMS } from '../data/topics'

function greeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  return 'Good evening'
}

export default function DashboardPage() {
  const { user } = useAuth()
  const { solvedCount } = useProgress()
  const { topics, loading } = useTopics()
  const [query, setQuery] = useState('')

  const firstName = user?.name?.split(' ')[0] || 'there'
  const totalProblems =
    topics.reduce((acc, t) => acc + (t.problems?.length ?? 0), 0) || TOTAL_PROBLEMS
  const pct = totalProblems > 0 ? Math.round((solvedCount / totalProblems) * 100) : 0

  const filtered = topics.filter(t => {
    const label = (t.name ?? t.title ?? '').toLowerCase()
    return !query.trim() || label.includes(query.toLowerCase())
  })

  return (
    <div className="flex flex-col h-full bg-bg">
      <Navbar onSearch={setQuery} />

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-[1080px] mx-auto px-5 sm:px-6 py-7">

          {/* Header */}
          <div className="mb-7">
            <h1 className="text-[20px] font-bold text-tx tracking-tight mb-1">
              {greeting()}, {firstName}
            </h1>
            <p className="text-[13px] text-tx-2">
              {solvedCount === 0
                ? 'Pick a topic and start solving.'
                : `${solvedCount} problems solved — keep it up.`}
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-7">
            {loading ? (
              Array.from({ length: 4 }).map((_, i) => <StatCardSkeleton key={i} />)
            ) : (
              <>
                <StatCard label="Total Problems" value={totalProblems} />
                <StatCard label="Solved" value={solvedCount} accent />
                <StatCard label="Topics" value={topics.length} />
                <StatCard label="Completion" value={`${pct}%`} />
              </>
            )}
          </div>

          {/* Topics header */}
          <div className="flex items-center justify-between mb-3.5">
            <span className="text-[11px] font-semibold text-tx-2 uppercase tracking-[0.5px]">
              Topics
            </span>
            {query && (
              <span className="text-[12px] text-tx-3">
                {filtered.length} result{filtered.length !== 1 ? 's' : ''}
              </span>
            )}
          </div>

          {/* Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {Array.from({ length: 9 }).map((_, i) => <TopicCardSkeleton key={i} />)}
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-[13px] text-tx-3">No topics match &ldquo;{query}&rdquo;</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 animate-fade-in">
              {filtered.map(t => <TopicCard key={t.id} topic={t} />)}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
