import { getAuthUser } from "@/auth";
import prisma from "@/lib/db";
import axios from "axios";
import { NextResponse } from "next/server";

// GET ALL THE CONVERSATION FOR A USER 
export async function GET(request: Request) {
    try {
        const conversationId = request.url.split("/conversation/user/")[1];
        const convo = await prisma.conversation.findUnique({
            where: {
                id: conversationId
            },
            select: {
                user1Id: true,
                user2Id: true,
            }
        })
        if(convo == null || convo.user1Id == null || convo.user2Id == null){
            return NextResponse.json({error: "invalid conversation id"}, {status: 404})
        }
        const authUser = await getAuthUser();
        console.log(authUser?.id)
        if(!authUser || (authUser.id != convo?.user1Id && authUser.id != convo.user2Id)){
            return NextResponse.json({error: "you are not autherized"}, {status: 403})
        }

        const user2Id = authUser.id == convo.user1Id ? convo.user2Id : convo.user1Id;

        const userData = await prisma.user.findUnique({
            where: {id : user2Id},
            select: {
                id: true,
                name: true,
                username: true, 
                profileImage: true,
            }
        })
        
        return NextResponse.json({user: userData}, {status: 200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({error: "something went wrong"}, {status: 500})
    }
}