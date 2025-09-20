'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { 
  AcademicCapIcon,
  UserGroupIcon,
  BookOpenIcon,
  ChartBarIcon,
  BellIcon,
  DocumentTextIcon,
  ShieldCheckIcon,
  Bars3Icon,
  XMarkIcon,
  UserCircleIcon
} from '@heroicons/react/24/outline'
import { UserRole } from '@/types'

interface NavigationProps {
  userRole?: UserRole
  userName?: string
  userEmail?: string
  userAvatar?: string
}

const navigationItems = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: ChartBarIcon,
    roles: [UserRole.STUDENT, UserRole.TEACHER, UserRole.COORDINATOR, UserRole.ADMIN]
  },
  {
    name: 'Students',
    href: '/students',
    icon: UserGroupIcon,
    roles: [UserRole.TEACHER, UserRole.COORDINATOR, UserRole.ADMIN]
  },
  {
    name: 'CAS Activities',
    href: '/cas',
    icon: BookOpenIcon,
    roles: [UserRole.STUDENT, UserRole.TEACHER, UserRole.COORDINATOR, UserRole.ADMIN]
  },
  {
    name: 'Assessments',
    href: '/assessments',
    icon: AcademicCapIcon,
    roles: [UserRole.STUDENT, UserRole.TEACHER, UserRole.COORDINATOR, UserRole.ADMIN]
  },
  {
    name: 'AI Insights',
    href: '/ai-insights',
    icon: ChartBarIcon,
    roles: [UserRole.STUDENT, UserRole.TEACHER, UserRole.COORDINATOR, UserRole.ADMIN]
  },
  {
    name: 'Notifications',
    href: '/notifications',
    icon: BellIcon,
    roles: [UserRole.STUDENT, UserRole.TEACHER, UserRole.COORDINATOR, UserRole.ADMIN]
  },
  {
    name: 'Reports',
    href: '/reports',
    icon: DocumentTextIcon,
    roles: [UserRole.TEACHER, UserRole.COORDINATOR, UserRole.ADMIN]
  },
  {
    name: 'Admin',
    href: '/admin',
    icon: ShieldCheckIcon,
    roles: [UserRole.ADMIN]
  }
]

export default function Navigation({ userRole, userName, userEmail, userAvatar }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const filteredItems = navigationItems.filter(item => 
    !userRole || item.roles.includes(userRole)
  )

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and main nav */}
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center">
                <AcademicCapIcon className="h-8 w-8 text-primary-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">
                  IB Assistant
                </span>
              </Link>
            </div>
            
            {/* Desktop navigation */}
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {filteredItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200 ${
                      isActive
                        ? 'border-primary-500 text-gray-900'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    }`}
                  >
                    <item.icon className="h-4 w-4 mr-2" />
                    {item.name}
                  </Link>
                )
              })}
            </div>
          </div>

          {/* User menu */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <div className="flex items-center space-x-4">
              {userName ? (
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    {userAvatar ? (
                      <Image
                        src={userAvatar}
                        alt={userName}
                        width={32}
                        height={32}
                        className="h-8 w-8 rounded-full object-cover"
                      />
                    ) : (
                      <UserCircleIcon className="h-8 w-8 text-gray-400" />
                    )}
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-700">{userName}</span>
                      {userEmail && (
                        <span className="text-xs text-gray-500">{userEmail}</span>
                      )}
                    </div>
                  </div>
                  <Link
                    href="/profile"
                    className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Profile
                  </Link>
                  <Link
                    href="/api/auth/signout"
                    className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Logout
                  </Link>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link
                    href="/login"
                    className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="btn-primary"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="sm:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
            >
              {isOpen ? (
                <XMarkIcon className="block h-6 w-6" />
              ) : (
                <Bars3Icon className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {filteredItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-colors duration-200 ${
                    isActive
                      ? 'bg-primary-50 border-primary-500 text-primary-700'
                      : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex items-center">
                    <item.icon className="h-5 w-5 mr-3" />
                    {item.name}
                  </div>
                </Link>
              )
            })}
          </div>
          
          {/* Mobile user menu */}
          <div className="pt-4 pb-3 border-t border-gray-200">
            {userName ? (
              <>
                <div className="flex items-center px-4">
                  <div className="flex-shrink-0">
                    {userAvatar ? (
                      <Image
                        src={userAvatar}
                        alt={userName}
                        width={40}
                        height={40}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    ) : (
                      <UserCircleIcon className="h-10 w-10 text-gray-400" />
                    )}
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800">{userName}</div>
                    {userEmail && (
                      <div className="text-sm text-gray-500">{userEmail}</div>
                    )}
                  </div>
                </div>
                <div className="mt-3 space-y-1">
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                    onClick={() => setIsOpen(false)}
                  >
                    Profile
                  </Link>
                  <Link
                    href="/api/auth/signout"
                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                    onClick={() => setIsOpen(false)}
                  >
                    Logout
                  </Link>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center px-4">
                  <UserCircleIcon className="h-10 w-10 text-gray-400" />
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800">Guest User</div>
                  </div>
                </div>
                <div className="mt-3 space-y-1">
                  <Link
                    href="/login"
                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                    onClick={() => setIsOpen(false)}
                  >
                    Register
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
