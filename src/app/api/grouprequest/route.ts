import { getAuthUser } from "@/auth";
import prisma from "@/lib/db";
import { NextResponse } from "next/server";


// SEND or CANCEL REQUEST TO A GROUP JOINING 
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const authUser = await getAuthUser();
        if(!authUser || authUser.id != body.senderId){
            return NextResponse.json({error: "you are not authorized"}, {status: 403})
        }
        const olderRequest = await prisma.groupJoinRequest.findUnique({
            where: {
                senderId_groupId: {
                    senderId: body.senderId,
                    groupId: body.groupId
                }
            }
        })
        if(olderRequest){
            const deleteRequst = await prisma.groupJoinRequest.delete({
                where: {id: olderRequest.id}
            })
            
            return NextResponse.json({message : "Request canceled successfully"}, {status: 200})
        }
        const groupRequest = await prisma.groupJoinRequest.create({
            data: {
                senderId: body.senderId,
                groupId: body.groupId
            }
        })
        return NextResponse.json({message : "Request sent successfully", groupRequest}, {status: 200})
    } catch (error) {
        return NextResponse.json({error: "something went wrong"}, {status: 500})
    }
    
}

// ACCEPT OR REJECT A REQUEST 
export async function PUT(request: Request) {
    try {
        const body = await request.json();
        const groupRequest = await prisma.groupJoinRequest.findUnique({
            where: { id: body.groupRequestId}
        })
        if(!groupRequest){
            return NextResponse.json({error: "Request not foung"}, {status: 400})
        }
        const user = await prisma.user.findUnique({
            where: {id: body.userId}
        })
        const group  = await prisma.group.findUnique({
            where: {id: body.groupId}
        })
        if(!user || !group){
            return NextResponse.json({error: "user/group not found"}, {status: 400}) 
        }

        const authUser = await getAuthUser();
        if(!authUser || authUser.id != user.id || user.id != group.adminId){
            return NextResponse.json({error: "you are not authorized"}, {status: 403})
        }
        if(body.isAccepting){
            const member = await prisma.member.create({
                data: {
                    userId: groupRequest.senderId,
                    groupId: group.id,
                }
            })
        } 
        const deleteRequst = await prisma.groupJoinRequest.delete({
            where: {id: groupRequest.id}
        })

        // AFTER THIS WE WILL SEND A NOTIFICAITON TO THE SENDER IF USER ACCEPTS THE REQUEST
        return NextResponse.json({message : "Request updated successfully"}, {status: 200})
    } catch (error) {
        return NextResponse.json({error: "something went wrong"}, {status: 500})
    }
    
}