'use client'

import { useRef } from 'react'
import { Provider } from 'react-redux'
import { makeStore, AppStore } from '@/store/store'
import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from 'react-hot-toast'

export default function Providers({
  children
}: {
  children: React.ReactNode
}) {
  const storeRef = useRef<AppStore>(null)
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore()
  }

  return (
    <ClerkProvider>
      <Provider store={storeRef.current}>
        {children}
        <Toaster />
      </Provider>
    </ClerkProvider>
  )
}
