import { useAuth } from './hooks/useAuth'
import DashboardPage from './pages/DashboardPage'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import { useState } from 'react'

export default function App() {
  const { user, loading } = useAuth()
  const [authPage, setAuthPage] = useState(null)

  if (loading) return <main className="screen-message">Loading…</main>
  if (user) return <DashboardPage />
  if (authPage === 'login') return <LoginPage onBack={() => setAuthPage(null)} />
  if (authPage === 'signup') return <SignupPage onBack={() => setAuthPage(null)} />
  return <LandingPage onSignIn={() => setAuthPage('login')} onSignUp={() => setAuthPage('signup')} />
}
