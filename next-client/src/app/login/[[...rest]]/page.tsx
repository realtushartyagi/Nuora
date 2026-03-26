'use client'

import React from 'react'
import { SignIn } from '@clerk/nextjs'

const LoginPage = () => {
  return (
    <div className='min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-[#f3e8ff] via-white to-[#e0f2fe] relative overflow-hidden font-outfit'>
      
      {/* Container for both sections */}
      <div className='flex-1 flex flex-col md:flex-row w-full max-w-7xl mx-auto z-10'>
        
        {/* Left Side: Branding Area */}
        <div className='flex-1 hidden md:flex flex-col items-center justify-center p-10 relative z-10'>
          <div className='max-w-xl text-center relative'>
            {/* Logo Desktop */}
            <div className='flex items-center gap-3 mb-12 justify-center'>
              <div className='w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center shadow-xl shadow-purple-500/30'>
                  <div className='w-6 h-6 border-2 border-white rounded-full' />
              </div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-900 to-indigo-800 bg-clip-text text-transparent tracking-tight">Nuora</h1>
            </div>

            <div className='space-y-6'>
              <h1 className='text-5xl lg:text-7xl font-bold text-indigo-950 leading-[1.1] tracking-tight'>
                Where Connections <br/>
                <span className='bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent'>Feel Real.</span>
              </h1>
              <p className='text-xl lg:text-2xl text-indigo-900/60 font-light'>
                Not just social. It's emotional. <br/>
                Your new living social universe.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Login Card */}
        <div className='flex-1 flex items-center justify-center p-6 lg:p-12'>
          <div className='w-full max-w-[480px]'>
            <div className='bg-white rounded-[2.5rem] shadow-[20px_40px_80px_rgba(0,0,0,0.08)] border border-white/50 p-8 md:p-10 relative overflow-hidden'>
              
              <div className='relative'>
                {/* Mobile-only Logo */}
                <div className='md:hidden flex items-center gap-2 mb-8 justify-center'>
                  <div className='w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/20'>
                    <div className='w-5 h-5 border-2 border-white rounded-full' />
                  </div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-900 to-indigo-800 bg-clip-text text-transparent tracking-tight">Nuora</h1>
                </div>

                <h2 className='text-3xl font-extrabold text-[#111827] mb-2 text-center tracking-tight'>Sign in to Nuora</h2>
                <p className='text-gray-500 mb-8 text-center text-sm font-medium'>Welcome back! Please sign in to continue</p>
                
                <SignIn 
                  path="/login"
                  routing="path"
                  signUpUrl="/sign-up"
                  appearance={{
                    elements: {
                      rootBox: 'w-full',
                      card: 'bg-transparent shadow-none border-0 p-0 w-full',
                      headerTitle: 'hidden',
                      headerSubtitle: 'hidden',
                      socialButtonsBlockButton: 'bg-white border border-gray-200 text-[#374151] hover:bg-gray-50 transition-all h-12 rounded-xl shadow-sm mb-4',
                      socialButtonsBlockButtonText: 'font-semibold text-[15px]',
                      dividerLine: 'bg-gray-100',
                      dividerText: 'text-gray-400 font-medium text-xs',
                      formFieldLabel: 'text-[#374151] font-bold mb-2 text-sm',
                      formFieldInput: 'bg-white border-gray-200 text-gray-900 focus:border-indigo-500/30 focus:ring-4 focus:ring-indigo-500/5 transition-all h-12 rounded-xl text-base px-4 font-medium',
                      formButtonPrimary: 'bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] hover:opacity-90 active:scale-[0.98] transition-all duration-300 shadow-xl shadow-indigo-500/20 border-0 h-12 text-[15px] font-bold mt-4 rounded-xl normal-case relative after:content-["→"] after:ml-2 after:text-lg',
                      footerActionLink: 'text-indigo-600 hover:text-indigo-500 font-bold ml-1',
                      identityPreviewText: 'text-gray-900',
                      identityPreviewEditButtonIcon: 'text-gray-900',
                      footer: 'mt-6 border-t border-gray-50 pt-6 text-center w-full flex justify-center',
                      clerkBranding: 'hidden'
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-200/40 blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-200/40 blur-[120px]" />
    </div>
  )
}

export default LoginPage
