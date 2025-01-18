"use client"
import InputContainer from '@/components/InputContainer'
import axios from "axios"
import React, { FormEvent, useState } from 'react'
import { z } from 'zod';
import { BiLoaderAlt } from "react-icons/bi";
import { getGoogleOAuthUrl } from '@/lib/googleOauthUtils';
import { IoMdUnlock } from "react-icons/io";
import { ImPacman } from "react-icons/im";
import { motion } from "framer-motion"
import Link from 'next/link';
import { FaUserCircle } from "react-icons/fa";
import { FaAt } from "react-icons/fa";

export default function page() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);
  const [isSending, setIsSending] = useState<boolean>(false);


  const BASE_URL = "http://localhost:3000";

  const nameSchema = z.string().min(3, "Name requires atleast 3 charaters")
  const emailSchema = z.string().min(3, "Email is too sort")
  const usernameSchema = z.string().min(3, "Username requires atleast 4 charaters")
  const passwordSchema = z.string().min(6, "Password requires atleast 6 charaters")

  const handelSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      setIsSending(true)
      nameSchema.parse(name)
      usernameSchema.parse(username)
      emailSchema.parse(email)
      passwordSchema.parse(password)
      setIsError(false)
    } catch (err) {
      setIsSending(false)
      setIsError(true)
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message || "Invalid input");
      } else {
        setError("An unexpected error occurred");
      }
      setTimeout(() => {
        setError("")
      }, 3000);
      return;
    }
    try {
      const res = await axios.post(BASE_URL + "/api/auth/signup", {
        name,
        email,
        username, 
        password
      }, {withCredentials: true})

      setIsError(false);
      setError("SignUp successfull...")
      setTimeout(() => {
        setError("")
        window.location.href = "/feeds"
      }, 2000);
    } catch (error: any) {
      setIsSending(false)
      setIsError(true)
      setError(error.response?.data?.error || "Server error")
      setTimeout(() => {
        setError("")
      }, 4000);
    }
  }

  const handleGoogleLogin = () => {
    window.location.href = getGoogleOAuthUrl()
  }

  return (
    <div className=' h-screen flex items-center justify-center '>
      <motion.div 
        className=' bg-card p-[1px] rounded-2xl glowing-border'
        style={{backgroundImage: "conic-gradient(from 0deg, #4cd137, #184910, #184910, #4cd137)"}}
        animate={{
          background: [
            'conic-gradient(from 0deg, #4cd137, #184910, #184910, #4cd137)',
            'conic-gradient(from 360deg, #4cd137, #184910, #184910, #4cd137)',
          ],
        }}
        transition={{
          duration: 10, 
          repeat: Infinity,  
          repeatType: 'loop', 
        }}
      >
        <div className=' p-4 bg-card flex flex-col items-center gap-2 rounded-2xl relative after:w-full '>
          <div className=' w-[60px] h-[60px] rounded-lg flex items-center justify-center bg-background shadow-xl text-2xl'>
            <ImPacman />
          </div>
          <h1 className=' font-semibold text-2xl'>SignUp with email</h1>
          <p className=' max-w-[300px] text-center text-sm text-muted'>Join the best gmaing community, connect with your vibe</p>
          <form
            className='flex flex-col items-center w-[320px]' 
            onSubmit={(e) => handelSubmit(e)}>
            <InputContainer
              placeholder='Name'
              getValue={(value)=> setName(value)}
              icon={<FaUserCircle />}
            />
            <InputContainer
              placeholder='Username'
              getValue={(value)=> setUsername(value)}
              icon={<FaAt />}
            />
            <InputContainer
              placeholder='Email'
              type='email'
              getValue={(value)=> setEmail(value)}
            />
            <InputContainer
              type='password'
              placeholder='Password'
              getValue={(value)=> setPassword(value)}
              icon={<IoMdUnlock />}
            />
            <p className={` h-5 text-sm font-thin ${isError ? " text-destructive" :" text-green-500"}`}>{error}</p>
            
            <button
              className=' p-2 h-11 w-[calc(100%-0.6rem)] flex items-center justify-center bg-primary/80 text-primary-foreground rounded-md text-sm hover:bg-primary/90 disabled:cursor-wait'
              disabled={isSending}
            >
              {isSending? <BiLoaderAlt className=' animate-spin text-lg' /> : "Register"}
            </button>
          </form>
          <div className='flex flex-col items-center justify-center relative z-10'>
            <span className=' w-[150px] border-b-2 border-b-primary-foreground/30 absolute z-0'></span>
            <span className=' text-sm z-10 bg-card p-1'>or</span>
          </div>
          <button
            className=' p-2 h-11 w-[calc(100%-0.6rem)] flex items-center justify-center gap-2 bg-primary-foreground/90 text-secondary-foreground rounded-md text-sm hover:bg-primary-foreground/80 disabled:cursor-wait'
            onClick={() => handleGoogleLogin()}
            >
            SignUp with Google
          </button> 
          <p className={` mt-1 text-sm font-thin text-muted `}>Don't have an account ? <Link href="/login" className=' underline text-primary font-normal'>Sign Up</Link></p>
        </div>

      </motion.div>
    </div>
  )
}
