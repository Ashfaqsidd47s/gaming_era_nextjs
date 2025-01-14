"use client"

import React from 'react'

interface conversationProp  {
    id: string;
    name: string;
    username: string;
    lastSeen: string;
    profileImage: string;
    conversationId: string;
}


export default function ConversationItem({id, name, username, lastSeen, profileImage, conversationId}: conversationProp) {
  
  

  return (
    <div 
      className='  p-2 flex items-center gap-2 cursor-pointer rounded-md bg-card shadow-md'>
      <div className=' w-[50px] h-[50px] rounded-full flex items-center justify-center overflow-hidden'>
        <img
          className='w-full h-full object-cover object-center' 
          src={profileImage} alt="" />
      </div>
      <div>
        <h2 className=' font-semibold text-lg'>
            {name} 
            <span className=' text-sm text-muted/90 font-semibold m-2'>{lastSeen}</span>
        </h2>
        <p className=' text-muted'>{username}</p>
      </div>
    </div>
  )
}
