'use client'

import React, { useState, useEffect } from 'react'
import Sidebar from './Sidebar'
import { Menu, X } from 'lucide-react'
import Loading from './Loading'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { fetchUser } from '@/store/slices/userSlice'
import { fetchConnections } from '@/store/slices/connectionsSlice'
import { useAuth, useUser } from '@clerk/nextjs'

export default function MainLayout({
  children
}: {
  children: React.ReactNode
}) {
  const { user: clerkUser, isLoaded } = useUser()
  const { getToken } = useAuth()
  const dispatch = useAppDispatch()
  
  const [fetchError, setFetchError] = useState(false)
  const [loadingUser, setLoadingUser] = useState(true)
  const user = useAppSelector((state) => state.user.value)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      if (clerkUser) {
        try {
          const token = await getToken()
          if (token) {
            await dispatch(fetchUser(token)).unwrap()
            await dispatch(fetchConnections(token)).unwrap()
          }
        } catch (err) {
          console.error('Error fetching user data:', err)
          setFetchError(true)
        } finally {
          setLoadingUser(false)
        }
      } else {
        setLoadingUser(false)
      }
    }
    if (isLoaded) {
      fetchData()
    }
  }, [clerkUser, isLoaded, getToken, dispatch])

  // Stop loading if Clerk is loaded AND either user data is fetched OR a fetch error occurred
  if (!isLoaded || loadingUser) {
    return <Loading />
  }

  return (
    <div className='w-full flex h-screen overflow-hidden'>
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className='flex-1 bg-slate-50 overflow-y-auto relative no-scrollbar'>
        {children}
      </div>

      {sidebarOpen ? (
        <X 
          className='absolute top-3 right-3 p-2 z-[100] bg-white rounded-md shadow w-10 h-10 text-gray-600 md:hidden cursor-pointer' 
          onClick={() => setSidebarOpen(false)} 
        />
      ) : (
        <Menu 
          className='absolute top-3 right-3 p-2 z-[100] bg-white rounded-md shadow w-10 h-10 text-gray-600 md:hidden cursor-pointer' 
          onClick={() => setSidebarOpen(true)} 
        />
      )}
    </div>
  )
}
