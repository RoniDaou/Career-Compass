import { Check, Mail, MapPin, Phone, Save, ShieldCheck } from 'lucide-react'
import { FormEvent, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { api } from '../services/api'
import type { Student } from '../types'
import { academicYearLabel, academicYearOptions } from '../utils'

export function ProfilePage() {
  const { user, setUser } = useAuth()
  const [form, setForm] = useState<Partial<Student>>({
    firstName: user?.firstName,
    lastName: user?.lastName,
    major: user?.major,
    yearOfStudy: user?.yearOfStudy,
    address: user?.address ?? '',
    phone: user?.phone ?? '',
    bio: user?.bio ?? '',
    dateOfBirth: user?.dateOfBirth,
  })
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const initials = `${user?.firstName?.[0] ?? ''}${user?.lastName?.[0] ?? ''}`

  const submit = async (event: FormEvent) => {
    event.preventDefault()
    if (!user) return
    setSaving(true)
    setError('')
    setSuccess(false)
    try {
      const updated = await api.updateStudent(user.email, form)
      setUser(updated)
      setSuccess(true)
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Unable to save changes')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="profile-page">
      <section className="profile-hero">
        <div className="profile-identity"><span className="avatar avatar-profile">{initials}</span><div><span>Student profile</span><h2>{user?.firstName} {user?.lastName}</h2><p>{user?.major} · {academicYearLabel(user?.yearOfStudy)}</p></div></div>
        <div className="profile-contact"><span><Mail /> {user?.email}</span><span><MapPin /> {user?.address || 'Location not added'}</span><span><Phone /> {user?.phone || 'Phone not added'}</span></div>
      </section>

      <div className="profile-grid profile-grid-simple">
        <form className="panel profile-form-panel" onSubmit={submit}>
          <div className="panel-heading"><div><span>Personal details</span><h2>Update your information</h2></div></div>
          {error && <div className="form-error">{error}</div>}
          {success && <div className="form-success"><Check /> Profile saved successfully.</div>}
          <div className="profile-form-grid">
            <label>First name<input value={form.firstName ?? ''} onChange={event => setForm({ ...form, firstName: event.target.value })} required /></label>
            <label>Last name<input value={form.lastName ?? ''} onChange={event => setForm({ ...form, lastName: event.target.value })} required /></label>
            <label>Major or field<input value={form.major ?? ''} onChange={event => setForm({ ...form, major: event.target.value })} required /></label>
            <label>Academic status<select value={form.yearOfStudy ?? 1} onChange={event => setForm({ ...form, yearOfStudy: Number(event.target.value) })}>{academicYearOptions.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}</select></label>
            <label>Date of birth<input type="date" value={form.dateOfBirth ?? ''} onChange={event => setForm({ ...form, dateOfBirth: event.target.value })} /></label>
            <label>Phone number<input value={form.phone ?? ''} onChange={event => setForm({ ...form, phone: event.target.value })} /></label>
            <label className="full-field">Location<input value={form.address ?? ''} onChange={event => setForm({ ...form, address: event.target.value })} /></label>
            <label className="full-field">Professional summary<textarea rows={5} value={form.bio ?? ''} onChange={event => setForm({ ...form, bio: event.target.value })} placeholder="Describe your interests, strengths, and direction." /></label>
          </div>
          <div className="profile-form-actions"><button className="button button-primary" type="submit" disabled={saving}><Save /> {saving ? 'Saving...' : 'Save changes'}</button></div>
        </form>

        <aside className="profile-aside">
          <section className="panel privacy-card"><ShieldCheck /><div><h3>Your information is protected</h3><p>Your profile details are stored in your database and used to display your account information.</p></div></section>
        </aside>
      </div>
    </div>
  )
}
