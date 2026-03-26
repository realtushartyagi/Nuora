'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import moment from 'moment'
import { useAuth, useUser } from '@clerk/nextjs'
import api from '@/lib/api'
import toast from 'react-hot-toast'

interface RecentMessage {
    _id: string;
    from_user_id: {
        _id: string;
        full_name: string;
        profile_picture: string;
    };
    text: string;
    createdAt: string;
    seen: boolean;
}

const RecentMessages = () => {
    const [messages, setMessages] = useState<RecentMessage[]>([])
    const { user, isLoaded } = useUser()
    const { getToken } = useAuth()

    const fetchRecentMessages = async () => {
        try {
            const token = await getToken()
            const { data } = await api.get('/user/recent-messages', {
                headers: { Authorization: `Bearer ${token}` }
            })
            if (data.success) {
                const groupedMessages = data.messages.reduce((acc: any, message: any) => {
                    const senderId = message.from_user_id._id;
                    if (!acc[senderId] || new Date(message.createdAt) > new Date(acc[senderId].createdAt)) {
                        acc[senderId] = message
                    }
                    return acc;
                }, {})

                const sortedMessages = Object.values(groupedMessages).sort((a: any, b: any) => 
                    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                ) as RecentMessage[]

                setMessages(sortedMessages)
            } else {
                toast.error(data.message)
            }
        } catch (error: any) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (isLoaded && user) {
            fetchRecentMessages()
            const interval = setInterval(fetchRecentMessages, 30000)
            return () => clearInterval(interval)
        }
    }, [isLoaded, user])

    return (
        <div className='bg-white max-w-xs mt-4 p-4 min-h-20 rounded-md shadow text-xs text-slate-800'>
            <h3 className='font-semibold mb-4'>Recent Messages</h3>
            <div className='flex flex-col max-h-56 overflow-y-scroll no-scrollbar'>
                {messages.map((message) => (
                    <Link href={`/messages/${message.from_user_id._id}`} key={message._id} className='flex items-start gap-2 py-2 hover:bg-slate-100 transition-colors'>
                        <img src={message.from_user_id.profile_picture} alt="" className='w-8 h-8 rounded-full' />
                        <div className='w-full'>
                            <div className='flex justify-between'>
                                <p className='font-medium'>{message.from_user_id.full_name}</p>
                                <p className='text-[10px] text-slate-400'>{moment(message.createdAt).fromNow()}</p>
                            </div>
                            <div className='flex justify-between items-center'>
                                <p className='text-gray-500 truncate max-w-[120px]'>{message.text || 'Media'}</p>
                                {!message.seen && (
                                    <p className='bg-indigo-500 text-white w-4 h-4 flex items-center justify-center rounded-full text-[10px]'>1</p>
                                )}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default RecentMessages
