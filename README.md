# IB Diploma Coordinator Assistant

An AI-integrated platform designed to assist in the coordination, monitoring, and management of the International Baccalaureate® (IB) Diploma Programme (DP). This comprehensive system provides tools for student tracking, CAS management, academic analytics, resource sharing, and communication automation.

## 🚀 Features

### Core Modules

- **Student Tracking**: Track and analyze student academic progress across all six IB subjects
- **CAS Monitoring**: Track student CAS (Creativity, Activity, Service) hours and projects with approval workflow
- **Teacher Module**: Upload teaching materials, assign coursework, and monitor students
- **AI Engine**: Machine learning-powered insights, recommendations, and automated alerts
- **Notification Center**: Email and SMS integration for deadline alerts and updates
- **Reporting Module**: Generate comprehensive reports for IB requirements and progress
- **Admin Panel**: Manage users, permissions, and system settings

### User Roles

- **Students**: Submit assignments, view performance dashboard, receive alerts
- **Teachers**: Upload materials, grade work, view student reports, approve CAS activities
- **Coordinators**: Oversee all modules, monitor program implementation, generate reports
- **Administrators**: Manage users, configure settings, handle integrations

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript, TailwindCSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL
- **Authentication**: NextAuth.js
- **AI/ML**: OpenAI API, TensorFlow, scikit-learn
- **Notifications**: SendGrid (Email), Twilio (SMS)
- **File Storage**: Local file system (configurable for cloud storage)

## 📋 Prerequisites

- Node.js 18+ 
- PostgreSQL 13+
- npm or yarn

## 🚀 Quick Start

### 1. Clone and Install

```bash
git clone <repository-url>
cd ib-dp-assistant
npm install
```

### 2. Environment Setup

```bash
cp env.example .env.local
```

Update the `.env.local` file with your configuration:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/ib_dp_assistant"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# Email Configuration
SENDGRID_API_KEY="your-sendgrid-api-key"
FROM_EMAIL="noreply@yourschool.edu"

# SMS Configuration
TWILIO_ACCOUNT_SID="your-twilio-account-sid"
TWILIO_AUTH_TOKEN="your-twilio-auth-token"
TWILIO_PHONE_NUMBER="your-twilio-phone-number"

# AI Configuration
OPENAI_API_KEY="your-openai-api-key"
```

### 3. Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma db push

# (Optional) Seed the database
npx prisma db seed
```

### 4. Start Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
ib-dp-assistant/
├── src/
│   ├── app/                 # Next.js app directory
│   │   ├── layout.tsx      # Root layout
│   │   ├── page.tsx        # Home page
│   │   └── (auth)/         # Authentication pages
│   ├── components/         # Reusable UI components
│   │   ├── Navigation.tsx  # Main navigation
│   │   ├── Dashboard.tsx   # Dashboard component
│   │   └── ui/            # Basic UI components
│   ├── lib/               # Utility functions and configurations
│   │   ├── utils.ts       # Common utilities
│   │   ├── auth.ts        # Authentication config
│   │   └── prisma.ts      # Database client
│   ├── types/             # TypeScript type definitions
│   │   └── index.ts       # Main types
│   ├── hooks/             # Custom React hooks
│   ├── utils/             # Helper functions
│   └── styles/            # Global styles
│       └── globals.css    # TailwindCSS imports
├── prisma/
│   └── schema.prisma      # Database schema
├── public/                # Static assets
└── docs/                  # Documentation
```

## 🔧 Configuration

### Database Schema

The application uses Prisma ORM with PostgreSQL. Key models include:

- **User**: Authentication and user management
- **StudentProfile**: Student-specific data and progress
- **TeacherProfile**: Teacher information and subjects
- **Assessment**: Academic assessments and grades
- **CASActivity**: CAS activities and approvals
- **AIInsight**: AI-generated insights and recommendations
- **Notification**: System notifications and alerts

### Authentication

The system uses NextAuth.js with multiple authentication strategies:

- Email/Password authentication
- Role-based access control (RBAC)
- Session management
- Protected routes

### AI Integration

- **OpenAI API**: For natural language processing and chatbot functionality
- **Custom ML Models**: For student performance prediction and risk assessment
- **Recommendation Engine**: Personalized study suggestions and resource recommendations

## 📊 Key Features in Detail

### Student Tracking
- Comprehensive student profiles with academic history
- Real-time performance analytics and trend visualization
- AI-powered risk assessment and early warning system
- Subject-specific progress tracking

### CAS Management
- Digital CAS activity submission and approval workflow
- Evidence upload and management
- Progress tracking with visual indicators
- Automated deadline reminders

### Teacher Tools
- Material upload and sharing system
- Assignment creation and grading interface
- Student progress monitoring dashboard
- CAS activity review and approval

### AI Engine
- Performance prediction algorithms
- Personalized learning recommendations
- Automated alert generation
- Trend analysis and reporting

### Reporting System
- PDF report generation for IB requirements
- Excel export functionality
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
npx prisma migrate deploy
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:

- Create an issue in the repository
- Contact the development team
- Check the documentation in the `/docs` folder

## 🔮 Future Enhancements

- Mobile app integration
- Voice assistant for notifications
- Multilingual support for global schools
- University counseling module
- Advanced analytics dashboard
- Integration with popular LMS platforms

---

**Note**: This is a comprehensive IB Diploma Programme management system designed to streamline administrative tasks and improve student outcomes through AI-powered insights and automation.
