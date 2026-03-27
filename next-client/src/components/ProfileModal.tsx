'use client'

import React, { useState, useEffect } from 'react'
import { Pencil, X } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { updateUser } from '@/store/slices/userSlice';
import { useAuth } from '@clerk/nextjs';
import toast from 'react-hot-toast';

interface ProfileModalProps {
    setShowEdit: (show: boolean) => void;
}

const ProfileModal = ({ setShowEdit }: ProfileModalProps) => {

    const dispatch = useAppDispatch();
    const { getToken } = useAuth()
    const user = useAppSelector((state) => state.user.value)

    const [editForm, setEditForm] = useState<any>({
        username: user?.username || '',
        bio: user?.bio || '',
        location: user?.location || '',
        profile_picture: null,
        cover_photo: null,
        full_name: user?.full_name || '',
    })

    useEffect(() => {
        if (user) {
            setEditForm((prev: any) => ({
                ...prev,
                username: user.username || prev.username,
                full_name: user.full_name || prev.full_name,
                bio: user.bio || prev.bio,
                location: user.location || prev.location,
            }))
        }
    }, [user])


    if (!user) return null;

    const handleSaveProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const userData = new FormData();
            const { full_name, username, bio, location, profile_picture, cover_photo } = editForm

            userData.append('username', username);
            userData.append('bio', bio);
            userData.append('location', location);
            userData.append('full_name', full_name);
            if (profile_picture) userData.append('profile', profile_picture)
            if (cover_photo) userData.append('cover', cover_photo)

            const token = await getToken()
            if (token) {
                dispatch(updateUser({ userData, token }))
            }

            setShowEdit(false)
        } catch (error: any) {
            toast.error(error.message)
        }
    }

    return (
        <div className='fixed inset-0 z-[120] overflow-y-auto bg-black/60 backdrop-blur-sm flex items-start justify-center p-4 sm:p-6'>
            <div className='w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden mt-10'>
                <div className='p-6 border-b border-slate-100 flex items-center justify-between'>
                    <h1 className='text-2xl font-bold text-gray-900'>Edit Profile</h1>
                    <button onClick={() => setShowEdit(false)} className="p-2 hover:bg-slate-50 rounded-full transition-colors cursor-pointer">
                        <X className="w-6 h-6 text-slate-500" />
                    </button>
                </div>

                <form className='p-6 space-y-6' onSubmit={(e) => toast.promise(handleSaveProfile(e), { loading: 'Saving...', success: 'Profile updated!', error: 'Update failed' })}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Profile Picture */}
                        <div className='flex flex-col items-center gap-3'>
                            <label htmlFor="profile_picture" className='block text-sm font-semibold text-gray-700 mb-2 w-full text-center'>
                                Profile Picture
                                <input hidden type="file" accept="image/*" id="profile_picture" onChange={(e) => e.target.files && setEditForm({ ...editForm, profile_picture: e.target.files[0] })} />
                                <div className='group relative mx-auto mt-2 cursor-pointer'>
                                    <img 
                                      src={editForm.profile_picture ? URL.createObjectURL(editForm.profile_picture) : user.profile_picture} 
                                      alt="" 
                                      className='w-32 h-32 rounded-full object-cover border-4 border-slate-50 shadow-md' 
                                    />
                                    <div className='absolute inset-0 bg-black/30 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity'>
                                        <Pencil className="w-6 h-6 text-white" />
                                    </div>
                                </div>
                            </label>
                        </div>

                        {/* Cover Photo */}
                        <div className='flex flex-col items-center gap-3'>
                            <label htmlFor="cover_photo" className="block text-sm font-semibold text-gray-700 mb-2 w-full text-center">
                                Cover Photo
                                <input hidden type="file" accept="image/*" id="cover_photo" onChange={(e) => e.target.files && setEditForm({ ...editForm, cover_photo: e.target.files[0] })} />
                                <div className='group relative mx-auto mt-2 cursor-pointer w-full'>
                                    <img 
                                      src={editForm.cover_photo ? URL.createObjectURL(editForm.cover_photo) : user.cover_photo} 
                                      alt="" 
                                      className='w-full h-32 rounded-xl bg-slate-100 object-cover shadow-sm' 
                                    />
                                    <div className='absolute inset-0 bg-black/30 rounded-xl opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity'>
                                        <Pencil className="w-6 h-6 text-white" />
                                    </div>
                                </div>
                            </label>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
                            <input type="text" className='w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all' placeholder='Enter your full name' onChange={(e) => setEditForm({ ...editForm, full_name: e.target.value })} value={editForm.full_name} />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Username</label>
                            <input type="text" className='w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all' placeholder='Choose a username' onChange={(e) => setEditForm({ ...editForm, username: e.target.value })} value={editForm.username} />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Bio</label>
                        <textarea rows={3} className='w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none' placeholder='Describe yourself...' onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })} value={editForm.bio} />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Location</label>
                        <input type="text" className='w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all' placeholder='City, Country' onChange={(e) => setEditForm({ ...editForm, location: e.target.value })} value={editForm.location} />
                    </div>

                    <div className='flex justify-end space-x-3 pt-6 border-t border-slate-50'>
                        <button onClick={() => setShowEdit(false)} type='button' className='px-6 py-2.5 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors font-medium cursor-pointer'>Cancel</button>
                        <button type='submit' className='px-8 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all font-bold shadow-lg shadow-indigo-100 active:scale-95 cursor-pointer'>Save Profile</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ProfileModal
