"use client"
import React, { useState } from 'react'
import { MdClose } from 'react-icons/md';
import InputContainer from '../InputContainer';
import { z } from 'zod';
import { CldUploadWidget } from 'next-cloudinary';
import userStore from '@/store/userStore';
import axios from 'axios';
import { BiLoaderAlt } from 'react-icons/bi';
import { TbFileDescription } from "react-icons/tb";

interface CreateGroupDialogProps {
    onCancel: () => void;
    onAction: () => void;
    actionButton?: string; 
}

const nameSchema = z.string().min(3, "Name must contain atleast 3 character")
const descriptionSchema = z.string().min(0, "Its an optional thing")


export default function CreateGroupDialoug({ onCancel, onAction, actionButton = "Confirm"}:CreateGroupDialogProps) {
    const user = userStore((state) => state.user)
    const [name,setName] = useState("")
    const [description,setDescription] = useState("")
    const [groupImage, setGroupImage] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState("")
    const [isSuccess, setIsSuccess] = useState(true)

    const handelSaveImage = (res: any)=>{
        setGroupImage(res.info.secure_url)
    }

    const handelSubmit = async ()=> {
        if(!user) return
        try {
            setIsLoading(true)
            nameSchema.parse(name)
            descriptionSchema.parse(description)
            setIsLoading(false)
            setIsSuccess(false)
        } catch (err) {
            if (err instanceof z.ZodError) {
                setMessage(err.errors[0].message || "Invalid input");
            } else {
                setMessage("An unexpected error occurred");
            }
            setTimeout(() => {
                setMessage("")
                onAction()
            }, 2000);
            return;
        }
        try {
            setIsLoading(true)
            const res = await axios.post(process.env.NEXT_PUBLIC_BASE_URL + "/api/groups", {
                userId: user.id,
                userName: user.username,
                name: name,
                description: description,
                groupImage: groupImage
            })
            setIsLoading(false)
            setIsSuccess(true)
            setMessage("Group Created Successfully")
            
            setTimeout(() => {
                setMessage("")
                onAction()
            }, 2000);
        } catch (error: any) {
            setIsLoading(false)
            setIsSuccess(false)
            setMessage( error.response?.data?.error ||"something went wrong try again..")
            setTimeout(() => {
                setMessage("")
            }, 2000);
        }
    }

  return (
    <div className=" w-full h-full fixed top-0 left-0 flex items-center justify-center bg-black bg-opacity-60 z-[100]">
        <div className="bg-white p-6 rounded-lg shadow-lg w-80 sm:w-96 relative">
            <button
                onClick={onCancel}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
                <MdClose size={24} />
            </button>

            <h2 className="text-xl font-semibold text-gray-800 mb-4">Create Group</h2>
            <div>
                <InputContainer 
                    type="text"
                    placeholder='Enter the group name'
                    getValue={(value)=> setName(value)}

                />
                <InputContainer 
                    type="text"
                    placeholder='Describe about group'
                    getValue={(value)=> setDescription(value)}
                    icon={<TbFileDescription />}
                />
                <div>
                    <p className=' font-semibold '>Group Image</p>
                    <CldUploadWidget 
                        uploadPreset="gamingera"
                        onSuccess={(res)=> handelSaveImage(res)}
                    >
                        {({ open }) => {
                            return (
                            <div 
                                onClick={() => open()}
                                className=' w-[50px] h-[50px] rounded-full flex items-center justify-center shadow-lg overflow-hidden'>
                                    <img
                                        className=' w-full h-full object-cover object-center' 
                                        src={groupImage == "" ? "group.png" : groupImage} 
                                    alt="" />
                            </div>
                            );
                        }}
                    </CldUploadWidget>
                </div>
                <div>
                    {message != "" && 
                    <p 
                        className={`text-sm text-center ${isSuccess? "text-green-400 ": "text-red-400"}`}
                    >{message}</p>}
                </div>
            </div>
            <div className="mt-3 flex justify-end space-x-4">
                <button
                onClick={onCancel}
                className="px-4 py-2 text-gray-500 border border-gray-300 rounded-lg hover:bg-gray-100 focus:outline-none"
                >
                Cancel
                </button>
                <button
                onClick={() => handelSubmit()}
                className="w-[100px] px-4 py-2 text-white bg-primary text-primary-foreground rounded-lg hover:bg-primary/85 focus:outline-none flex items-center justify-center"
                >
                {isLoading ? <BiLoaderAlt className=' animate-spin' /> : "Create"}
                </button>
            </div>
        </div>
    </div>
  )
}
