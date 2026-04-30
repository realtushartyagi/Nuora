'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Bell, MessageSquare, Heart, UserPlus, AtSign, Mail } from 'lucide-react'

export default function NotificationsPage() {
  const [prefs, setPrefs] = useState({
    messages: true,
    mentions: true,
    likes: true,
    followers: true,
    email: false
  })

  const toggle = (key: keyof typeof prefs) => {
    setPrefs(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const notificationTypes = [
    { id: 'messages', label: 'Messages', sub: 'Direct messages from other users', icon: MessageSquare, color: 'text-indigo-600', bgColor: 'bg-indigo-50' },
    { id: 'mentions', label: 'Mentions', sub: 'When someone tags you in a post or comment', icon: AtSign, color: 'text-purple-600', bgColor: 'bg-purple-50' },
    { id: 'likes', label: 'Likes', sub: 'When someone likes your posts', icon: Heart, color: 'text-rose-500', bgColor: 'bg-rose-50' },
    { id: 'followers', label: 'New Followers', sub: 'When someone starts following you', icon: UserPlus, color: 'text-blue-600', bgColor: 'bg-blue-50' },
  ]

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="mb-8 flex items-center gap-4">
        <Link 
          href="/authenticated/settings" 
          className="p-2 hover:bg-slate-100 rounded-full transition-all text-slate-500"
        >
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <div className="flex items-center gap-4">
          <div className="p-2.5 bg-amber-100 text-amber-600 rounded-xl shadow-md border border-amber-200">
            <Bell className="w-6 h-6 fill-amber-600/10" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Notifications</h1>
            <p className="text-slate-500 mt-1 font-medium">Control how and when you're notified</p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* push Notifications */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2.5 bg-orange-50 text-orange-600 rounded-xl">
              <Bell className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Push Notifications</h3>
          </div>
          
          <div className="space-y-6">
            {notificationTypes.map((type) => (
              <div key={type.id} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-xl ${type.bgColor} ${type.color}`}>
                    <type.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">{type.label}</p>
                    <p className="text-sm text-slate-500">{type.sub}</p>
                  </div>
                </div>
                <button 
                  onClick={() => toggle(type.id as keyof typeof prefs)}
                  className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${prefs[type.id as keyof typeof prefs] ? 'bg-indigo-600' : 'bg-slate-200'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${prefs[type.id as keyof typeof prefs] ? 'left-7' : 'left-1'}`} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Email Notifications */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
              <Mail className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Email Notifications</h3>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-bold text-slate-900">Receive Weekly Digest</p>
              <p className="text-sm text-slate-500">A summary of activity you missed during the week</p>
            </div>
            <button 
              onClick={() => toggle('email')}
              className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${prefs.email ? 'bg-indigo-600' : 'bg-slate-200'}`}
            >
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${prefs.email ? 'left-7' : 'left-1'}`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
