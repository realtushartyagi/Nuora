'use client'

import React from 'react'
import { Bell, Heart, UserPlus, MessageCircle } from 'lucide-react'

const notifications = [
  {
    id: 1,
    type: 'like',
    user: 'Alex Rivera',
    content: 'liked your post "Summer vibes at the beach! 🏖️"',
    time: '2m ago',
    Icon: Heart,
    color: 'text-pink-500',
    bgColor: 'bg-pink-50'
  },
  {
    id: 2,
    type: 'follow',
    user: 'Sarah Chen',
    content: 'started following you',
    time: '15m ago',
    Icon: UserPlus,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50'
  },
  {
    id: 3,
    type: 'comment',
    user: 'Jordan Smith',
    content: 'commented on your photo: "Wow, incredible shot! 📸"',
    time: '1h ago',
    Icon: MessageCircle,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50'
  },
  // Add more placeholders
]

export default function NotificationsPage() {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Notifications</h1>
        <p className="text-slate-500 mt-1 font-medium">Stay updated with your latest interactions</p>
      </div>

      <div className="space-y-4">
        {notifications.length > 0 ? (
          notifications.map((notif) => (
            <div key={notif.id} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-start gap-4 hover:border-indigo-100 transition-colors cursor-pointer group">
              <div className={`p-2.5 rounded-xl ${notif.bgColor} ${notif.color} transition-transform group-hover:scale-110`}>
                <notif.Icon className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <p className="text-slate-800 leading-snug">
                  <span className="font-bold hover:text-indigo-600 transition-colors">{notif.user}</span> {notif.content}
                </p>
                <p className="text-xs text-slate-400 font-bold mt-1.5 uppercase tracking-wider">{notif.time}</p>
              </div>
              <div className="w-2 h-2 rounded-full bg-indigo-600 mt-2"></div>
            </div>
          ))
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
            <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell className="w-10 h-10 text-slate-300" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">No notifications yet</h3>
            <p className="text-slate-500 max-w-xs mx-auto mt-2">When people interact with you, you'll see it here.</p>
          </div>
        )}
      </div>
    </div>
  )
}
