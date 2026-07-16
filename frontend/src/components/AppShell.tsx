import {
  BookOpenCheck,
  Building2,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Menu,
  UserRound,
  UsersRound,
  X,
} from 'lucide-react'
import { useState, type ReactNode } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Brand } from './Brand'

const navigation = [
  { to: '/app', label: 'Overview', icon: LayoutDashboard, end: true },
  { to: '/app/scholarships', label: 'Scholarships', icon: GraduationCap },
  { to: '/app/mentors', label: 'Mentors', icon: UsersRound },
  { to: '/app/universities', label: 'Universities', icon: Building2 },
  { to: '/app/skills', label: 'Skill resources', icon: BookOpenCheck },
]

const pageMeta: Record<string, { eyebrow: string; title: string }> = {
  '/app': { eyebrow: 'Your workspace', title: 'Resource overview' },
  '/app/scholarships': { eyebrow: 'Funding opportunities', title: 'Scholarships' },
  '/app/mentors': { eyebrow: 'Expert guidance', title: 'Mentor directory' },
  '/app/universities': { eyebrow: 'Academic discovery', title: 'University directory' },
  '/app/skills': { eyebrow: 'Workplace preparation', title: 'Skill resources' },
  '/app/profile': { eyebrow: 'Account settings', title: 'Your profile' },
}

export function AppShell({ children }: { children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const meta = pageMeta[location.pathname] ?? pageMeta['/app']

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const initials = `${user?.firstName?.[0] ?? ''}${user?.lastName?.[0] ?? ''}`.toUpperCase()

  return (
    <div className="app-layout">
      <aside className={`sidebar ${mobileOpen ? 'is-open' : ''}`}>
        <div className="sidebar-head">
          <Brand />
          <button className="sidebar-close" type="button" onClick={() => setMobileOpen(false)}><X /></button>
        </div>
        <nav className="sidebar-nav">
          <p className="nav-label">Workspace</p>
          {navigation.map(({ to, label, icon: Icon, end }) => (
            <NavLink key={to} end={end} to={to} onClick={() => setMobileOpen(false)}>
              <Icon size={19} />
              <span>{label}</span>
            </NavLink>
          ))}
          <p className="nav-label nav-label-secondary">Account</p>
          <NavLink to="/app/profile" onClick={() => setMobileOpen(false)}>
            <UserRound size={19} />
            <span>Profile settings</span>
          </NavLink>
        </nav>
        <button className="sidebar-logout" type="button" onClick={handleLogout}>
          <LogOut size={18} /> Sign out
        </button>
      </aside>

      {mobileOpen && <button className="sidebar-overlay" onClick={() => setMobileOpen(false)} aria-label="Close sidebar" />}

      <main className="app-main">
        <header className="app-topbar">
          <div className="topbar-title-wrap">
            <button className="mobile-sidebar-trigger" type="button" onClick={() => setMobileOpen(true)}><Menu /></button>
            <div>
              <span>{meta.eyebrow}</span>
              <h1>{meta.title}</h1>
            </div>
          </div>
          <div className="topbar-actions">
            <NavLink className="profile-chip" to="/app/profile">
              <span className="avatar avatar-sm">{initials}</span>
              <span><strong>{user?.firstName}</strong></span>
            </NavLink>
          </div>
        </header>
        <div className="app-content">{children}</div>
      </main>
    </div>
  )
}
