"use client"
import React, { useEffect, useRef, useState } from 'react'
import { FaVideo, FaVideoSlash } from 'react-icons/fa';
import { IoVideocam } from 'react-icons/io5';
import { MdCallEnd } from 'react-icons/md';
import { PiMicrophoneFill, PiMicrophoneSlashFill } from "react-icons/pi";

const servers = {
  iceServers: [
    {urls: "stun:stun.l.google.com:19302"}, 
    {urls: "stun:stun4.l.google.com:5349"} 
  ]
}

interface VideoCallProp {
  userId: string;
  conversationId: string;
  isAnswering?: boolean;
  newOffer?: string
}

export default function VideoCall({ userId, conversationId, isAnswering = false, newOffer = ""}:VideoCallProp) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isVideoOn,setIsVideoOn] = useState<boolean>(true)
  const [isAudioOn,setIsAudioOn] = useState<boolean>(true)
  const localvideoRef = useRef<HTMLVideoElement>(null)
  const remotevideoRef = useRef<HTMLVideoElement>(null)
  const localMediaStreamRef = useRef<MediaStream | null>(null)
  const remoteMediaStreamRef = useRef<MediaStream | null>(null)
  const peerConnection = useRef<RTCPeerConnection | null>(null);
  const offerString = useRef<string>("");
  const answerString = useRef<string>("");
  const [testValue, setTestValue] = useState("")

  const generateOffer = async ()=> {
    if(!peerConnection.current){
      console.log("peeer conneciton is not initilaized")
      return;
    }
    
    try {
      
      const offer = await peerConnection.current.createOffer();
      await peerConnection.current.setLocalDescription(offer)
      
      peerConnection.current.onicecandidate = (e) => {
        if (e.candidate) {
          offerString.current = JSON.stringify(peerConnection.current?.localDescription);
          setTestValue(offerString.current)
        } 
      };
    } catch (err) {
      console.log("error while creating offer", err)
    }
  }

  
  
  const generateAnswer = async (recievedStr: string)=> {
    if(!peerConnection.current){
      console.log("peer connection not created ")
      return;
    }

    try {
      
      offerString.current = recievedStr;
      const offer = JSON.parse(offerString.current)
      await peerConnection.current.setRemoteDescription(offer)
  
      const answer = await peerConnection.current.createAnswer();
      await peerConnection.current.setLocalDescription(answer)
      
      console.log("peer connection :", peerConnection)
      console.log("offer string :", offerString.current)
      console.log("answer string :", answerString.current)
      peerConnection.current.onicecandidate =  async (e) => {
        if(e.candidate){
            answerString.current = JSON.stringify(peerConnection.current?.localDescription)
            setTestValue(answerString.current)
            console.log("answer generated ")
        }
      }
    } catch (err) {
       console.log("error while generating answer")
    }
  }

  const addAnswer = async (recievedStr: string)=> {
    answerString.current = recievedStr;
    const answer = JSON.parse(answerString.current)
    if(peerConnection.current && !peerConnection.current.currentRemoteDescription){
      peerConnection.current.setRemoteDescription(answer);
      console.log("answer added ")
    }
  }

  const initializeMedia = async ()=> {
    try {
      const lVideoSrc = await navigator.mediaDevices.getUserMedia({video: {
        width: {ideal: 1280},
        height: {ideal: 720},

      }, audio: isAudioOn});
      const rVideoSrc = new MediaStream();
      localMediaStreamRef.current = lVideoSrc;

      if(localvideoRef.current){
        localvideoRef.current.srcObject = lVideoSrc;
      }
      
      remoteMediaStreamRef.current = rVideoSrc;
      if(remotevideoRef.current) {
        remotevideoRef.current.srcObject = rVideoSrc;
      }

      if(!peerConnection.current){
        peerConnection.current = new RTCPeerConnection(servers);
      }

      localMediaStreamRef.current.getTracks().forEach((track) => {
        peerConnection.current?.addTrack(track, lVideoSrc)
      })

      peerConnection.current.ontrack = (e) => {
        e.streams[0].getTracks().forEach((track) => {
          remoteMediaStreamRef.current?.addTrack(track)
        })
      }

      // generateoffer or answer as well 
    } catch (err) {
      console.log("error while capturing video")
    }
  }

  const toggleVideo = () => {
    if(localMediaStreamRef.current) {
      const videoTrack = localMediaStreamRef.current.getVideoTracks()[0];
      if(videoTrack) {
        videoTrack.enabled = !isVideoOn;
        setIsVideoOn((prev) => !prev)
      }
    }
  }
  const toggleAudio = () => {
    if(localMediaStreamRef.current) {
      const audioTrack = localMediaStreamRef.current.getAudioTracks()[0];
      if(audioTrack) {
        audioTrack.enabled = !isAudioOn;
        setIsAudioOn((prev) => !prev)
      }
    }
  }
  
  

  return (
    <div className=' flex items-center justify-center'>
        <div
            onClick={() => { setIsOpen(!isOpen); initializeMedia()}} 
            className=' w-[35px] h-[35px] rounded-full flex items-center justify-center shadow-sm bg-popover hover:bg-background cursor-pointer hover:text-primary/80'>
            <IoVideocam />
        </div>
        <div className={` ${isOpen ? "flex" :"hidden"} items-center justify-center absolute top-0 left-0 bg-primary-foreground/20 w-full h-[calc(100vh-178px)] md:h-[calc(100vh-162px)] z-50`}>
          <video 
            ref={remotevideoRef}
            className=' w-full h-full z-10 bg-black object-cover' 
            autoPlay
            playsInline
            ></video>
          <video 
            ref={localvideoRef}
            className=' w-[25%] h-[25%] bg-background absolute bottom-[2rem] right-[1rem] rounded-lg z-20 object-cover' 
            autoPlay
            playsInline
            ></video>
          <div className=' p-4 absolute bottom-5 flex items-center justify-center gap-3 rounded-2xl bg-primary/10 z-30'>
            <textarea value={testValue} id="" onChange={(e) => setTestValue(e.target.value)}></textarea>
            <button onClick={generateOffer}>genrate offer</button>
            <button onClick={()=> generateAnswer(testValue)}>genrate answer</button>
            <button onClick={()=> addAnswer(testValue)}>add answer</button>
            <button 
              onClick={toggleVideo}
              className={` w-[60px] h-[50px] rounded-2xl flex items-center justify-center bg-background text-xl ${isVideoOn ?  "bg-background hover:bg-card": " bg-destructive/20 hover:bg-destructive/30"}`}
            >{isVideoOn ? <FaVideo /> :<FaVideoSlash />}</button>
            <button 
              onClick={toggleAudio}
              className={` w-[60px] h-[50px] rounded-2xl flex items-center justify-center bg-background text-xl ${isAudioOn ?  "bg-background hover:bg-card": " bg-destructive/20 hover:bg-destructive/30"}`}
            >{isAudioOn ? <PiMicrophoneFill /> : <PiMicrophoneSlashFill />}</button>
            <button
              onClick={()=> setIsOpen(!isOpen)}
              className=' w-[60px] h-[50px] rounded-2xl flex items-center justify-center text-3xl bg-destructive'
            ><MdCallEnd /></button>
          </div>
        </div>
    </div>
  )
}
