import { UserRole } from '@prisma/client'

declare module 'next-auth' {
  interface User {
    id: string
    role: UserRole
    studentProfile?: any
    teacherProfile?: any
    coordinatorProfile?: any
  }

  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
      role: UserRole
      studentProfile?: any
      teacherProfile?: any
      coordinatorProfile?: any
    }
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role: UserRole
    studentProfile?: any
    teacherProfile?: any
    coordinatorProfile?: any
  }
}
