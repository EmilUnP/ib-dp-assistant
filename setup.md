# IB Diploma Coordinator Assistant - Setup Guide

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- PostgreSQL 13+
- npm or yarn

### 1. Installation

```bash
# Clone the repository
git clone <repository-url>
cd ib-dp-assistant

# Install dependencies
npm install
```

### 2. Environment Configuration

```bash
# Copy environment template
cp env.example .env.local
```

Update `.env.local` with your configuration:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/ib_dp_assistant"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# Email Configuration (SendGrid)
SENDGRID_API_KEY="your-sendgrid-api-key"
FROM_EMAIL="noreply@yourschool.edu"

# SMS Configuration (Twilio)
TWILIO_ACCOUNT_SID="your-twilio-account-sid"
TWILIO_AUTH_TOKEN="your-twilio-auth-token"
TWILIO_PHONE_NUMBER="your-twilio-phone-number"

# AI Configuration
OPENAI_API_KEY="your-openai-api-key"

# File Upload
UPLOAD_DIR="./uploads"
MAX_FILE_SIZE="10485760" # 10MB

# Application
NODE_ENV="development"
```

### 3. Database Setup

```bash
# Generate Prisma client
npm run db:generate

# Run database migrations
npm run db:push

# (Optional) Seed the database
npm run db:seed
```

### 4. Start Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## 📋 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema changes to database
- `npm run db:seed` - Seed database with sample data
- `npm run db:studio` - Open Prisma Studio
- `npm run type-check` - Run TypeScript type checking

## 🗄️ Database Schema

The application uses Prisma ORM with PostgreSQL. Key models include:

- **User**: Authentication and user management
- **StudentProfile**: Student-specific data and progress
- **TeacherProfile**: Teacher information and subjects
- **Assessment**: Academic assessments and grades
- **CASActivity**: CAS activities and approvals
- **AIInsight**: AI-generated insights and recommendations
- **Notification**: System notifications and alerts

## 🔐 Authentication

The system uses NextAuth.js with:
- Email/Password authentication
- Role-based access control (RBAC)
- Session management
- Protected routes

## 🤖 AI Integration

- **OpenAI API**: For natural language processing and chatbot functionality
- **Custom ML Models**: For student performance prediction and risk assessment
- **Recommendation Engine**: Personalized study suggestions and resource recommendations

## 📧 Notifications

- **Email**: SendGrid integration for email notifications
- **SMS**: Twilio integration for SMS alerts
- **In-app**: Real-time notification center

## 📊 Reporting

- PDF report generation using jsPDF
- Excel export using xlsx
- Custom report templates
- Automated report scheduling

## 🚀 Deployment

### Production Build

```bash
npm run build
npm start
```

### Environment Variables

Ensure all production environment variables are properly configured:

- Database connection string
- Authentication secrets
- API keys for external services
- File storage configuration

### Database Migration

```bash
npm run db:push
```

## 🔧 Configuration

### User Roles

- **STUDENT**: Submit assignments, view performance, receive alerts
- **TEACHER**: Upload materials, grade work, view student reports
- **COORDINATOR**: Oversee all modules, monitor program implementation
- **ADMIN**: Manage users, configure settings, handle integrations

### System Settings

Configure through the admin panel:
- School information
- Academic calendar
- CAS requirements
- Notification preferences
- Integration settings

## 🆘 Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Verify DATABASE_URL is correct
   - Ensure PostgreSQL is running
   - Check database permissions

2. **Authentication Issues**
   - Verify NEXTAUTH_SECRET is set
   - Check NEXTAUTH_URL matches your domain
   - Ensure user exists in database

3. **File Upload Issues**
   - Check UPLOAD_DIR permissions
   - Verify MAX_FILE_SIZE setting
   - Ensure sufficient disk space

4. **Email/SMS Not Working**
   - Verify API keys are correct
   - Check service quotas and limits
   - Review error logs

### Getting Help

- Check the documentation in `/docs` folder
- Review error logs in the console
- Contact the development team
- Create an issue in the repository

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Note**: This is a comprehensive IB Diploma Programme management system designed to streamline administrative tasks and improve student outcomes through AI-powered insights and automation.
