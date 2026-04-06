'use client'

import React from 'react'
import { User, Bell, Shield, HelpCircle, LogOut, ChevronRight, Globe, Moon, LucideIcon } from 'lucide-react'
import { useClerk } from '@clerk/nextjs'

interface SettingItem {
  label: string;
  sub?: string;
  Icon: LucideIcon;
  color: string;
  bgColor: string;
}

interface SettingSection {
  title: string;
  items: SettingItem[];
}

const settingSections: SettingSection[] = [
  {
    title: 'Account Settings',
    items: [
      { label: 'Edit Profile', Icon: User, color: 'text-indigo-600', bgColor: 'bg-indigo-50' },
      { label: 'Privacy & Security', Icon: Shield, color: 'text-green-600', bgColor: 'bg-green-50' },
      { label: 'Notifications', Icon: Bell, color: 'text-orange-600', bgColor: 'bg-orange-50' },
    ]
  },
  {
    title: 'Preferences',
    items: [
      { label: 'Appearance', sub: 'Light Mode', Icon: Moon, color: 'text-indigo-600', bgColor: 'bg-indigo-50' },
      { label: 'Language', sub: 'English', Icon: Globe, color: 'text-blue-600', bgColor: 'bg-blue-50' },
    ]
  },
  {
    title: 'Support',
    items: [
      { label: 'Help Center', Icon: HelpCircle, color: 'text-slate-600', bgColor: 'bg-slate-50' },
    ]
  }
]

export default function SettingsPage() {
  const { signOut } = useClerk()

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
        <p className="text-slate-500 mt-1 font-medium">Manage your account and preferences</p>
      </div>

      <div className="space-y-10">
        {settingSections.map((section, idx) => (
          <div key={idx} className='transition-all duration-300'>
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 ml-2">{section.title}</h3>
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden divide-y divide-slate-50">
              {section.items.map((item, i) => (
                <button 
                  key={i} 
                  className="w-full flex items-center justify-between p-5 hover:bg-slate-50 transition-all text-left group"
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-2.5 rounded-xl ${item.bgColor} ${item.color} group-hover:scale-110 transition-all shadow-sm`}>
                      <item.Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[15px] font-bold text-slate-900">{item.label}</p>
                      {item.sub && <p className="text-xs text-slate-400 font-medium">{item.sub}</p>}
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </div>
          </div>
        ))}

        <div className="pt-4 pb-12">
           <button 
             onClick={() => signOut()}
             className="w-full flex items-center gap-4 p-5 bg-red-50 text-red-600 rounded-3xl border border-red-100 hover:bg-red-100 transition-all group font-bold"
           >
              <div className="p-2.5 rounded-xl bg-red-100 text-red-600 group-hover:bg-red-200 transition-all shadow-sm">
                <LogOut className="w-5 h-5" />
              </div>
              Sign Out from Nuora
           </button>
        </div>
      </div>
    </div>
  )
}
