'use client'

import React, { useState, useEffect } from 'react'
import MainLayout from '@/components/MainLayout'
import NuoraUserCard from '@/components/NuoraUserCard'
import { api } from '@/lib/api'
import { useAuth } from '@clerk/nextjs'
import Loading from '@/components/Loading'

export default function ConnectionsPage() {
  const [activeTab, setActiveTab] = useState<'connections' | 'requests'>('connections')
  const [connections, setConnections] = useState([])
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const { getToken } = useAuth()

  const fetchConnections = async () => {
    try {
      const token = await getToken()
      if (token) {
        const res = await api.get('/user/connections', { headers: { Authorization: `Bearer ${token}` } })
        if (res.data.success) {
          setConnections(res.data.connections)
          setRequests(res.data.pendingConnections)
        }
      }
    } catch (err) {
      console.error('Error fetching connections:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchConnections()
  }, [getToken])

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className='mb-8'>
          <h1 className="text-3xl font-bold text-slate-900">Connections</h1>
          <p className="text-slate-500 mt-1 font-medium">Manage your network and discover new connections</p>
        </div>

        {/* Quick Stats Cards */}
        <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10'>
          {[
            { label: 'Followers', value: 0 },
            { label: 'Following', value: 0 },
            { label: 'Pending', value: requests.length },
            { label: 'Connections', value: connections.length },
          ].map((stat, i) => (
            <div key={i} className='bg-white p-6 rounded-2xl border border-slate-100 shadow-sm text-center'>
              <p className='text-3xl font-bold text-slate-900'>{stat.value}</p>
              <p className='text-sm text-slate-500 font-medium mt-1'>{stat.label}</p>
            </div>
          ))}
        </div>
        
        {/* Tabs */}
        <div className="flex items-center gap-2 p-1 bg-white rounded-xl shadow-sm border border-slate-100 w-fit mb-8">
          <button 
            className={`py-2 px-6 rounded-lg font-bold transition-all ${activeTab === 'connections' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
            onClick={() => setActiveTab('connections')}
          >
            Connections
          </button>
          <button 
            className={`py-2 px-6 rounded-lg font-bold transition-all ${activeTab === 'requests' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
            onClick={() => setActiveTab('requests')}
          >
            Requests
          </button>
        </div>

        {loading ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeTab === 'connections' ? (
              connections.length > 0 ? (
                connections.map((user: any) => (
                  <NuoraUserCard key={user._id} user={user} onUpdate={fetchConnections} />
                ))
              ) : (
                <p className="col-span-full text-center py-10 text-gray-500">No connections yet.</p>
              )
            ) : (
              requests.length > 0 ? (
                requests.map((user: any) => (
                  <NuoraUserCard 
                    key={user._id} 
                    user={user} 
                    isRequest 
                    onUpdate={fetchConnections} 
                  />
                ))
              ) : (
                <p className="col-span-full text-center py-10 text-gray-500">No pending requests.</p>
              )
            )}
          </div>
        )}
      </div>
    </MainLayout>
  )
}
