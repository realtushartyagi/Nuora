'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Globe, Check, MapPin } from 'lucide-react'

export default function LanguagePage() {
  const [selectedLanguage, setSelectedLanguage] = useState('en')
  const [selectedRegion, setSelectedRegion] = useState('us')

  const languages = [
    { id: 'en', name: 'English', native: 'English' },
    { id: 'hi', name: 'Hindi', native: 'हिन्दी' },
    { id: 'es', name: 'Spanish', native: 'Español' },
    { id: 'fr', name: 'French', native: 'Français' },
  ]

  const regions = [
    { id: 'us', name: 'United States' },
    { id: 'in', name: 'India' },
    { id: 'uk', name: 'United Kingdom' },
    { id: 'ca', name: 'Canada' },
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
          <div className="p-2.5 bg-sky-100 text-sky-600 rounded-xl shadow-md border border-sky-200">
            <Globe className="w-6 h-6 fill-sky-600/10" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Language</h1>
            <p className="text-slate-500 mt-1 font-medium">Select your preferred language for the app</p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Language Selection */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
              <Globe className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">App Language</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {languages.map((lang) => (
              <button
                key={lang.id}
                onClick={() => setSelectedLanguage(lang.id)}
                className={`flex items-center justify-between p-5 rounded-2xl border-2 transition-all cursor-pointer ${
                  selectedLanguage === lang.id 
                    ? 'border-indigo-600 bg-indigo-50/30' 
                    : 'border-slate-50 bg-slate-50/50 hover:bg-white hover:border-slate-200'
                }`}
              >
                <div className="text-left">
                  <p className={`font-bold ${selectedLanguage === lang.id ? 'text-indigo-600' : 'text-slate-900'}`}>{lang.name}</p>
                  <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">{lang.native}</p>
                </div>
                {selectedLanguage === lang.id && (
                  <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Region / Locale Section */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2.5 bg-slate-50 text-slate-600 rounded-xl">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Region & Format</h3>
          </div>

          <div className="relative">
            <select 
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl appearance-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none cursor-pointer font-bold text-slate-900"
            >
              {regions.map((region) => (
                <option key={region.id} value={region.id}>{region.name}</option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <Check className="w-5 h-5 text-indigo-600" />
            </div>
          </div>
          <p className="text-xs text-slate-400 mt-3 ml-1">This affects date formats, currency symbols, and local time display.</p>
        </div>
      </div>
    </div>
  )
}
