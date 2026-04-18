export function Skeleton({ className = '' }) {
  return <div className={`skeleton-block ${className}`} />
}

export function TopicCardSkeleton() {
  return (
    <div className="card p-[18px] space-y-3">
      <div className="flex items-start justify-between">
        <Skeleton className="w-9 h-9 rounded-lg" />
        <Skeleton className="w-8 h-4 rounded" />
      </div>
      <Skeleton className="w-3/4 h-4 rounded" />
      <Skeleton className="w-1/2 h-3 rounded" />
      <Skeleton className="w-full h-[3px] rounded" />
      <Skeleton className="w-full h-8 rounded-lg" />
    </div>
  )
}

export function ProblemRowSkeleton() {
  return (
    <div className="flex items-center gap-3 px-[14px] py-3 bg-surface border border-white/[0.07] rounded-lg">
      <Skeleton className="w-[18px] h-[18px] rounded-[4px] flex-shrink-0" />
      <Skeleton className="flex-1 h-4 rounded" />
      <Skeleton className="w-10 h-5 rounded" />
      <div className="flex gap-1.5">
        <Skeleton className="w-7 h-7 rounded-md" />
        <Skeleton className="w-7 h-7 rounded-md" />
        <Skeleton className="w-7 h-7 rounded-md" />
      </div>
    </div>
  )
}

export function StatCardSkeleton() {
  return (
    <div className="card p-4 space-y-2">
      <Skeleton className="w-16 h-3 rounded" />
      <Skeleton className="w-12 h-7 rounded" />
    </div>
  )
}
