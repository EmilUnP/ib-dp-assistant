'use client'

import { useState, useEffect } from 'react'
import { 
  AcademicCapIcon, 
  PlusIcon, 
  MagnifyingGlassIcon,
  DocumentIcon,
  ArrowUpTrayIcon,
  UserGroupIcon,
  ChartBarIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline'
import { Assignment, StudentProfile, Assessment, AssessmentType } from '@/types'
import { formatDate, calculateGrade, getGradeColor } from '@/lib/utils'

// Mock data for demonstration
const mockAssignments: Assignment[] = [
  {
    id: '1',
    teacherId: 'teacher1',
    title: 'Mathematics HL - Internal Assessment',
    description: 'Mathematical exploration on calculus applications in real-world problems',
    subject: 'Mathematics HL',
    dueDate: new Date('2024-02-15'),
    maxScore: 20,
    materials: ['ia_guidelines.pdf', 'example_ia.pdf', 'rubric.pdf'],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: '2',
    teacherId: 'teacher1',
    title: 'Physics HL - Lab Report 4',
    description: 'Investigation of wave properties and their applications',
    subject: 'Physics HL',
    dueDate: new Date('2024-02-20'),
    maxScore: 20,
    materials: ['lab_instructions.pdf', 'data_sheet.xlsx'],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20')
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

const mockAssessments: Assessment[] = [
  {
    id: '1',
    studentId: '1',
    subject: 'Mathematics HL',
    type: AssessmentType.INTERNAL,
    title: 'Internal Assessment',
    score: 18,
    maxScore: 20,
    date: new Date('2024-01-15'),
    description: 'Mathematical exploration on calculus applications',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '2',
    studentId: '2',
    subject: 'Mathematics HL',
    type: AssessmentType.INTERNAL,
    title: 'Internal Assessment',
    score: 16,
    maxScore: 20,
    date: new Date('2024-01-15'),
    description: 'Mathematical exploration on calculus applications',
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

export default function TeachersPage() {
  const [assignments, setAssignments] = useState<Assignment[]>(mockAssignments)
  const [students, setStudents] = useState<StudentProfile[]>(mockStudents)
  const [assessments, setAssessments] = useState<Assessment[]>(mockAssessments)
  const [activeTab, setActiveTab] = useState('assignments')
  const [searchTerm, setSearchTerm] = useState('')
  const [showAddAssignment, setShowAddAssignment] = useState(false)
  const [showUploadMaterial, setShowUploadMaterial] = useState(false)

  const filteredAssignments = assignments.filter(assignment =>
    assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    assignment.subject.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredStudents = students.filter(student =>
    student.studentNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.cohort.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStudentPerformance = (studentId: string) => {
    const studentAssessments = assessments.filter(a => a.studentId === studentId)
    if (studentAssessments.length === 0) return { average: 0, grade: 'N/A', trend: 'stable' }
    
    const totalScore = studentAssessments.reduce((sum, a) => sum + a.score, 0)
    const totalMax = studentAssessments.reduce((sum, a) => sum + a.maxScore, 0)
    const average = (totalScore / totalMax) * 100
    const grade = calculateGrade(totalScore, totalMax)
    
    return { average, grade, trend: 'stable' as const }
  }

  const getUpcomingDeadlines = () => {
    const now = new Date()
    const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)
    
    return assignments.filter(assignment => {
      const dueDate = new Date(assignment.dueDate)
      return dueDate >= now && dueDate <= nextWeek
    })
  }

  const getOverdueAssignments = () => {
    const now = new Date()
    return assignments.filter(assignment => new Date(assignment.dueDate) < now)
  }

  const tabs = [
    { id: 'assignments', name: 'Assignments', count: assignments.length },
    { id: 'students', name: 'Students', count: students.length },
    { id: 'materials', name: 'Materials', count: 0 },
    { id: 'analytics', name: 'Analytics', count: 0 }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Teacher Dashboard</h1>
              <p className="mt-2 text-gray-600">
                Manage assignments, monitor students, and upload teaching materials
              </p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowUploadMaterial(true)}
                className="btn-secondary flex items-center"
              >
                <ArrowUpTrayIcon className="h-5 w-5 mr-2" />
                Upload Material
              </button>
              <button
                onClick={() => setShowAddAssignment(true)}
                className="btn-primary flex items-center"
              >
                <PlusIcon className="h-5 w-5 mr-2" />
                Create Assignment
              </button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center">
              <DocumentIcon className="h-8 w-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Assignments</p>
                <p className="text-2xl font-bold text-gray-900">{assignments.length}</p>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center">
              <UserGroupIcon className="h-8 w-8 text-green-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Students</p>
                <p className="text-2xl font-bold text-gray-900">{students.length}</p>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center">
              <ClockIcon className="h-8 w-8 text-yellow-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Upcoming Deadlines</p>
                <p className="text-2xl font-bold text-gray-900">{getUpcomingDeadlines().length}</p>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center">
              <ExclamationTriangleIcon className="h-8 w-8 text-red-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Overdue</p>
                <p className="text-2xl font-bold text-gray-900">{getOverdueAssignments().length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.name}
                {tab.count > 0 && (
                  <span className="ml-2 bg-gray-100 text-gray-900 py-0.5 px-2.5 rounded-full text-xs">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder={`Search ${activeTab}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'assignments' && (
          <div className="space-y-6">
            {filteredAssignments.map((assignment) => (
              <div key={assignment.id} className="card">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {assignment.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{assignment.description}</p>
                    
                    <div className="flex items-center space-x-6 text-sm text-gray-500">
                      <div className="flex items-center">
                        <AcademicCapIcon className="h-4 w-4 mr-1" />
                        {assignment.subject}
                      </div>
                      <div className="flex items-center">
                        <ClockIcon className="h-4 w-4 mr-1" />
                        Due: {formatDate(assignment.dueDate)}
                      </div>
                      <div className="flex items-center">
                        <DocumentIcon className="h-4 w-4 mr-1" />
                        {assignment.materials.length} materials
                      </div>
                      <div className="flex items-center">
                        <ChartBarIcon className="h-4 w-4 mr-1" />
                        Max Score: {assignment.maxScore}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 ml-4">
                    <button className="btn-secondary">Edit</button>
                    <button className="btn-primary">View Submissions</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'students' && (
          <div className="card">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Student
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Performance
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Recent Grade
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredStudents.map((student) => {
                    const performance = getStudentPerformance(student.id)
                    const recentAssessment = assessments
                      .filter(a => a.studentId === student.id)
                      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0]
                    
                    return (
                      <tr key={student.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {student.studentNumber}
                            </div>
                            <div className="text-sm text-gray-500">
                              {student.cohort}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <span className={`text-sm font-medium ${getGradeColor(performance.grade)}`}>
                              {performance.grade}
                            </span>
                            <span className="ml-2 text-sm text-gray-500">
                              ({performance.average.toFixed(1)}%)
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {recentAssessment ? (
                            <div>
                              <span className={getGradeColor(calculateGrade(recentAssessment.score, recentAssessment.maxScore))}>
                                {calculateGrade(recentAssessment.score, recentAssessment.maxScore)}
                              </span>
                              <div className="text-xs text-gray-500">
                                {recentAssessment.title}
                              </div>
                            </div>
                          ) : (
                            'No assessments'
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            performance.average >= 75 
                              ? 'bg-green-100 text-green-800'
                              : performance.average >= 60
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {performance.average >= 75 ? 'Good' : performance.average >= 60 ? 'Average' : 'Needs Help'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="text-primary-600 hover:text-primary-900 mr-3">
                            View Profile
                          </button>
                          <button className="text-gray-600 hover:text-gray-900">
                            Message
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'materials' && (
          <div className="card">
            <div className="text-center py-12">
              <DocumentIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No materials uploaded yet</h3>
              <p className="text-gray-500 mb-4">Upload teaching materials to share with your students</p>
              <button
                onClick={() => setShowUploadMaterial(true)}
                className="btn-primary"
              >
                Upload Material
              </button>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Overview</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Average Grade</span>
                  <span className="text-lg font-semibold text-gray-900">B+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Completion Rate</span>
                  <span className="text-lg font-semibold text-gray-900">87%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">On-time Submissions</span>
                  <span className="text-lg font-semibold text-gray-900">92%</span>
                </div>
              </div>
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-3">
                <div className="flex items-center text-sm">
                  <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-gray-600">5 assignments graded today</span>
                </div>
                <div className="flex items-center text-sm">
                  <ClockIcon className="h-4 w-4 text-yellow-500 mr-2" />
                  <span className="text-gray-600">3 assignments due this week</span>
                </div>
                <div className="flex items-center text-sm">
                  <ExclamationTriangleIcon className="h-4 w-4 text-red-500 mr-2" />
                  <span className="text-gray-600">2 students need attention</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
