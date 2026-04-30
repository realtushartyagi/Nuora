'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Shield, Lock, Eye, Key, Smartphone, ChevronRight } from 'lucide-react'

export default function PrivacyPage() {
  const [isPrivate, setIsPrivate] = useState(false)
  const [showActivity, setShowActivity] = useState(true)
  const [is2FA, setIs2FA] = useState(false)

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
          <div className="p-2.5 bg-emerald-100 text-emerald-600 rounded-xl shadow-md border border-emerald-200">
            <Shield className="w-6 h-6 fill-emerald-600/10" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Privacy & Security</h1>
            <p className="text-slate-500 mt-1 font-medium">Manage your visibility and security options</p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Privacy Section */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2.5 bg-green-50 text-green-600 rounded-xl">
              <Eye className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Privacy Controls</h3>
          </div>
          
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-900">Private Account</p>
                <p className="text-sm text-slate-500">Only people you approve can see your posts</p>
              </div>
              <button 
                onClick={() => setIsPrivate(!isPrivate)}
                className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${isPrivate ? 'bg-indigo-600' : 'bg-slate-200'}`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${isPrivate ? 'left-7' : 'left-1'}`} />
              </button>
            </div>

            <hr className="border-slate-50" />

            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-900">Show Activity Status</p>
                <p className="text-sm text-slate-500">Allow others to see when you're online</p>
              </div>
              <button 
                onClick={() => setShowActivity(!showActivity)}
                className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${showActivity ? 'bg-indigo-600' : 'bg-slate-200'}`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${showActivity ? 'left-7' : 'left-1'}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Security Section */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Security Settings</h3>
          </div>

          <div className="space-y-4">
            <button className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 rounded-2xl transition-all group cursor-pointer border border-slate-100">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-white rounded-lg shadow-sm group-hover:scale-110 transition-all">
                  <Key className="w-5 h-5 text-slate-600" />
                </div>
                <div className="text-left">
                  <p className="font-bold text-slate-900">Change Password</p>
                  <p className="text-xs text-slate-500">Update your account password</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-indigo-600 transition-all" />
            </button>

            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <Smartphone className="w-5 h-5 text-slate-600" />
                </div>
                <div className="text-left">
                  <p className="font-bold text-slate-900">Two-Factor Authentication</p>
                  <p className="text-xs text-slate-500">Add an extra layer of security</p>
                </div>
              </div>
              <button 
                onClick={() => setIs2FA(!is2FA)}
                className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${is2FA ? 'bg-indigo-600' : 'bg-slate-200'}`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${is2FA ? 'left-7' : 'left-1'}`} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
