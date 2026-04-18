import { useState, useEffect } from 'react'
import { topicsService } from '../services/topicsService'
import { TOPICS } from '../data/topics'

export function useTopics() {
  const [topics, setTopics] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    topicsService.getAll()
      .then(data => {
        if (!cancelled) { setTopics(data); setLoading(false) }
      })
      .catch(() => {
        // API not available — use local seed data
        if (!cancelled) { setTopics(TOPICS); setLoading(false) }
      })
    return () => { cancelled = true }
  }, [])

  return { topics, loading, error }
}

export function useTopicProblems(topicId) {
  const [problems, setProblems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!topicId) return
    let cancelled = false
    setLoading(true)
    topicsService.getProblems(topicId)
      .then(data => {
        if (!cancelled) { setProblems(data); setLoading(false) }
      })
      .catch(() => {
        // Fall back to local data
        const topic = TOPICS.find(t => t.id === Number(topicId))
        if (!cancelled) { setProblems(topic?.problems || []); setLoading(false) }
      })
    return () => { cancelled = true }
  }, [topicId])

  return { problems, loading }
}
