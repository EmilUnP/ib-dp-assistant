# Environment Setup Instructions

## Quick Setup for Admin Login

To get the admin user working immediately, create a `.env.local` file in the root directory with these minimal settings:

```bash
# Copy env.example to .env.local
cp env.example .env.local
```

Then edit `.env.local` and update these values:

```env
# NextAuth (Required for authentication)
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="ib-dp-assistant-secret-key-2024"

# Database (Optional - Admin works without database)
DATABASE_URL="postgresql://username:password@localhost:5432/ib_dp_assistant"
```

## Admin Login Credentials

- **Email**: `admin@ib-dp-assistant.com`
- **Password**: `Admin123!@#`

## Features That Work Without Database

✅ Admin login and authentication
✅ Admin dashboard access
✅ Navigation and basic UI
✅ All static pages

## Features That Require Database

❌ User registration (students, teachers, coordinators)
❌ Student data management
❌ CAS activities
❌ Assessment tracking
❌ Reports generation

## Next Steps

1. **For immediate testing**: Use the admin credentials above
2. **For full functionality**: Set up PostgreSQL database and run `npm run db:push`
3. **For production**: Configure all environment variables properly

---

**Note**: The admin user is hardcoded and works without any database connection, making it perfect for initial testing and deployment.
