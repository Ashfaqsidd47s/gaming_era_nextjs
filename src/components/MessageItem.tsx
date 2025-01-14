import React from 'react'
import TimeAgo from './TimeAgo';

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
        <div className={`${image? "block": "hidden"}  w-[35px] h-[35px] rounded-full bg-card flex items-center justify-center overflow-hidden`}>
            <img src={image == null || image == ""? "/avarar.png" : image} alt="" />
        </div>
        <div className={`flex flex-col gap-1  p-3 rounded-xl ${self ? " rounded-tr-none bg-card": " rounded-tl-none bg-popover"}`}>
            <h3 className={`${senderName ?"inline-block": "hidden"} font-semibold text-muted`}>{senderName}</h3>
            <p>{message}</p>
            <span className=' text-xs font-thin self-end pr-4 text-muted'><TimeAgo date={sentAt} /></span>
        </div>
    </div>
  )
}
