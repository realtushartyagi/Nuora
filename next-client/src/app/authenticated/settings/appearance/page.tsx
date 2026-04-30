'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Moon, Sun, Monitor, Type, Check } from 'lucide-react'

export default function AppearancePage() {
  const [theme, setTheme] = useState('system')
  const [fontSize, setFontSize] = useState('medium')
  const [isCompact, setIsCompact] = useState(false)

  const themes = [
    { id: 'light', label: 'Light', icon: Sun, color: 'text-amber-500', bgColor: 'bg-amber-50' },
    { id: 'dark', label: 'Dark', icon: Moon, color: 'text-indigo-600', bgColor: 'bg-indigo-50' },
    { id: 'system', label: 'System', icon: Monitor, color: 'text-slate-600', bgColor: 'bg-slate-50' },
  ]

  const fontSizes = ['small', 'medium', 'large']

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
          <h1 className="text-3xl font-bold text-slate-900">Appearance</h1>
          <p className="text-slate-500 mt-1 font-medium">Personalize how Nuora looks for you</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Theme Selection */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Theme Preference</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => setTheme(t.id)}
                className={`relative p-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-3 cursor-pointer ${
                  theme === t.id 
                    ? 'border-indigo-600 bg-indigo-50/30' 
                    : 'border-slate-100 bg-white hover:border-slate-200'
                }`}
              >
                <div className={`p-3 rounded-xl ${t.bgColor} ${t.color}`}>
                  <t.icon className="w-6 h-6" />
                </div>
                <span className={`font-bold ${theme === t.id ? 'text-indigo-600' : 'text-slate-600'}`}>{t.label}</span>
                {theme === t.id && (
                  <div className="absolute top-3 right-3 w-5 h-5 bg-indigo-600 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* UI Preferences */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Interface Options</h3>
          
          <div className="space-y-8">
            {/* Compact Mode Toggle */}
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-900">Compact Mode</p>
                <p className="text-sm text-slate-500">Dense layout with less padding and margins</p>
              </div>
              <button 
                onClick={() => setIsCompact(!isCompact)}
                className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${isCompact ? 'bg-indigo-600' : 'bg-slate-200'}`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${isCompact ? 'left-7' : 'left-1'}`} />
              </button>
            </div>

            <hr className="border-slate-50" />

            {/* Font Size Selection */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Type className="w-5 h-5 text-slate-400" />
                <p className="font-bold text-slate-900">Font Size</p>
              </div>
              <div className="flex gap-3">
                {fontSizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setFontSize(size)}
                    className={`px-6 py-2.5 rounded-xl font-bold capitalize transition-all cursor-pointer ${
                      fontSize === size 
                        ? 'bg-indigo-600 text-white shadow-md' 
                        : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
