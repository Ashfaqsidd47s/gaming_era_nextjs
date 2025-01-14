"use client"

import userStore from '@/store/userStore'
import React from 'react'
import { MdOutlineEmojiEmotions } from 'react-icons/md'
import Skeletone from './skeletons/Skeletone'

export default function Navbar() {
    const user = userStore((state) => state.user)

  return (
    <div className=' w-full flex items-center justify-center sticky top-0 left-0 z-[60] '>
        <div className='w-[100%] lg:max-w-[1200px] p-4  flex items-center justify-between bg-popover'>
            <h1 className=' text-xl font-bold'>GAMING ERA</h1>
            <div className='hidden md:w-[300px] p-1 md:flex items-center relative'>
                <input
                    className=' px-6 pr-[50px] w-full h-[40px] rounded-[20px] focus:border-none focus:outline-none bg-card' 
                    type="text" 
                    placeholder='Share something'
                />
                <div
                    className='w-[40px] h-[40px] rounded-full flex items-center justify-center bg-popover absolute right-1 '
                >
                    <MdOutlineEmojiEmotions className=' text-xl' />
                </div>
            </div>
            <div className='flex items-center gap-2'>
                <div
                    className='w-[50px] h-[50px] rounded-full bg-primary-foreground/30 overflow-hidden'
                >
                    {user?
                        <img src={user.profileImage} alt="" />
                        : <Skeletone />
                    }
                </div>
            </div>
        </div>
    </div>
  )
}
