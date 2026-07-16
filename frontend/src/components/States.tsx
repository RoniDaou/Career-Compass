import { LoaderCircle, SearchX } from 'lucide-react'

export function LoadingState({ label = 'Loading opportunities...' }: { label?: string }) {
  return <div className="state-card"><LoaderCircle className="spin" /><p>{label}</p></div>
}

export function EmptyState({ title = 'No results found', detail = 'Try adjusting your search or filters.' }: { title?: string; detail?: string }) {
  return <div className="state-card"><SearchX /><h3>{title}</h3><p>{detail}</p></div>
}
