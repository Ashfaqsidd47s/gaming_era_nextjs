import { getAuthUser } from "@/auth";
import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const userId = request.url.split("grouprequest/sent/")[1];
        if(!userId){
            return NextResponse.json({error: "route not found"}, {status: 404})
        }
        const authUser = await getAuthUser();
        if(!authUser || authUser.id != userId){
            return NextResponse.json({error: "user not authorized"}, {status: 403})
        }
        const groupRequest = await prisma.groupJoinRequest.findMany({
            where: {
                senderId: userId,
                status: "pending"
            }
        })
        
        return NextResponse.json({message : "successfull", groupRequest}, {status: 200})
    } catch (error) {
        return NextResponse.json({error: "something went wrong"}, {status: 500})
    }
}