import { ArrowLeft, ArrowRight, Check, ChevronDown, Sparkles } from 'lucide-react'
import { FormEvent, useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { Brand } from '../components/Brand'
import { useAuth } from '../context/AuthContext'
import type { Gender, RegisterPayload } from '../types'
import { academicYearOptions } from '../utils'

const initialForm: RegisterPayload = {
  email: '', password: '', firstName: '', lastName: '', major: '', yearOfStudy: 1, gender: 'OTHER', address: '', phone: '', dateOfBirth: '',
}

export function RegisterPage() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState<RegisterPayload>(initialForm)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { register, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const requestedDestination = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname ?? '/app'

  if (isAuthenticated) return <Navigate to={requestedDestination} replace />

  const update = <K extends keyof RegisterPayload>(key: K, value: RegisterPayload[K]) => setForm(current => ({ ...current, [key]: value }))

  const next = (event: FormEvent) => {
    event.preventDefault()
    setError('')
    if (!form.firstName || !form.lastName || !form.email || !form.password) {
      setError('Complete all required fields before continuing.')
      return
    }
    if (form.password.length < 8) {
      setError('Your password must contain at least 8 characters.')
      return
    }
    setStep(2)
  }

  const submit = async (event: FormEvent) => {
    event.preventDefault()
    setError('')
    if (!form.major) {
      setError('Please add your current or intended major.')
      return
    }
    setLoading(true)
    try {
      await register({ ...form, dateOfBirth: form.dateOfBirth || undefined })
      navigate(requestedDestination, { replace: true })
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Unable to create account')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="register-page">
      <header className="register-header"><Brand /><div className="register-header-actions"><Link className="register-home-link" to="/">Home</Link><p>Already have an account? <Link to="/login" state={location.state}>Sign in</Link></p></div></header>
      <main className="register-main">
        <aside className="register-sidebar">
          <div className="eyebrow-pill dark"><Sparkles size={15} /> Personalized in minutes</div>
          <h1>Let’s build a better path for your next chapter.</h1>
          <p>Your answers help organize relevant opportunities and focused recommendations.</p>
          <div className="register-progress">
            <div className={step >= 1 ? 'active' : ''}><span>{step > 1 ? <Check /> : '1'}</span><div><strong>Your account</strong><small>Basic information</small></div></div>
            <div className={step >= 2 ? 'active' : ''}><span>2</span><div><strong>Academic profile</strong><small>Goals and direction</small></div></div>
          </div>
        </aside>
        <section className="register-form-card">
          <div className="form-step-label">Step {step} of 2</div>
          {step === 1 ? (
            <form onSubmit={next} className="auth-form">
              <div className="auth-heading"><h2>Create your account</h2><p>Start with your basic information.</p></div>
              {error && <div className="form-error">{error}</div>}
              <div className="two-field-row"><label>First name<input value={form.firstName} onChange={e => update('firstName', e.target.value)} required /></label><label>Last name<input value={form.lastName} onChange={e => update('lastName', e.target.value)} required /></label></div>
              <label>Email address<input type="email" value={form.email} onChange={e => update('email', e.target.value)} placeholder="you@example.com" required /></label>
              <label>Create a password<input type="password" value={form.password} onChange={e => update('password', e.target.value)} placeholder="At least 8 characters" required /></label>
              <button className="button button-primary button-lg button-block" type="submit">Continue <ArrowRight size={18} /></button>
            </form>
          ) : (
            <form onSubmit={submit} className="auth-form">
              <div className="auth-heading"><h2>Tell us about your studies</h2><p>We’ll use this to organize your dashboard.</p></div>
              {error && <div className="form-error">{error}</div>}
              <label>Current or intended major<input value={form.major} onChange={e => update('major', e.target.value)} placeholder="e.g. Computer Science" required /></label>
              <div className="two-field-row">
                <label>Year of study<div className="select-wrap"><select value={form.yearOfStudy} onChange={e => update('yearOfStudy', Number(e.target.value))}>{academicYearOptions.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}</select><ChevronDown /></div></label>
                <label>Gender<div className="select-wrap"><select value={form.gender} onChange={e => update('gender', e.target.value as Gender)}><option value="OTHER">Prefer not to say</option><option value="FEMALE">Female</option><option value="MALE">Male</option></select><ChevronDown /></div></label>
              </div>
              <div className="two-field-row"><label>Date of birth<input type="date" value={form.dateOfBirth} onChange={e => update('dateOfBirth', e.target.value)} /></label><label>Location<input value={form.address} onChange={e => update('address', e.target.value)} placeholder="City, country" /></label></div>
              <label>Phone number <span className="optional">Optional</span><input value={form.phone} onChange={e => update('phone', e.target.value)} placeholder="+961 ..." /></label>
              <div className="register-buttons"><button className="button button-ghost button-lg" type="button" onClick={() => setStep(1)}><ArrowLeft size={18} /> Back</button><button className="button button-primary button-lg" type="submit" disabled={loading}>{loading ? 'Creating account...' : <>Create my profile <ArrowRight size={18} /></>}</button></div>
            </form>
          )}
        </section>
      </main>
    </div>
  )
}
