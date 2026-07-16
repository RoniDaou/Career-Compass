import { ArrowUpRight, Building2, Mail, MapPin, Phone, Search } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { EmptyState, LoadingState } from '../components/States'
import { api } from '../services/api'
import type { University } from '../types'

export function UniversitiesPage() {
  const [items, setItems] = useState<University[]>([])
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => { api.universities().then(setItems).finally(() => setLoading(false)) }, [])

  const filtered = useMemo(() => items.filter(item => `${item.name} ${item.major} ${item.department} ${item.address}`.toLowerCase().includes(query.toLowerCase())), [items, query])

  if (loading) return <LoadingState label="Loading the university directory..." />

  return (
    <div className="catalog-page">
      <section className="catalog-intro university-intro">
        <div><span><Building2 /></span><div><p>University directory</p><h2>Research universities in Lebanon and abroad</h2><small>Review programs, locations, tuition notes, and official university websites.</small></div></div>
        <strong>{items.length}<span>institutions listed</span></strong>
      </section>
      <section className="catalog-toolbar"><div className="catalog-search"><Search /><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search universities, programs, or locations" /></div></section>
      {filtered.length ? (
        <div className="university-list">
          {filtered.map(item => (
            <article className="university-card" key={item.id}>
              <div className="university-mark">{item.name.split(' ').slice(0, 2).map(word => word[0]).join('')}</div>
              <div className="university-main">
                <div className="university-title"><div><span>{item.type}</span><h3>{item.name}</h3><p><MapPin /> {item.address}</p></div></div>
                <div className="university-detail-grid university-detail-grid-simple">
                  <div><small>Programs</small><strong>{item.major}</strong><span>{item.department}</span></div>
                  <div><small>Tuition information</small><strong>{item.tuitionFees}</strong><span>Confirm current fees with admissions</span></div>
                  <div><small>Contact</small><strong>{item.phone || 'See official website'}</strong><span>{item.email || 'Admissions details may be available online'}</span></div>
                </div>
                <div className="university-actions">
                  {item.website && <a href={item.website} target="_blank" rel="noreferrer" className="button button-secondary">Visit university <ArrowUpRight /></a>}
                  {item.phone && <a href={`tel:${item.phone}`} className="button button-ghost"><Phone /> Call</a>}
                  {item.email && <a href={`mailto:${item.email}`} className="button button-ghost"><Mail /> Email</a>}
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : <EmptyState />}
    </div>
  )
}
