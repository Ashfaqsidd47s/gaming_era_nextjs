"use client"

import userStore from '@/store/userStore';
import axios from 'axios';
import React from 'react'

interface UserItemProp {
    id: string;
    name: string;
    username: string;
    profileImage: string;
}

export default function UserItem({id, name, username, profileImage}:UserItemProp) {
    const user = userStore((state) => state.user)
    
    const handelClick = async ()=> {
        try {
            const res = await axios.post(process.env.NEXT_PUBLIC_BASE_URL + "/api/conversation", {
                conversationType: "private",
                user1Id: user?.id,
                user2Id: id,
            })
            const conversationId = res.data.conversation.id;

            window.location.replace("/messages/" + conversationId)
        } catch (err) {
            
        }
    }
  return (
    <div
        onClick={handelClick} 
        className='p-3 bg-card flex items-center  gap-3 rounded-md shadow-md cursor-pointer'>
        <div
        className='w-[50px] h-[50px] rounded-full bg-primary-foreground/30 flex items-center justify-center'
        >
            {profileImage && <img
                src={profileImage} 
                className=' w-full h-full object-cover rounded-[inherit] object-center'
            alt="" />}
        </div>
        <div className=''>
            <h2 className=' text-xl font-semibold'>
                {name}
            </h2>
            <p>@{username}</p>
        </div>
    </div>
  )
}
