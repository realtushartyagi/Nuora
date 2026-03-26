'use client'

import React from 'react'
import { assets } from '@/assets/assets'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import MenuItems from './MenuItems'
import { CirclePlus, LogOut } from 'lucide-react'
import { UserButton, useClerk } from '@clerk/nextjs'
import { useAppSelector } from '@/store/hooks'

const Sidebar = ({ sidebarOpen, setSidebarOpen }: { sidebarOpen: boolean, setSidebarOpen: (open: boolean) => void }) => {

  const router = useRouter()
  const user = useAppSelector((state) => state.user.value)
  const { signOut } = useClerk()

  return (
    <div className={`w-60 xl:w-72 bg-white border-r border-gray-100 flex flex-col justify-between items-center max-sm:absolute top-0 bottom-0 z-20 ${sidebarOpen ? 'translate-x-0' : 'max-sm:-translate-x-full'} transition-all duration-300 ease-in-out`}>
      <div className='w-full'>
        <div onClick={() => { router.push('/'); setSidebarOpen(false); }} className='px-7 py-5 cursor-pointer'>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">Nuora</h1>
        </div>
        <hr className='border-gray-50 mb-6' />

        <MenuItems setSidebarOpen={setSidebarOpen} />

        <Link href='/create-post' onClick={() => setSidebarOpen(false)} className='flex items-center justify-center gap-2 py-3 mt-6 mx-6 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-lg hover:shadow-indigo-200 active:scale-95 transition-all text-white cursor-pointer font-semibold shadow-md'>
          <CirclePlus className='w-5 h-5' />
          Create Post
        </Link>
      </div>

      <div className='w-full border-t border-gray-100 p-4 px-7 flex items-center justify-between bg-slate-50/50'>
        <div onClick={() => { if(user) { router.push('/profile/' + user._id); setSidebarOpen(false); } }} className='flex gap-2.5 items-center cursor-pointer group'>
          <div className="relative" onClick={(e) => e.stopPropagation()}>
             <UserButton afterSignOutUrl="/login" />
          </div>
          {user && (
            <div className="transition-all group-hover:translate-x-0.5">
              <h1 className='text-sm font-semibold text-slate-900 leading-tight'>{user.full_name}</h1>
              <p className='text-[11px] text-slate-500 font-medium'>@{user.username}</p>
            </div>
          )}
        </div>
        <LogOut onClick={() => signOut()} className='w-4.5 h-4.5 text-slate-400 hover:text-indigo-600 transition-colors cursor-pointer' />
      </div>

    </div>
  )
}

export default Sidebar
