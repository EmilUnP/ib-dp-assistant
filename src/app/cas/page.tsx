'use client'

import { useState, useEffect } from 'react'
import { 
  BookOpenIcon, 
  PlusIcon, 
  MagnifyingGlassIcon,
  FunnelIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  DocumentIcon,
  PhotoIcon,
  VideoCameraIcon
} from '@heroicons/react/24/outline'
import { CASActivity, CASCategory, CASStatus } from '@/types'
import { formatDate, getCASStatusColor } from '@/lib/utils'

// Mock data for demonstration
const mockActivities: CASActivity[] = [
  {
    id: '1',
    studentId: '1',
    title: 'Community Garden Project',
    category: CASCategory.SERVICE,
    description: 'Volunteered at local community garden, helping with planting and maintenance activities.',
    hours: 15,
    evidence: ['garden_photo1.jpg', 'garden_photo2.jpg', 'volunteer_certificate.pdf'],
    status: CASStatus.APPROVED,
    reviewerId: 'teacher1',
    reviewedAt: new Date('2024-01-15'),
    feedback: 'Excellent work! Great community involvement.',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: '2',
    studentId: '1',
    title: 'School Art Exhibition',
    category: CASCategory.CREATIVITY,
    description: 'Organized and participated in school art exhibition showcasing student artwork.',
    hours: 20,
    evidence: ['exhibition_photos.jpg', 'artwork_samples.jpg'],
    status: CASStatus.PENDING,
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20')
  },
  {
    id: '3',
    studentId: '2',
    title: 'Basketball Training',
    category: CASCategory.ACTIVITY,
    description: 'Regular basketball training sessions and participation in school team.',
    hours: 30,
    evidence: ['training_schedule.pdf', 'team_photo.jpg'],
    status: CASStatus.APPROVED,
    reviewerId: 'teacher2',
    reviewedAt: new Date('2024-01-18'),
    feedback: 'Good commitment to physical activity.',
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-18')
  },
  {
    id: '4',
    studentId: '2',
    title: 'Environmental Cleanup',
    category: CASCategory.SERVICE,
    description: 'Participated in beach cleanup initiative organized by local environmental group.',
    hours: 8,
    evidence: ['cleanup_photos.jpg', 'participation_certificate.pdf'],
    status: CASStatus.REJECTED,
    reviewerId: 'teacher1',
    reviewedAt: new Date('2024-01-22'),
    feedback: 'Please provide more detailed reflection on the experience.',
    createdAt: new Date('2024-01-18'),
    updatedAt: new Date('2024-01-22')
  }
]

const categoryColors = {
  CREATIVITY: 'bg-purple-100 text-purple-800',
  ACTIVITY: 'bg-green-100 text-green-800',
  SERVICE: 'bg-blue-100 text-blue-800'
}

const categoryIcons = {
  CREATIVITY: '🎨',
  ACTIVITY: '⚽',
  SERVICE: '🤝'
}

