import Link from 'next/link'
import { 
  AcademicCapIcon, 
  UserGroupIcon, 
  ChartBarIcon, 
  CogIcon,
  BookOpenIcon,
  BellIcon,
  DocumentTextIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline'

export default function HomePage() {
  const modules = [
    {
      name: 'Student Tracking',
      description: 'Track and analyze student academic progress across all six IB subjects',
      icon: UserGroupIcon,
      href: '/students',
      color: 'bg-blue-500'
    },
    {
      name: 'CAS Monitoring',
      description: 'Track student CAS hours and projects with approval workflow',
      icon: BookOpenIcon,
      href: '/cas',
      color: 'bg-green-500'
    },
    {
      name: 'Teacher Module',
      description: 'Upload materials, assign coursework, and monitor students',
      icon: AcademicCapIcon,
      href: '/teachers',
      color: 'bg-purple-500'
    },
    {
      name: 'AI Engine',
      description: 'Generate insights, recommendations, and automated alerts',
      icon: ChartBarIcon,
      href: '/ai-insights',
      color: 'bg-orange-500'
    },
    {
      name: 'Notifications',
      description: 'Email and SMS alerts for deadlines and updates',
      icon: BellIcon,
      href: '/notifications',
      color: 'bg-yellow-500'
    },
    {
      name: 'Reporting',
      description: 'Generate reports for IB requirements and progress',
      icon: DocumentTextIcon,
      href: '/reports',
      color: 'bg-red-500'
    },
    {
      name: 'Admin Panel',
      description: 'Manage users, permissions, and system settings',
      icon: ShieldCheckIcon,
      href: '/admin',
      color: 'bg-gray-500'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <AcademicCapIcon className="h-8 w-8 text-primary-600" />
              <h1 className="ml-2 text-2xl font-bold text-gray-900">
                IB Diploma Coordinator Assistant
              </h1>
            </div>
            <div className="flex space-x-4">
              <Link href="/login" className="btn-secondary">
                Login
              </Link>
              <Link href="/register" className="btn-primary">
                Register
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4">
              Streamline Your IB Diploma Programme Management
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-3xl mx-auto">
              An AI-integrated platform that assists coordinators, teachers, and administrators 
              in managing student progress, CAS activities, and academic analytics.
            </p>
            <div className="flex justify-center space-x-4">
              <Link href="/demo" className="bg-white text-primary-600 hover:bg-gray-100 font-medium py-3 px-6 rounded-lg transition-colors duration-200">
                View Demo
              </Link>
              <Link href="/features" className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-medium py-3 px-6 rounded-lg transition-colors duration-200">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Modules Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Core Modules
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive tools designed specifically for IB Diploma Programme management
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module) => (
              <Link
                key={module.name}
                href={module.href}
                className="card hover:shadow-lg transition-shadow duration-200 group"
              >
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-lg ${module.color} text-white`}>
                    <module.icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors duration-200">
                      {module.name}
                    </h4>
                    <p className="text-gray-600 text-sm mt-1">
                      {module.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Our Platform?
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CogIcon className="h-8 w-8 text-primary-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">
                AI-Powered Insights
              </h4>
              <p className="text-gray-600">
                Machine learning algorithms provide personalized recommendations and early warning systems for at-risk students.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ChartBarIcon className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">
                Comprehensive Analytics
              </h4>
              <p className="text-gray-600">
                Detailed performance tracking and reporting tools to monitor student progress across all IB subjects.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BellIcon className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">
                Automated Notifications
              </h4>
              <p className="text-gray-600">
                Smart alerts and reminders for deadlines, assignments, and important IB requirements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-400">
              © 2024 IB Diploma Coordinator Assistant. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
