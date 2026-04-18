# AlgoSheet — DSA Practice Tracker

A production-grade React frontend for topic-wise DSA preparation. Built with Vite + React + Tailwind CSS.

---

## Stack

- **React 18** + Vite
- **React Router DOM v6** — client-side routing
- **Axios** — HTTP client with JWT interceptor
- **Tailwind CSS v3** — utility-first styling
- **Context API** — Auth, Progress, Toast state

---

## Folder Structure

```
src/
├── components/
│   ├── layout/
│   │   └── Navbar.jsx          # Top navigation bar
│   ├── ui/
│   │   ├── ProgressBar.jsx     # Reusable progress bar
│   │   ├── DifficultyBadge.jsx # Easy / Med / Hard badges
│   │   ├── StatCard.jsx        # Dashboard stat cards
│   │   └── Skeleton.jsx        # Loading skeletons
│   ├── TopicCard.jsx           # Topic grid card
│   ├── ProblemRow.jsx          # Problem list row with checkbox
│   └── ProtectedRoute.jsx      # Auth guard wrapper
├── context/
│   ├── AuthContext.jsx         # JWT auth state
│   ├── ProgressContext.jsx     # Solved problems state
│   └── ToastContext.jsx        # Global toast notifications
├── hooks/
│   └── useTopics.js            # Topics + problems data fetching
├── pages/
│   ├── LoginPage.jsx           # Auth — sign in
│   ├── RegisterPage.jsx        # Auth — create account
│   ├── DashboardPage.jsx       # Topics grid + stats
│   ├── TopicDetailPage.jsx     # Problems list with filtering
│   └── NotFoundPage.jsx        # 404
├── services/
│   ├── api.js                  # Axios instance + JWT interceptor
│   ├── authService.js          # /auth/login, /auth/register
│   └── topicsService.js        # /topics, /progress
├── data/
│   └── topics.js               # Static seed data (9 topics, 70+ problems)
└── App.jsx                     # Router setup + providers
```

---

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Set environment variable
cp .env.example .env
# Edit VITE_API_BASE_URL to point to your backend

# 3. Start dev server
npm run dev
```

The app runs at `http://localhost:5173`.

> **Offline / demo mode**: if the API is unavailable, the app automatically falls back to the local seed data in `src/data/topics.js`. Progress is persisted in `localStorage`.

---

## Backend API Contract

### Auth
```
POST /api/auth/login      { email, password }   → { token, user }
POST /api/auth/register   { name, email, password } → { token, user }
```

### Topics
```
GET  /api/topics                   → [{ id, name, icon, problems[] }]
GET  /api/topics/:id/problems      → [{ id, title, difficulty, youtubeUrl, practiceUrl, articleUrl }]
```

### Progress
```
GET  /api/progress/me              → { solvedIds: [101, 205, ...] }
POST /api/progress/toggle          { problemId }  → { problemId, solved: bool }
```

All protected routes require `Authorization: Bearer <token>` header — injected automatically by the Axios interceptor.

---

## Features

- **Login / Register** — validation, show/hide password, error states, loading button
- **Dashboard** — greeting, live stats (total, solved, completion %), topic grid with search
- **Topic Detail** — per-topic progress bar, difficulty filter tabs (All / Easy / Med / Hard), external links
- **Progress tracking** — optimistic checkbox updates, persists to localStorage + syncs to API
- **Toast notifications** — lightweight slide-up feedback on actions
- **Loading skeletons** — for topics grid, stat cards, problem rows
- **Protected routes** — redirects unauthenticated users to `/login`
- **Responsive** — mobile-first, fully usable on all screen sizes

---

## Environment Variables

| Variable | Default | Description |
|---|---|---|
| `VITE_API_BASE_URL` | `http://localhost:5000/api` | Backend API base URL |

---

## Build

```bash
npm run build   # outputs to dist/
npm run preview # preview production build locally
```
