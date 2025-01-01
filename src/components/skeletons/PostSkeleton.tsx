import React from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import Skeletone from './Skeletone'


export default function PostSkeleton() {
    return (
    <div className='  p-4 rounded-md'>
        <header className='py-3 flex items-center justify-between gap-3'>
            <div
                className='w-[50px] h-[50px] rounded-full  flex items-center justify-center overflow-hidden'
            ><Skeletone /></div>
            <div className=' flex-grow '>
                <div className=' w-[50%] h-[24px] rounded-xl mb-2'>
                    <Skeletone />
                </div>
                <div className=' w-[30%] h-[16px] rounded-xl'><Skeletone /></div>
            </div>
            
        </header>
        <main
            className=' h-[300px] rounded-2xl mb-2'
        >
            <Skeletone />
        </main>
        <footer
            className='flex items-center gap-3'
        >
            <div className='w-[50px] h-[16px] rounded-xl'><Skeletone /></div>
            <div className='w-[50px] h-[16px] rounded-xl'><Skeletone /></div>
            <div className='w-[50px] h-[16px] rounded-xl'><Skeletone /></div>
        </footer>
    </div>
    )
}
