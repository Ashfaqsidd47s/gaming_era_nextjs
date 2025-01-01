"use client"

import UserSuggestionSkeleton from '@/components/skeletons/UserSuggestionSkeleton';
import UserSuggestion from '@/components/UserSuggestion'
import userStore from '@/store/userStore';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

interface NewUsersData {
    id: string;
    name: string;
    username: string;
    profileImage: string| null;
}
export default function page() {
    const user = userStore((state) => state.user)
    const [isLoading, setIsLoading] = useState(false);
    const [isRequestsLoading, setIsRequestsLoading] = useState(false);
    const [newUsers, setNewUsers] = useState<NewUsersData[]>([])
    const [sentRequests, setSentRequests] = useState<NewUsersData[]>([])
    


    useEffect(() => {
        const getNewUser = async ()=> {
            if(!user) return;
            try {
                setIsLoading(true)
                const res = await axios.get(process.env.NEXT_PUBLIC_BASE_URL + "/api/user/newusers/" + user?.id)
                console.log("new users :", res.data)
                setNewUsers(res.data)
                setIsLoading(false)
            } catch (err) {
                setIsLoading(false)
            }
        }

        const getReqestSent = async ()=> {
            if(!user) return;
            try {
                setIsRequestsLoading(true)
                const res = await axios.get(process.env.NEXT_PUBLIC_BASE_URL + "/api/followrequest/sent/" + user?.id)
                setSentRequests(res.data.users)
                setIsRequestsLoading(false)
                console.log(res.data.users)
                console.log(isRequestsLoading)
            } catch (err) {
                console.log(err)
                setIsRequestsLoading(false)
            }
        }

        getNewUser();
        getReqestSent();
      
    }, [user])
    
  return (
    <div className='w-full'>
        {sentRequests.length > 0 && 
            <>
            <h3 className=' p-2 font-semibold text-lg'>Request sent</h3>
            <div className=' p-1 w-full flex flex-col gap-1'>
            { isRequestsLoading ? <div>
                <UserSuggestionSkeleton />
                <UserSuggestionSkeleton />
                <UserSuggestionSkeleton />
            </div>: sentRequests.map((p) => (
                <UserSuggestion
                key={p.id}
                id={p.id}
                name={p.name}
                username={p.username}
                profileImage={p.profileImage}
                requestSent={true}
                />
            ))}
            </div>
            </>
        }
        <h3 className=' p-2 font-semibold text-lg'>Add Friends</h3>
        <div className=' p-1 w-full flex flex-col gap-1'>
        { isLoading ? <div>
            <UserSuggestionSkeleton />
            <UserSuggestionSkeleton />
            <UserSuggestionSkeleton />
        </div>: newUsers.map((p) => (
            <UserSuggestion
            key={p.id}
            id={p.id}
            name={p.name}
            username={p.username}
            profileImage={p.profileImage}
            />
        ))}
        </div>
    </div>
  )
}
