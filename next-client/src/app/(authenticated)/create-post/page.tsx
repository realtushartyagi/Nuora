'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import MainLayout from '@/components/MainLayout'
import { api } from '@/lib/api'
import { useAuth, UserButton } from '@clerk/nextjs'
import { Image as ImageIcon, Video, X, Send } from 'lucide-react'
import toast from 'react-hot-toast'

export default function CreatePostPage() {
  const [text, setText] = useState('')
  const [media, setMedia] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { getToken } = useAuth()

  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setMedia(file)
      setPreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!text.trim() && !media) return

    setLoading(true)
    try {
      const token = await getToken()
      const formData = new FormData()
      formData.append('content', text)
      if (media) formData.append('images', media) // Backend expects 'images' (multipart)

      // Determine and append post_type
      let post_type = 'text'
      if (text && media) {
        post_type = 'text_with_image'
      } else if (media) {
        post_type = 'image'
      }
      formData.append('post_type', post_type)

      const res = await api.post('/post/add', formData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      })
      if (res.data.success) {
        toast.success('Post created successfully!')
        router.push('/')
      } else {
        toast.error(res.data.message)
      }
    } catch (err) {
      console.error('Error creating post:', err)
      toast.error('Failed to create post')
    } finally {
      setLoading(false)
    }
  }

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto py-8 px-4">
        <div className='mb-8'>
          <h1 className="text-3xl font-bold text-slate-900">Create Post</h1>
          <p className="text-slate-500 mt-1 font-medium">Share your thoughts with the world</p>
        </div>
        
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          {/* User Header */}
          <div className='p-6 flex items-center gap-3'>
             <UserButton />
             <div className='leading-tight'>
                <h2 className='font-bold text-slate-900'>Your Profile</h2>
                <p className='text-xs text-slate-400 font-bold uppercase tracking-wider'>Sharing Publicly</p>
             </div>
          </div>

          <textarea 
            className="w-full px-6 pb-6 min-h-[120px] border-none focus:ring-0 outline-none text-lg resize-none placeholder:text-slate-300 text-slate-700 font-medium"
            placeholder="What's happening?"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <div className='mx-6 border-b border-slate-100'></div>

          {preview && (
            <div className="px-6 py-4 relative">
              <button 
                type="button"
                onClick={() => { setMedia(null); setPreview(null); }}
                className="absolute top-6 right-8 bg-black/50 text-white p-1.5 rounded-full hover:bg-black/70 backdrop-blur-sm z-10"
              >
                <X className="w-5 h-5" />
              </button>
              {media?.type.startsWith('video') ? (
                <video src={preview} className="w-full rounded-2xl max-h-[400px] object-cover shadow-inner" controls />
              ) : (
                <img src={preview} alt="preview" className="w-full rounded-2xl max-h-[400px] object-cover shadow-inner" />
              )}
            </div>
          )}

          <div className="p-4 px-6 flex items-center justify-between">
            <div className="flex space-x-1">
              <label className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl cursor-pointer transition-all">
                <ImageIcon className="w-6 h-6" />
                <input type="file" accept="image/*" className="hidden" onChange={handleMediaChange} />
              </label>
            </div>
            
            <button 
              type="submit"
              disabled={loading || (!text.trim() && !media)}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-xl font-bold hover:shadow-lg hover:shadow-indigo-100 disabled:opacity-50 active:scale-95 transition-all text-[15px]"
            >
              {loading ? 'Publishing...' : 'Publish Post'}
            </button>
          </div>
        </form>
      </div>
    </MainLayout>
  )
}
