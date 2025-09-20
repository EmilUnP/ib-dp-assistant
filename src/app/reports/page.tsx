'use client'

import { useState, useEffect } from 'react'
import { 
  DocumentTextIcon, 
  ChartBarIcon, 
  ArrowDownTrayIcon,
  CalendarIcon,
  UserGroupIcon,
  AcademicCapIcon,
  BookOpenIcon,
  ClockIcon,
  PrinterIcon,
  ShareIcon
} from '@heroicons/react/24/outline'
import { formatDate } from '@/lib/utils'

// Mock data for demonstration
const reportTemplates = [
  {
    id: 'student-performance',
    name: 'Student Performance Report',
    description: 'Comprehensive academic performance analysis for individual students',
    category: 'Academic',
    icon: AcademicCapIcon,
    color: 'bg-blue-500',
    lastGenerated: '2024-01-15',
    frequency: 'Monthly'
  },
  {
    id: 'cas-summary',
    name: 'CAS Activities Summary',
    description: 'Summary of all CAS activities and progress tracking',
    category: 'CAS',
    icon: BookOpenIcon,
    color: 'bg-green-500',
    lastGenerated: '2024-01-10',
    frequency: 'Weekly'
  },
  {
    id: 'class-analytics',
    name: 'Class Analytics Report',
    description: 'Performance analytics and trends for entire classes',
    category: 'Analytics',
    icon: ChartBarIcon,
    color: 'bg-purple-500',
    lastGenerated: '2024-01-12',
    frequency: 'Monthly'
  },
  {
    id: 'teacher-activity',
    name: 'Teacher Activity Report',
    description: 'Teaching activities, assignments, and student interactions',
    category: 'Teacher',
    icon: UserGroupIcon,
    color: 'bg-orange-500',
    lastGenerated: '2024-01-08',
    frequency: 'Monthly'
  },
  {
    id: 'deadline-tracker',
    name: 'Deadline Tracker Report',
    description: 'Upcoming deadlines and submission status tracking',
    category: 'Administrative',
    icon: ClockIcon,
    color: 'bg-red-500',
    lastGenerated: '2024-01-20',
    frequency: 'Daily'
  },
  {
    id: 'ib-requirements',
    name: 'IB Requirements Checklist',
    description: 'Compliance checklist for IB Diploma Programme requirements',
    category: 'Compliance',
    icon: DocumentTextIcon,
    color: 'bg-indigo-500',
    lastGenerated: '2024-01-05',
    frequency: 'Quarterly'
  }
]

const recentReports = [
  {
    id: '1',
    name: 'Student Performance Report - January 2024',
    type: 'PDF',
    size: '2.3 MB',
    generatedAt: '2024-01-15T10:30:00',
    generatedBy: 'John Smith',
    status: 'Completed'
  },
  {
    id: '2',
    name: 'CAS Activities Summary - Week 3',
    type: 'Excel',
    size: '1.8 MB',
    generatedAt: '2024-01-10T14:20:00',
    generatedBy: 'Sarah Johnson',
    status: 'Completed'
  },
  {
    id: '3',
    name: 'Class Analytics - Mathematics HL',
    type: 'PDF',
    size: '3.1 MB',
    generatedAt: '2024-01-12T09:15:00',
    generatedBy: 'Michael Brown',
    status: 'Completed'
  },
  {
    id: '4',
    name: 'IB Requirements Checklist - Q1 2024',
    type: 'PDF',
    size: '1.5 MB',
    generatedAt: '2024-01-05T16:45:00',
    generatedBy: 'Admin User',
    status: 'Completed'
  }
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Completed':
      return 'text-green-600 bg-green-100'
    case 'Processing':
      return 'text-yellow-600 bg-yellow-100'
    case 'Failed':
      return 'text-red-600 bg-red-100'
    default:
      return 'text-gray-600 bg-gray-100'
  }
}

