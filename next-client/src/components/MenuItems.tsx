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
          const isActive = to === '/authenticated' ? pathname === '/authenticated' : pathname.startsWith(to)
          
          return (
            <Link 
              key={to} 
              href={to} 
              onClick={() => setSidebarOpen(false)} 
              className={`px-3 py-2 flex items-center gap-3 rounded-lg transition-all duration-200 group ${isActive ? 'bg-slate-100 text-slate-900 font-bold' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}
            >
              <Icon className={`w-5 h-5 transition-colors ${isActive ? 'text-indigo-600' : 'text-slate-400 group-hover:text-indigo-600'}`} />
              <span className="text-sm">{label}</span>
            </Link>
          )
        })
      }
    </div>
  )
}

export default MenuItems
