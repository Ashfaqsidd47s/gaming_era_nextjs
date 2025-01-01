"use client"

import { MdOutlineEmojiEmotions } from 'react-icons/md'
import React, { useState } from 'react'
import Image from 'next/image'
import { CldUploadWidget } from 'next-cloudinary'
import axios from 'axios'
import userStore from '@/store/userStore'
import { FaImages } from 'react-icons/fa'
import { BiLoaderAlt } from 'react-icons/bi'


export default function PostBar() {
    const user = userStore((state) => state.user)
    const [postContent, setPostContent] = useState("")
    const [image, setImage] = useState("")
    const [isRequesting, setIsRequesting] = useState(false);

    const handelSaveImage = (res: any)=>{
        setImage(res.info.secure_url)
    }

    const handelSubmit = async (e: any) => {
        e.preventDefault();
        try {
            setIsRequesting(true)
            
            const res = await axios.post(process.env.NEXT_PUBLIC_BASE_URL + "/api/posts",  {
                userId: user?.id,
                content: postContent,
                img: image
            }) 
            setIsRequesting(false)
            window.location.reload()
        } catch (err) {
            setIsRequesting(false)
        }
    }

  return (
    <div className=' p-4 bg-secondary flex flex-col gap-1 rounded-2xl'>
        <div className=' p-1 flex items-center bg-red-100 relative'>
            <div
                className='w-[40px] h-[40px] rounded-full flex items-center justify-center bg-secondary absolute left-1 '
            >
            <Image
                src="/avatar.png"
                width={38}
                height={38}
                alt="..."
                />
            </div>
            <input
                className='px-[50px] w-full h-[40px] rounded-[20px] focus:border-none focus:outline-none' 
                type="text" 
                placeholder='Share something'
                onChange={(e)=> setPostContent(e.target.value)}
            />
            <div
                className='w-[40px] h-[40px] rounded-full flex items-center justify-center bg-secondary absolute right-1 '
            >
                <MdOutlineEmojiEmotions className=' text-xl' />
            </div>
        </div>
        <div className='flex items-center justify-between'>
        <CldUploadWidget 
            uploadPreset="gamingera"
            onSuccess={(res)=> handelSaveImage(res)}
        >
            {({ open }) => {
                return (
                <button
                    className='px-3 text-2xl text-primary/80'
                 onClick={() => open()}>
                   <FaImages />
                </button>
                );
            }}
        </CldUploadWidget>
            <button 
                className=' p-2 w-[100px] bg-primary text-primary-foreground font-semibold flex items-center justify-center rounded-lg hover:bg-primary/90'
                onClick={(e) => handelSubmit(e)}>
                    {isRequesting ? <BiLoaderAlt className=' animate-spin' /> : "Send"}
                </button>
        </div>
        <div className={`${image == "" ? "hidden" : "block"} p-4 h-[300px] rounded-md`} >
            {image && (
                <img 
                    className=' w-full h-full object-cover object-center rounded-[inherit]'
                    src={image} 
                    alt="Uploaded content" 
                />
            )}
        </div>
    </div>
  )
}
