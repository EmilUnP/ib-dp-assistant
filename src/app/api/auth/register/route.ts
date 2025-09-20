import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { UserRole } from '@/types'
import { validateEmail, validatePassword } from '@/lib/utils'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, password, role } = body

    // Validation
    if (!firstName || !lastName || !email || !password || !role) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Prevent admin registration
    if (role === 'ADMIN') {
      return NextResponse.json(
        { error: 'Admin registration is not allowed' },
        { status: 403 }
      )
    }

    if (!validateEmail(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    const passwordValidation = validatePassword(password)
    if (!passwordValidation.valid) {
      return NextResponse.json(
        { error: passwordValidation.message },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create user
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role: role as UserRole
      }
    })

    // Create profile based on role
    if (role === 'STUDENT') {
      await prisma.studentProfile.create({
        data: {
          userId: user.id,
          studentNumber: `IB${new Date().getFullYear()}${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
          cohort: `${new Date().getFullYear()}-${new Date().getFullYear() + 2}`,
          subjects: [],
          casHours: 0,
          casGoal: 150
        }
      })
    } else if (role === 'TEACHER') {
      await prisma.teacherProfile.create({
        data: {
          userId: user.id,
          subjects: []
        }
      })
    } else if (role === 'COORDINATOR') {
      await prisma.coordinatorProfile.create({
        data: {
          userId: user.id
        }
      })
    }

    return NextResponse.json(
      { message: 'User created successfully' },
      { status: 201 }
    )
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
