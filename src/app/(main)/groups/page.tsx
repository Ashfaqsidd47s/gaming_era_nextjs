"use client"

import React, { useEffect, useState } from 'react'
import GroupItem from '@/components/GroupItem';
import UserSuggestionSkeleton from '@/components/skeletons/UserSuggestionSkeleton';
import userStore from '@/store/userStore'
import axios from 'axios'
import { RiAddCircleLine } from "react-icons/ri";
import CreateGroupDialoug from '@/components/dialougs/CreateGroupDialoug';

interface GroupsInfo {
  id: string;
  name: string;
  descdescription: string;
  groupImage: string;
  members: {user: {profileImage: string}}[]
}

export default function page() {
  const [currentGroup, setCurrentGroup] = useState<string>("joined")
  const [isLoading, setIsLoadin] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [groups, setGroups] = useState<GroupsInfo[]>([])
  const user = userStore((state)=> state.user)

  const getJoinedGroups = async ()=> {
    if(!user) return;
    try {
      setCurrentGroup("joined")
      setIsLoadin(true)
      const res = await axios.get(process.env.NEXT_PUBLIC_BASE_URL + "/api/groups/user/joined/" + user?.id)
      setGroups(res.data.groups)
      setIsLoadin(false)
    } catch (err) {
      setIsLoadin(false)
      
    }
  }
  const getMyGroups = async ()=> {
    if(!user) return;
    try {
      setCurrentGroup("mygroup")
      setIsLoadin(true)
      const res = await axios.get(process.env.NEXT_PUBLIC_BASE_URL + "/api/groups/user/my/" + user?.id)
      setIsLoadin(false)
      setGroups(res.data.groups)
    } catch (err) {
      setIsLoadin(false)
      
    }
  }

  const handelNewGroups = () =>{
    setCurrentGroup("new")
  }
  
  useEffect(() => {
    getJoinedGroups()
  }, [user])

  const handleOpenDialog = () => {
      setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
      setIsDialogOpen(false);
  };

  const handlePerformAction = async () => {
      setIsDialogOpen(false);
      window.location.reload();
  };

  

  return (
    <div className=' h-max w-full'>
        <div className=' p-3  w-full flex items-center justify-between'>
            <h2 className=' text-xl font-semibold'>Groups</h2>
            <div className=' flex items-center gap-3 text-primary/80'>
                <p 
                  className={` ${currentGroup == "joined"?" font-bold" :" "} cursor-pointer`}
                  onClick={getJoinedGroups}
                >Joined</p>
                <p
                  className={` ${currentGroup == "mygroup"?" font-bold" :" "} cursor-pointer `} 
                  onClick={getMyGroups}
                >My groups</p>
                <p 
                  className={` ${currentGroup == "new"?" font-bold" :" "} cursor-pointer`}
                  onClick={handelNewGroups}
                >new</p>
            </div>
        </div>
        {
          currentGroup == "new"?
          <div>

          </div>:
          <div className='flex flex-col items-center gap-2 w-full'>
            {currentGroup == "mygroup"? 
              <div className='p-4 w-full flex items-center justify-center'>
                <button
                  className='p-3 w-full md:max-w-[250px] bg-primary text-primary-foreground flex items-center justify-center rounded-md hover:bg-primary/90'
                  onClick={handleOpenDialog}
                ><RiAddCircleLine className=' text-2xl mr-3' /> Create New Group
                </button>
                {isDialogOpen && 
                  <CreateGroupDialoug 
                    onCancel={handleCloseDialog}
                    onAction={handlePerformAction}
                  />
                }
              </div>
            :<></>
            }
            {isLoading?
              <div className='w-full'>
                  <UserSuggestionSkeleton />
                  <UserSuggestionSkeleton />
                  <UserSuggestionSkeleton />
              </div>:
              groups.map((group)=> (
                <GroupItem 
                  key={group.id}
                  id={group.id}
                  name={group.name}
                  description={group.descdescription}
                  groupImage={group.groupImage}
                  members={group.members}
                />
              ))
            }
          </div>
        }
    </div>
  )
}
