import React from 'react'

export default function MembersList() {
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
            <h3 className=' font-semibold'>Members</h3>
            <div className=' flex items-center gap-1 relative'>
                {members.map((m, i) => (
                    <div key={i} className={`w-[45px] h-[45px] rounded-full flex items-center justify-center bg-primary-foreground/30 overflow-hidden`}>
                        <img className=' w-full h-full object-cover origin-center' src={m.profileImage} alt="" />
                    </div>
                ))}
            </div>
        </div>
        <button>View all</button>
      </div>
    </div>
  )
}
