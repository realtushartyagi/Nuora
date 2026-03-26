'use client'

import React from 'react'
import { BadgeCheck, Plus } from 'lucide-react'
import { useAuth, useUser } from '@clerk/nextjs'
import api from '@/lib/api'
import toast from 'react-hot-toast'
import { useAppDispatch } from '@/store/hooks'
import { fetchUser } from '@/store/slices/userSlice'
import { useRouter } from 'next/navigation'

const NuoraUserCard = ({ user, onUpdate, isRequest }: { user: any, onUpdate?: () => void | Promise<void>, isRequest?: boolean }) => {
    const { getToken } = useAuth()
    const { user: clerkUser } = useUser()
    const dispatch = useAppDispatch()
    const router = useRouter()

    const handleConnect = async () => {
        try {
            const token = await getToken()
            const { data } = await api.post('/user/follow', { id: user._id }, {
                headers: { Authorization: `Bearer ${token}` }
            })
            if (data.success) {
                toast.success(data.message)
                if (token) dispatch(fetchUser(token))
                if (onUpdate) onUpdate()
            } else {
                toast.error(data.message)
            }
        } catch (error: any) {
            toast.error(error.message)
        }
    }

    return (
        <div className='bg-white rounded-xl shadow-md p-6 flex flex-col items-center gap-4 w-full max-w-[280px] hover:shadow-lg transition-all duration-300 border border-slate-100'>
            <div className='relative'>
                <img src={user.profile_picture} alt="" className='w-24 h-24 rounded-full object-cover shadow-inner' />
                {user.is_verified && (
                    <div className='absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-sm'>
                        <BadgeCheck className='w-5 h-5 text-blue-500' />
                    </div>
                )}
            </div>
            
            <div className='text-center'>
                <h3 className='font-bold text-slate-800 text-lg'>{user.full_name}</h3>
                <p className='text-slate-500 text-sm'>@{user.username}</p>
            </div>

            <p className='text-slate-600 text-sm text-center line-clamp-2 min-h-[40px]'>
                {user.bio || 'No bio yet'}
            </p>

            <div className='flex gap-2 w-full mt-2'>
                <button 
                    onClick={() => router.push(`/profile/${user._id}`)}
                    className='flex-1 py-2 text-sm font-medium rounded-lg bg-slate-50 text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer border border-slate-200'
                >
                    Profile
                </button>
                <button 
                    onClick={handleConnect}
                    className='flex-1 py-2 text-sm font-medium rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 transition-all flex items-center justify-center gap-1 active:scale-95 cursor-pointer shadow-md shadow-indigo-100'
                >
                    <Plus className='w-4 h-4' />
                    {isRequest ? 'Accept' : 'Connect'}
                </button>
            </div>
        </div>
    )
}

export default NuoraUserCard
