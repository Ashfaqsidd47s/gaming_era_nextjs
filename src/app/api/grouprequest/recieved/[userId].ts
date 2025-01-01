import { getAuthUser } from "@/auth";
import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const userId = request.url.split("grouprequest/recieved/")[1];
        if(!userId){
            return NextResponse.json({error: "route not found"}, {status: 404})
        }
        const authUser = await getAuthUser();
        if(!authUser || authUser.id != userId){
            return NextResponse.json({error: "user not authorized"}, {status: 403})
        }
        const groups = await prisma.group.findMany({
            where: {adminId: userId},
            select: {id: true}
        })
        const groupIds = groups.map(group => group.id)
        const groupRequests = await prisma.groupJoinRequest.findMany({
            where: {
                groupId: {in: groupIds}
            }
        })
        return NextResponse.json({message : "successfull", groupRequests}, {status: 200})
    } catch (error) {
        return NextResponse.json({error: "something went wrong"}, {status: 500})
    }
}