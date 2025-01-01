import { getAuthUser } from "@/auth";
import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const userId = request.url.split("/followrequest/sent/")[1];
        
        if(!userId){
            return NextResponse.json({error: "route not found"}, {status: 404})
        }
        const authUser = await getAuthUser();
        if(!authUser || authUser.id != userId){
            return NextResponse.json({error: "user not authorized"}, {status: 403})
        }
        const users  = await prisma.user.findMany({
            where: {
                FollowRequestReciever: {
                    some: {
                        senderId: userId,
                    }
                }
            }, 
            select: {
                id: true,
                name: true,
                username: true,
                profileImage: true
            }
        })
        
        return NextResponse.json({users}, {status: 200})
    } catch (error) {
        return NextResponse.json({error: "something went wrong"}, {status: 500})
    }
}