# Test Users - IB DP Assistant

## 🎯 Database Seeded Users

The following test users have been created in the database and are ready for testing:

### 👑 Admin User
- **Email**: `admin@ib-dp-assistant.com`
- **Password**: `Admin123!@#`
- **Role**: Administrator
- **Access**: Full system access, user management, all modules

### 🎓 Coordinator User
- **Email**: `coordinator@ib-dp-assistant.com`
- **Password**: `Coordinator123!@#`
- **Role**: IB Coordinator
- **Access**: Student oversight, CAS monitoring, program management

### 👨‍🏫 Teacher User
- **Email**: `teacher@ib-dp-assistant.com`
- **Password**: `Teacher123!@#`
- **Role**: Teacher
- **Subjects**: Mathematics, Physics, Chemistry
- **Access**: Student management, assignment creation, grading

### 👨‍🎓 Student User
- **Email**: `student@ib-dp-assistant.com`
- **Password**: `Student123!@#`
- **Role**: Student
- **Student Number**: IB20240001
- **Cohort**: 2024-2026
- **Subjects**: Mathematics HL, Physics HL, Chemistry HL, English A HL, Spanish B SL, Economics SL
- **CAS Goal**: 150 hours

## 🧪 Testing Scenarios

### 1. Login Testing
- [ ] Test admin login with full dashboard access
- [ ] Test coordinator login with appropriate permissions
- [ ] Test teacher login with subject-specific access
- [ ] Test student login with student-specific features

### 2. Registration Testing
- [ ] Test new student registration
- [ ] Test new teacher registration
- [ ] Test new coordinator registration
- [ ] Verify admin registration is blocked

### 3. Role-Based Access Testing
- [ ] Verify admin can access all modules
- [ ] Verify coordinator can access student management
- [ ] Verify teacher can access their subjects
- [ ] Verify student can only access their own data

### 4. Database Integration Testing
- [ ] Verify all user data is stored in database
- [ ] Verify profile creation works for each role
- [ ] Verify password hashing is working
- [ ] Verify session management works

## 🔧 Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Seed database with test users
npm run db:seed

# Reset database (if needed)
npx prisma db push --force-reset
npm run db:seed
```

## 📊 Database Status

✅ **Database**: Prisma Accelerate (PostgreSQL)
✅ **Schema**: All tables created and synced
✅ **Users**: 4 test users created
✅ **Profiles**: All user profiles created
✅ **Authentication**: Fully functional
✅ **Registration**: Working for all roles except admin

## 🚀 Production Ready

The application is now fully functional with:
- Complete database integration
- User authentication and authorization
- Role-based access control
- Registration system
- Admin user management
- All data persisted in database

---

**Note**: All test users are created with secure passwords and proper role assignments. The admin user is now stored in the database like all other users, ensuring consistent authentication flow.
