import api from './api'

const DEFAULT_ICONS = ['⬛', '⟺', '▦', '⧉', '⌖', '⟐', '⊹', '◎', '◈', '📘']

function mapProblemFromApi(p) {
  const id = p._id ?? p.id
  const raw = String(p.difficulty || 'easy').toLowerCase()
  const difficulty = raw === 'medium' || raw === 'hard' ? raw : 'easy'
  return {
    id,
    title: p.title ?? '',
    difficulty,
    youtubeUrl: p.youtubeUrl ?? p.youtubeLink ?? '',
    practiceUrl: p.practiceUrl ?? p.practiceLink ?? p.codingLink ?? '',
    articleUrl: p.articleUrl ?? p.articleLink ?? '',
  }
}

function topicIcon(t, index) {
  if (t.icon) return t.icon
  return DEFAULT_ICONS[index % DEFAULT_ICONS.length]
}

function mapTopicMeta(t, index) {
  const id = t._id ?? t.id
  return {
    id,
    name: t.title ?? t.name ?? 'Topic',
    icon: topicIcon(t, index),
  }
}

export const topicsService = {
  async getProblems(topicId) {
    const res = await api.get(`/topics/${topicId}/problems`)
    const raw = res.data?.data
    const list = Array.isArray(raw) ? raw : []
    return list.map(mapProblemFromApi)
  },

  async getAll() {
    const res = await api.get('/topics')
    const raw = res.data?.data
    const list = Array.isArray(raw) ? raw : []
    const sorted = [...list].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    return Promise.all(
      sorted.map(async (t, i) => {
        const meta = mapTopicMeta(t, i)
        try {
          const problems = await topicsService.getProblems(meta.id)
          return { ...meta, problems }
        } catch {
          return { ...meta, problems: [] }
        }
      })
    )
  },
}

export const progressService = {
  async getMyProgress() {
    const res = await api.get('/progress/me')
    const raw = res.data?.data
    if (Array.isArray(raw)) {
      const solvedIds = raw.filter((row) => row.completed).map((row) => row.problemId)
      return { solvedIds }
    }
    if (raw && Array.isArray(raw.solvedIds)) return { solvedIds: raw.solvedIds }
    return { solvedIds: [] }
  },

  async toggleProblem(problemId) {
    const res = await api.post('/progress/toggle', { problemId })
    return res.data?.data
  },
}
