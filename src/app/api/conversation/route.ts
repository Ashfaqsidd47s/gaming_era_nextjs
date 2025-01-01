import prisma from "@/lib/db";
import { NextResponse } from "next/server";


//CREATE CONVERSATION
export async function POST(request:Request) {
    try {
        const body = await request.json();
        if(body.conversationType == "group"){
            const conversation = await prisma.conversation.create({
                data: {
                    conversationType: "group",
                    groupId: body.groupId 
                }
            })
            return NextResponse.json({message: "conversation created successfully", conversation}, {status: 200})
        } else {
            const conversation = await prisma.conversation.create({
                data: {
                    conversationType: "private",
                    user1Id: body.uesr1Id,
                    user2Id: body.user2Id
                }
            })
            return NextResponse.json({message: "conversation created successfully", conversation}, {status: 200})
        }
    } catch (error) {
        return NextResponse.json({error: "something went wrong"}, {status: 500});
    }
}

