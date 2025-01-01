import React from 'react'

interface MessageProp {
    self: boolean;
    message: string;
    sentAt: string;
    image?: string;
    senderName?: string;
}

export default function MessageItem({message, sentAt, senderName, image, self}: MessageProp) {
  return (
    <div className={`w-max max-w-[70%] flex gap-1  ${ self? "self-end flex-row-reverse": "self-start"}`}>
        <div className={`${image? "block": "hidden"}  w-[40px] h-[40px] rounded-full bg-gray-200 flex items-center justify-center`}>
            i
        </div>
        <div className={`flex flex-col gap-1  p-3  bg-white rounded-xl ${self ? " rounded-tr-none bg-feature/20": " rounded-tl-none"}`}>
            <h3 className={`${senderName ?"inline-block": "hidden"} font-bold`}>{senderName}</h3>
            <p>{message}</p>
            <span className=' text-xs font-thin self-end pr-4'>{sentAt}</span>
        </div>
    </div>
  )
}