export default function ReportsPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [showGenerateModal, setShowGenerateModal] = useState(false)
  const [reportParams, setReportParams] = useState({
    dateRange: 'last-month',
    students: 'all',
    subjects: 'all',
    format: 'PDF'
  })
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerateReport = async () => {
    setIsGenerating(true)
    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(false)
      setShowGenerateModal(false)
      // In a real app, this would trigger the actual report generation
      alert('Report generation started! You will be notified when it\'s ready.')
    }, 2000)
  }

  const handleDownload = (reportId: string) => {
    // In a real app, this would trigger the download
    alert(`Downloading report ${reportId}...`)
  }

  const handleShare = (reportId: string) => {
    // In a real app, this would open a share dialog
    alert(`Sharing report ${reportId}...`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
              <p className="mt-2 text-gray-600">
                Generate comprehensive reports for academic performance, CAS activities, and IB compliance
              </p>
            </div>
            <button
              onClick={() => setShowGenerateModal(true)}
              className="btn-primary flex items-center"
            >
              <DocumentTextIcon className="h-5 w-5 mr-2" />
              Generate Report
            </button>
          </div>
        </div>

        {/* Report Templates */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Report Templates</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reportTemplates.map((template) => (
              <div
                key={template.id}
                className="card hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                onClick={() => {
                  setSelectedTemplate(template.id)
                  setShowGenerateModal(true)
                }}
              >
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-lg ${template.color} text-white`}>
                    <template.icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {template.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">
                      {template.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span className="bg-gray-100 px-2 py-1 rounded">
                        {template.category}
                      </span>
                      <span>Last: {template.lastGenerated}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Reports */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Reports</h2>
          <div className="card">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Report Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Size
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Generated
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
                  {recentReports.map((report) => (
                    <tr key={report.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {report.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            by {report.generatedBy}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {report.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {report.size}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatDate(new Date(report.generatedAt))}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(report.status)}`}>
                          {report.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleDownload(report.id)}
                            className="text-primary-600 hover:text-primary-900"
                            title="Download"
                          >
                            <ArrowDownTrayIcon className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleShare(report.id)}
                            className="text-gray-600 hover:text-gray-900"
                            title="Share"
                          >
                            <ShareIcon className="h-4 w-4" />
                          </button>
                          <button
                            className="text-gray-600 hover:text-gray-900"
                            title="Print"
                          >
                            <PrinterIcon className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="card">
            <div className="flex items-center">
              <DocumentTextIcon className="h-8 w-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Reports</p>
                <p className="text-2xl font-bold text-gray-900">24</p>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center">
              <ChartBarIcon className="h-8 w-8 text-green-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">This Month</p>
                <p className="text-2xl font-bold text-gray-900">8</p>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center">
              <ArrowDownTrayIcon className="h-8 w-8 text-purple-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Downloads</p>
                <p className="text-2xl font-bold text-gray-900">156</p>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center">
              <ClockIcon className="h-8 w-8 text-yellow-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Processing</p>
                <p className="text-2xl font-bold text-gray-900">2</p>
              </div>
            </div>
          </div>
        </div>

        {/* Generate Report Modal */}
        {showGenerateModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Generate Report
                  </h3>
                  <button
                    onClick={() => setShowGenerateModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="label">Report Template</label>
                    <select
                      value={selectedTemplate || ''}
                      onChange={(e) => setSelectedTemplate(e.target.value)}
                      className="input-field"
                    >
                      <option value="">Select a template</option>
                      {reportTemplates.map((template) => (
                        <option key={template.id} value={template.id}>
                          {template.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="label">Date Range</label>
                    <select
                      value={reportParams.dateRange}
                      onChange={(e) => setReportParams({...reportParams, dateRange: e.target.value})}
                      className="input-field"
                    >
                      <option value="last-week">Last Week</option>
                      <option value="last-month">Last Month</option>
                      <option value="last-quarter">Last Quarter</option>
                      <option value="last-year">Last Year</option>
                      <option value="custom">Custom Range</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="label">Students</label>
                    <select
                      value={reportParams.students}
                      onChange={(e) => setReportParams({...reportParams, students: e.target.value})}
                      className="input-field"
                    >
                      <option value="all">All Students</option>
                      <option value="cohort-2024">Cohort 2024-2026</option>
                      <option value="cohort-2025">Cohort 2025-2027</option>
                      <option value="selected">Selected Students</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="label">Format</label>
                    <select
                      value={reportParams.format}
                      onChange={(e) => setReportParams({...reportParams, format: e.target.value})}
                      className="input-field"
                    >
                      <option value="PDF">PDF</option>
                      <option value="Excel">Excel</option>
                      <option value="CSV">CSV</option>
                    </select>
                  </div>
                  
                  <div className="flex space-x-3 pt-4 border-t">
                    <button
                      onClick={handleGenerateReport}
                      disabled={!selectedTemplate || isGenerating}
                      className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isGenerating ? (
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Generating...
                        </div>
                      ) : (
                        'Generate Report'
                      )}
                    </button>
                    <button
                      onClick={() => setShowGenerateModal(false)}
                      className="btn-secondary flex-1"
                    >
                      Cancel
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
