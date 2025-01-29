import userStore from '@/store/userStore';
import axios from 'axios';
import React, { useState } from 'react'
import { BiLoaderAlt } from 'react-icons/bi'

interface RecievedRequestProp{
    id: string;
    user_id: string;
    name: string;
    username: string;
    profileImage: string| null;
}

export default function RecievedRequestItem({id, user_id, name, username, profileImage}: RecievedRequestProp) {
    const user = userStore((state)=> state.user)
    const [isAcceptLoading, setIsAcceptLoading] = useState(false)
    const [isDeclineLoading, setIsDeclineLoading] = useState(false)
    const [isSent, setIsSent] = useState(false)
    const [resText, setResText] = useState("")


    const handelAcceptOrReject = async (isRequestAccepting: boolean)=> {
        try {
            isRequestAccepting? setIsAcceptLoading(true) : setIsDeclineLoading(true)
            const res = await axios.put(process.env.NEXT_PUBLIC_BASE_URL + "/api/followrequest/",  {
                userId: user?.id,
                followRequestId: id,
                isAccepting: isRequestAccepting
            })
            setIsSent(true)
            if(isRequestAccepting){
                setResText("Request Accepted")
            } else {
                setResText("Request Declined")
            }
            isRequestAccepting? setIsAcceptLoading(false) : setIsDeclineLoading(false)
        } catch (err) {
            isRequestAccepting? setIsAcceptLoading(false) : setIsDeclineLoading(false)
        }
    }

    

  return (
    <div className='p-3 bg-card flex flex-col md:flex-row items-center justify-between gap-3 rounded-md'>
        <div className='w-full flex-grow flex items-center gap-3'>
            <div
                className='w-[50px] h-[50px] rounded-full bg-gray-200 flex items-center justify-center'
            >
                {profileImage && <img
                    src={profileImage == null || profileImage == "" ? "avatar.png": profileImage} 
                    className=' w-full h-full object-cover rounded-[inherit] object-center'
                alt="" />}
            </div>
            <div className=' flex-grow'>
                <h2 className=' text-xl font-semibold'>
                    {name}
                </h2>
                <p className=" text-muted ">@{username}</p>
            </div>
        </div>
        {isSent ? 
            <p className=' w-full p-2 bg-secondary/60 text-secondary-foreground flex items-center justify-center rounded-lg'>{resText}</p>
            :
            <div className='w-full md:w-[inherit] flex flex-row-reverse md:flex-row items-center gap-2'>
                <button
                    className={`flex-1 min-w-[110px] p-2 bg-secondary text-secondary-foreground flex items-center justify-center rounded-lg hover:bg-secondary/90 `} 
                    onClick={()=> handelAcceptOrReject(false)}
                >{ isDeclineLoading? <BiLoaderAlt className=' animate-spin text-2xl' />: "Decline"}</button>
                <button
                    className={`flex-1 min-w-[110px] p-2 bg-primary text-primary-foreground flex items-center justify-center rounded-lg hover:bg-primary/90 `} 
                    onClick={()=> handelAcceptOrReject(true)}
                >{isAcceptLoading?<BiLoaderAlt className=' animate-spin text-2xl' />:"Accept"}</button>
            </div> 
        }
    </div>
  )
}
