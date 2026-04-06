'use client'

import React from 'react'

interface AuthBrandingProps {
  type: 'login' | 'signup'
}

const AuthBranding = ({ type }: AuthBrandingProps) => {
  const isLogin = type === 'login'

  return (
    <div className='flex flex-col space-y-6 md:space-y-8 animate-in fade-in slide-in-from-left duration-700'>
      <div className='flex items-center gap-4 justify-center lg:justify-start'>
        <div className='w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center shadow-2xl shadow-indigo-500/20'>
          <div className='w-7 h-7 border-[3px] border-white rounded-full' />
        </div>
        <h1 className="text-5xl font-black text-slate-900 tracking-tight">Nuora</h1>
      </div>

      <div className='space-y-4 md:space-y-6 text-center lg:text-left'>
        <h2 className='text-4xl md:text-6xl xl:text-7xl font-bold text-slate-900 leading-tight tracking-tight'>
          {isLogin ? (
            <>
              Where Connections <br className='hidden md:block'/>
              <span className='bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent'>Matter More.</span>
            </>
          ) : (
            <>
              Join the <br className='hidden md:block'/>
              <span className='bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent'>Revolution.</span>
            </>
          )}
        </h2>
        <p className='text-lg md:text-xl xl:text-2xl text-slate-600 font-medium max-w-md mx-auto lg:mx-0 leading-relaxed'>
          {isLogin 
            ? 'Experience a social universe built on real emotions and authentic connections.' 
            : 'Create your account and start building authentic connections in our growing social universe.'
          }
        </p>
      </div>

      {/* Feature highlights */}
      <div className="grid grid-cols-2 gap-4 md:gap-6 pt-6 md:pt-8 max-w-md mx-auto lg:mx-0">
        <div className="p-4 md:p-6 bg-white/60 backdrop-blur-md rounded-[2rem] border border-white/50 shadow-sm transition-all hover:shadow-md hover:-translate-y-1">
          <p className="text-2xl md:text-3xl font-black text-slate-900">{isLogin ? '10k+' : 'Easy'}</p>
          <p className="text-xs md:text-sm text-slate-500 font-bold uppercase tracking-wider">{isLogin ? 'Active Users' : 'Setup Process'}</p>
        </div>
        <div className="p-4 md:p-6 bg-white/60 backdrop-blur-md rounded-[2rem] border border-white/50 shadow-sm transition-all hover:shadow-md hover:-translate-y-1">
          <p className="text-2xl md:text-3xl font-black text-slate-900">{isLogin ? '50k+' : 'Secure'}</p>
          <p className="text-xs md:text-sm text-slate-500 font-bold uppercase tracking-wider">{isLogin ? 'Real Stories' : 'Authentication'}</p>
        </div>
      </div>
    </div>
  )
}

export default AuthBranding
