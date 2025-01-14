import Link from 'next/link';
import React from 'react'

interface GroupItemProp {
    id: string;
    name: string;
    description: string;
    groupImage: string| null;
    members: {user : {profileImage: string}}[]
}
  

export default function GroupItem({id, name, description, groupImage, members}: GroupItemProp) {
  return (
    <Link className=' w-full px-2' href={`groups/${id}`} >
    <div className=' bg-card p-2 flex items-center justify-between cursor-pointer w-full rounded-lg hover:bg-popover'>
      <div className='flex items-center gap-2'>
        <div className=' w-[50px] h-[50px] rounded-full flex items-center justify-center overflow-hidden bg-popover'>
          <img
            className='w-full h-full object-cover object-center' 
            src={ groupImage == null || groupImage == "" ? "group.png" : groupImage} alt="" />
        </div>
        <div>
          <h2 className=' font-semibold text-lg'>{name}</h2>
          <p>{description}</p>
        </div>
      </div>
      <div >
        <div className=' flex items-center gap-1 relative'>
          {members.map((m, i) => (
            <div key={i} className={`w-[25px] h-[25px] rounded-full flex items-center justify-center bg-primary-foreground/30 overflow-hidden`}>
              <img className=' w-full h-full object-cover origin-center' src={m.user.profileImage} alt="" />
            </div>
          ))}
        </div>
      </div>
    </div>
    </Link>
  )
}
