'use client'

import React from 'react'
import MainLayout from '@/components/MainLayout'
import RecentMessages from '@/components/RecentMessages'

export default function MessagesPage() {
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto py-6 px-4 h-full flex flex-col">
        <h1 className="text-2xl font-bold mb-6">Messages</h1>
        <div className="flex-1 overflow-hidden">
          <RecentMessages />
        </div>
      </div>
    </MainLayout>
  )
}