export default function CASPage() {
  const [activities, setActivities] = useState<CASActivity[]>(mockActivities)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<CASStatus | 'all'>('all')
  const [categoryFilter, setCategoryFilter] = useState<CASCategory | 'all'>('all')
  const [selectedActivity, setSelectedActivity] = useState<CASActivity | null>(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showReviewModal, setShowReviewModal] = useState(false)

  const filteredActivities = activities.filter(activity => {
    const matchesSearch = activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || activity.status === statusFilter
    const matchesCategory = categoryFilter === 'all' || activity.category === categoryFilter
    
    return matchesSearch && matchesStatus && matchesCategory
  })

  const stats = {
    total: activities.length,
    pending: activities.filter(a => a.status === 'PENDING').length,
    approved: activities.filter(a => a.status === 'APPROVED').length,
    rejected: activities.filter(a => a.status === 'REJECTED').length,
    totalHours: activities.filter(a => a.status === 'APPROVED').reduce((sum, a) => sum + a.hours, 0)
  }

  const handleApprove = (activityId: string) => {
    setActivities(activities.map(activity => 
      activity.id === activityId 
        ? { ...activity, status: 'APPROVED' as CASStatus, reviewedAt: new Date() }
        : activity
    ))
  }

  const handleReject = (activityId: string) => {
    setActivities(activities.map(activity => 
      activity.id === activityId 
        ? { ...activity, status: 'REJECTED' as CASStatus, reviewedAt: new Date() }
        : activity
    ))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">CAS Activities</h1>
              <p className="mt-2 text-gray-600">
                Manage Creativity, Activity, and Service activities for students
              </p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="btn-primary flex items-center"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Add Activity
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center">
              <BookOpenIcon className="h-8 w-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Activities</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center">
              <ClockIcon className="h-8 w-8 text-yellow-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending Review</p>
                <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center">
              <CheckCircleIcon className="h-8 w-8 text-green-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Approved</p>
                <p className="text-2xl font-bold text-gray-900">{stats.approved}</p>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center">
              <XCircleIcon className="h-8 w-8 text-red-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Rejected</p>
                <p className="text-2xl font-bold text-gray-900">{stats.rejected}</p>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center">
              <BookOpenIcon className="h-8 w-8 text-purple-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Hours</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalHours}</p>
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
                  placeholder="Search activities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-field pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as CASStatus | 'all')}
                className="input-field"
              >
                <option value="all">All Status</option>
                <option value="PENDING">Pending</option>
                <option value="APPROVED">Approved</option>
                <option value="REJECTED">Rejected</option>
              </select>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value as CASCategory | 'all')}
                className="input-field"
              >
                <option value="all">All Categories</option>
                <option value="CREATIVITY">Creativity</option>
                <option value="ACTIVITY">Activity</option>
                <option value="SERVICE">Service</option>
              </select>
            </div>
          </div>
        </div>

        {/* Activities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredActivities.map((activity) => (
            <div key={activity.id} className="card hover:shadow-lg transition-shadow duration-200">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center">
                  <span className="text-2xl mr-2">
                    {categoryIcons[activity.category]}
                  </span>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${categoryColors[activity.category]}`}>
                    {activity.category}
                  </span>
                </div>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getCASStatusColor(activity.status)}`}>
                  {activity.status}
                </span>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {activity.title}
              </h3>
              
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {activity.description}
              </p>
              
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center text-sm text-gray-500">
                  <ClockIcon className="h-4 w-4 mr-1" />
                  {activity.hours} hours
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <DocumentIcon className="h-4 w-4 mr-1" />
                  {activity.evidence.length} files
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">
                  {formatDate(activity.createdAt)}
                </span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setSelectedActivity(activity)}
                    className="text-primary-600 hover:text-primary-800 text-sm font-medium"
                  >
                    View Details
                  </button>
                  {activity.status === 'PENDING' && (
                    <button
                      onClick={() => setShowReviewModal(true)}
                      className="text-gray-600 hover:text-gray-800 text-sm font-medium"
                    >
                      Review
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Activity Detail Modal */}
        {selectedActivity && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    {selectedActivity.title}
                  </h3>
                  <button
                    onClick={() => setSelectedActivity(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <span className={`px-3 py-1 text-sm font-semibold rounded-full ${categoryColors[selectedActivity.category]}`}>
                      {selectedActivity.category}
                    </span>
                    <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getCASStatusColor(selectedActivity.status)}`}>
                      {selectedActivity.status}
                    </span>
                    <span className="text-sm text-gray-500">
                      {selectedActivity.hours} hours
                    </span>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Description</h4>
                    <p className="text-gray-600">{selectedActivity.description}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Evidence Files</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {selectedActivity.evidence.map((file, index) => (
                        <div key={index} className="flex items-center p-2 bg-gray-50 rounded">
                          <DocumentIcon className="h-4 w-4 text-gray-400 mr-2" />
                          <span className="text-sm text-gray-600 truncate">{file}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {selectedActivity.feedback && (
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Reviewer Feedback</h4>
                      <p className="text-gray-600 bg-gray-50 p-3 rounded">{selectedActivity.feedback}</p>
                    </div>
                  )}
                  
                  {selectedActivity.status === 'PENDING' && (
                    <div className="flex space-x-3 pt-4 border-t">
                      <button
                        onClick={() => {
                          handleApprove(selectedActivity.id)
                          setSelectedActivity(null)
                        }}
                        className="btn-primary flex-1"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => {
                          handleReject(selectedActivity.id)
                          setSelectedActivity(null)
                        }}
                        className="btn-danger flex-1"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
