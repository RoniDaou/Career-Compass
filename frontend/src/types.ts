export type Gender = 'MALE' | 'FEMALE' | 'OTHER'

export interface Student {
  id: number
  email: string
  role: string
  firstName: string
  lastName: string
  dateOfBirth?: string
  gender?: Gender
  major: string
  yearOfStudy: number
  address?: string
  phone?: string
  bio?: string
  mentorId?: number
}

export interface AuthResponse {
  message: string
  user: Student
}

export interface Scholarship {
  id: number
  name: string
  provider: string
  majors: string
  eligibilityCriteria: string
  amount: string
  duration: string
  deadline?: string | null
  location: string
  type: string
  applicationUrl?: string | null
  featured: boolean
}

export interface Mentor {
  id: number
  firstName: string
  lastName: string
  jobTitle: string
  company: string
  areaOfExpertise: string
  major?: string
  bio: string
  experience: string
  location: string
  email?: string
  phone?: string
  available: boolean
}

export interface University {
  id: number
  name: string
  type: string
  department: string
  tuitionFees: string
  major: string
  address: string
  phone: string
  email: string
  website?: string | null
}

export interface Skill {
  id: string
  name: string
  description: string
  importance: string
  level: string
  category: string
  resourceName: string
  resourceUrl: string
  estimatedHours: number
}

export interface Activity {
  id: string
  title: string
  description: string
  organizer: string
  location: string
  eventDate: string
  category: string
  format: string
  seatsAvailable: number
}

export interface RegisterPayload {
  email: string
  password: string
  firstName: string
  lastName: string
  dateOfBirth?: string
  gender?: Gender
  major: string
  yearOfStudy: number
  address?: string
  phone?: string
}
