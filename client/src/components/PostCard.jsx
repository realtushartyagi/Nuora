import React, { useState } from 'react'
import { BadgeCheck, Heart, MessageCircle, Share2 } from 'lucide-react'
import moment from 'moment'
import { dummyUserData } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { useAuth } from '@clerk/clerk-react'
import api from '../api/axios'
import toast from 'react-hot-toast'

const PostCard = ({post}) => {

    const postWithHashtags = post.content.replace(/(#\w+)/g, '<span class="text-indigo-600">$1</span>')
    const [likes, setLikes] = useState(post.likes_count)
    const currentUser = useSelector((state) => state.user.value)

    const { getToken } = useAuth()

    const handleLike = async () => {
        try {
            const { data } = await api.post(`/api/post/like`, {postId: post._id}, {headers: { Authorization: `Bearer ${await getToken()}` }})

            if (data.success){
               toast.success(data.message) 
               setLikes(prev =>{
                if(prev.includes(currentUser._id)){
                    return prev.filter(id=> id !== currentUser._id)
                }else{
                    return [...prev, currentUser._id]
                }
               })
            }else{
                toast(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const navigate = useNavigate()

  return (
    <div className='bg-white rounded-xl shadow p-4 space-y-4 w-full max-w-2xl'>
        {/* User Info */}
        <div onClick={()=> navigate('/profile/' + post.user._id)} className='inline-flex items-center gap-3 cursor-pointer'>
            <img src={post.user.profile_picture} alt="" className='w-10 h-10 rounded-full shadow'/>
            <div>
                <div className='flex items-center space-x-1'>
                    <span>{post.user.full_name}</span>
                    <BadgeCheck className='w-4 h-4 text-blue-500'/>
                </div>
                <div className='text-gray-500 text-sm'>@{post.user.username} • {moment(post.createdAt).fromNow()}</div>
            </div>
        </div>
         {/* Content */}
         {post.content && <div className='text-gray-800 text-sm whitespace-pre-line' dangerouslySetInnerHTML={{__html: postWithHashtags}}/>}

       {/* Images */}
       <div className='grid grid-cols-2 gap-2'>
            {post.image_urls.map((img, index)=>(
                <img src={img} key={index} className={`w-full h-48 object-cover rounded-lg ${post.image_urls.length === 1 && 'col-span-2 h-auto'}`} alt="" />
            ))}
       </div>

        {/* Actions */}
        <div className='flex items-center gap-4 text-gray-600 text-sm pt-2 border-t border-gray-300'>
            <div className='flex items-center gap-1'>
                <Heart className={`w-4 h-4 cursor-pointer ${likes.includes(currentUser._id) && 'text-red-500 fill-red-500'}`} onClick={handleLike}/>
                <span>{likes.length}</span>
            </div>
            <div className='flex items-center gap-1'>
                <MessageCircle className="w-4 h-4"/>
                <span>{12}</span>
            </div>
            <div className='flex items-center gap-1'>
                <Share2 className="w-4 h-4"/>
                <span>{7}</span>
            </div>

        </div>


    </div>
  )
}

export default PostCard
