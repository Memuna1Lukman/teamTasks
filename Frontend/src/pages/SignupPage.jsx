import { useState } from 'react'
import Button from '../components/Button'
import { useAuth } from '../hooks/useAuth'
import { register } from '../api/auth'

export default function SignupPage({ onBack, onSignedUp }) {
  const { login } = useAuth()
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function submit(event) {
    event.preventDefault()
    setSubmitting(true)
    setError('')
    const data = new FormData(event.currentTarget)
    try {
      await register(data.get('email'), data.get('fullName'), data.get('password'))
      await login(data.get('email'), data.get('password'))
      onSignedUp?.()
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return <main className="auth-page"><form className="login-card" onSubmit={submit}>
    <button className="back-link" type="button" onClick={onBack}>← Back to home</button>
    <p className="eyebrow">TASKFLOW</p><h1>Create your account</h1><p>Start making space for momentum.</p>
    {error && <p className="error" role="alert">{error}</p>}
    <label>Name<input name="fullName" type="text" autoComplete="name" required /></label>
    <label>Email<input name="email" type="email" autoComplete="email" required /></label>
    <label>Password<input name="password" type="password" autoComplete="new-password" minLength="8" required /></label>
    <Button type="submit" disabled={submitting}>{submitting ? 'Creating account…' : 'Sign up'}</Button>
  </form></main>
}
