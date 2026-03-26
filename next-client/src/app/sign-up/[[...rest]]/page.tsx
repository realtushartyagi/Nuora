'use client'

import React from 'react'
import { SignUp } from '@clerk/nextjs'

const SignUpPage = () => {
  return (
    <div className='min-h-screen flex items-center justify-center p-6 bg-[#0a0a0b] font-outfit relative overflow-hidden'>
      
      {/* Background elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-500/5 blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/5 blur-[120px]" />

      <div className='w-full max-w-[480px] z-10'>
        <div className='bg-[#18181b] rounded-[2.5rem] shadow-[0_40px_80px_rgba(0,0,0,0.5)] border border-white/5 p-8 md:p-10'>
          
          <div className='relative'>
            {/* Mobile-only Logo */}
            <div className='md:hidden flex items-center gap-2 mb-8 justify-center'>
              <div className='w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/20'>
                <div className='w-5 h-5 border-2 border-white rounded-full' />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-white/90 bg-clip-text text-transparent tracking-tight">Nuora</h1>
            </div>

            <h2 className='text-3xl font-extrabold text-white mb-2 text-center tracking-tight'>Create your account</h2>
            <p className='text-gray-400 mb-8 text-center text-sm font-medium'>Welcome! Please fill in the details to get started.</p>
            
            <SignUp 
              path="/sign-up"
              routing="path"
              signInUrl="/login"
              appearance={{
                elements: {
                  rootBox: 'w-full',
                  card: 'bg-transparent shadow-none border-0 p-0 w-full',
                  headerTitle: 'hidden',
                  headerSubtitle: 'hidden',
                  socialButtonsBlockButton: 'bg-[#1e1e24] border border-white/5 text-white hover:bg-[#27272a] transition-all h-12 rounded-xl shadow-sm mb-6',
                  socialButtonsBlockButtonText: 'font-semibold text-[15px]',
                  dividerLine: 'bg-white/5',
                  dividerText: 'text-gray-500 font-medium text-xs',
                  formFieldLabel: 'text-gray-300 font-bold mb-2 text-sm',
                  formFieldInput: 'bg-[#27272a] border-white/5 text-white focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all h-12 rounded-xl text-base px-4 font-medium',
                  formButtonPrimary: 'bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] hover:opacity-90 active:scale-[0.98] transition-all duration-300 shadow-xl shadow-indigo-500/20 border-0 h-12 text-[15px] font-bold mt-4 rounded-xl normal-case relative after:content-["→"] after:ml-2 after:text-lg',
                  footerActionText: 'text-gray-400 text-sm font-medium',
                  footerActionLink: 'text-indigo-400 hover:text-indigo-300 font-bold ml-1',
                  identityPreviewText: 'text-white',
                  identityPreviewEditButtonIcon: 'text-white',
                  formFieldAction: 'text-indigo-400 hover:text-indigo-300 font-bold',
                  footer: 'mt-6 border-t border-white/5 pt-6 text-center w-full flex justify-center',
                  clerkBranding: 'hidden'
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUpPage
