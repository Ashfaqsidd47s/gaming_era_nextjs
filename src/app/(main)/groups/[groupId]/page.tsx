"use client"
import MembersList from '@/components/MembersList'
import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation';
import axios from 'axios';
import GroupSkeleton from '@/components/skeletons/GroupSkeleton';
import Image from 'next/image';

interface GroupData {
  id: string;
  name: string;
  description?: string;
  groupImage: string;
  groupCoverImage: string;
  adminName: string;
  members: {user: {profileImage: string}}[];
}

export default function page() {
  const groupId = usePathname().split("/groups/")[1];
  const [groupData, setGroupData] = useState<GroupData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    const getGroupData = async ()=> {
      if(!groupId) return;
      try {
        setIsLoading(true)
        const res = await axios.get(process.env.NEXT_PUBLIC_BASE_URL + "/api/groups/" + groupId)
        setGroupData(res.data.group)
        setIsLoading(false)
      } catch (err) {
        setIsLoading(false)
      }
    }
    getGroupData()
  }, [groupId])
  

  return (
    <>
    {isLoading || groupData == null? <GroupSkeleton /> :
      <div className='p-2'>

        <div className=' bg-card h-[150px] rounded-lg flex items-center justify-center overflow-hidden' >
          <img
            src={groupData.groupCoverImage == "" || groupData.groupCoverImage == null ? "/icons/logo.png": groupData.groupCoverImage}
            alt=""
            className="w-full h-full object-cover object-center" 
          />
        </div>
        <div className=' p-2 mt-1 bg-card flex items-center relative'>
          <div className='absolute left-6 bottom-3 w-[80px] h-[80px] rounded-xl bg-background flex items-center justify-center overflow-hidden' >
          <Image
            src={groupData.groupImage == "" || groupData.groupImage == null ? "/icons/logo.png": groupData.groupImage}
            alt=""
            layout="fill"
            objectFit="cover" 
            className="rounded-md" 
          />
          </div>
          <p className=' ml-[120px]'>{groupData.adminName}</p>
        </div>
        <div className=' mt-1 p-5 py-1 bg-card flex items-center justify-between'>
          <h2 className=' text-lg font-semibold'>{groupData.name}</h2>
          <button className=' p-3 bg-primary/90 rounded-md text-primary-foreground hover:bg-primary/80'>join group</button>
        </div>
        <div className=' mt-1 p-5 py-2 bg-card  min-h-[150px]' >{groupData.description  == ""? "Nothing described yet...": groupData.description}</div>
        <div className=' bg-card p-5 py-1 flex items-center gap-3'>
          <div className='p-3 py-1 bg-primary/20 rounded-full text-primary'>Active</div>
          <div className='p-3 py-1 bg-background rounded-full text-muted flex items-center justify-center gap-1'>created at</div>
          <div className='p-3 py-1 bg-background rounded-full text-muted flex items-center justify-center gap-1'>9 members</div>
        </div>
        <MembersList />
      </div>
    }
    </>
  )
}
