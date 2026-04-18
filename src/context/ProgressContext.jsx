import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { progressService } from '../services/topicsService'
import { useAuth } from './AuthContext'

const ProgressContext = createContext(null)

export function ProgressProvider({ children }) {
  const { user } = useAuth()
  // Set of solved problem IDs (numbers)
  const [solved, setSolved] = useState(() => {
    try {
      const s = localStorage.getItem('solved')
      return s ? new Set(JSON.parse(s)) : new Set()
    } catch { return new Set() }
  })
  const [fetchedFromServer, setFetchedFromServer] = useState(false)

  // Sync from server when user logs in
  useEffect(() => {
    if (!user) { setSolved(new Set()); setFetchedFromServer(false); return }
    progressService.getMyProgress()
      .then(data => {
        const ids = new Set(data.solvedIds || [])
        setSolved(ids)
        localStorage.setItem('solved', JSON.stringify([...ids]))
        setFetchedFromServer(true)
      })
      .catch(() => {
        // Fall back to localStorage — offline mode
        setFetchedFromServer(true)
      })
  }, [user])

  const isSolved = useCallback((id) => solved.has(id), [solved])

  const toggle = useCallback(async (problemId) => {
    // Optimistic update
    setSolved(prev => {
      const next = new Set(prev)
      if (next.has(problemId)) next.delete(problemId)
      else next.add(problemId)
      localStorage.setItem('solved', JSON.stringify([...next]))
      return next
    })

    // Sync to server (fire & forget — don't revert on error for now)
    try {
      await progressService.toggleProblem(problemId)
    } catch {
      // Could revert here if needed
    }
  }, [])

  const solvedCount = solved.size

  return (
    <ProgressContext.Provider value={{ solved, isSolved, toggle, solvedCount, fetchedFromServer }}>
      {children}
    </ProgressContext.Provider>
  )
}

export function useProgress() {
  const ctx = useContext(ProgressContext)
  if (!ctx) throw new Error('useProgress must be used inside ProgressProvider')
  return ctx
}
