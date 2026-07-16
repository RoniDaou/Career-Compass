import { Navigate, Route, Routes } from 'react-router-dom'
import { AppShell } from './components/AppShell'
import { ProtectedRoute } from './components/ProtectedRoute'
import { DashboardPage } from './pages/DashboardPage'
import { LandingPage } from './pages/LandingPage'
import { LoginPage } from './pages/LoginPage'
import { MentorsPage } from './pages/MentorsPage'
import { ProfilePage } from './pages/ProfilePage'
import { RegisterPage } from './pages/RegisterPage'
import { ScholarshipsPage } from './pages/ScholarshipsPage'
import { SkillsPage } from './pages/SkillsPage'
import { UniversitiesPage } from './pages/UniversitiesPage'

function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return <AppShell>{children}</AppShell>
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Old public directory links now lead to the protected workspace. */}
      <Route path="/scholarships" element={<Navigate to="/app/scholarships" replace />} />
      <Route path="/mentors" element={<Navigate to="/app/mentors" replace />} />
      <Route path="/universities" element={<Navigate to="/app/universities" replace />} />
      <Route path="/skills" element={<Navigate to="/app/skills" replace />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/app" element={<ProtectedLayout><DashboardPage /></ProtectedLayout>} />
        <Route path="/app/scholarships" element={<ProtectedLayout><ScholarshipsPage /></ProtectedLayout>} />
        <Route path="/app/mentors" element={<ProtectedLayout><MentorsPage /></ProtectedLayout>} />
        <Route path="/app/universities" element={<ProtectedLayout><UniversitiesPage /></ProtectedLayout>} />
        <Route path="/app/skills" element={<ProtectedLayout><SkillsPage /></ProtectedLayout>} />
        <Route path="/app/profile" element={<ProtectedLayout><ProfilePage /></ProtectedLayout>} />
      </Route>

      <Route path="*" element={<LandingPage />} />
    </Routes>
  )
}
