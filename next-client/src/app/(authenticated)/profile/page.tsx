'use client'

import React from 'react'
import ProfilePageContent from './[profileId]/page'
import { useUser } from '@clerk/nextjs'
import Loading from '@/components/Loading'
import MainLayout from '@/components/MainLayout'

export default function MyProfilePage() {
  const { user, isLoaded } = useUser()

  if (!isLoaded || !user) {
    return (
      <MainLayout>
        <div className="flex justify-center mt-10">
          <Loading />
        </div>
      </MainLayout>
    )
  }

  return <ProfilePageContent overrideId={user.id} />
}
