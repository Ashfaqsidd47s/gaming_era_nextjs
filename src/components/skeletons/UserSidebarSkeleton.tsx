import React from 'react'
import Skeletone from './Skeletone'

export default function UserSidebarSkeleton() {
  return (
    <div className=' hidden md:flex lg:p-2 items-center gap-2 rounded-xl bg-popover'>
        <div
            className=' flex-none w-[50px] h-[50px] rounded-full  flex items-center justify-center bg-primary-foreground/30 overflow-hidden'
        >  
            <Skeletone />  
        </div>
        <div className='hidden lg:block w-full' >
            <div className=' mb-2 w-[70%] h-4  rounded-lg bg-primary-foreground/30 animate-pulse'></div>
            <div
                className='w-[50%] h-3  rounded-lg bg-primary-foreground/30 animate-pulse'
            ></div>
        </div>
    </div>
  )
}
