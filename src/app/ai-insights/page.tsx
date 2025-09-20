'use client'

import { useState, useEffect } from 'react'
import { 
  ChartBarIcon, 
  LightBulbIcon, 
  ExclamationTriangleIcon,
  AcademicCapIcon,
  UserGroupIcon,
  ClockIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  MinusIcon
} from '@heroicons/react/24/outline'
import { AIInsight, StudentProfile, Assessment } from '@/types'
import { formatDate } from '@/lib/utils'

// Mock data for demonstration
const mockInsights: AIInsight[] = [
  {
    id: '1',
    studentId: '1',
    type: 'RISK_ASSESSMENT',
    title: 'Academic Performance Alert',
    description: 'Student shows declining performance in Mathematics HL. Current average is 65%, down from 78% last semester.',
    priority: 'HIGH',
    data: {
      subject: 'Mathematics HL',
      currentAverage: 65,
      previousAverage: 78,
      trend: 'declining',
      recommendations: ['Schedule extra tutoring', 'Review study methods', 'Meet with subject teacher']
    },
    isRead: false,
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20')
  },
  {
    id: '2',
    studentId: '2',
    type: 'RECOMMENDATION',
    title: 'CAS Activity Suggestion',
    description: 'Student needs more Service activities. Currently has 45 hours in Service, 60 in Activity, and 30 in Creativity.',
    priority: 'MEDIUM',
    data: {
      category: 'SERVICE',
      currentHours: 45,
      recommendedHours: 60,
      suggestions: ['Volunteer at local food bank', 'Organize community cleanup', 'Tutor younger students']
    },
    isRead: false,
    createdAt: new Date('2024-01-19'),
    updatedAt: new Date('2024-01-19')
  },
  {
    id: '3',
    studentId: '1',
    type: 'ALERT',
    title: 'Upcoming Deadline Warning',
    description: 'Extended Essay draft is due in 5 days. Student has not submitted any work yet.',
    priority: 'HIGH',
    data: {
      assignment: 'Extended Essay',
      dueDate: '2024-01-25',
      daysRemaining: 5,
      progress: 0
    },
    isRead: true,
    createdAt: new Date('2024-01-18'),
    updatedAt: new Date('2024-01-18')
  },
  {
    id: '4',
    studentId: '2',
    type: 'RECOMMENDATION',
    title: 'Study Strategy Optimization',
    description: 'Based on performance patterns, student performs better with visual learning materials and group study sessions.',
    priority: 'LOW',
    data: {
      learningStyle: 'Visual',
      recommendations: ['Use mind maps', 'Create visual summaries', 'Join study groups'],
      effectiveness: 0.85
    },
    isRead: true,
    createdAt: new Date('2024-01-17'),
    updatedAt: new Date('2024-01-17')
  }
]

const mockStudents: StudentProfile[] = [
  {
    id: '1',
    userId: '1',
    studentNumber: 'IB2024001',
    cohort: '2024-2026',
    subjects: ['Mathematics HL', 'Physics HL', 'Chemistry HL'],
    casHours: 120,
    casGoal: 150,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '2',
    userId: '2',
    studentNumber: 'IB2024002',
    cohort: '2024-2026',
    subjects: ['Mathematics HL', 'Biology HL', 'Chemistry HL'],
    casHours: 95,
    casGoal: 150,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'HIGH':
      return 'text-red-600 bg-red-100'
    case 'MEDIUM':
      return 'text-yellow-600 bg-yellow-100'
    case 'LOW':
      return 'text-green-600 bg-green-100'
    default:
      return 'text-gray-600 bg-gray-100'
  }
}

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'RISK_ASSESSMENT':
      return ExclamationTriangleIcon
    case 'RECOMMENDATION':
      return LightBulbIcon
    case 'ALERT':
      return ClockIcon
    default:
      return ChartBarIcon
  }
}

const getTrendIcon = (trend: string) => {
  switch (trend) {
    case 'improving':
      return ArrowUpIcon
    case 'declining':
      return ArrowDownIcon
    default:
      return MinusIcon
  }
}

