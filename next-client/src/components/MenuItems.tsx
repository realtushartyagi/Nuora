'use client'

import React from 'react'
import { menuItemsData } from '@/assets/assets'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const MenuItems = ({ setSidebarOpen }: { setSidebarOpen: (open: boolean) => void }) => {
  const pathname = usePathname()

  return (
    <div className='px-6 text-gray-600 space-y-1 font-medium'>
      {
        menuItemsData.map(({ to, label, Icon }) => {
          const isActive = pathname === to || (to !== '/' && pathname.startsWith(to))
          
          return (
            <Link 
              key={to} 
              href={to} 
              onClick={() => setSidebarOpen(false)} 
              className={`px-3.5 py-2.5 flex items-center gap-3 rounded-xl transition-all duration-200 ${isActive ? 'bg-indigo-50 text-indigo-600 font-semibold border-r-4 border-indigo-600 rounded-r-none' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'}`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
              {label}
            </Link>
          )
        })
      }
    </div>
  )
}

export default MenuItems
