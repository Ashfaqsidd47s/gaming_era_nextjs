import MembersList from '@/components/MembersList'
import React from 'react'

export default function page() {
  return (
    <div className='p-2'>
      <div className=' bg-card h-[150px] rounded-lg flex items-center justify-center' >
        cover Image
      </div>
      <div className=' p-2 mt-1 bg-card flex items-center relative'>
        <div className='absolute left-6 bottom-3 w-[80px] h-[80px] rounded-xl bg-background flex items-center justify-center' >
          img
        </div>
        <p className=' ml-[120px]'>Admin name</p>
      </div>
      <div className=' mt-1 p-5 py-1 bg-card flex items-center justify-between'>
        <h2 className=' text-lg font-semibold'>group name</h2>
        <button className=' p-3 bg-primary/90 rounded-md text-primary-foreground hover:bg-primary/80'>join group</button>
      </div>
      <div className=' mt-1 p-5 py-2 bg-card  min-h-[150px]' >description</div>
      <div className=' bg-card p-5 py-1 flex items-center gap-3'>
        <div className='p-3 py-1 bg-primary/20 rounded-full text-primary'>Active</div>
        <div className='p-3 py-1 bg-background rounded-full text-muted flex items-center justify-center gap-1'>created at</div>
        <div className='p-3 py-1 bg-background rounded-full text-muted flex items-center justify-center gap-1'>9 members</div>
      </div>
      <MembersList />
    </div>
  )
}
