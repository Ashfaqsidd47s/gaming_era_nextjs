"use client"
import InputContainer from '@/components/InputContainer'
import axios from "axios"
import React, { FormEvent, useState } from 'react'
import { z } from 'zod';
import { BiLoaderAlt } from "react-icons/bi";
import { getGoogleOAuthUrl } from '@/lib/googleOauthUtils';

export default function page() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);
  const [isSending, setIsSending] = useState<boolean>(false);


  const BASE_URL = "http://localhost:3000";

  const usernameSchema = z.string().min(3, "Username must contain atleast 3 charaters")
  const passwordSchema = z.string().min(6, "password must contain atleast 6 charaters")

  const handelSubmit = async (e: FormEvent) => {
    e.preventDefault()
    console.log(username, password)
    try {
      setIsSending(true)
      usernameSchema.parse(username)
      passwordSchema.parse(password)
      setIsError(false)
      try {
        const res = await axios.post(BASE_URL + "/api/auth/signin", {
          username, 
          password
        }, {withCredentials: true})

        window.location.href = "/feeds"
      } catch (error: any) {
        setIsSending(false)
        setIsError(true)
        setError(error.response?.data?.error)
      }
    } catch (error) {
      setIsSending(false)
      setIsError(true)
      setError("Fill all fields first")
    }
  }

  const handleGoogleLogin = () => {
    window.location.href = getGoogleOAuthUrl()
  }

  return (
    <div>
      <h1>login page</h1>
      <form onSubmit={(e) => handelSubmit(e)}>
        <InputContainer
          label='Username'
          placeholder='Enter your username'
          getValue={(value)=> setUsername(value)}
          validationSchema={usernameSchema}
        />
        <InputContainer
          label='Password'
          type='password'
          placeholder='Enter your password'
          getValue={(value)=> setPassword(value)}
          validationSchema={passwordSchema}
        />
        {isError && (
          <p className="mt-1 text-sm text-red-500">{error}</p>
        )}
        <button
          className='p-2 w-[110px] flex items-center justify-center bg-primary text-secondary rounded-md text-sm hover:bg-primary/90 disabled:cursor-wait'
          disabled={isSending}
        >
          {isSending? <BiLoaderAlt className=' animate-spin' /> : "Login"}
        </button>
      </form>
      <button
        className=' my-3 py-3 px-8 flex items-center justify-center shadow-md rounded-md text-sm hover:bg-slate-100 disabled:cursor-wait'
        onClick={() => handleGoogleLogin()}
        >
        Login with google
      </button>
      
      
    </div>
  )
}
