"use client"
import userStore from '@/store/userStore';
import axios from 'axios';
import React, { useState } from 'react'
import { BiLoaderAlt } from 'react-icons/bi';

interface GroupSuggestionProp {
    id: string;
    name: string;
    description: string;
    groupImage: string| null;
    requestSent?: boolean;
  }
  

function GroupSuggesstion({id, name, description, groupImage, requestSent = false}: GroupSuggestionProp) {
    const [isLoading, setIsLoading] = useState(false);
    const [isRequstSent, setIsRequestSent] = useState(requestSent);
    const user = userStore((state)=> state.user);  
  
    const sendJoinRequest =async ()=>  {
        try {
            setIsLoading(true);
            const res = await axios.post(process.env.NEXT_PUBLIC_BASE_URL + "/api/grouprequest", {
              senderId: user?.id,
              recieverId: id
            })
            console.log(res.data)
            setIsRequestSent(!isRequstSent);
            setIsLoading(false);
        } catch (err) {
            setIsLoading(false);
            console.log(err)
        }
    }
  
    return (
      <div className='p-3 bg-fuchsia-200 flex items-center justify-between gap-3 rounded-md'>
        <div
                  className='w-[50px] h-[50px] rounded-full bg-gray-200 flex items-center justify-center'
              >
                {groupImage && <img
                   src={groupImage} 
                   className=' w-full h-full object-cover rounded-[inherit] object-center'
                alt="" />}
              </div>
              <div className=' flex-grow'>
                  <h2 className=' text-xl font-semibold'>
                      {name}
                  </h2>
                  <p>{description}</p>
              </div>
              <button
                  className={` min-w-[110px] p-2 bg-primary text-primary-foreground flex items-center justify-center rounded-lg hover:bg-primary/90 ${isRequstSent? "bg-secondary text-secondary-foreground hover:bg-secondary/90": "bg-primary text-primary-foreground"}`} 
                  onClick={sendJoinRequest}
              >{isLoading? <BiLoaderAlt className=' animate-spin text-2xl' />: isRequstSent? "Cancel": "Follow"}</button>
      </div>

    )
}

export default GroupSuggesstion

