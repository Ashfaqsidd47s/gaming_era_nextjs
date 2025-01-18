import React from 'react'
import Skeletone from './Skeletone'

export default function MembersListSkeleton() {
    const members = [
        {profileImage: "/avatar.png"},
        {profileImage: "/avatar.png"},
        {profileImage: "/avatar.png"},
        {profileImage: "/avatar.png"},
    ]

  return (
    <div className=' mt-1 p-2 bg-card rounded-lg'>
      <div className='p-3 bg-background rounded-lg flex items-center justify-between'>
        <div className=' flex items-center gap-3'>
            <div className=' font-semibold w-[120px] h-5 rounded-xl'><Skeletone /></div>
            <div className=' flex items-center gap-1 relative'>
                {members.map((m, i) => (
                    <div key={i} className={`w-[45px] h-[45px] rounded-full flex items-center justify-center bg-primary-foreground/20 overflow-hidden`}>
                        <Skeletone />
                    </div>
                ))}
            </div>
        </div>
        <div className=' w-[100px] h-4 rounded-lg'><Skeletone /></div>
      </div>
    </div>
  )
}
