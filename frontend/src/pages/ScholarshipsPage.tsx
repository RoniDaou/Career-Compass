import { Award, Search } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { ScholarshipCard } from '../components/OpportunityCards'
import { EmptyState, LoadingState } from '../components/States'
import { api } from '../services/api'
import type { Scholarship } from '../types'

export function ScholarshipsPage() {
  const [items, setItems] = useState<Scholarship[]>([])
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('All')
  const [loading, setLoading] = useState(true)

  useEffect(() => { api.scholarships().then(setItems).finally(() => setLoading(false)) }, [])

  const types = ['All', ...Array.from(new Set(items.map(item => item.type).filter(Boolean)))]
  const filtered = useMemo(() => items.filter(item => {
    const matchesQuery = `${item.name} ${item.provider} ${item.majors} ${item.location}`.toLowerCase().includes(query.toLowerCase())
    return matchesQuery && (filter === 'All' || item.type === filter)
  }), [items, query, filter])

  if (loading) return <LoadingState />

  return (
    <div className="catalog-page">
      <section className="catalog-intro scholarship-intro"><div><span><Award /></span><div><p>Funding opportunity database</p><h2>Search scholarships by provider, major, and location</h2><small>Application links and eligibility information are loaded directly from your database.</small></div></div><strong>{items.length}<span>opportunities listed</span></strong></section>
      <section className="catalog-toolbar"><div className="catalog-search"><Search /><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search scholarships, providers, or majors" /></div></section>
      <div className="filter-tabs">{types.map(type => <button key={type} type="button" className={filter === type ? 'active' : ''} onClick={() => setFilter(type)}>{type}</button>)}</div>
      <div className="catalog-summary"><span>Showing <strong>{filtered.length}</strong> opportunities</span></div>
      {filtered.length ? <div className="cards-grid two-column">{filtered.map(item => <ScholarshipCard key={item.id} scholarship={item} />)}</div> : <EmptyState />}
    </div>
  )
}
