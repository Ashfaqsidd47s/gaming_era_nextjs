import Image from 'next/image'
import React from 'react'
import { MdOutlineEmojiEmotions } from 'react-icons/md'

export default function Navbar() {
  return (
    <div className=' w-full flex items-center justify-center sticky top-0 left-0 z-[60]'>
        <div className='w-[100%] lg:w-[75%] p-4 bg-red-200 flex items-center justify-between'>
            <h1>GAMING ERA</h1>
            <div className='hidden md:w-[300px] p-1 md:flex items-center bg-red-100 relative'>
                <input
                    className=' px-6 pr-[50px] w-full h-[40px] rounded-[20px] focus:border-none focus:outline-none' 
                    type="text" 
                    placeholder='Share something'
                />
                <div
                    className='w-[40px] h-[40px] rounded-full flex items-center justify-center bg-secondary absolute right-1 '
                >
                    <MdOutlineEmojiEmotions className=' text-xl' />
                </div>
            </div>
            <div className='flex items-center gap-2'>
                <div
                    className='w-[50px] h-[50px] rounded-full bg-slate-50'
                ></div>
            </div>
        </div>
    </div>
  )
}
