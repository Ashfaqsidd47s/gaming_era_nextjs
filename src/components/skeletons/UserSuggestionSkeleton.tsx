import React from 'react'
import Skeletone from './Skeletone'

export default function UserSuggestionSkeleton() {
  return (
    <div className='p-3 py-2 flex items-center justify-between gap-3 rounded-md'>
      <div
            className='flex-none w-[50px] h-[50px] rounded-full bg-primary-foreground/30 flex items-center justify-center'
        >
            <Skeletone />
        </div>
        <div className=' flex flex-col gap-2 w-full'>
            <div className=' text-xl w-[50%] h-[20px] font-semibold rounded-lg'>
                <Skeletone />
            </div>
            <div className=' text-xl w-[25%] h-[10px] font-semibold rounded-lg' ><Skeletone /></div>
        </div>
        <div
            className='flex-none w-[110px] p-2 h-[50px] text-primary-foreground flex items-center justify-center rounded-lg self-center' 
        ><Skeletone /></div>
    </div>
  )
}
