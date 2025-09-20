'use client'

import { useState, useEffect } from 'react'
import { 
  UserGroupIcon, 
  PlusIcon, 
  MagnifyingGlassIcon,
  FunnelIcon,
  ChartBarIcon,
  AcademicCapIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline'
import { StudentProfile, Assessment, UserRole, AssessmentType } from '@/types'
import { formatDate, calculateGrade, getGradeColor } from '@/lib/utils'

// Mock data for demonstration
const mockStudents: StudentProfile[] = [
  {
    id: '1',
    userId: '1',
    studentNumber: 'IB2024001',
    cohort: '2024-2026',
    subjects: ['Mathematics HL', 'Physics HL', 'Chemistry HL', 'English A HL', 'History HL', 'Spanish B SL'],
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
    subjects: ['Mathematics SL', 'Biology HL', 'Chemistry HL', 'English A HL', 'Economics HL', 'French B SL'],
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
    studentId: '1',
    subject: 'Physics HL',
    type: AssessmentType.INTERNAL,
    title: 'Lab Report 3',
    score: 16,
    maxScore: 20,
    date: new Date('2024-01-20'),
    description: 'Investigation of wave properties',
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

export default function StudentsPage() {
  const [students, setStudents] = useState<StudentProfile[]>(mockStudents)
  const [assessments, setAssessments] = useState<Assessment[]>(mockAssessments)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStudent, setSelectedStudent] = useState<StudentProfile | null>(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [filter, setFilter] = useState('all')

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.studentNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.cohort.toLowerCase().includes(searchTerm.toLowerCase())
    
    if (filter === 'at-risk') {
      return matchesSearch && student.casHours < 100
    }
    
    return matchesSearch
  })

  const getStudentPerformance = (studentId: string) => {
    const studentAssessments = assessments.filter(a => a.studentId === studentId)
    if (studentAssessments.length === 0) return { average: 0, grade: 'N/A', trend: 'stable' }
    
    const totalScore = studentAssessments.reduce((sum, a) => sum + a.score, 0)
    const totalMax = studentAssessments.reduce((sum, a) => sum + a.maxScore, 0)
    const average = (totalScore / totalMax) * 100
    const grade = calculateGrade(totalScore, totalMax)
    
    return { average, grade, trend: 'stable' as const }
  }

  const getRiskLevel = (student: StudentProfile) => {
    const performance = getStudentPerformance(student.id)
    const casProgress = (student.casHours / student.casGoal) * 100
    
    if (performance.average < 60 || casProgress < 50) return 'high'
    if (performance.average < 75 || casProgress < 75) return 'medium'
    return 'low'
  }

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'high': return 'text-red-600 bg-red-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      default: return 'text-green-600 bg-green-100'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Student Management</h1>
              <p className="mt-2 text-gray-600">
                Track and monitor student academic progress and CAS activities
              </p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="btn-primary flex items-center"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Add Student
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center">
              <UserGroupIcon className="h-8 w-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Students</p>
                <p className="text-2xl font-bold text-gray-900">{students.length}</p>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center">
              <ChartBarIcon className="h-8 w-8 text-green-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Average Performance</p>
                <p className="text-2xl font-bold text-gray-900">78%</p>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center">
              <ExclamationTriangleIcon className="h-8 w-8 text-yellow-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">At-Risk Students</p>
                <p className="text-2xl font-bold text-gray-900">
                  {students.filter(s => getRiskLevel(s) === 'high').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center">
              <AcademicCapIcon className="h-8 w-8 text-purple-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Recent Assessments</p>
                <p className="text-2xl font-bold text-gray-900">{assessments.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="card mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search students by number or cohort..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-field pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="input-field"
              >
                <option value="all">All Students</option>
                <option value="at-risk">At-Risk Students</option>
                <option value="high-performers">High Performers</option>
              </select>
              <button className="btn-secondary flex items-center">
                <FunnelIcon className="h-4 w-4 mr-2" />
                Filter
              </button>
            </div>
          </div>
        </div>

        {/* Students Table */}
        <div className="card">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cohort
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Performance
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    CAS Progress
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Risk Level
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredStudents.map((student) => {
                  const performance = getStudentPerformance(student.id)
                  const riskLevel = getRiskLevel(student)
                  const casProgress = (student.casHours / student.casGoal) * 100
                  
                  return (
                    <tr key={student.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {student.studentNumber}
                          </div>
                          <div className="text-sm text-gray-500">
                            {student.subjects.length} subjects
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {student.cohort}
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
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${Math.min(casProgress, 100)}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-600">
                            {student.casHours}/{student.casGoal}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRiskColor(riskLevel)}`}>
                          {riskLevel.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => setSelectedStudent(student)}
                          className="text-primary-600 hover:text-primary-900 mr-3"
                        >
                          View Details
                        </button>
                        <button className="text-gray-600 hover:text-gray-900">
                          Edit
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Student Detail Modal */}
        {selectedStudent && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Student Details - {selectedStudent.studentNumber}
                  </h3>
                  <button
                    onClick={() => setSelectedStudent(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Subjects</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedStudent.subjects.map((subject, index) => (
                        <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                          {subject}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">CAS Progress</h4>
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${Math.min((selectedStudent.casHours / selectedStudent.casGoal) * 100, 100)}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">
                        {selectedStudent.casHours}/{selectedStudent.casGoal} hours
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Recent Assessments</h4>
                    <div className="space-y-2">
                      {assessments
                        .filter(a => a.studentId === selectedStudent.id)
                        .slice(0, 3)
                        .map((assessment) => (
                          <div key={assessment.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                            <div>
                              <span className="text-sm font-medium">{assessment.subject}</span>
                              <span className="text-xs text-gray-500 ml-2">{assessment.title}</span>
                            </div>
                            <span className={`text-sm font-medium ${getGradeColor(calculateGrade(assessment.score, assessment.maxScore))}`}>
                              {calculateGrade(assessment.score, assessment.maxScore)}
                            </span>
                          </div>
                        ))}
                    </div>
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
