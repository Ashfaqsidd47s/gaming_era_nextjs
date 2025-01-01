import Link from 'next/link';
import React from 'react'

interface GroupItemProp {
    id: string;
    name: string;
    description: string;
    groupImage: string| null;
}
  

export default function GroupItem({id, name, description, groupImage}: GroupItemProp) {
  return (
    <Link href={`groups/${id}`} >
    <div className=' border border-black p-2 flex items-center gap-2 cursor-pointer'>
      <div className=' w-[50px] h-[50px] rounded-full flex items-center justify-center overflow-hidden'>
        <img
          className='w-full h-full object-cover object-center' 
          src={ groupImage == null || groupImage == "" ? "group.png" : groupImage} alt="" />
      </div>
      <div>
        <h2 className=' font-semibold text-lg'>{name}</h2>
        <p>{description}</p>
      </div>
    </div>
    </Link>
  )
}
