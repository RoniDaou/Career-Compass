import { createContext, useContext, useState, type ReactNode } from 'react'
import { api } from '../services/api'
import type { RegisterPayload, Student } from '../types'

interface AuthContextValue {
  user: Student | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  register: (payload: RegisterPayload) => Promise<void>
  logout: () => void
  setUser: (student: Student) => void
}

const STORAGE_KEY = 'career-compass-user-v2'
const AuthContext = createContext<AuthContextValue | undefined>(undefined)

function getStoredUser(): Student | null {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (!stored) return null
  try {
    return JSON.parse(stored) as Student
  } catch {
    localStorage.removeItem(STORAGE_KEY)
    return null
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, updateUser] = useState<Student | null>(() => getStoredUser())

  const setUser = (student: Student) => {
    updateUser(student)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(student))
  }

  const login = async (email: string, password: string) => {
    const response = await api.login(email, password)
    setUser(response.user)
  }

  const register = async (payload: RegisterPayload) => {
    const response = await api.register(payload)
    setUser(response.user)
  }

  const logout = () => {
    updateUser(null)
    localStorage.removeItem(STORAGE_KEY)
  }

  const value = { user, isAuthenticated: Boolean(user), login, register, logout, setUser }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used inside AuthProvider')
  return context
}
