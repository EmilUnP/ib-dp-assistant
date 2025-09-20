'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSession } from 'next-auth/react'
// Disable SSR for this component to prevent useSession issues during build
export const dynamic = 'force-dynamic'
import Navigation from '@/components/Navigation'
import Dashboard from '@/components/Dashboard'
import { UserRole } from '@/types'
import { 
  ExclamationTriangleIcon,
  ArrowPathIcon,
  CheckCircleIcon 
} from '@heroicons/react/24/outline'

interface UserData {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
}

export default function DashboardPage() {
  // Safely handle useSession to prevent build errors
  let session = null
  let status = 'loading'
  
  try {
    const sessionResult = useSession()
    session = sessionResult?.data || null
    status = sessionResult?.status || 'loading'
  } catch (error) {
    console.warn('useSession not available during build:', error)
    session = null
    status = 'loading'
  }
  const [userData, setUserData] = useState<UserData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [retryCount, setRetryCount] = useState(0)

  // Mock user data fetching with error handling
  const fetchUserData = useCallback(async (retry = 0): Promise<void> => {
    try {
      setIsLoading(true)
      setError(null)
      
      // Simulate API call with potential failure
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate occasional failures for retry demonstration
          if (Math.random() < 0.1 && retry < 2) {
            reject(new Error('Network error'))
          } else {
            resolve(true)
          }
        }, 1000 + retry * 500) // Longer delay on retries
      })

      // Mock user data - in real app, this would come from your API
      const mockUserData: UserData = {
        id: '1',
        name: session?.user?.name || 'John Doe',
        email: session?.user?.email || 'john.doe@school.edu',
        role: UserRole.COORDINATOR, // Mock role - in real app, get from user profile
        avatar: session?.user?.image || undefined
      }

      setUserData(mockUserData)
      setIsLoading(false)
    } catch (err) {
      console.error('Failed to fetch user data:', err)
      setError(err instanceof Error ? err.message : 'Failed to load user data')
      setIsLoading(false)
      
      // Auto-retry up to 2 times
      if (retry < 2) {
        setTimeout(() => {
          setRetryCount(prev => prev + 1)
          fetchUserData(retry + 1)
        }, 2000)
      }
    }
  }, [session?.user?.email, session?.user?.image, session?.user?.name])

  useEffect(() => {
    if (status !== 'loading' && status !== 'unauthenticated') {
      fetchUserData()
    }
  }, [status, fetchUserData])

  const handleRetry = () => {
    setRetryCount(0)
    fetchUserData()
  }

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center" role="status" aria-live="polite">
        <div className="text-center">
          <div className="relative" aria-hidden="true">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <div className="absolute inset-0 rounded-full border-2 border-gray-200"></div>
          </div>
          <p className="mt-4 text-gray-600">
            {status === 'loading' ? 'Authenticating...' : 'Loading dashboard...'}
          </p>
          {retryCount > 0 && (
            <p className="mt-2 text-sm text-gray-500">
              Retry attempt {retryCount}/2
            </p>
          )}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center" role="alert">
        <div className="text-center max-w-md mx-auto">
          <div className="mb-6" aria-hidden="true">
            <ExclamationTriangleIcon className="h-16 w-16 text-danger-500 mx-auto" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Unable to Load Dashboard
          </h2>
          <p className="text-gray-600 mb-6">
            {error}
          </p>
          <div className="space-y-3">
            <button
              onClick={handleRetry}
              className="btn-primary flex items-center justify-center mx-auto"
              aria-label="Retry loading dashboard"
            >
              <ArrowPathIcon className="h-4 w-4 mr-2" />
              Try Again
            </button>
            <p className="text-sm text-gray-500">
              If the problem persists, please contact support.
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <CheckCircleIcon className="h-16 w-16 text-success-500 mx-auto mb-4" aria-hidden="true" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            No User Data Available
          </h2>
          <p className="text-gray-600">
            Please log in to access your dashboard.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation 
        userRole={userData.role} 
        userName={userData.name}
        userEmail={userData.email}
        userAvatar={userData.avatar}
      />
      <main role="main" aria-label="Dashboard main content">
        <Dashboard 
          userRole={userData.role} 
          userName={userData.name}
          userId={userData.id}
        />
      </main>
    </div>
  )
}
