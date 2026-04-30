'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, HelpCircle, Mail, MessageSquare, ChevronDown, Send } from 'lucide-react'

export default function SupportPage() {
  const [feedback, setFeedback] = useState('')
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const faqs = [
    { q: "How do I change my username?", a: "You can change your username in the Edit Profile section of settings. Note that you can only change it once every 30 days." },
    { q: "How can I make my account private?", a: "Go to Settings > Privacy & Security and toggle the 'Private Account' option." },
    { q: "Is Nuora available on mobile?", a: "We are currently working on dedicated iOS and Android apps. For now, you can use our responsive web app on any mobile browser." },
    { q: "How do I report a bug?", a: "You can use the feedback form below or email us at support@nuora.app with screenshots and details." },
  ]

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="mb-8 flex items-center gap-4">
        <Link 
          href="/authenticated/settings" 
          className="p-2 hover:bg-slate-100 rounded-full transition-all text-slate-500"
        >
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Help & Support</h1>
          <p className="text-slate-500 mt-1 font-medium">Need help? We're here for you</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* FAQ Section */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2.5 bg-slate-50 text-slate-600 rounded-xl">
              <HelpCircle className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Frequently Asked Questions</h3>
          </div>
          
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-slate-50 rounded-2xl overflow-hidden">
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-4 bg-slate-50/50 hover:bg-slate-50 transition-all text-left cursor-pointer"
                >
                  <span className="font-bold text-slate-800">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && (
                  <div className="p-4 bg-white text-slate-600 text-sm leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact & Feedback */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Contact Us</h3>
            <p className="text-sm text-slate-500 mb-6">Can't find what you're looking for? Our team is available 24/7.</p>
            
            <div className="space-y-3">
              <button className="w-full flex items-center gap-3 p-4 bg-indigo-50 text-indigo-600 rounded-2xl font-bold hover:bg-indigo-100 transition-all cursor-pointer">
                <Mail className="w-5 h-5" />
                Email Support
              </button>
              <button className="w-full flex items-center gap-3 p-4 bg-slate-50 text-slate-600 rounded-2xl font-bold hover:bg-slate-100 transition-all cursor-pointer border border-slate-100">
                <MessageSquare className="w-5 h-5" />
                Live Chat
              </button>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Send Feedback</h3>
            <div className="space-y-4">
              <textarea 
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="How can we improve Nuora?"
                rows={3}
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all resize-none placeholder:text-slate-400 text-sm"
              />
              <button className="flex items-center justify-center gap-2 w-full py-3.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl hover:from-indigo-600 hover:to-purple-700 transition-all font-bold shadow-lg shadow-indigo-100 active:scale-95 cursor-pointer">
                <Send className="w-4 h-4" />
                Submit Feedback
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
