'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, User, Camera, Check } from 'lucide-react'
import { useAppSelector } from '@/store/hooks'

export default function EditProfilePage() {
  const user = useAppSelector((state) => state.user.value)
  const [formData, setFormData] = useState({
    fullName: user?.full_name || '',
    username: user?.username || '',
    bio: user?.bio || '',
    email: user?.email || 'user@nuora.app'
  })

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="mb-8 flex items-center gap-4">
        <Link 
          href="/authenticated/settings" 
          className="p-2 hover:bg-slate-100 rounded-full transition-all text-slate-500"
        >
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Edit Profile</h1>
          <p className="text-slate-500 mt-1 font-medium">Update your personal information and profile picture</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-8">
          {/* Profile Picture Section */}
          <div className="flex flex-col items-center mb-10">
            <div className="relative group">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-slate-50 shadow-md">
                {user?.profile_picture ? (
                  <img src={user.profile_picture} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-indigo-50 flex items-center justify-center text-indigo-600">
                    <User className="w-16 h-16" />
                  </div>
                )}
              </div>
              <button className="absolute bottom-0 right-0 p-2.5 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition-all cursor-pointer">
                <Camera className="w-5 h-5" />
              </button>
            </div>
            <button className="mt-4 text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors">
              Change Profile Photo
            </button>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-1.5 ml-1">Full Name</label>
              <input 
                type="text" 
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400"
                placeholder="Enter your full name"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-1.5 ml-1">Username</label>
              <input 
                type="text" 
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
                className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400"
                placeholder="Choose a username"
              />
            </div>
          </div>

          <div className="flex flex-col mb-6">
            <label className="text-sm font-semibold text-gray-700 mb-1.5 ml-1">Bio</label>
            <textarea 
              rows={4}
              value={formData.bio}
              onChange={(e) => setFormData({...formData, bio: e.target.value})}
              className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all resize-none placeholder:text-slate-400"
              placeholder="Tell us about yourself..."
            />
          </div>

          <div className="flex flex-col mb-10">
            <label className="text-sm font-semibold text-gray-700 mb-1.5 ml-1">Email Address</label>
            <input 
              type="email" 
              value={formData.email}
              readOnly
              className="w-full p-3.5 bg-slate-100 border border-slate-200 rounded-2xl text-slate-500 cursor-not-allowed outline-none"
            />
            <p className="text-xs text-slate-400 mt-2 ml-1">Email cannot be changed directly. Please contact support if needed.</p>
          </div>

          <div className="flex justify-end pt-6 border-t border-slate-50">
            <button className="flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl hover:from-indigo-600 hover:to-purple-700 transition-all font-bold shadow-lg shadow-indigo-100 active:scale-95 cursor-pointer">
              <Check className="w-5 h-5" />
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
