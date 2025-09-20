'use client'

import { useState, useEffect } from 'react'
import { 
  BellIcon, 
  EnvelopeIcon,
  PhoneIcon,
  CheckIcon,
  XMarkIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  AcademicCapIcon
} from '@heroicons/react/24/outline'
import { Notification } from '@/types'
import { formatDateTime } from '@/lib/utils'

// Mock data for demonstration
const mockNotifications: Notification[] = [
  {
    id: '1',
    userId: '1',
    senderId: 'system',
    title: 'Assignment Due Soon',
    message: 'Mathematics HL Internal Assessment is due in 3 days. Please submit your work.',
    type: 'DEADLINE',
    isRead: false,
    data: {
      assignmentId: 'math-ia-1',
      dueDate: '2024-01-25',
      subject: 'Mathematics HL'
    },
    createdAt: new Date('2024-01-20T10:30:00')
  },
  {
    id: '2',
    userId: '1',
    senderId: 'teacher1',
    title: 'CAS Activity Approved',
    message: 'Your Community Garden Project has been approved. Great work!',
    type: 'APPROVAL',
    isRead: false,
    data: {
      activityId: 'cas-1',
      hours: 15,
      category: 'SERVICE'
    },
    createdAt: new Date('2024-01-20T09:15:00')
  },
  {
    id: '3',
    userId: '1',
    senderId: 'system',
    title: 'Grade Posted',
    message: 'Your Physics HL Lab Report 3 grade has been posted. You received 16/20 (B+).',
    type: 'GRADE',
    isRead: true,
    data: {
      assessmentId: 'physics-lab-3',
      grade: 'B+',
      score: 16,
      maxScore: 20
    },
    createdAt: new Date('2024-01-19T14:20:00')
  },
  {
    id: '4',
    userId: '1',
    senderId: 'coordinator1',
    title: 'Important Announcement',
    message: 'Mock exams will be held next week. Please check the schedule in your dashboard.',
    type: 'ANNOUNCEMENT',
    isRead: true,
    data: {
      announcementId: 'mock-exams-2024',
      priority: 'high'
    },
    createdAt: new Date('2024-01-19T08:00:00')
  },
  {
    id: '5',
    userId: '1',
    senderId: 'system',
    title: 'System Maintenance',
    message: 'The platform will be under maintenance on Sunday from 2:00 AM to 4:00 AM.',
    type: 'SYSTEM',
    isRead: false,
    data: {
      maintenanceId: 'maint-2024-01',
      startTime: '2024-01-21T02:00:00',
      endTime: '2024-01-21T04:00:00'
    },
    createdAt: new Date('2024-01-18T16:00:00')
  }
]

const getNotificationIcon = (type: string) => {
  switch (type) {
    case 'DEADLINE':
      return ClockIcon
    case 'APPROVAL':
      return CheckIcon
    case 'GRADE':
      return AcademicCapIcon
    case 'ANNOUNCEMENT':
      return InformationCircleIcon
    case 'SYSTEM':
      return ExclamationTriangleIcon
    default:
      return BellIcon
  }
}

