'use client'

import React, { useState } from 'react'
import { BadgeCheck, Heart, MessageCircle, Share2 } from 'lucide-react'
import moment from 'moment'
import { useRouter } from 'next/navigation'
import { useAppSelector } from '@/store/hooks'
import { useAuth } from '@clerk/nextjs'
import api from '@/lib/api'
import toast from 'react-hot-toast'
import { Message } from '@/store/slices/messagesSlice'

export interface Post {
    _id: string;
    user: {
        _id: string;
        full_name: string;
        username: string;
        profile_picture: string;
    };
    content: string;
    image_urls: string[];
    post_type: string;
    likes_count: string[];
    createdAt: string;
    updatedAt: string;
}

const PostCard = ({ post }: { post: Post }) => {

    const postWithHashtags = post.content.replace(/(#\w+)/g, '<span class="text-indigo-600">$1</span>')
    const [likes, setLikes] = useState<string[]>(post.likes_count)
    const currentUser = useAppSelector((state) => state.user.value)
    const router = useRouter()
    const { getToken } = useAuth()

    const handleLike = async () => {
        try {
            const token = await getToken()
            const { data } = await api.post(`/post/like`, { postId: post._id }, { headers: { Authorization: `Bearer ${token}` } })

            if (data.success) {
                toast.success(data.message)
                if (currentUser) {
                    setLikes(prev => {
                        if (prev.includes(currentUser._id)) {
                            return prev.filter(id => id !== currentUser._id)
                        } else {
                            return [...prev, currentUser._id]
                        }
                    })
                }
            } else {
                toast(data.message)
            }
        } catch (error: any) {
            toast.error(error.message)
        }
    }

    return (
        <div className='bg-white rounded-2xl shadow-sm border border-slate-100 p-5 space-y-4 w-full max-w-2xl'>
            {/* User Info */}
            <div onClick={() => router.push('/profile/' + post.user._id)} className='inline-flex items-center gap-3 cursor-pointer group'>
                <img src={post.user.profile_picture} alt="" className='w-11 h-11 rounded-full shadow-sm border border-slate-100 object-cover' />
                <div>
                    <div className='flex items-center gap-1.5'>
                        <span className='font-bold text-slate-900 group-hover:text-indigo-600 transition-colors'>{post.user.full_name}</span>
                        <BadgeCheck className='w-4.5 h-4.5 text-indigo-500' />
                    </div>
                    <div className='text-slate-500 text-[13px] font-medium'>@{post.user.username} • {moment(post.createdAt).fromNow()}</div>
                </div>
            </div>
            {/* Content */}
            {post.content && (
                <div 
                    className='text-slate-800 text-[15px] leading-relaxed whitespace-pre-line' 
                    dangerouslySetInnerHTML={{ __html: postWithHashtags }} 
                />
            )}

            {/* Images */}
            <div className='grid grid-cols-2 gap-2'>
                {post.image_urls.map((img, index) => (
                    <img key={index} src={img} className={`w-full h-64 object-cover rounded-xl shadow-sm ${post.image_urls.length === 1 && 'col-span-2 h-auto max-h-[500px]'}`} alt="" />
                ))}
            </div>

            {/* Actions */}
            <div className='flex items-center gap-6 text-slate-500 text-[13px] pt-3 border-t border-slate-50 font-bold'>
                <div className='flex items-center gap-2 cursor-pointer group/like'>
                    <div className={`p-2 rounded-full transition-colors ${currentUser && likes.includes(currentUser._id) ? 'bg-red-50 text-red-500' : 'group-hover/like:bg-slate-50'}`} onClick={(e) => { e.stopPropagation(); handleLike(); }}>
                        <Heart 
                            className={`w-4.5 h-4.5 ${currentUser && likes.includes(currentUser._id) ? 'fill-red-500' : ''}`} 
                        />
                    </div>
                    <span className={currentUser && likes.includes(currentUser._id) ? 'text-red-500' : ''}>{likes.length}</span>
                </div>
                <div className='flex items-center gap-2 cursor-pointer group/comment hover:text-slate-800'>
                    <div className='p-2 rounded-full group-hover/comment:bg-slate-50 transition-colors'>
                        <MessageCircle className="w-4.5 h-4.5" />
                    </div>
                    <span>{12}</span>
                </div>
                <div className='flex items-center gap-2 cursor-pointer group/share hover:text-slate-800'>
                    <div className='p-2 rounded-full group-hover/share:bg-slate-50 transition-colors'>
                        <Share2 className="w-4.5 h-4.5" />
                    </div>
                    <span>{7}</span>
                </div>
            </div>
        </div>
    )
}

export default PostCard
