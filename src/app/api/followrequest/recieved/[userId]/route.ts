import { getAuthUser } from "@/auth";
import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const userId = request.url.split("followrequest/recieved/")[1];
        if(!userId){
            return NextResponse.json({error: "route not found"}, {status: 404})
        }
        const authUser = await getAuthUser();
        if(!authUser || authUser.id != userId){
            return NextResponse.json({error: "user not authorized"}, {status: 403})
        }
        const followRequests = await prisma.followRequest.findMany({
            where: {
                recieverId: userId,
                status: "pending"
            },
            select: {
                id: true,
                sender: {
                    select:{
                        id: true,
                        name: true,
                        username: true,
                        profileImage: true,
                    }
                }
            }
        })
        return NextResponse.json({followRequests}, {status: 200})
    } catch (error) {
        return NextResponse.json({error: "something went wrong"}, {status: 500})
    }
}