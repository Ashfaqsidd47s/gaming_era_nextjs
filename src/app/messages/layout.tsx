"use client"

import Navbar from "@/components/Navbar"
import Sidebar from "@/components/Sidebar"
import React from "react"

export default function layout({children}:{children: React.ReactNode}) {
  return (
    <div className=" w-full flex flex-col items-center relative">
      <Navbar />
      <div className=" w-full min-h-[calc(100vh-178px)] md:min-h-[calc(100vh-82px)] lg:max-w-[1200px] flex relative">
            <div className="md:w-[10%] lg:w-[25%] bg-card">
              <Sidebar />
            </div>
            <div className=" w-[100%] md:w-[90%] lg:w-[75%] border-r border-r-popover">
              {children}
            </div>
          </div>
    </div>
  )
}
