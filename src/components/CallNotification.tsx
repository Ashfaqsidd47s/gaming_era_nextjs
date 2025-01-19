"use client"
import React, { useState } from 'react'
import { MdCall, MdCallEnd } from 'react-icons/md'

interface CallData {
    name: string;
    profileImage: string;
    answerOfCall: (ans: boolean)=> void
}

export default function CallNotification({name, profileImage, answerOfCall}: CallData) {
    
  return (
    <div className=' p-3 w-[300px]  bg-popover rounded-xl shadow-md shadow-primary/50 absolute top-2 right-2 z-50 flex items-center justify-between gap-2'>
        <div className=' flex-none w-[50px] h-[50px] rounded-full bg-background flex items-center justify-center overflow-hidden'> 
            <img 
                className=' w-full h-full object-cover object-center'
                src={profileImage ? profileImage : "/avatar.png"} alt="" />
        </div>
        <div>{name} <span className=' text-sm font-thin text-muted'>(calling...)</span></div>
        <div className=' flex items-center gap-2'>
            <button onClick={() => answerOfCall(true)} className=' w-[45px] h-[45px] bg-primary/80 rounded-full flex items-center justify-center text-3xl hover:bg-primary/90'><MdCall /></button>
            <button onClick={() => answerOfCall(false)} className=' w-[45px] h-[45px] bg-destructive rounded-full flex items-center justify-center text-3xl hover:bg-destructive/90'><MdCallEnd /></button>
        </div>
    </div>
  )
}
