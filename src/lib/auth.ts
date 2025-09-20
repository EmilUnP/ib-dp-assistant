import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { PrismaClient, UserRole } from '@prisma/client'

const prisma = new PrismaClient()

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        // Hardcoded admin user
        const ADMIN_EMAIL = 'admin@ib-dp-assistant.com'
        const ADMIN_PASSWORD = 'Admin123!@#'
        
        if (credentials.email === ADMIN_EMAIL) {
          if (credentials.password === ADMIN_PASSWORD) {
            return {
              id: 'admin-001',
              email: ADMIN_EMAIL,
              name: 'System Administrator',
              role: 'ADMIN' as UserRole,
              studentProfile: null,
              teacherProfile: null,
              coordinatorProfile: null
            }
          }
          return null
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          },
          include: {
            studentProfile: true,
            teacherProfile: true,
            coordinatorProfile: true
          }
        })

        if (!user) {
          return null
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        )

        if (!isPasswordValid) {
          return null
        }

        return {
          id: user.id,
          email: user.email,
          name: `${user.firstName} ${user.lastName}`,
          role: user.role,
          studentProfile: user.studentProfile,
          teacherProfile: user.teacherProfile,
          coordinatorProfile: user.coordinatorProfile
        }
      }
    })
  ],
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
        token.studentProfile = user.studentProfile
        token.teacherProfile = user.teacherProfile
        token.coordinatorProfile = user.coordinatorProfile
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub!
        session.user.role = token.role as UserRole
        session.user.studentProfile = token.studentProfile
        session.user.teacherProfile = token.teacherProfile
        session.user.coordinatorProfile = token.coordinatorProfile
      }
      return session
    }
  },
  pages: {
    signIn: '/login'
  }
}
