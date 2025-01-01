"use client"

import React, { useEffect, useState } from 'react'
import { BsPostcardHeart } from 'react-icons/bs'
import { FiMessageSquare } from 'react-icons/fi';
import { MdNotificationsNone, MdOutlineLogout } from 'react-icons/md';
import DialogBox from './DialougBox';
import axios from 'axios';
import userStore from '@/store/userStore';
import { pageStateStore } from '@/store/pageStateStore';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IoPersonAddOutline } from "react-icons/io5";
import { GrGroup } from "react-icons/gr";

export default function Sidebar() {
    const user = userStore((state) => state.user)
    const updateUser = userStore((state) => state.updateUser)
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const pageRoute = pageStateStore((state) => state.pageRoute)
    const updatePageRoute = pageStateStore((state) => state.updatePageRoute)
    const pathname = usePathname()

    const handleOpenDialog = () => {
        setIsDialogOpen(true);
    };
    
    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    };
    
    const handlePerformAction = async () => {
        const res = await axios.get(process.env.NEXT_PUBLIC_BASE_URL + "/api/auth/logout")
        setIsDialogOpen(false);
        window.location.reload();
    };

    const items = [
        {
            id: 1, 
            icon: <BsPostcardHeart />,
            text: "News Feed",
            route: "feeds",
            notification: 1, 
        }, 
        {
            id: 2, 
            icon: <FiMessageSquare />,
            text: "Messages",
            route: "messages",
            notification: 1, 
        }, 
        {
            id: 3, 
            icon: <MdNotificationsNone />,
            text: "Notification",
            route: "notification",
            notification: 1, 
        }, 
        {
            id: 4, 
            icon: <IoPersonAddOutline />,
            text: "Add Friends",
            route: "addfriends",
            notification: 1, 
        }, 
        {
            id: 5, 
            icon: <GrGroup />,
            text: "Groups",
            route: "groups",
            notification: 1, 
        }, 
    ]

    useEffect(() => {
    
        const getUser = async () => {
            try {
                const res = await axios.get(process.env.NEXT_PUBLIC_BASE_URL + "/api/auth/signin")
                updateUser(res.data);
            } catch (error) {
                updateUser(null);
            }
        }
        if(!user){
            getUser()
        }

        updatePageRoute(pathname.substring(1))
    }, [pathname])
    

    
  return (
    <div className=' p-2 w-full bg-rose-100 flex flex-col items-center fixed bottom-0  z-[60] md:sticky md:top-[82px] md:left-0 rounded-2xl'>
        
        <div className={` min-w-[82px] w-[100%] md:w-full p-4 md:max-w-[350px] flex flex-col justify-center lg:justify-normal gap-4 bg-green-100 rounded-2xl`}>
            <div className=' hidden md:flex lg:p-2 bg-secondary items-center gap-2 rounded-xl'>
                <div
                    className=' flex-none w-[50px] h-[50px] rounded-full bg-slate-300 flex items-center justify-center'
                >    
                </div>
                <div className='hidden lg:block' >
                    <h2 className=' w-[70%] font-semibold truncate'>{user?.name}</h2>
                    <p
                        className='w-[70%] text-sm text-primary/80 truncate'
                    >@{user?.username}</p>
                </div>
            </div>
            <div className='flex md:flex-col gap-2 items-center justify-between md:w-full'>
                {items.map((item) => (
                    <Link
                        className='md:w-full'
                        key={item.id}
                        href={"/" + item.route}>
                        <div 
                            key={item.id}
                            className={`p-3 md:px-5 md:w-full flex flex-col md:flex-row items-center justify-center lg:justify-normal gap-3 rounded-xl bg-feature cursor-pointer ${pageRoute == item.route ? "bg-slate-200": ""}`}
                            >
                            <div className='text-2xl'>
                                {item.icon} 
                            </div>
                            <p className=' hidden lg:block'>{item.text}</p>
                            <span className=' hidden lg:block'>{item.notification}</span>
                        </div> 
                    </Link>
                ))}
            </div>
            <div className='hidden md:flex flex-col gap-2 items-center md:w-full '>
                <div 
                    onClick={handleOpenDialog}
                    className='p-3 md:w-full md:px-5 flex items-center justify-center lg:justify-normal gap-3 rounded-xl bg-feature cursor-pointer'>
                    <div className='text-2xl'>
                        <MdOutlineLogout />
                    </div>
                    <p className=' hidden lg:block'>Log out</p>
                </div>
                {isDialogOpen && (
                    <DialogBox
                        title="Confirmation"
                        description="Are you sure you want to log out?"
                        onCancel={handleCloseDialog}
                        onAction={handlePerformAction}
                        actionButton="Logout"
                    />
                )}
            </div>
        </div>
    </div>
  )
}
