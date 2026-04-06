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
    <div className={`w-64 lg:w-72 bg-white border-r border-slate-50 flex flex-col justify-between items-stretch max-md:absolute top-0 bottom-0 z-[60] ${sidebarOpen ? 'translate-x-0 shadow-xl' : 'max-md:-translate-x-full'} transition-all duration-300 ease-in-out`}>
      <div className='w-full'>
        <div onClick={() => { router.push('/authenticated'); setSidebarOpen(false); }} className='px-7 py-8 cursor-pointer group'>
            <h1 className="text-3xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent group-hover:opacity-80 transition-all tracking-tight">Nuora</h1>
        </div>

        <MenuItems setSidebarOpen={setSidebarOpen} />

        <div className='px-6 mt-4'>
          <Link 
            href='/authenticated/create-post' 
            onClick={() => setSidebarOpen(false)} 
            className='flex items-center justify-center gap-2 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:scale-[1.03] hover:shadow-xl hover:shadow-indigo-100 active:scale-95 transition-all duration-300 text-white cursor-pointer font-bold shadow-lg shadow-indigo-50 group'
          >
            <CirclePlus className='w-5 h-5 group-hover:rotate-90 transition-transform' />
            <span>Create Post</span>
          </Link>
        </div>
      </div>

      <div className='w-full border-t border-slate-50 p-6 flex items-center justify-between'>
        <div onClick={() => { if(user) { router.push('/authenticated/profile/' + user._id); setSidebarOpen(false); } }} className='flex gap-3 items-center cursor-pointer group overflow-hidden'>
          <div className="relative shrink-0" onClick={(e) => e.stopPropagation()}>
             <UserButton />
          </div>
          {user && (
            <div className="transition-all min-w-0">
              <h1 className='text-sm font-bold text-slate-800 leading-tight truncate'>{user.full_name}</h1>
              <p className='text-[11px] text-slate-400 font-bold uppercase tracking-wider truncate'>@{user.username}</p>
            </div>
          )}
        </div>
        <LogOut onClick={() => signOut()} className='w-5 h-5 text-slate-300 hover:text-red-500 transition-colors cursor-pointer shrink-0 ml-2' />
      </div>

    </div>
  )
}

export default Sidebar
