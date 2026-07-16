import type {
  Activity,
  AuthResponse,
  Mentor,
  RegisterPayload,
  Scholarship,
  Skill,
  Student,
  University,
} from '../types'

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8081/api'

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  })

  if (!response.ok) {
    let message = 'Something went wrong. Please try again.'
    try {
      const payload = await response.json()
      message = payload.message ?? payload.detail ?? message
    } catch {
      const text = await response.text()
      if (text) message = text
    }
    throw new Error(message)
  }

  return response.json() as Promise<T>
}

export const api = {
  health: () => request<{ status: string; service: string }>('/health'),
  login: (email: string, password: string) =>
    request<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),
  register: (payload: RegisterPayload) =>
    request<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  getStudent: (id: number) => request<Student>(`/students/${id}`),
  updateStudent: (email: string, payload: Partial<Student>) =>
    request<Student>(`/students/profile?email=${encodeURIComponent(email)}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    }),
  scholarships: () => request<Scholarship[]>('/scholarships'),
  mentors: () => request<Mentor[]>('/mentors'),
  universities: () => request<University[]>('/universities'),
  skills: () => request<Skill[]>('/skills'),
  activities: () => request<Activity[]>('/activities'),
}
