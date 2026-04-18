import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function Navbar({ onSearch }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [query, setQuery] = useState('')

  const initials = user?.name
    ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : '?'

  const handleSearch = (e) => {
    setQuery(e.target.value)
    onSearch?.(e.target.value)
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="h-[52px] min-h-[52px] bg-bg-2 border-b border-white/[0.07] flex items-center px-5 gap-4 z-10 flex-shrink-0">
      <Link to="/dashboard" className="flex items-center gap-2 no-underline">
        <div className="w-6 h-6 bg-accent rounded-[5px] flex items-center justify-center text-white text-[11px] font-bold flex-shrink-0">
          DS
        </div>
        <span className="text-tx text-[14px] font-semibold tracking-tight hidden sm:block">AlgoSheet</span>
      </Link>

      <div className="flex-1" />

      {onSearch && (
        <div className="hidden sm:flex items-center gap-2 px-3 py-[7px] bg-surface border border-white/[0.07] rounded-lg w-52 focus-within:border-white/[0.18] transition-colors">
          <svg className="text-tx-3 flex-shrink-0" width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            type="text"
            value={query}
            onChange={handleSearch}
            placeholder="Search topics…"
            className="bg-transparent border-none outline-none text-tx text-[13px] placeholder:text-tx-3 w-full"
          />
        </div>
      )}

      <div className="flex items-center gap-2">
        <div className="w-[30px] h-[30px] rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center text-[11px] font-semibold text-accent-2 select-none">
          {initials}
        </div>
        <button onClick={handleLogout} className="btn-ghost text-[13px]">
          Logout
        </button>
      </div>
    </header>
  )
}
