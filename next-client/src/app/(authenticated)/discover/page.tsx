'use client'

import React, { useState, useEffect } from 'react'
import MainLayout from '@/components/MainLayout'
import UserCard from '@/components/UserCard'
import { api } from '@/lib/api'
import { useAuth } from '@clerk/nextjs'
import { Search } from 'lucide-react'
import Loading from '@/components/Loading'

export default function DiscoverPage() {
  const [users, setUsers] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const { getToken } = useAuth()

  const fetchUsers = async (input = '') => {
    try {
      const token = await getToken()
      if (token) {
        const res = await api.post('/user/discover', { input }, {
          headers: { Authorization: `Bearer ${token}` }
        })
        if (res.data.success) {
          setUsers(res.data.users)
        }
      }
    } catch (err) {
      console.error('Error fetching users:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [getToken])

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchUsers(search)
    }, 500)

    return () => clearTimeout(delayDebounceFn)
  }, [search])

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className='mb-8'>
          <h1 className="text-3xl font-bold text-slate-900">Discover People</h1>
          <p className="text-slate-500 mt-1 font-medium">Connect with amazing people and grow your network</p>
        </div>
        
        <div className="relative mb-10 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-indigo-600 transition-colors" />
          <input 
            type="text" 
            placeholder="Search people by name, username, bio, or location..."
            className="w-full bg-white border border-slate-100 rounded-2xl pl-12 pr-4 py-4 shadow-sm focus:ring-4 focus:ring-indigo-50 focus:border-indigo-200 outline-none transition-all text-slate-700 font-medium placeholder:text-slate-400"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {loading ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {users.length > 0 ? (
              users.map((user: any) => (
                <UserCard key={user._id} user={user} />
              ))
            ) : (
              <p className="col-span-full text-center py-10 text-gray-500">No users found.</p>
            )}
          </div>
        )}
      </div>
    </MainLayout>
  )
}
