import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Brand } from './Brand'

type PublicSection = 'home' | 'explore' | 'about'

export function PublicHeader() {
  const [open, setOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<PublicSection>('home')
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    const updateActiveSection = () => {
      const marker = window.scrollY + 140
      const exploreSection = document.getElementById('explore')
      const aboutSection = document.getElementById('about')

      if (aboutSection && marker >= aboutSection.offsetTop) {
        setActiveSection('about')
      } else if (exploreSection && marker >= exploreSection.offsetTop) {
        setActiveSection('explore')
      } else {
        setActiveSection('home')
      }
    }

    updateActiveSection()
    window.addEventListener('scroll', updateActiveSection, { passive: true })
    return () => window.removeEventListener('scroll', updateActiveSection)
  }, [])

  const goToSection = (section: PublicSection) => {
    setOpen(false)
    setActiveSection(section)

    if (section === 'home') {
      window.history.replaceState(null, '', window.location.pathname)
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    const target = document.getElementById(section)
    if (target) {
      window.history.replaceState(null, '', `#${section}`)
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <header className="public-header">
      <div className="container public-header-inner">
        <Brand onClick={() => goToSection('home')} />
        <nav className={`public-nav ${open ? 'is-open' : ''}`} aria-label="Main navigation">
          <button className={`public-nav-link ${activeSection === 'home' ? 'active' : ''}`} type="button" onClick={() => goToSection('home')}>Home</button>
          <button className={`public-nav-link ${activeSection === 'explore' ? 'active' : ''}`} type="button" onClick={() => goToSection('explore')}>Explore</button>
          <button className={`public-nav-link ${activeSection === 'about' ? 'active' : ''}`} type="button" onClick={() => goToSection('about')}>About</button>
          <div className="mobile-header-actions">
            {isAuthenticated ? (
              <Link className="button button-primary" to="/app" onClick={() => setOpen(false)}>Open dashboard</Link>
            ) : (
              <>
                <Link className="button button-ghost" to="/login" onClick={() => setOpen(false)}>Sign in</Link>
                <Link className="button button-primary" to="/register" onClick={() => setOpen(false)}>Get started</Link>
              </>
            )}
          </div>
        </nav>
        <div className="header-actions">
          {isAuthenticated ? (
            <Link className="button button-primary button-sm" to="/app">Open dashboard</Link>
          ) : (
            <>
              <Link className="button button-ghost button-sm" to="/login">Sign in</Link>
              <Link className="button button-primary button-sm" to="/register">Get started</Link>
            </>
          )}
        </div>
        <button className="menu-button" type="button" onClick={() => setOpen(!open)} aria-label="Toggle navigation" aria-expanded={open}>
          {open ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  )
}
