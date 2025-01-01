import React from 'react'

interface UserItemProp {
    id: string;
    name: string;
    username: string;
    profileImage: string;
}

export default function UserItem({id, name, username, profileImage}:UserItemProp) {
  return (
    <div className='p-3 bg-fuchsia-200 flex items-center  gap-3 rounded-md shadow-md'>
        <div
        className='w-[50px] h-[50px] rounded-full bg-gray-200 flex items-center justify-center'
        >
            {profileImage && <img
                src={profileImage} 
                className=' w-full h-full object-cover rounded-[inherit] object-center'
            alt="" />}
        </div>
        <div className=' flex-grow'>
            <h2 className=' text-xl font-semibold'>
                {name}
            </h2>
            <p>@{username}</p>
        </div>
    </div>
  )
}
