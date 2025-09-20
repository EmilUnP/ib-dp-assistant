'use client'

import { useState, useEffect } from 'react'
import { 
  UserGroupIcon, 
  AcademicCapIcon, 
  ClockIcon, 
  ExclamationTriangleIcon,
  ChartBarIcon,
  BookOpenIcon,
  PlusIcon,
  DocumentTextIcon,
  BellIcon,
  ArrowRightIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline'
import { DashboardStats, UserRole } from '@/types'

interface DashboardProps {
  userRole: UserRole
  userName?: string
  userId?: string
  stats?: DashboardStats
}

const mockStats: DashboardStats = {
  totalStudents: 156,
  totalTeachers: 24,
  pendingCASActivities: 12,
  upcomingDeadlines: 8,
  atRiskStudents: 5,
  recentAssessments: 23
}

export default function Dashboard({ userRole, userName, userId, stats = mockStats }: DashboardProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [currentStats, setCurrentStats] = useState(stats)
  const [lastUpdated, setLastUpdated] = useState(new Date())

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  const handleRefreshStats = async () => {
    setIsLoading(true)
    // Simulate API call to refresh stats
    await new Promise(resolve => setTimeout(resolve, 1500))
    setCurrentStats(prev => ({
      ...prev,
      recentAssessments: prev.recentAssessments + Math.floor(Math.random() * 3),
      pendingCASActivities: Math.max(0, prev.pendingCASActivities - Math.floor(Math.random() * 2))
    }))
    setLastUpdated(new Date())
    setIsLoading(false)
  }

  const handleStatCardClick = (cardName: string) => {
    // Navigate to relevant page based on card clicked
    const routes = {
      'Total Students': '/students',
      'Total Teachers': '/teachers',
      'Pending CAS Activities': '/cas',
      'Upcoming Deadlines': '/assessments',
      'At-Risk Students': '/students?filter=at-risk',
      'Recent Assessments': '/assessments'
    }
    
    const route = routes[cardName as keyof typeof routes]
    if (route) {
      window.location.href = route
    }
  }

  const statCards = [
    {
      name: 'Total Students',
      value: currentStats.totalStudents,
      icon: UserGroupIcon,
      color: 'bg-blue-500',
      change: '+12%',
      changeType: 'positive'
    },
    {
      name: 'Total Teachers',
      value: currentStats.totalTeachers,
      icon: AcademicCapIcon,
      color: 'bg-green-500',
      change: '+3%',
      changeType: 'positive'
    },
    {
      name: 'Pending CAS Activities',
      value: currentStats.pendingCASActivities,
      icon: BookOpenIcon,
      color: 'bg-yellow-500',
      change: '-5%',
      changeType: 'negative'
    },
    {
      name: 'Upcoming Deadlines',
      value: currentStats.upcomingDeadlines,
      icon: ClockIcon,
      color: 'bg-orange-500',
      change: '+2',
      changeType: 'neutral'
    },
    {
      name: 'At-Risk Students',
      value: currentStats.atRiskStudents,
      icon: ExclamationTriangleIcon,
      color: 'bg-red-500',
      change: '-1',
      changeType: 'positive'
    },
    {
      name: 'Recent Assessments',
      value: currentStats.recentAssessments,
      icon: ChartBarIcon,
      color: 'bg-purple-500',
      change: '+8',
      changeType: 'positive'
    }
  ]

  const getChangeColor = (changeType: string) => {
    switch (changeType) {
      case 'positive':
        return 'text-green-600'
      case 'negative':
        return 'text-red-600'
      default:
        return 'text-gray-600'
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back{userName ? `, ${userName.split(' ')[0]}` : ''}!
              </h1>
              <p className="mt-2 text-gray-600">
                Here&apos;s what&apos;s happening with your IB Diploma Programme today.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
                  {userRole.charAt(0) + userRole.slice(1).toLowerCase()}
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-success-100 text-success-800">
                  Active Session
                </span>
              </div>
            </div>
            <div className="mt-4 sm:mt-0 flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-500">Last updated</p>
                <p className="text-sm font-medium text-gray-700">
                  {lastUpdated.toLocaleTimeString()}
                </p>
              </div>
              <button
                onClick={handleRefreshStats}
                disabled={isLoading}
                className="btn-secondary flex items-center space-x-2"
                aria-label="Refresh dashboard statistics"
                title="Refresh dashboard statistics"
              >
                <ArrowPathIcon className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">Refresh</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {statCards.map((card) => (
            <button
              key={card.name}
              onClick={() => handleStatCardClick(card.name)}
              className="card hover:shadow-md hover:scale-105 transition-all duration-200 cursor-pointer group focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              aria-label={`View ${card.name} details`}
              title={`Click to view ${card.name} details`}
            >
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${card.color} text-white group-hover:scale-110 transition-transform duration-200`}>
                  <card.icon className="h-6 w-6" />
                </div>
                <div className="ml-4 flex-1 text-left">
                  <p className="text-sm font-medium text-gray-600 group-hover:text-gray-800">{card.name}</p>
                  <p className="text-2xl font-bold text-gray-900 group-hover:text-primary-600">{card.value}</p>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-medium ${getChangeColor(card.changeType)}`}>
                    {card.change}
                  </p>
                  <p className="text-xs text-gray-500">vs last month</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Quick Actions
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <button 
                className="flex items-center justify-center p-4 bg-primary-50 hover:bg-primary-100 rounded-lg transition-colors duration-200 group focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                aria-label="Add new CAS activity"
                title="Add new CAS activity"
              >
                <PlusIcon className="h-6 w-6 text-primary-600 mr-2" />
                <span className="text-primary-700 font-medium text-sm sm:text-base">Add CAS Activity</span>
              </button>
              <button 
                className="flex items-center justify-center p-4 bg-success-50 hover:bg-success-100 rounded-lg transition-colors duration-200 group focus:outline-none focus:ring-2 focus:ring-success-500 focus:ring-offset-2"
                aria-label="Create new assessment"
                title="Create new assessment"
              >
                <DocumentTextIcon className="h-6 w-6 text-success-600 mr-2" />
                <span className="text-success-700 font-medium text-sm sm:text-base">Create Assessment</span>
              </button>
              <button 
                className="flex items-center justify-center p-4 bg-warning-50 hover:bg-warning-100 rounded-lg transition-colors duration-200 group focus:outline-none focus:ring-2 focus:ring-warning-500 focus:ring-offset-2"
                aria-label="Send notification"
                title="Send notification"
              >
                <BellIcon className="h-6 w-6 text-warning-600 mr-2" />
                <span className="text-warning-700 font-medium text-sm sm:text-base">Send Notification</span>
              </button>
              <button 
                className="flex items-center justify-center p-4 bg-secondary-50 hover:bg-secondary-100 rounded-lg transition-colors duration-200 group focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:ring-offset-2"
                aria-label="View reports"
                title="View reports"
              >
                <ChartBarIcon className="h-6 w-6 text-secondary-600 mr-2" />
                <span className="text-secondary-700 font-medium text-sm sm:text-base">View Reports</span>
                <ArrowRightIcon className="h-4 w-4 text-secondary-500 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Recent Activity
            </h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">
                    Sarah Johnson submitted CAS activity: &quot;Community Garden Project&quot;
                  </p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">
                    New assessment uploaded: Mathematics HL - Internal Assessment
                  </p>
                  <p className="text-xs text-gray-500">4 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">
                    Deadline reminder: Extended Essay due in 3 days
                  </p>
                  <p className="text-xs text-gray-500">6 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">
                    Alert: Michael Chen at risk of not meeting CAS requirements
                  </p>
                  <p className="text-xs text-gray-500">1 day ago</p>
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming Deadlines */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Upcoming Deadlines
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-red-900">
                    Extended Essay Submission
                  </p>
                  <p className="text-xs text-red-600">Due in 2 days</p>
                </div>
                <span className="text-xs bg-red-200 text-red-800 px-2 py-1 rounded-full">
                  Urgent
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-yellow-900">
                    TOK Essay Draft
                  </p>
                  <p className="text-xs text-yellow-600">Due in 5 days</p>
                </div>
                <span className="text-xs bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full">
                  Important
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-blue-900">
                    CAS Reflection Report
                  </p>
                  <p className="text-xs text-blue-600">Due in 1 week</p>
                </div>
                <span className="text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded-full">
                  Normal
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Mock Exams
                  </p>
                  <p className="text-xs text-gray-600">Due in 2 weeks</p>
                </div>
                <span className="text-xs bg-gray-200 text-gray-800 px-2 py-1 rounded-full">
                  Scheduled
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* AI Insights Section */}
        <div className="mt-8">
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              AI Insights & Recommendations
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">
                  Performance Trend Analysis
                </h4>
                <p className="text-sm text-blue-700 mb-3">
                  Overall student performance has improved by 8% this semester. 
                  Mathematics and Sciences show the strongest improvement.
                </p>
                <button className="text-xs text-blue-600 hover:text-blue-800 font-medium">
                  View detailed analysis →
                </button>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-medium text-green-900 mb-2">
                  CAS Activity Suggestions
                </h4>
                <p className="text-sm text-green-700 mb-3">
                  12 students are close to meeting their CAS requirements. 
                  Consider suggesting additional service activities.
                </p>
                <button className="text-xs text-green-600 hover:text-green-800 font-medium">
                  View suggestions →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
