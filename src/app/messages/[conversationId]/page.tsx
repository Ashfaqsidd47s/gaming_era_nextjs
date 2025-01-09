"use client"

import MessageItem from '@/components/MessageItem';
import ChatHeadderSkeleton from '@/components/skeletons/ChatHeadderSkeleton';
import MessageItemSkeleton from '@/components/skeletons/MessageItemSkeleton';
import userStore from '@/store/userStore';
import axios from 'axios';
import { usePathname } from 'next/navigation';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs';


interface MessageData {
    id?: string;
    message: string;
    createdAt: string;
    senderId: string;
}

interface UserData {
    id: string;
    name: string;
    username: string;
    profileImage: string;
}


export default function page() {
    const user = userStore((state) => state.user)
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingUser, setIsLoadingUser] = useState(false);
    const [text, setText] = useState("");
    const [userData, setUserData] = useState<UserData | null>(null)
    const [messages, setMessages] = useState<MessageData[]>([])
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();
    const [isSent, setIsSent] = useState(false);
    const [sendingStatus, setSendingStatus] = useState<"sending"| "success"| "failed">("sending")
    
    const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
    };

    const sendMessage = async ()=> {
        try {
            if(!user) return;
            const newMessageData = {
                message: text,
                senderId: user.id
            }
            setMessages([...messages, {
                message: text,
                createdAt: new  Date().toISOString(),
                senderId: user.id,
            }])
            setText("")
            const res = await axios.post(process.env.NEXT_PUBLIC_BASE_URL + "/api/message/" +  pathname.split("/messages/")[1], newMessageData)
            console.log(res.data)
            setSendingStatus("success")
        } catch (err) {
            setSendingStatus("failed")
            
        }
    }

    // to get the messagese 
    useEffect(() => {
        const getMessages = async () => {
            const conversationId = pathname.split("/messages/")[1];
            if(!conversationId) return;
            try {
                setIsLoading(true)
                const res = await axios.get(process.env.NEXT_PUBLIC_BASE_URL + "/api/message/" + conversationId)
                setMessages(res.data.messages)
                setIsLoading(false)
            } catch (err) {
                setIsLoading(false)
            }
        }
        getMessages()
    }, [pathname])

    // to fetch the user data it can be or should be avoided 
    // by simply using cached data or good state management 
    useEffect(() => {
        const getUserData = async () => {
            const conversationId = pathname.split("/messages/")[1];
            if(!conversationId) return;
            try {
                setIsLoadingUser(true)
                const res = await axios.get(process.env.NEXT_PUBLIC_BASE_URL + "/api/conversation/user/" + conversationId)
                console.log(res.data)
                setUserData(res.data.user)
                setIsLoadingUser(false)
            } catch (err) {
                setIsLoadingUser(false)
            }
        }
        getUserData()
    }, [pathname])
    

    useEffect(() => {
        if (textareaRef.current) {
          textareaRef.current.style.height = "auto"; // Reset height to shrink if needed
          textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Adjust to content
        }
    }, [text]);

    useEffect(() => {
        if (chatContainerRef.current) {
          
          chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
      }, [user, userData]);

  return (
    <div className='h-[calc(100vh-178px)] md:h-[calc(100vh-82px)]   relative'>
        {userData == null ? 
            <ChatHeadderSkeleton />
        :<div className=' px-4 bg-white w-full h-[55px] shadow-lg flex items-center justify-between absolute top-[0px]'>
            <div className='flex items-center gap-3'>
                <div className=' bg-gray-300 w-[40px] h-[40px] rounded-full overflow-hidden flex items-center justify-center shadow-sm '>
                    <img 
                        className=' w-full h-full object-cover object-center'
                    src={userData.profileImage == null || userData.profileImage == ""? "/avatar.png": userData.profileImage} alt="" />
                </div>
                <div className=' font-semibold text-lg'>{userData.name} <span className=' font-normal text-sm text-primary/80'>(online)</span></div>
            </div>
            <div className='flex items-center gap-3'>
                <div className=' w-[35px] h-[35px] rounded-full flex items-center justify-center shadow-sm bg-gray-100'>
                    <BsThreeDotsVertical />
                </div>
            </div>
        </div>}
        <div className='p-3 px-6 pt-[60px]  h-[calc(100%-80px)] bg-green-100 flex flex-col gap-2 overflow-y-scroll scroll-smooth' ref={chatContainerRef}>
            {messages.length == 0 && 
                <div className='text-center text-primary/80'>Say hi...👋</div>
            }
            {
                userData == null || user == null ?
                    <div className='flex flex-col items-start gap-2' >
                        <MessageItemSkeleton />
                        <MessageItemSkeleton self={true}  />
                        <MessageItemSkeleton />
                    </div>
                :
                messages.map((m, i) => (
                <MessageItem 
                    key={i}
                    senderName={m.senderId == userData.id ?userData.name: user.name}
                    image={m.senderId == userData.id ?userData.profileImage: ""}
                    self={m.senderId != userData.id}
                    message={m.message}
                    sentAt={m.createdAt}
                />
            ))}
        </div>
        <div className=" z-10 p-4 bg-white shadow-lg rounded-md w-full flex items-end gap-2 absolute bottom-1">
            <textarea
                ref={textareaRef}
                value={text}
                onChange={handleInputChange}
                rows={1}
                className=" bg-transparent max-h-[150px] w-full p-3 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300 resize-none overflow-hidden"
                placeholder="Type your text here..."
            />
            <button
                onClick={sendMessage}
                className='p-3 px-5 bg-primary text-primary-foreground rounded-lg flex items-center justify-center'
            >Send</button>
        </div>
    </div>
  )
}
