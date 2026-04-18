import api from './api'

function normalizeAuthPayload(res) {
  const body = res.data
  const payload = body?.data ?? body
  const { token, ...user } = payload || {}
  return { token, user }
}

export const authService = {
  async login(email, password) {
    const res = await api.post('/auth/login', { email, password })
    return normalizeAuthPayload(res)
  },

  async register(name, email, password) {
    const res = await api.post('/auth/register', { name, email, password })
    return normalizeAuthPayload(res)
  },
}
