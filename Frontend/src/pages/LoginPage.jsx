import { useState } from 'react'
import Button from '../components/Button'
import { useAuth } from '../hooks/useAuth'

export default function LoginPage({ onBack }) {
  const { login } = useAuth()
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function submit(event) {
    event.preventDefault(); setSubmitting(true); setError('')
    const data = new FormData(event.currentTarget)
    try { await login(data.get('email'), data.get('password')) } catch (err) { setError(err.message) } finally { setSubmitting(false) }
  }

  return <main className="auth-page"><form className="login-card" onSubmit={submit}>
    {onBack && <button className="back-link" type="button" onClick={onBack}>← Back to home</button>}
    <p className="eyebrow">TASKFLOW</p><h1>Welcome back</h1><p>Sign in to manage your work.</p>
    {error && <p className="error" role="alert">{error}</p>}
    <label>Email<input name="email" type="email" required /></label>
    <label>Password<input name="password" type="password" required /></label>
    <Button type="submit" disabled={submitting}>{submitting ? 'Signing in…' : 'Sign in'}</Button>
  </form></main>
}
