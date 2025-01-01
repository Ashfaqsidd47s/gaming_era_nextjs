"use client"
import userStore from '@/store/userStore';
import axios from 'axios';
import React, { useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { IoMdHeart, IoMdHeartEmpty } from 'react-icons/io';
import TimeAgo from './TimeAgo';
import { MdComment } from 'react-icons/md';
import { FaBookmark, FaRegBookmark } from "react-icons/fa";

interface postProps {
    id: string;
    username: string;
    postedAt: string;
    content: string;
    img: string;
    userImg: string | null;
    likes: number;
    comments: number;
    isLiked: boolean;
}

export default function Post({id, content, username, postedAt, img, userImg, likes,comments, isLiked} : postProps) {
    const user = userStore((state) => state.user)
    const [curIsLiked, setCurIsLiked] = useState(isLiked)
    const [curLikes, setCurLikes] = useState(likes)
    const [isSaved, setIsSaved] = useState(false)

    const updateLike = async ()=> {
        try {
            curIsLiked? setCurLikes(curLikes  - 1): setCurLikes(curLikes + 1)
            setCurIsLiked(!curIsLiked)
            const res = await axios.post(process.env.NEXT_PUBLIC_BASE_URL + "/api/like", {
                postId: id,
                userId: user?.id
            })
            console.log(userImg)
            setCurIsLiked(res.data.isLiked)
            setCurLikes(res.data.likes)
        } catch (err) {
            curIsLiked? setCurLikes(curLikes  - 1): setCurLikes(curLikes + 1)
            setCurIsLiked(!curIsLiked)
        }
    }

    const handelSave = async ()=> {
        setIsSaved(!isSaved)
    }

  return (
    <div className=' bg-green-200 p-4 rounded-md'>
        <header className='py-3 bg-fuchsia-200 flex items-center justify-between gap-3'>
            <div
                className='w-[50px] h-[50px] rounded-full bg-gray-200 flex items-center justify-center'
            >
                <img 
                    src={userImg ? userImg: "/avatar.png"} 
                    alt=""
                    className=' w-full h-full object-cover object-center rounded-[inherit]'
                 />
            </div>
            <div className=' flex-grow'>
                <h2 className=' text-xl font-semibold'>
                    {username}
                </h2>
                <p  className=' text-sm text-primary/80'><TimeAgo date={postedAt} /></p>
            </div>
            <div
                className='w-[40px] h-[40px] rounded-full bg-gray-200 flex items-center justify-center text-xl' 
            >
                <BsThreeDotsVertical />
            </div>
        </header>
        <p className=' my-2 text-lg font-semibold'>{content}</p>
        {img != "" && <main
            className='border-2 h-[300px] rounded-2xl mb-2 '
            >
                <img 
                    src={img} 
                    alt=""
                    className=' w-full h-full object-cover object-center rounded-[inherit]'
                 />
            </main>
            }

        <footer
            className='flex items-center justify-between'
        >
            <div className=' flex items-center gap-3'>
                <button className='flex gap-1 items-center text-red-500 font-semibold' onClick={updateLike}>
                    {curIsLiked ? <IoMdHeart className=' text-3xl' /> : <IoMdHeartEmpty className='text-3xl' />}{curLikes > 0 ? curLikes: "Be first to "}{curLikes > 1 ? " Likes" : " Like"}
                </button>
                <button className='flex gap-1 items-center  text-primary/90' >
                    <MdComment className='text-2xl' />
                    {`${comments} comment${comments > 1 ?'s' : ''}`}
                </button>
            </div>
            <button className='text-2xl' onClick={handelSave}>
                {isSaved ?<FaBookmark /> :<FaRegBookmark /> }
            </button>
        </footer>
    </div>
  )
}