const getNotificationColor = (type: string) => {
  switch (type) {
    case 'DEADLINE':
      return 'text-red-600 bg-red-100'
    case 'APPROVAL':
      return 'text-green-600 bg-green-100'
    case 'GRADE':
      return 'text-blue-600 bg-blue-100'
    case 'ANNOUNCEMENT':
      return 'text-purple-600 bg-purple-100'
    case 'SYSTEM':
      return 'text-yellow-600 bg-yellow-100'
    default:
      return 'text-gray-600 bg-gray-100'
  }
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)
  const [filter, setFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null)

  const filteredNotifications = notifications.filter(notification => {
    const matchesFilter = filter === 'all' || 
      (filter === 'unread' && !notification.isRead) ||
      (filter === 'read' && notification.isRead)
    const matchesType = typeFilter === 'all' || notification.type === typeFilter
    return matchesFilter && matchesType
  })

  const stats = {
    total: notifications.length,
    unread: notifications.filter(n => !n.isRead).length,
    read: notifications.filter(n => n.isRead).length,
    deadlines: notifications.filter(n => n.type === 'DEADLINE').length
  }

  const markAsRead = (notificationId: string) => {
    setNotifications(notifications.map(notification =>
      notification.id === notificationId ? { ...notification, isRead: true } : notification
    ))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, isRead: true })))
  }

  const deleteNotification = (notificationId: string) => {
    setNotifications(notifications.filter(notification => notification.id !== notificationId))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
              <p className="mt-2 text-gray-600">
                Stay updated with important announcements, deadlines, and system alerts
              </p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={markAllAsRead}
                className="btn-secondary"
              >
                Mark All as Read
              </button>
              <button className="btn-primary">
                <BellIcon className="h-5 w-5 mr-2" />
                Settings
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center">
              <BellIcon className="h-8 w-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Notifications</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center">
              <ExclamationTriangleIcon className="h-8 w-8 text-red-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Unread</p>
                <p className="text-2xl font-bold text-gray-900">{stats.unread}</p>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center">
              <CheckIcon className="h-8 w-8 text-green-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Read</p>
                <p className="text-2xl font-bold text-gray-900">{stats.read}</p>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center">
              <ClockIcon className="h-8 w-8 text-yellow-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Deadlines</p>
                <p className="text-2xl font-bold text-gray-900">{stats.deadlines}</p>
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
                <option value="all">All Notifications</option>
                <option value="unread">Unread Only</option>
                <option value="read">Read Only</option>
              </select>
            </div>
            <div className="flex-1">
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="input-field"
              >
                <option value="all">All Types</option>
                <option value="DEADLINE">Deadlines</option>
                <option value="APPROVAL">Approvals</option>
                <option value="GRADE">Grades</option>
                <option value="ANNOUNCEMENT">Announcements</option>
                <option value="SYSTEM">System</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.map((notification) => {
            const NotificationIcon = getNotificationIcon(notification.type)
            
            return (
              <div
                key={notification.id}
                className={`card cursor-pointer hover:shadow-lg transition-shadow duration-200 ${
                  !notification.isRead ? 'border-l-4 border-l-blue-500' : ''
                }`}
                onClick={() => {
                  setSelectedNotification(notification)
                  markAsRead(notification.id)
                }}
              >
                <div className="flex items-start space-x-4">
                  <div className={`p-2 rounded-lg ${getNotificationColor(notification.type)}`}>
                    <NotificationIcon className="h-5 w-5" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {notification.title}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getNotificationColor(notification.type)}`}>
                          {notification.type}
                        </span>
                        {!notification.isRead && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-3">{notification.message}</p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{formatDateTime(notification.createdAt)}</span>
                      <div className="flex space-x-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            markAsRead(notification.id)
                          }}
                          className="text-primary-600 hover:text-primary-800"
                        >
                          {notification.isRead ? 'Mark as Unread' : 'Mark as Read'}
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            deleteNotification(notification.id)
                          }}
                          className="text-red-600 hover:text-red-800"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Notification Detail Modal */}
        {selectedNotification && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    {selectedNotification.title}
                  </h3>
                  <button
                    onClick={() => setSelectedNotification(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getNotificationColor(selectedNotification.type)}`}>
                      {selectedNotification.type}
                    </span>
                    <span className="text-sm text-gray-500">
                      {formatDateTime(selectedNotification.createdAt)}
                    </span>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Message</h4>
                    <p className="text-gray-600">{selectedNotification.message}</p>
                  </div>
                  
                  {selectedNotification.data && Object.keys(selectedNotification.data).length > 0 && (
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Details</h4>
                      <div className="bg-gray-50 p-3 rounded">
                        <pre className="text-sm text-gray-600">
                          {JSON.stringify(selectedNotification.data, null, 2)}
                        </pre>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex space-x-3 pt-4 border-t">
                    <button
                      onClick={() => {
                        markAsRead(selectedNotification.id)
                        setSelectedNotification(null)
                      }}
                      className="btn-primary flex-1"
                    >
                      {selectedNotification.isRead ? 'Mark as Unread' : 'Mark as Read'}
                    </button>
                    <button
                      onClick={() => {
                        deleteNotification(selectedNotification.id)
                        setSelectedNotification(null)
                      }}
                      className="btn-danger flex-1"
                    >
                      Delete
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
