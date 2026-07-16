import { ArrowUpRight, CalendarDays, Clock3, LockKeyhole, Mail, MapPin, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Mentor, Scholarship } from '../types'

function formatDeadline(deadline?: string | null) {
  if (!deadline) return 'Not announced'
  const value = new Date(`${deadline}T00:00:00`)
  if (Number.isNaN(value.getTime())) return 'Not announced'
  return value.toLocaleDateString('en', { month: 'short', day: 'numeric', year: 'numeric' })
}

export function ScholarshipCard({
  scholarship,
  compact = false,
  lockedPath,
}: {
  scholarship: Scholarship
  compact?: boolean
  lockedPath?: string
}) {
  return (
    <article className={`opportunity-card ${compact ? 'compact' : ''}`}>
      <div className="card-topline">
        <span className="provider-mark">{scholarship.provider.slice(0, 2).toUpperCase()}</span>
        <div><p>{scholarship.provider}</p><span>{scholarship.type}</span></div>
        {scholarship.featured && <span className="status-pill featured">Featured</span>}
      </div>
      <h3>{scholarship.name}</h3>
      {!compact && <p className="card-description">{scholarship.eligibilityCriteria}</p>}
      <div className="tag-row"><span>{scholarship.majors}</span><span>{scholarship.location}</span></div>
      <div className="opportunity-meta">
        <div><small>Award</small><strong>{scholarship.amount}</strong></div>
        <div><small>Deadline</small><strong><CalendarDays size={15} /> {formatDeadline(scholarship.deadline)}</strong></div>
      </div>
      {lockedPath ? (
        <Link className="card-link" to={lockedPath}><span><LockKeyhole size={15} /> Sign in to view details</span><ArrowUpRight size={16} /></Link>
      ) : scholarship.applicationUrl ? (
        <a className="card-link" href={scholarship.applicationUrl} target="_blank" rel="noreferrer">View opportunity <ArrowUpRight size={16} /></a>
      ) : null}
    </article>
  )
}

export function MentorCard({ mentor, lockedPath }: { mentor: Mentor; lockedPath?: string }) {
  const initials = `${mentor.firstName[0] ?? ''}${mentor.lastName[0] ?? ''}`
  return (
    <article className="mentor-card">
      <div className="mentor-card-head">
        <span className="avatar avatar-lg">{initials}</span>
        <span className={`status-pill ${mentor.available ? 'available' : ''}`}>{mentor.available ? 'Available' : 'Currently unavailable'}</span>
      </div>
      <h3>{mentor.firstName} {mentor.lastName}</h3>
      <p className="mentor-role">{mentor.jobTitle} · {mentor.company}</p>
      <p className="card-description">{mentor.bio}</p>
      <div className="mentor-specialty">{mentor.areaOfExpertise}</div>
      <div className="mentor-stats">
        {mentor.experience && <span><Clock3 size={16} /> {mentor.experience}</span>}
      </div>
      <div className="mentor-location"><MapPin size={16} /> {mentor.location}</div>
      {lockedPath ? (
        <Link className="button button-secondary button-block" to={lockedPath}><LockKeyhole size={16} /> Sign in to see contact details</Link>
      ) : (
        <div className="mentor-contact-actions">
          {mentor.phone && <a className="button button-secondary" href={`tel:${mentor.phone}`}><Phone size={16} /> {mentor.phone}</a>}
          {mentor.email && <a className="button button-ghost" href={`mailto:${mentor.email}`}><Mail size={16} /> Email</a>}
        </div>
      )}
    </article>
  )
}
