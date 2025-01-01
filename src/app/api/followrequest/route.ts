import { getAuthUser } from "@/auth";
import prisma from "@/lib/db";
import { NextResponse } from "next/server";


// SEND or CANCEL REQUEST TO A USER
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const authUser = await getAuthUser();
        if(!authUser || authUser.id != body.senderId){
            return NextResponse.json({error: "you are not authorized"}, {status: 403})
        }
        const olderRequest = await prisma.followRequest.findUnique({
            where: {
                senderId_recieverId: {
                    senderId: body.senderId,
                    recieverId: body.recieverId
                }
            }
        })
        if(olderRequest){
            const deleteRequst = await prisma.followRequest.delete({
                where: {id: olderRequest.id}
            })
            
            return NextResponse.json({message : "Request canceled successfully"}, {status: 200})
        }
        const followRequest = await prisma.followRequest.create({
            data: {
                senderId: body.senderId,
                recieverId: body.recieverId
            }
        })
        return NextResponse.json({message : "Request sent successfully", followRequest}, {status: 200})
    } catch (error) {
        return NextResponse.json({error: "something went wrong"}, {status: 500})
    }
    
}

// ACCEPT OR REJECT A REQUEST 
export async function PUT(request: Request) {
    try {
        const body = await request.json();
        const authUser = await getAuthUser();
        if(!authUser || authUser.id != body.userId){
            return NextResponse.json({error: "you are not authorized"}, {status: 403})
        }
        const followRequest = await prisma.followRequest.findUnique({
            where: { id: body.followRequestId}
        })
        if(!followRequest){
            return NextResponse.json({error: "Request not foung"}, {status: 400})
        }
        const sender = await prisma.user.findUnique({
            where: {id: followRequest.senderId}
        })
        const reciever  = await prisma.user.findUnique({
            where: {id: followRequest.recieverId}
        })
        if(!sender || !reciever){
            return NextResponse.json({error: "user not found"}, {status: 400}) 
        }
        if(body.isAccepting){
            const follow = await prisma.follow.create({
                data: {
                    followerId: sender.id,
                    followingId: reciever.id,
                }
            })
        } 

        const deleteRequst = await prisma.followRequest.delete({
            where: {id: followRequest.id}
        })

        // AFTER THIS WE WILL SEND A NOTIFICAITON TO THE SENDER IF USER ACCEPTS THE REQUEST
        return NextResponse.json({message : "Request updated successfully"}, {status: 200})
    } catch (error) {
        return NextResponse.json({error: "something went wrong"}, {status: 500})
    }
    
}