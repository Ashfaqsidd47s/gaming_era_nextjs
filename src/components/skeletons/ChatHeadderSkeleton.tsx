import React from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import Skeletone from './Skeletone'

export default function ChatHeadderSkeleton() {
  return (
    <div className=' px-4 bg-white w-full h-[55px] shadow-lg flex items-center justify-between absolute top-[0px]'>
        <div className='flex items-center gap-3'>
            <div className=' w-[40px] h-[40px] rounded-full overflow-hidden flex items-center justify-center shadow-sm '>
                <Skeletone />
            </div>
            <div className=' font-semibold text-lg w-[200px] h-5 rounded-xl'> <Skeletone /> </div>
        </div>
        <div className='flex items-center gap-3'>
            <div className=' w-[35px] h-[35px] rounded-full flex items-center justify-center shadow-sm bg-gray-100'>
                <Skeletone />
            </div>
        </div>
    </div>
  )
}
