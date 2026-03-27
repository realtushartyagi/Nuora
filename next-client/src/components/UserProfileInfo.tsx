'use client'

import { Calendar, MapPin, PenBox, BadgeCheck } from 'lucide-react'
import moment from 'moment'
import React, { useState } from 'react'
import { User } from '@/store/slices/userSlice'
import ProfileModal from './ProfileModal'

interface UserProfileInfoProps {
    profileData: any;
    isMe: boolean;
    onUpdate: () => void;
}

const UserProfileInfo = ({ profileData, isMe, onUpdate }: UserProfileInfoProps) => {
    const [showEdit, setShowEdit] = useState(false)

    if (!profileData) return null;
    return (
        <div className='relative bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden'>
            {/* Cover Photo Backdrop */}
            <div className='h-48 w-full bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200'></div>

            <div className='px-6 md:px-10 pb-8'>
                <div className='relative flex flex-col md:flex-row items-end -mt-16 gap-6 mb-6'>
                    {/* Avatar */}
                    <div className='w-36 h-36 border-[6px] border-white shadow-xl rounded-full overflow-hidden bg-slate-100 shrink-0'>
                        <img src={profileData.profile_picture} alt="" className='w-full h-full object-cover' />
                    </div>

                    <div className='flex-1 flex flex-col md:flex-row items-center md:items-end justify-between w-full pb-2'>
                        <div className='text-center md:text-left'>
                            <div className='flex items-center justify-center md:justify-start gap-2'>
                                <h1 className='text-2xl font-bold text-slate-900'>{profileData.full_name}</h1>
                                {profileData.is_verified && <BadgeCheck className='w-6 h-6 text-indigo-500' />}
                            </div>
                            <p className='text-slate-500 font-medium'>@{profileData.username || 'username'}</p>
                        </div>

                        {isMe && (
                            <button 
                                onClick={() => setShowEdit(true)} 
                                className='mt-4 md:mt-0 flex items-center gap-2 border border-slate-200 hover:bg-slate-50 px-5 py-2.5 rounded-xl font-semibold transition-all text-slate-700 shadow-sm cursor-pointer'
                            >
                                <PenBox className="w-4 h-4" />
                                Edit
                            </button>
                        )}
                    </div>
                </div>

                <div className='space-y-4'>
                    <p className='text-slate-600 text-[15px] max-w-2xl leading-relaxed text-center md:text-left'>
                        {profileData.bio || 'Hey there! I am using Nuora.'}
                    </p>

                    <div className='flex flex-wrap items-center justify-center md:justify-start gap-x-8 gap-y-3 text-sm text-slate-500 font-medium'>
                        <span className='flex items-center gap-2'>
                            <MapPin className='w-4 h-4 text-slate-400' />
                            {profileData.location || 'Add location'}
                        </span>
                        <span className='flex items-center gap-2'>
                            <Calendar className='w-4 h-4 text-slate-400' />
                            Joined <span className='text-slate-600 font-semibold'>{moment(profileData.createdAt).fromNow()}</span>
                        </span>
                    </div>

                    <div className='flex items-center justify-center md:justify-start gap-12 pt-6 border-t border-slate-100'>
                        <div className="flex flex-col items-center md:items-start">
                            <p className='text-xl font-bold text-slate-900'>{profileData.posts_count || 0}</p>
                            <p className='text-xs text-slate-400 uppercase tracking-widest font-bold mt-0.5'>Posts</p>
                        </div>
                        <div className="flex flex-col items-center md:items-start">
                            <p className='text-xl font-bold text-slate-900'>{profileData.followers?.length || 0}</p>
                            <p className='text-xs text-slate-400 uppercase tracking-widest font-bold mt-0.5'>Followers</p>
                        </div>
                        <div className="flex flex-col items-center md:items-start">
                            <p className='text-xl font-bold text-slate-900'>{profileData.following?.length || 0}</p>
                            <p className='text-xs text-slate-400 uppercase tracking-widest font-bold mt-0.5'>Following</p>
                        </div>
                    </div>
                </div>
            </div>
            {showEdit && <ProfileModal initialData={profileData} setShowEdit={(val) => { setShowEdit(val); if(!val) onUpdate(); }} />}
        </div>
    )
}

export default UserProfileInfo
