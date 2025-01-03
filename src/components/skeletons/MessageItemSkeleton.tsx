import React from 'react'
import Skeletone from './Skeletone'

export default function MessageItemSkeleton({self=false}) {
  return (
    <div className={`w-max max-w-[70%] flex gap-1  ${ self? "self-end flex-row-reverse": "self-start"}`}>
        <div className={`flex flex-col gap-2  p-3  bg-white rounded-xl ${self ? " rounded-tr-none bg-feature/20": " rounded-tl-none"}`}>
            <h3 className={` font-bold w-[170px] h-5 rounded-xl`}><Skeletone /></h3>
            <div className=' w-[200px] h-8 rounded-xl'><Skeletone /></div>
            <span className=' text-xs font-thin self-end pr-4 w-[100px] h-3 rounded-lg'><Skeletone /></span>
        </div>
    </div>
  )
}
