import Link from 'next/link';
import React from 'react'

interface conversationProp  {
    id: string;
    name: string;
    username: string;
    lastSeen: string;
    profileImage: string;
}


export default function ConversationItem({id, name, username, lastSeen, profileImage}: conversationProp) {
  return (
    <Link href={`messages/${id}`} >
    <div className=' border  p-2 flex items-center gap-2 cursor-pointer rounded-md shadow-md'>
      <div className=' w-[50px] h-[50px] rounded-full flex items-center justify-center '>
        <img
          className='w-full h-full object-cover object-center' 
          src={profileImage} alt="" />
      </div>
      <div>
        <h2 className=' font-semibold text-lg'>
            {name} 
            <span className=' text-sm text-primary/80 font-semibold'>{lastSeen}</span>
        </h2>
        <p>{username}</p>
      </div>
    </div>
    </Link>
  )
}
