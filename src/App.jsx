import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ProgressProvider } from './context/ProgressContext'
import { ToastProvider } from './context/ToastContext'
import ProtectedRoute from './components/ProtectedRoute'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'
import TopicDetailPage from './pages/TopicDetailPage'
import NotFoundPage from './pages/NotFoundPage'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProgressProvider>
          <ToastProvider>
            <Routes>
              <Route path="/login"    element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard"      element={<DashboardPage />} />
                <Route path="/topic/:topicId" element={<TopicDetailPage />} />
              </Route>
              <Route path="/"  element={<Navigate to="/dashboard" replace />} />
              <Route path="*"  element={<NotFoundPage />} />
            </Routes>
          </ToastProvider>
        </ProgressProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