export default function AIInsightsPage() {
  const [insights, setInsights] = useState<AIInsight[]>(mockInsights)
  const [students, setStudents] = useState<StudentProfile[]>(mockStudents)
  const [filter, setFilter] = useState('all')
  const [priorityFilter, setPriorityFilter] = useState('all')
  const [selectedInsight, setSelectedInsight] = useState<AIInsight | null>(null)

  const filteredInsights = insights.filter(insight => {
    const matchesType = filter === 'all' || insight.type === filter
    const matchesPriority = priorityFilter === 'all' || insight.priority === priorityFilter
    return matchesType && matchesPriority
  })

  const stats = {
    total: insights.length,
    unread: insights.filter(i => !i.isRead).length,
    highPriority: insights.filter(i => i.priority === 'HIGH').length,
    recommendations: insights.filter(i => i.type === 'RECOMMENDATION').length
  }

  const markAsRead = (insightId: string) => {
    setInsights(insights.map(insight =>
      insight.id === insightId ? { ...insight, isRead: true } : insight
    ))
  }

  const getStudentName = (studentId: string) => {
    const student = students.find(s => s.id === studentId)
    return student ? student.studentNumber : 'Unknown Student'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">AI Insights & Analytics</h1>
              <p className="mt-2 text-gray-600">
                AI-powered recommendations and performance insights for students and teachers
              </p>
            </div>
            <button className="btn-primary flex items-center">
              <ChartBarIcon className="h-5 w-5 mr-2" />
              Generate Report
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center">
              <ChartBarIcon className="h-8 w-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Insights</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center">
              <ExclamationTriangleIcon className="h-8 w-8 text-red-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">High Priority</p>
                <p className="text-2xl font-bold text-gray-900">{stats.highPriority}</p>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center">
              <LightBulbIcon className="h-8 w-8 text-yellow-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Recommendations</p>
                <p className="text-2xl font-bold text-gray-900">{stats.recommendations}</p>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center">
              <ClockIcon className="h-8 w-8 text-green-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Unread</p>
                <p className="text-2xl font-bold text-gray-900">{stats.unread}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="card mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="input-field"
              >
                <option value="all">All Types</option>
                <option value="RISK_ASSESSMENT">Risk Assessments</option>
                <option value="RECOMMENDATION">Recommendations</option>
                <option value="ALERT">Alerts</option>
              </select>
            </div>
            <div className="flex-1">
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="input-field"
              >
                <option value="all">All Priorities</option>
                <option value="HIGH">High Priority</option>
                <option value="MEDIUM">Medium Priority</option>
                <option value="LOW">Low Priority</option>
              </select>
            </div>
          </div>
        </div>

        {/* Insights List */}
        <div className="space-y-4">
          {filteredInsights.map((insight) => {
            const TypeIcon = getTypeIcon(insight.type)
            const TrendIcon = getTrendIcon(insight.data.trend || 'stable')
            
            return (
              <div
                key={insight.id}
                className={`card cursor-pointer hover:shadow-lg transition-shadow duration-200 ${
                  !insight.isRead ? 'border-l-4 border-l-blue-500' : ''
                }`}
                onClick={() => {
                  setSelectedInsight(insight)
                  markAsRead(insight.id)
                }}
              >
                <div className="flex items-start space-x-4">
                  <div className={`p-2 rounded-lg ${getPriorityColor(insight.priority)}`}>
                    <TypeIcon className="h-5 w-5" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {insight.title}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(insight.priority)}`}>
                          {insight.priority}
                        </span>
                        {!insight.isRead && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-3">{insight.description}</p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-4">
                        <span>Student: {getStudentName(insight.studentId)}</span>
                        <span>•</span>
                        <span>{formatDate(insight.createdAt)}</span>
                        {insight.data.trend && (
                          <>
                            <span>•</span>
                            <div className="flex items-center">
                              <TrendIcon className="h-4 w-4 mr-1" />
                              <span className="capitalize">{insight.data.trend}</span>
                            </div>
                          </>
                        )}
                      </div>
                      <span className="text-primary-600 hover:text-primary-800">
                        View Details →
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Insight Detail Modal */}
        {selectedInsight && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    {selectedInsight.title}
                  </h3>
                  <button
                    onClick={() => setSelectedInsight(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getPriorityColor(selectedInsight.priority)}`}>
                      {selectedInsight.priority} PRIORITY
                    </span>
                    <span className="text-sm text-gray-500">
                      Student: {getStudentName(selectedInsight.studentId)}
                    </span>
                    <span className="text-sm text-gray-500">
                      {formatDate(selectedInsight.createdAt)}
                    </span>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Description</h4>
                    <p className="text-gray-600">{selectedInsight.description}</p>
                  </div>
                  
                  {selectedInsight.data.recommendations && (
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Recommendations</h4>
                      <ul className="list-disc list-inside space-y-1">
                        {selectedInsight.data.recommendations.map((rec: string, index: number) => (
                          <li key={index} className="text-gray-600">{rec}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {selectedInsight.data.suggestions && (
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Suggested Actions</h4>
                      <ul className="list-disc list-inside space-y-1">
                        {selectedInsight.data.suggestions.map((suggestion: string, index: number) => (
                          <li key={index} className="text-gray-600">{suggestion}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  <div className="flex space-x-3 pt-4 border-t">
                    <button className="btn-primary flex-1">
                      Take Action
                    </button>
                    <button className="btn-secondary flex-1">
                      Dismiss
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
