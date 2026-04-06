'use client'

import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import UserProfileInfo from '@/components/UserProfileInfo'
import PostCard from '@/components/PostCard'
import { api } from '@/lib/api'
import { useAuth, useUser } from '@clerk/nextjs'
import Loading from '@/components/Loading'

export default function ProfilePage({ overrideId }: { overrideId?: string }) {
  const params = useParams()
  const profileId = overrideId || (params.profileId as string)
  
  const [profileData, setProfileData] = useState<any>(null)
  const [posts, setPosts] = useState([])
  const [activeTab, setActiveTab] = useState<'posts' | 'media'>('posts')
  const [loading, setLoading] = useState(true)
  
  const { getToken } = useAuth()
  const { user: currentUser } = useUser()

  const fetchProfileData = async () => {
    try {
      const token = await getToken()
      if (token) {
        const res = await api.post('/user/profiles', { profileId }, {
          headers: { Authorization: `Bearer ${token}` }
        })
        if (res.data.success) {
          setProfileData(res.data.profile)
          setPosts(res.data.posts)
        }
      }
    } catch (err) {
      console.error('Error fetching profile data:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (profileId) fetchProfileData()
  }, [profileId, getToken])

  if (loading) return <Loading />

  return (
    <div className="max-w-4xl mx-auto pb-10 sm:px-4">
        <UserProfileInfo 
          profileData={profileData} 
          isMe={currentUser?.id === profileId} 
          onUpdate={fetchProfileData}
        />

        <div className="mt-8 flex items-center justify-center md:justify-start gap-4 p-1.5 bg-white rounded-2xl shadow-sm border border-slate-100 w-fit">
          <button 
            className={`py-2 px-8 rounded-xl font-bold transition-all duration-200 ${activeTab === 'posts' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-100' : 'text-slate-500 hover:bg-slate-50'}`}
            onClick={() => setActiveTab('posts')}
          >
            Posts
          </button>
          <button 
            className={`py-2 px-8 rounded-xl font-bold transition-all duration-200 ${activeTab === 'media' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-100' : 'text-slate-500 hover:bg-slate-50'}`}
            onClick={() => setActiveTab('media')}
          >
            Media
          </button>
          <button 
            className="py-2 px-8 rounded-xl font-bold text-slate-500 hover:bg-slate-50 transition-all cursor-not-allowed opacity-50"
          >
            Likes
          </button>
        </div>

        <div className="mt-8">
          {activeTab === 'posts' ? (
            <div className="space-y-6">
              {posts.length > 0 ? (
                posts.map((post: any) => (
                  <PostCard key={post._id} post={post} />
                ))
              ) : (
                <div className="text-center py-10 bg-white rounded-xl shadow-sm text-gray-400">
                  No posts shared yet.
                </div>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {posts.filter((p: any) => p.post_media).map((p: any) => (
                <div key={p._id} className="aspect-square bg-gray-200 rounded-lg overflow-hidden relative group">
                  {p.post_media.includes('.mp4') ? (
                    <video src={p.post_media} className="w-full h-full object-cover" />
                  ) : (
                    <img src={p.post_media} className="w-full h-full object-cover" alt="media" />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }
