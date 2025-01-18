"use client"

import ConversationItem from '@/components/ConversationItem';
import UserSuggestionSkeleton from '@/components/skeletons/UserSuggestionSkeleton';
import UserItem from '@/components/UserItem';
import userStore from '@/store/userStore'
import axios from 'axios'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'


interface UserData {
  id: string;
  name: string;
  username: string;
  profileImage: string;
}

interface ConversationsData {
  id: string;
  name: string;
  username: string;
  profileImage: string;
  conversationId: string;
}

interface GroupConversations {
  id: string;
  name: string;
  description: string;
  groupImage: string;
  members: number;
  conversation: {
    id: string;
  };
}

export default function page() {
  const [isRequestingFollowrs, setIsRequestingFollowers] = useState(false);
  const [isRequestingCon, setIsRequestingCon] = useState(false);
  const user = userStore((state) => state.user)
  const [conversations, setConversations] = useState<ConversationsData[]>([])
  const [groupConversations, setGroupConversations] = useState<GroupConversations[]>([])
  const [followers, setFollowers] = useState<UserData[]>([])


  // const conversations = [
  //   {
  //     username: "user1",
  //     id:"1",
  //     image: "example.png",
  //     lastSeen: "12pm"
  //   },
  //   {
  //     username: "user1",
  //     id:"2",
  //     image: "example.png",
  //     lastSeen: "12pm"
  //   },
  //   {
  //     username: "user1",
  //     id:"3",
  //     image: "example.png",
  //     lastSeen: "12pm"
  //   },
  // ]

  useEffect(() => {
    const getConversations = async ()=> {
      if(!user) return;
      
      try {
        setIsRequestingCon(true)
        const res = await axios.get(process.env.NEXT_PUBLIC_BASE_URL + "/api/conversation/" + user?.id)
        setConversations(res.data.personal)
        setGroupConversations(res.data.groups)
        setIsRequestingCon(false)
      } catch (err) {
        setIsRequestingCon(false)
      }
    }

    const getFollowings = async ()=> {
      if(!user) return;

      try {
        setIsRequestingFollowers(true)
        const res = await axios.get(process.env.NEXT_PUBLIC_BASE_URL + "/api/user/followers/" + user?.id)
        console.log(res.data)
        setFollowers(res.data)
        setIsRequestingFollowers(false)
      } catch (err) {
        setIsRequestingFollowers(false)
        
      }
    }
    getConversations();
    getFollowings();
  }, [user])
  


  return (
    <div className='  min-h-[calc(100vh-82px)]'>
      <div className={`p-3 border-b border-b-primary/90 ${conversations.length == 0? " hidden": "block"}`}>
        {isRequestingCon ?
           <div>
           <UserSuggestionSkeleton />
           <UserSuggestionSkeleton />
           <UserSuggestionSkeleton />
           <UserSuggestionSkeleton />
         </div>
        :conversations.map((c) => (
          <Link 
            key={c.id}
            href={"/messages/" + c.conversationId}>
            <ConversationItem 
              id={c.id}
              name={c.name}
              username={c.username}
              profileImage={c.profileImage}
              lastSeen="12pm"
              conversationId={c.conversationId}
              />
            </Link>
        ))}
      </div>
      <div className='p-3 '>
        {isRequestingFollowrs ? <div>
          <UserSuggestionSkeleton />
          <UserSuggestionSkeleton />
          <UserSuggestionSkeleton />
        </div>: followers.map((f)=> (
          <UserItem 
            key={f.id}
            id={f.id}
            name={f.name}
            username={f.username}
            profileImage={f.profileImage}
          />
        ))}
      </div>
    </div>
  )
}
