export enum UserRole {
  STUDENT = 'STUDENT',
  TEACHER = 'TEACHER',
  COORDINATOR = 'COORDINATOR',
  ADMIN = 'ADMIN'
}

export enum CASCategory {
  CREATIVITY = 'CREATIVITY',
  ACTIVITY = 'ACTIVITY',
  SERVICE = 'SERVICE'
}

export enum AssessmentType {
  INTERNAL = 'INTERNAL',
  EXTERNAL = 'EXTERNAL',
  MOCK = 'MOCK'
}

export enum CASStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED'
}

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: UserRole
  createdAt: Date
  updatedAt: Date
}

export interface StudentProfile {
  id: string
  userId: string
  studentNumber: string
  cohort: string
  subjects: string[]
  casHours: number
  casGoal: number
  createdAt: Date
  updatedAt: Date
  user?: User
}

export interface TeacherProfile {
  id: string
  userId: string
  subjects: string[]
  createdAt: Date
  updatedAt: Date
  user?: User
}

export interface CoordinatorProfile {
  id: string
  userId: string
  createdAt: Date
  updatedAt: Date
  user?: User
}

export interface Assessment {
  id: string
  studentId: string
  subject: string
  type: AssessmentType
  title: string
  score: number
  maxScore: number
  date: Date
  description?: string
  createdAt: Date
  updatedAt: Date
}

export interface CASActivity {
  id: string
  studentId: string
  title: string
  category: CASCategory
  description: string
  hours: number
  evidence: string[]
  status: CASStatus
  reviewerId?: string
  reviewedAt?: Date
  feedback?: string
  createdAt: Date
  updatedAt: Date
}

export interface Assignment {
  id: string
  teacherId: string
  title: string
  description: string
  subject: string
  dueDate: Date
  maxScore: number
  materials: string[]
  createdAt: Date
  updatedAt: Date
}

export interface AIInsight {
  id: string
  studentId: string
  type: string
  title: string
  description: string
  priority: 'HIGH' | 'MEDIUM' | 'LOW'
  data: Record<string, any>
  isRead: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Notification {
  id: string
  userId: string
  senderId?: string
  title: string
  message: string
  type: string
  isRead: boolean
  data?: Record<string, any>
  createdAt: Date
}

export interface DashboardStats {
  totalStudents: number
  totalTeachers: number
  pendingCASActivities: number
  upcomingDeadlines: number
  atRiskStudents: number
  recentAssessments: number
}

export interface StudentPerformance {
  studentId: string
  studentName: string
  subjects: {
    [subject: string]: {
      average: number
      trend: 'up' | 'down' | 'stable'
      lastAssessment: Date
    }
  }
  overallAverage: number
  riskLevel: 'low' | 'medium' | 'high'
}

export interface CASProgress {
  studentId: string
  studentName: string
  totalHours: number
  goal: number
  progress: number
  byCategory: {
    [key in CASCategory]: number
  }
  pendingActivities: number
  approvedActivities: number
}

export interface NotificationPreferences {
  email: boolean
  sms: boolean
  push: boolean
  deadlineReminders: boolean
  gradeUpdates: boolean
  casApprovals: boolean
}
