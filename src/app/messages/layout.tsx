"use client"

import Navbar from "@/components/Navbar"
import Sidebar from "@/components/Sidebar"
import React from "react"

export default function layout({children}:{children: React.ReactNode}) {
  return (
    <div className=" w-full flex flex-col items-center relative">
      <Navbar />
      <div className=" w-full min-h-[calc(100vh-178px)] md:min-h-[calc(100vh-82px)] lg:w-[75%] flex relative">
            <div className="md:w-[10%] lg:w-[25%] bg-red-300 ">
              <Sidebar />
            </div>
            <div className=" w-[100%] md:w-[90%] lg:w-[75%] ">
              {children}
            </div>
          </div>
    </div>
  )
}
