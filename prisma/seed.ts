import { PrismaClient, UserRole } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Create admin user
  const adminEmail = 'admin@ib-dp-assistant.com'
  const adminPassword = 'Admin123!@#'
  
  // Check if admin user already exists
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail }
  })

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash(adminPassword, 12)
    
    const adminUser = await prisma.user.create({
      data: {
        firstName: 'System',
        lastName: 'Administrator',
        email: adminEmail,
        password: hashedPassword,
        role: UserRole.ADMIN
      }
    })

    console.log('✅ Admin user created:', adminUser.email)
  } else {
    console.log('ℹ️ Admin user already exists:', existingAdmin.email)
  }

  // Create sample coordinator user
  const coordinatorEmail = 'coordinator@ib-dp-assistant.com'
  const coordinatorPassword = 'Coordinator123!@#'
  
  const existingCoordinator = await prisma.user.findUnique({
    where: { email: coordinatorEmail }
  })

  if (!existingCoordinator) {
    const hashedPassword = await bcrypt.hash(coordinatorPassword, 12)
    
    const coordinatorUser = await prisma.user.create({
      data: {
        firstName: 'IB',
        lastName: 'Coordinator',
        email: coordinatorEmail,
        password: hashedPassword,
        role: UserRole.COORDINATOR
      }
    })

    // Create coordinator profile
    await prisma.coordinatorProfile.create({
      data: {
        userId: coordinatorUser.id
      }
    })

    console.log('✅ Coordinator user created:', coordinatorUser.email)
  } else {
    console.log('ℹ️ Coordinator user already exists:', existingCoordinator.email)
  }

  // Create sample teacher user
  const teacherEmail = 'teacher@ib-dp-assistant.com'
  const teacherPassword = 'Teacher123!@#'
  
  const existingTeacher = await prisma.user.findUnique({
    where: { email: teacherEmail }
  })

  if (!existingTeacher) {
    const hashedPassword = await bcrypt.hash(teacherPassword, 12)
    
    const teacherUser = await prisma.user.create({
      data: {
        firstName: 'John',
        lastName: 'Teacher',
        email: teacherEmail,
        password: hashedPassword,
        role: UserRole.TEACHER
      }
    })

    // Create teacher profile
    await prisma.teacherProfile.create({
      data: {
        userId: teacherUser.id,
        subjects: ['Mathematics', 'Physics', 'Chemistry']
      }
    })

    console.log('✅ Teacher user created:', teacherUser.email)
  } else {
    console.log('ℹ️ Teacher user already exists:', existingTeacher.email)
  }

  // Create sample student user
  const studentEmail = 'student@ib-dp-assistant.com'
  const studentPassword = 'Student123!@#'
  
  const existingStudent = await prisma.user.findUnique({
    where: { email: studentEmail }
  })

  if (!existingStudent) {
    const hashedPassword = await bcrypt.hash(studentPassword, 12)
    
    const studentUser = await prisma.user.create({
      data: {
        firstName: 'Jane',
        lastName: 'Student',
        email: studentEmail,
        password: hashedPassword,
        role: UserRole.STUDENT
      }
    })

    // Create student profile
    await prisma.studentProfile.create({
      data: {
        userId: studentUser.id,
        studentNumber: `IB${new Date().getFullYear()}0001`,
        cohort: `${new Date().getFullYear()}-${new Date().getFullYear() + 2}`,
        subjects: ['Mathematics HL', 'Physics HL', 'Chemistry HL', 'English A HL', 'Spanish B SL', 'Economics SL'],
        casHours: 0,
        casGoal: 150
      }
    })

    console.log('✅ Student user created:', studentUser.email)
  } else {
    console.log('ℹ️ Student user already exists:', existingStudent.email)
  }

  console.log('🎉 Database seeding completed!')
  console.log('\n📋 Test User Credentials:')
  console.log('Admin: admin@ib-dp-assistant.com / Admin123!@#')
  console.log('Coordinator: coordinator@ib-dp-assistant.com / Coordinator123!@#')
  console.log('Teacher: teacher@ib-dp-assistant.com / Teacher123!@#')
  console.log('Student: student@ib-dp-assistant.com / Student123!@#')
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
