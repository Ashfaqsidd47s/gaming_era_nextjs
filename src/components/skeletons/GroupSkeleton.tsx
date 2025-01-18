import React from 'react'
import MembersList from '../MembersList'
import Skeletone from './Skeletone'
import MembersListSkeleton from './MembersListSkeleton'

export default function GroupSkeleton() {
  return (
    <div className='p-2'>
          <div className=' bg-card h-[150px] rounded-lg flex items-center justify-center' >
            <Skeletone />
          </div>
          <div className=' p-2 mt-1 bg-card flex items-center relative'>
            <div className='absolute left-6 bottom-3 w-[80px] h-[80px] rounded-xl bg-primary-foreground/20 flex items-center justify-center' >
                <Skeletone />
            </div>
            <div className=' ml-[120px] w-[200px] h-5 rounded-xl '><Skeletone /></div>
          </div>
          <div className=' mt-1 p-5 py-1 bg-card flex items-center justify-between'>
          <div className=' w-[180px] h-6 rounded-xl '><Skeletone /></div>
            <div className='bg-primary/30 rounded-md w-[100px] h-10 text-primary-foreground hover:bg-primary/80'><Skeletone /></div>
          </div>
          <div className=' mt-1 p-5 py-2 bg-card  min-h-[150px]' >
            <div className=' mt-2 w-full h-6 rounded-xl '><Skeletone /></div>
            <div className='mt-2 w-[50%] h-6 rounded-xl '><Skeletone /></div>
            <div className='mt-2 w-[50%] h-6 rounded-xl '><Skeletone /></div>
            <div className='mt-2 w-[30%] h-6 rounded-xl '><Skeletone /></div>
          </div>
          <div className=' bg-card p-5 py-1 flex items-center gap-3'>
            <div className=' bg-primary/20 w-[100px] h-7 rounded-full text-primary'><Skeletone /></div>
            <div className='bg-background rounded-full w-[100px] h-7 text-muted flex items-center justify-center gap-1'><Skeletone /></div>
            <div className='bg-background rounded-full w-[100px] h-7 text-muted flex items-center justify-center gap-1'><Skeletone /></div>
          </div>
          <MembersListSkeleton />
        </div>
  )
}
