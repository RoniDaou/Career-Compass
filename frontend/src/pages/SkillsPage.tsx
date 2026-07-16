import { ArrowRight, BookOpenCheck, Clock3, ExternalLink } from 'lucide-react'
import { useEffect, useState } from 'react'
import { LoadingState } from '../components/States'
import { api } from '../services/api'
import type { Skill } from '../types'

export function SkillsPage() {
  const [items, setItems] = useState<Skill[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { api.skills().then(setItems).finally(() => setLoading(false)) }, [])

  if (loading) return <LoadingState label="Loading skill resources..." />

  return (
    <div className="skills-page">
      <section className="catalog-intro skills-intro">
        <div><span><BookOpenCheck /></span><div><p>Workplace and life skills</p><h2>Learn practical skills from trusted external resources</h2><small>Each pathway links directly to a course or guided resource. Career Compass does not track course completion.</small></div></div>
        <strong>{items.length}<span>learning resources</span></strong>
      </section>
      <section className="resource-notice"><ExternalLink /><div><strong>External learning library</strong><p>Course availability, pricing, certificates, and completion times are managed by the linked provider.</p></div></section>
      <div className="pathway-list">
        {items.map((skill, index) => (
          <article className="pathway-card" key={skill.id}>
            <div className="pathway-number">{String(index + 1).padStart(2, '0')}</div>
            <div className="pathway-content">
              <div className="pathway-top"><div><span>{skill.category} · {skill.level}</span><h3>{skill.name}</h3></div><span className={`importance ${skill.importance.toLowerCase()}`}>{skill.importance} priority</span></div>
              <p>{skill.description}</p>
              <div className="pathway-meta"><span><Clock3 /> Suggested plan: {skill.estimatedHours} hours</span><span><ExternalLink /> {skill.resourceName}</span></div>
              <div className="pathway-bottom resource-pathway-bottom"><span className="provider-note">Opens on the course provider's website</span><a className="button button-secondary" href={skill.resourceUrl} target="_blank" rel="noreferrer">Open resource <ArrowRight /></a></div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
