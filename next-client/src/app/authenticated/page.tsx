'use client'

import React, { useEffect, useState } from 'react'
import StoriesBar from '@/components/StoriesBar'
import PostCard from '@/components/PostCard'
import { api } from '@/lib/api'
import { useAuth } from '@clerk/nextjs'
import Loading from '@/components/Loading'

export default function FeedPage() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const { getToken } = useAuth()

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = await getToken()
        if (token) {
          const res = await api.get('/post/feed', {
            headers: { Authorization: `Bearer ${token}` }
          })
          if (res.data.success) {
            setPosts(res.data.posts)
          }
        }
      } catch (err) {
        console.error('Error fetching posts:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchPosts()
  }, [getToken])

  return (
    <div className="max-w-4xl mx-auto py-6 px-4">
      <StoriesBar />
      
      {loading ? (
        <div className="flex justify-center mt-10">
          <Loading />
        </div>
      ) : (
        <div className="mt-8 space-y-6">
          {posts.length > 0 ? (
            posts.map((post: any) => (
              <PostCard 
                key={post._id} 
                post={post} 
                onDelete={(postId) => setPosts(prev => prev.filter((p: any) => p._id !== postId))}
              />
            ))
          ) : (
            <div className="text-center py-10 bg-white rounded-xl shadow-sm">
              <p className="text-gray-500">No posts yet. Follow someone to see their posts!</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
