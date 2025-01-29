"use client"

import React, { useEffect, useState } from 'react'
import UserSuggestionSkeleton from '@/components/skeletons/UserSuggestionSkeleton'
import userStore from '@/store/userStore';
import axios from 'axios';
import RecievedRequestItem from '@/components/RecievedRequestItem';

interface UserData {
    id: string;
    name: string;
    username: string;
    profileImage: string| null;
}
interface RequestData {
    id: string;
    sender: UserData;
}

export default function page() {
    const user = userStore((state) => state.user)
    const [requests, setRequests] = useState<RequestData[]>([])
    const [isRequestsLoading, setIsRequestsLoading] = useState(false);

    
    useEffect(() => {
        const getReqestRecieved = async ()=> {
            if(!user) return;
            try {
                setIsRequestsLoading(true)
                const res = await axios.get(process.env.NEXT_PUBLIC_BASE_URL + "/api/followrequest/recieved/" + user?.id)
                setRequests(res.data.followRequests)
                setIsRequestsLoading(false)
                console.log(res.data.users)
            } catch (err) {
                setIsRequestsLoading(false)
            }
        }
      
        getReqestRecieved()
    }, [user])
    

  return (
    <div>
        {requests.length > 0 ? 
            <>
            <h3 className=' p-2 font-semibold text-lg'>Follow Requests</h3>
            <div className=' p-1 w-full flex flex-col gap-1'>
            { isRequestsLoading ? <div>
                <UserSuggestionSkeleton />
                <UserSuggestionSkeleton />
                <UserSuggestionSkeleton />
            </div>: requests.map((r) => (
               <RecievedRequestItem 
                key={r.id}
                id={r.id}
                user_id={r.sender.id}
                name={r.sender.name}
                username={r.sender.username}
                profileImage={r.sender.profileImage}
               />
            ))}
            </div>
            </> :
            <h2 className=' p-4 text-center text-muted text-xl'>No Notificaiotn found yet ...</h2>
        }
    </div>
  )
}
