import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function LoginPage() {
  const { login, loading, error, clearError, user } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPw, setShowPw] = useState(false)
  const [fieldErr, setFieldErr] = useState({})

  useEffect(() => { if (user) navigate('/dashboard', { replace: true }) }, [user])

  const set = (k) => (e) => {
    setForm(f => ({ ...f, [k]: e.target.value }))
    if (fieldErr[k]) setFieldErr(fe => ({ ...fe, [k]: '' }))
    clearError()
  }

  const validate = () => {
    const errs = {}
    if (!form.email.trim()) errs.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Enter a valid email'
    if (!form.password) errs.password = 'Password is required'
    return errs
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setFieldErr(errs); return }
    const ok = await login(form.email, form.password)
    if (ok) navigate('/dashboard', { replace: true })
  }

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center p-6">
      <div className="w-full max-w-[380px] animate-fade-in">

        {/* Logo */}
        <div className="flex items-center gap-2 mb-10">
          <div className="w-[30px] h-[30px] bg-accent rounded-[7px] flex items-center justify-center text-white text-[13px] font-bold">
            DS
          </div>
          <span className="text-[16px] font-semibold text-tx tracking-tight">AlgoSheet</span>
        </div>

        <h1 className="text-[22px] font-bold text-tx tracking-tight mb-1.5">Welcome back</h1>
        <p className="text-[13px] text-tx-2 mb-8">Sign in to continue your progress</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-[11px] font-medium text-tx-2 uppercase tracking-[0.4px] mb-1.5">
              Email
            </label>
            <input
              type="email"
              value={form.email}
              onChange={set('email')}
              placeholder="you@example.com"
              autoComplete="email"
              className={`input-field ${fieldErr.email ? '!border-danger' : ''}`}
            />
            {fieldErr.email && <p className="text-[12px] text-danger mt-1.5">{fieldErr.email}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block text-[11px] font-medium text-tx-2 uppercase tracking-[0.4px] mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type={showPw ? 'text' : 'password'}
                value={form.password}
                onChange={set('password')}
                placeholder="••••••••"
                autoComplete="current-password"
                className={`input-field pr-14 ${fieldErr.password ? '!border-danger' : ''}`}
              />
              <button
                type="button"
                onClick={() => setShowPw(p => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[12px] text-tx-2
                           hover:text-tx transition-colors cursor-pointer"
              >
                {showPw ? 'Hide' : 'Show'}
              </button>
            </div>
            {fieldErr.password && <p className="text-[12px] text-danger mt-1.5">{fieldErr.password}</p>}
          </div>

          {/* API error */}
          {error && (
            <p className="text-[12px] text-danger bg-danger/10 border border-danger/20 rounded-lg px-3 py-2.5">
              {error}
            </p>
          )}

          <button type="submit" disabled={loading} className="btn-primary mt-1">
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <Spinner /> Signing in…
              </span>
            ) : 'Sign in'}
          </button>
        </form>

        {/* Demo hint */}
        <div className="mt-4 px-3 py-2.5 bg-bg-3 border border-white/[0.07] rounded-lg
                        text-[12px] text-tx-2 text-center">
          Demo mode — use any email &amp; password
        </div>

        <p className="text-center mt-5 text-[13px] text-tx-2">
          No account?{' '}
          <Link to="/register" className="text-accent-2 hover:text-accent-3 transition-colors">
            Create one
          </Link>
        </p>
      </div>
    </div>
  )
}

function Spinner() {
  return (
    <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="2.5">
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4
               M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
    </svg>
  )
}
