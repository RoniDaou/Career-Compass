import {
  ArrowRight,
  Award,
  BookOpenCheck,
  Building2,
  CalendarDays,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  Sparkles,
  UsersRound,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { LoadingState } from '../components/States'
import { useAuth } from '../context/AuthContext'
import { api } from '../services/api'
import type { Activity, Mentor, Scholarship, Skill, University } from '../types'


const MENTOR_CATEGORIES = [
  {
    label: 'Law',
    majorTerms: ['law', 'legal', 'criminology', 'political science'],
    mentorTerms: ['law', 'legal', 'lawyer', 'attorney', 'counsel', 'compliance', 'regulatory', 'contracts'],
  },
  {
    label: 'Technology',
    majorTerms: ['technology', 'computer', 'software', 'information systems', 'data', 'cyber', 'engineering', 'digital'],
    mentorTerms: ['technology', 'software', 'developer', 'engineering', 'data', 'cyber', 'it ', 'information systems', 'digital', 'technical'],
  },
  {
    label: 'Consultancy',
    majorTerms: ['business', 'management', 'consulting', 'consultancy', 'finance', 'accounting', 'economics', 'marketing', 'procurement', 'supply chain', 'logistics'],
    mentorTerms: ['consulting', 'consultancy', 'consultant', 'business', 'management', 'strategy', 'finance', 'accounting', 'marketing', 'procurement', 'supply chain', 'logistics', 'operations'],
  },
  {
    label: 'Medical',
    majorTerms: ['medicine', 'medical', 'pharmacy', 'nursing', 'dentistry', 'health', 'nutrition', 'physiotherapy', 'biology'],
    mentorTerms: ['medicine', 'medical', 'doctor', 'physician', 'pharmacy', 'pharmacist', 'nursing', 'nurse', 'dentistry', 'health', 'clinical', 'hospital', 'nutrition', 'physiotherapy'],
  },
]

function normalize(value?: string | null) {
  return (value ?? '').toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim()
}

function selectMentorForMajor(mentors: Mentor[], major?: string | null) {
  const candidates = mentors.filter(mentor => mentor.available).length
    ? mentors.filter(mentor => mentor.available)
    : mentors
  if (!candidates.length) return { mentor: undefined, matchLabel: '', matched: false }

  const normalizedMajor = normalize(major)
  const category = MENTOR_CATEGORIES.find(item => item.majorTerms.some(term => normalizedMajor.includes(term)))
  const majorTokens = normalizedMajor.split(' ').filter(token => token.length > 3)

  const ranked = candidates
    .map(mentor => {
      const searchable = normalize([
        mentor.jobTitle,
        mentor.company,
        mentor.areaOfExpertise,
        mentor.major,
        mentor.bio,
      ].join(' '))
      let score = 0

      if (category) {
        score += category.mentorTerms.filter(term => searchable.includes(term)).length * 10
      }
      score += majorTokens.filter(token => searchable.includes(token)).length * 3

      return { mentor, score }
    })
    .sort((a, b) => b.score - a.score)

  return {
    mentor: ranked[0]?.mentor,
    matchLabel: category?.label || major || 'your field',
    matched: (ranked[0]?.score ?? 0) > 0,
  }
}

function deadlineParts(deadline?: string | null) {
  if (!deadline) return { day: '—', month: 'TBA' }
  const value = new Date(`${deadline}T00:00:00`)
  if (Number.isNaN(value.getTime())) return { day: '—', month: 'TBA' }
  return {
    day: String(value.getDate()),
    month: value.toLocaleDateString('en', { month: 'short' }),
  }
}

export function DashboardPage() {
  const { user } = useAuth()
  const [scholarships, setScholarships] = useState<Scholarship[]>([])
  const [mentors, setMentors] = useState<Mentor[]>([])
  const [universities, setUniversities] = useState<University[]>([])
  const [skills, setSkills] = useState<Skill[]>([])
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      api.scholarships(),
      api.mentors(),
      api.universities(),
      api.skills(),
      api.activities(),
    ])
      .then(([scholarshipData, mentorData, universityData, skillData, activityData]) => {
        setScholarships(scholarshipData)
        setMentors(mentorData)
        setUniversities(universityData)
        setSkills(skillData)
        setActivities(activityData)
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <LoadingState label="Loading your resource overview..." />

  const { mentor: featuredMentor, matchLabel: mentorMatchLabel, matched: mentorMatched } = selectMentorForMajor(mentors, user?.major)
  const upcoming = scholarships.slice(0, 3)

  return (
    <div className="dashboard-page">
      <section className="welcome-banner">
        <div>
          <span className="welcome-icon"><Sparkles /></span>
          <p>Welcome, {user?.firstName}</p>
          <h2>Explore trusted resources for study, work, and career decisions.</h2>
          <span>Browse the latest information available in your Career Compass database.</span>
        </div>
        <Link className="button button-white" to="/app/profile">Update your profile <ArrowRight size={17} /></Link>
      </section>

      <section className="metrics-grid">
        <article><div className="metric-icon gold"><Award /></div><div><span>Scholarships</span><strong>{scholarships.length}</strong><small>Funding opportunities</small></div></article>
        <article><div className="metric-icon blue"><UsersRound /></div><div><span>Mentors</span><strong>{mentors.length}</strong><small>{mentors.filter(item => item.available).length} currently available</small></div></article>
        <article><div className="metric-icon purple"><Building2 /></div><div><span>Universities</span><strong>{universities.length}</strong><small>Local and international options</small></div></article>
        <article><div className="metric-icon green"><BookOpenCheck /></div><div><span>Skill resources</span><strong>{skills.length}</strong><small>External learning links</small></div></article>
      </section>

      <div className="dashboard-grid second-row resource-dashboard-grid">
        <section className="panel">
          <div className="panel-heading"><div><span>Funding directory</span><h2>Scholarships to review</h2></div><Link className="text-link" to="/app/scholarships">View all <ArrowRight size={16} /></Link></div>
          <div className="deadline-list">
            {upcoming.length ? upcoming.map((item, index) => {
              const parts = deadlineParts(item.deadline)
              return (
                <article key={item.id}>
                  <span className={`deadline-date date-${index + 1}`}><strong>{parts.day}</strong><small>{parts.month}</small></span>
                  <div><h3>{item.name}</h3><p>{item.provider} · {item.amount}</p><span>{item.majors}</span></div>
                  {item.applicationUrl && <a className="text-link" href={item.applicationUrl} target="_blank" rel="noreferrer">Open <ArrowRight size={15} /></a>}
                </article>
              )
            }) : <p className="empty-inline-message">No scholarships are available yet.</p>}
          </div>
        </section>

        <aside className="panel mentor-highlight">
          <div className="panel-heading"><div><span>Mentor directory</span><h2>Featured professional</h2></div><UsersRound /></div>
          {featuredMentor ? (
            <>
              <div className="mentor-highlight-profile">
                <span className="avatar avatar-xl">{featuredMentor.firstName[0]}{featuredMentor.lastName[0]}</span>
                <div><h3>{featuredMentor.firstName} {featuredMentor.lastName}</h3><p>{featuredMentor.jobTitle}</p><span>{featuredMentor.company}</span></div>
              </div>
              <div className="match-banner"><GraduationCap /><div><strong>{mentorMatched ? 'Recommended for your major' : 'Available professional'}</strong><span>{mentorMatched ? `Closest match: ${mentorMatchLabel}` : 'Add mentors in your field for a closer match'}</span></div></div>
              <div className="mentor-directory-detail"><strong>{featuredMentor.areaOfExpertise}</strong><span>{featuredMentor.experience}</span></div>
              <p className="mentor-quote">{featuredMentor.bio}</p>
              <div className="mentor-contact-actions">
                {featuredMentor.phone && <a className="button button-secondary" href={`tel:${featuredMentor.phone}`}><Phone size={16} /> Call</a>}
                {featuredMentor.email && <a className="button button-ghost" href={`mailto:${featuredMentor.email}`}><Mail size={16} /> Email</a>}
              </div>
              <Link className="text-link centered-link" to="/app/mentors">Browse all mentors <ArrowRight size={16} /></Link>
            </>
          ) : <p className="empty-inline-message">No mentors are available yet.</p>}
        </aside>
      </div>

      {activities.length > 0 && (
        <section className="panel events-panel">
          <div className="panel-heading"><div><span>Upcoming events</span><h2>Career and learning activities</h2></div><span className="resource-count-label">{activities.length} listed</span></div>
          <div className="events-grid">
            {activities.slice(0, 3).map((event, index) => (
              <article key={event.id}>
                <span className={`event-icon event-${index + 1}`}>{index === 0 ? <GraduationCap /> : index === 1 ? <UsersRound /> : <BookOpenCheck />}</span>
                <div className="event-date"><CalendarDays /> {new Date(`${event.eventDate}T00:00:00`).toLocaleDateString('en', { month: 'short', day: 'numeric' })}</div>
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div className="event-meta"><span><MapPin /> {event.location}</span><span>{event.format}</span></div>
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
