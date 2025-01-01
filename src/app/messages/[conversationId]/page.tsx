"use client"

import MessageItem from '@/components/MessageItem';
import { Key } from 'lucide-react';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react'

interface ConbersationProp {
    conversationId: string;
}

export default function page({conversationId}:ConbersationProp) {
    const [text, setText] = useState("");
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
    };

    const messages = [
        {
            message: "this is the messge that the use have sent",
            self: false,
            sentAt: "12pm",
            image: "temp.png"
        },
        {
            message: "this is the messge that the use have sent",
            self: true,
            sentAt: "12pm",
            senderName: "vivek"
        },
        {
            message: "this is the messge that the use have sent",
            self: false,
            sentAt: "12pm"
        },
        {
            message: "this is the messge that the use have sent",
            self: true,
            sentAt: "12pm",
            senderName: "vivek"
        },
        {
            message: "this is the messge that the use have sent",
            self: false,
            sentAt: "12pm"
        },
        {
            message: "this is the messge that the use have sent",
            self: true,
            sentAt: "12pm",
            senderName: "vivek"
        },
        {
            message: "this is the messge that the use have sent",
            self: false,
            sentAt: "12pm"
        },
    ]

    useEffect(() => {
      const getMessages = async () => {

      }
      getMessages()
    }, [])
    

    useEffect(() => {
        if (textareaRef.current) {
          textareaRef.current.style.height = "auto"; // Reset height to shrink if needed
          textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Adjust to content
        }
    }, [text]);

    useEffect(() => {
        if (chatContainerRef.current) {
          // Scroll to the bottom when messages change
          chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
      }, []);

  return (
    <div className='h-[calc(100vh-178px)] md:h-[calc(100vh-82px)]   relative'>
        <div className='p-3 px-6  h-[calc(100%-80px)] bg-green-100 flex flex-col gap-2 overflow-y-scroll scroll-smooth' ref={chatContainerRef}>
            {messages.map((m, i) => (
                <MessageItem 
                    key={i}
                    senderName={m?.senderName}
                    image={m?.image}
                    self={m.self}
                    message={m.message}
                    sentAt={m.sentAt}
                />
            ))}
        </div>
        <div className=" z-10 p-4 bg-transparent shadow-lg rounded-md w-full flex items-end gap-2 absolute bottom-1">
            <textarea
                ref={textareaRef}
                value={text}
                onChange={handleInputChange}
                rows={1}
                className=" bg-transparent max-h-[150px] w-full p-3 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300 resize-none overflow-hidden"
                placeholder="Type your text here..."
            />
            <button
                className='p-3 px-5 bg-primary text-primary-foreground rounded-lg flex items-center justify-center'
            >Submit</button>
        </div>
    </div>
  )
}
