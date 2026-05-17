'use client'

import React from 'react'
import { SignIn } from '@clerk/nextjs'

const LoginPage = () => {
  return (
    <div className='min-h-screen w-full overflow-hidden flex items-center justify-center bg-gradient-to-br from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0] relative font-outfit px-4 sm:px-6 lg:px-8 py-0'>

      {/* Background decoration elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[45%] h-[45%] rounded-full bg-indigo-200/20 blur-[120px] animate-pulse" />

      <div className="absolute bottom-[-20%] right-[-20%] w-[40%] h-[40%] rounded-full bg-blue-200/20 blur-[120px] animate-pulse" />

      {/* Main Container */}
      <div className='w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center z-10'>

        {/* Left Side: Branding */}
        <div className='flex flex-col space-y-8 lg:space-y-12 py-8 lg:py-0 animate-in fade-in slide-in-from-left duration-700'>

          {/* Logo */}
          <div className='flex items-center gap-4 justify-center lg:justify-start'>
            <div className='w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center shadow-2xl shadow-indigo-500/20'>
              <div className='w-7 h-7 border-[3px] border-white rounded-full' />
            </div>

            <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
              Nuora
            </h1>
          </div>

          {/* Hero Content */}
          <div className='space-y-4 md:space-y-6 text-center lg:text-left'>

            <h2 className='text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-bold text-slate-900 leading-tight tracking-tight'>
              Where Connections
              <br className='hidden md:block' />

              <span className='bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent'>
                Matter More.
              </span>
            </h2>

            <p className='text-base sm:text-lg md:text-xl xl:text-2xl text-slate-600 font-medium max-w-md mx-auto lg:mx-0 leading-relaxed'>
              Experience a social universe built on real emotions and authentic connections.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-4 md:gap-6 pt-4 md:pt-6 max-w-md mx-auto lg:mx-0">

            <div className="p-4 md:p-6 bg-white/60 backdrop-blur-md rounded-[2rem] border border-white/50 shadow-sm transition-all hover:shadow-md hover:-translate-y-1">
              <p className="text-2xl sm:text-3xl font-black text-slate-900">
                1k+
              </p>

              <p className="text-xs md:text-sm text-slate-500 font-bold uppercase tracking-wider">
                Active Users
              </p>
            </div>

            <div className="p-4 md:p-6 bg-white/60 backdrop-blur-md rounded-[2rem] border border-white/50 shadow-sm transition-all hover:shadow-md hover:-translate-y-1">
              <p className="text-2xl sm:text-3xl font-black text-slate-900">
                5k+
              </p>

              <p className="text-xs md:text-sm text-slate-500 font-bold uppercase tracking-wider">
                Real Stories
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Login Card */}
        <div className='flex items-center justify-center lg:justify-end animate-in fade-in slide-in-from-right duration-700 w-full'>

          <div className='w-full max-w-md sm:max-w-lg mx-auto'>

            <div className='bg-white/70 backdrop-blur-2xl rounded-[2rem] sm:rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-white p-6 sm:p-8 md:p-10 relative'>

              <div className='relative'>

                {/* Header */}
                <div className="text-center mb-8">
                  <h2 className='text-2xl sm:text-3xl font-black text-slate-900 tracking-tight'>
                    Sign In
                  </h2>

                  <p className='text-slate-500 mt-2 font-bold'>
                    Unlock your social universe
                  </p>
                </div>

                {/* Clerk SignIn */}
                <div className="w-full">

                  <SignIn
                    path="/login"
                    routing="path"
                    signUpUrl="/sign-up"
                    appearance={{
                      elements: {
                        rootBox: 'w-full flex justify-center',

                        card:
                          'bg-transparent shadow-none border-0 p-0 w-full',

                        header: 'hidden',

                        socialButtonsBlockButton:
                          'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all h-14 rounded-2xl shadow-sm mb-4 active:scale-[0.98]',

                        socialButtonsBlockButtonText:
                          'font-bold text-[16px]',

                        dividerLine:
                          'bg-slate-200 h-[1px]',

                        dividerText:
                          'text-slate-400 font-bold text-[12px] uppercase tracking-widest bg-white px-3',

                        formFieldLabel:
                          'text-slate-700 font-bold mb-2 text-[13px] ml-1',

                        formFieldInput:
                          'w-full bg-slate-50/50 border-slate-200 text-slate-900 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all h-13 rounded-2xl text-base px-4 font-medium',

                        formButtonPrimary:
                          'bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-xl hover:shadow-indigo-500/20 active:scale-[0.98] transition-all duration-300 h-13 text-[16px] font-bold mt-4 rounded-2xl normal-case',

                        footerActionLink:
                          'text-indigo-600 hover:text-indigo-700 font-bold ml-1 transition-colors',

                        footerActionText:
                          'text-slate-500 font-semibold',

                        identityPreviewText:
                          'text-slate-900 font-semibold',

                        identityPreviewEditButtonIcon:
                          'text-indigo-600',

                        footer:
                          'mt-8 border-t border-slate-100 pt-8 flex justify-center',

                        clerkBranding: 'hidden'
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage