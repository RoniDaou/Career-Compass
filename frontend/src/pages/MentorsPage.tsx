import { Search, SlidersHorizontal, UsersRound } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { MentorCard } from '../components/OpportunityCards'
import { EmptyState, LoadingState } from '../components/States'
import { api } from '../services/api'
import type { Mentor } from '../types'

export function MentorsPage() {
  const [items, setItems] = useState<Mentor[]>([])
  const [query, setQuery] = useState('')
  const [availableOnly, setAvailableOnly] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => { api.mentors().then(setItems).finally(() => setLoading(false)) }, [])

  const filtered = useMemo(() => items.filter(item => {
    const matches = `${item.firstName} ${item.lastName} ${item.jobTitle} ${item.areaOfExpertise} ${item.company}`
      .toLowerCase()
      .includes(query.toLowerCase())
    return matches && (!availableOnly || item.available)
  }), [items, query, availableOnly])

  if (loading) return <LoadingState label="Loading the mentor directory..." />

  return (
    <div className="catalog-page">
      <section className="catalog-intro mentor-intro">
        <div><span><UsersRound /></span><div><p>Professional mentorship directory</p><h2>Find guidance in the field you want to enter</h2><small>Search mentors by expertise, role, or company and contact them using the available details.</small></div></div>
        <strong>{items.filter(item => item.available).length}<span>mentors available</span></strong>
      </section>
      <section className="catalog-toolbar">
        <div className="catalog-search"><Search /><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search by expertise, role, or company" /></div>
        <button className={`filter-button ${availableOnly ? 'active' : ''}`} type="button" onClick={() => setAvailableOnly(!availableOnly)}><SlidersHorizontal /> Available only</button>
      </section>
      <div className="catalog-summary"><span>Showing <strong>{filtered.length}</strong> mentor profiles</span></div>
      {filtered.length ? <div className="cards-grid three-column">{filtered.map(item => <MentorCard key={item.id} mentor={item} />)}</div> : <EmptyState />}
    </div>
  )
}
