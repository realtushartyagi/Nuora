'use client'

import React from 'react'
import { SignUp } from '@clerk/nextjs'

const SignUpPage = () => {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0] relative overflow-hidden font-outfit p-4 sm:p-6 lg:p-8'>
      
      {/* Background decoration elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-200/30 blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-200/30 blur-[120px] animate-pulse" />

      {/* Main Container */}
      <div className='w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center z-10'>
        
        {/* Left Side: Branding (Visible on Hero screens) */}
        <div className='hidden lg:flex flex-col space-y-8 animate-in fade-in slide-in-from-left duration-1000'>
          <div className='flex items-center gap-4'>
            <div className='w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center shadow-2xl shadow-indigo-500/20'>
                <div className='w-7 h-7 border-[3px] border-white rounded-full' />
            </div>
            <h1 className="text-5xl font-black text-slate-900 tracking-tight">Nuora</h1>
          </div>

          <div className='space-y-6'>
            <h2 className='text-6xl xl:text-7xl font-bold text-slate-900 leading-tight tracking-tight'>
              Join the <br/>
              <span className='bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent'>Revolution.</span>
            </h2>
            <p className='text-xl xl:text-2xl text-slate-600 font-medium max-w-md leading-relaxed'>
              Create your account and start building authentic connections in our growing social universe.
            </p>
          </div>

          {/* Feature highlights */}
          <div className="grid grid-cols-2 gap-6 pt-8">
            <div className="p-4 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/50 shadow-sm">
                <p className="text-2xl font-bold text-slate-900">Easy</p>
                <p className="text-sm text-slate-500 font-semibold">Setup Process</p>
            </div>
            <div className="p-4 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/50 shadow-sm">
                <p className="text-2xl font-bold text-slate-900">Secure</p>
                <p className="text-sm text-slate-500 font-semibold">Authentication</p>
            </div>
          </div>
        </div>

        {/* Right Side: Sign Up Card */}
        <div className='flex items-center justify-center lg:justify-end animate-in fade-in slide-in-from-right duration-1000'>
          <div className='w-full max-w-[460px]'>
            <div className='bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-white p-8 sm:p-12 relative'>
              
              <div className='relative'>
                {/* Mobile-only Logo */}
                <div className='lg:hidden flex flex-col items-center gap-4 mb-10'>
                  <div className='w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center shadow-xl shadow-indigo-500/20'>
                    <div className='w-6 h-6 border-[3px] border-white rounded-full' />
                  </div>
                  <h1 className="text-3xl font-black text-slate-900 tracking-tight">Nuora</h1>
                </div>

                <div className="text-center mb-8">
                    <h2 className='text-3xl font-bold text-slate-900 tracking-tight'>Create Account</h2>
                    <p className='text-slate-500 mt-2 font-medium'>Join our exclusive community</p>
                </div>
                
                <div className="w-full">
                  <SignUp 
                    path="/sign-up"
                    routing="path"
                    signInUrl="/login"
                    appearance={{
                      elements: {
                        rootBox: 'w-full',
                        card: 'bg-transparent shadow-none border-0 p-0 w-full',
                        header: 'hidden',
                        socialButtonsBlockButton: 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all h-14 rounded-2xl shadow-sm mb-4 active:scale-[0.98]',
                        socialButtonsBlockButtonText: 'font-bold text-[16px]',
                        dividerLine: 'bg-slate-200 h-[1px]',
                        dividerText: 'text-slate-400 font-bold text-[12px] uppercase tracking-widest bg-white px-3',
                        formFieldLabel: 'text-slate-700 font-bold mb-2 text-[13px] ml-1',
                        formFieldInput: 'bg-slate-50/50 border-slate-200 text-slate-900 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all h-13 rounded-2xl text-base px-4 font-medium',
                        formButtonPrimary: 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-xl hover:shadow-indigo-500/20 active:scale-[0.98] transition-all duration-300 h-13 text-[16px] font-bold mt-4 rounded-2xl normal-case',
                        footerActionLink: 'text-indigo-600 hover:text-indigo-700 font-bold ml-1 transition-colors',
                        footerActionText: 'text-slate-500 font-semibold',
                        identityPreviewText: 'text-slate-900 font-semibold',
                        identityPreviewEditButtonIcon: 'text-indigo-600',
                        footer: 'mt-8 border-t border-slate-100 pt-8 flex justify-center',
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

export default SignUpPage
