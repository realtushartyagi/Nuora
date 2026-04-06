'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import MainLayout from '@/components/MainLayout'
import { api, BASE_URL } from '@/lib/api'
import { useAuth, useUser } from '@clerk/nextjs'
import { ArrowLeft, Send } from 'lucide-react'
import Loading from '@/components/Loading'
import moment from 'moment'

export default function ChatBoxPage() {
  const params = useParams()
  const router = useRouter()
  const userId = params.userId as string
  
  const [messages, setMessages] = useState<any[]>([])
  const [receiver, setReceiver] = useState<any>(null)
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(true)
  
  const { getToken } = useAuth()
  const { user: currentUser } = useUser()
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchChatData = async () => {
      try {
        const token = await getToken()
        if (token) {
          const [msgRes, userRes] = await Promise.all([
            api.post('/message/get', { to_user_id: userId }, {
              headers: { Authorization: `Bearer ${token}` }
            }),
            api.post('/user/profiles', { profileId: userId }, {
              headers: { Authorization: `Bearer ${token}` }
            })
          ])
          if (msgRes.data.success) setMessages(msgRes.data.messages)
          if (userRes.data.success) setReceiver(userRes.data.profile)
        }
      } catch (err) {
        console.error('Error fetching chat data:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchChatData()
  }, [userId, getToken])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  // Real-time SSE implementation
  useEffect(() => {
    if (!currentUser?.id) return

    const eventSource = new EventSource(`${BASE_URL}/api/message/${currentUser.id}`)
    
    eventSource.onmessage = (event) => {
      const message = JSON.parse(event.data)
      if (message.from_user_id._id === userId || message.to_user_id === userId) {
        setMessages(prev => [...prev, message])
      }
    }

    return () => {
      eventSource.close()
    }
  }, [currentUser?.id, userId])

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!text.trim()) return

    try {
      const token = await getToken()
      if (token) {
        const res = await api.post('/message/send', {
          to_user_id: userId,
          text
        }, {
          headers: { Authorization: `Bearer ${token}` }
        })
        if (res.data.success) {
          setMessages(prev => [...prev, res.data.message])
          setText('')
        }
      }
    } catch (err) {
      console.error('Error sending message:', err)
    }
  }

  if (loading) return <MainLayout><Loading /></MainLayout>

  return (
    <MainLayout>
      <div className="flex flex-col h-full bg-white sm:rounded-xl sm:shadow-sm overflow-hidden sm:m-4">
        {/* Header */}
        <div className="flex items-center p-4 border-b bg-white">
          <button onClick={() => router.back()} className="mr-3 sm:hidden">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <img 
            src={receiver?.profile_picture || '/assets/avatar.png'} 
            alt="profile" 
            className="w-10 h-10 rounded-full object-cover mr-3"
          />
          <div>
            <h2 className="font-bold">{receiver?.full_name}</h2>
            <p className="text-xs text-green-500">Online</p>
          </div>
        </div>

        {/* Messages Container */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 no-scrollbar"
        >
          {messages.map((msg) => {
            const isMe = msg.to_user_id === userId
            return (
              <div key={msg._id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[75%] p-3 rounded-2xl shadow-sm ${
                  isMe ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-white text-gray-800 rounded-tl-none'
                }`}>
                  <p className="text-sm">{msg.text}</p>
                  <p className={`text-[10px] mt-1 ${isMe ? 'text-indigo-200' : 'text-gray-400'}`}>
                    {moment(msg.createdAt).format('hh:mm A')}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Input Area */}
        <form onSubmit={handleSend} className="p-4 border-t bg-white flex items-center space-x-3">
          <input 
            type="text" 
            placeholder="Type a message..."
            className="flex-1 bg-slate-100 border-none rounded-full px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button 
            type="submit"
            className="bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 transition"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </MainLayout>
  )
}
