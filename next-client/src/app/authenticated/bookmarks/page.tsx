'use client'

import React from 'react'
import { Bookmark, Search, Clock } from 'lucide-react'

export default function BookmarksPage() {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Bookmarks</h1>
        <p className="text-slate-500 mt-1 font-medium">Your saved collection of inspiring posts and media</p>
      </div>

      <div className="relative mb-10 group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-indigo-600 transition-colors" />
        <input 
          type="text" 
          placeholder="Search your bookmarks..."
          className="w-full bg-white border border-slate-100 rounded-2xl pl-12 pr-4 py-4 shadow-sm focus:ring-4 focus:ring-indigo-50 focus:border-indigo-200 outline-none transition-all text-slate-700 font-medium placeholder:text-slate-400"
        />
      </div>

      <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-slate-200 flex flex-col items-center justify-center">
        <div className="bg-indigo-50 w-24 h-24 rounded-full flex items-center justify-center mb-6 ring-8 ring-indigo-50/50">
          <Bookmark className="w-12 h-12 text-indigo-600" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900">No bookmarks saved</h3>
        <p className="text-slate-500 max-w-sm mt-3 leading-relaxed">
          Save posts you want to keep track of! Click the bookmark icon on any post to see it here later.
        </p>
        <button className="mt-8 px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-indigo-100 active:scale-95 transition-all">
          Browse Feed
        </button>
      </div>

      {/* Suggested bookmarks list could go here */}
      <div className="mt-12">
        <div className="flex items-center gap-2 mb-6">
          <Clock className="w-5 h-5 text-slate-400" />
          <h2 className="text-lg font-bold text-slate-900">Recently Viewed</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-50/50 border border-slate-100 p-4 rounded-xl text-slate-400 text-sm font-medium text-center">
            No recently viewed items to show.
          </div>
          <div className="bg-slate-50/50 border border-slate-100 p-4 rounded-xl text-slate-400 text-sm font-medium text-center">
             Your activity history is private.
          </div>
        </div>
      </div>
    </div>
  )
}
