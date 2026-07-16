import { Compass } from 'lucide-react'
import { Link } from 'react-router-dom'

export function Brand({ compact = false, onClick }: { compact?: boolean; onClick?: () => void }) {
  return (
    <Link className="brand" to="/" aria-label="Career Compass home" onClick={onClick}>
      <span className="brand-mark"><Compass size={22} strokeWidth={2.4} /></span>
      {!compact && (
        <span className="brand-type">
          <strong>Career</strong><span>Compass</span>
        </span>
      )}
    </Link>
  )
}
