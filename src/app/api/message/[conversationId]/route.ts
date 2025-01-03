import prisma from "@/lib/db";
import { NextResponse } from "next/server";


// GET ALL THE MESSAGES OF A CONVERSATION 
export async function GET(request: Request) {
    try {
        const conversationId = request.url.split("/message/")[1];
        // we can chek is the user exists in the conversation or not
        const messages = await prisma.message.findMany({
            where: {conversationId: conversationId}
        })

        return NextResponse.json({messages}, {status: 200});
    } catch (error) {
        return NextResponse.json({error: "something went wrong"}, {status: 500})
    }
}

// SEND A MESSAGE TO A CONVERSATION 
export async function POST(request: Request) {
    try {
        const conversationId = request.url.split("/message/")[1];
        const body = await request.json();
        // we can first compare the conversation contains the user or not
        // for security 
        const message = await prisma.message.create({
            data: {
                conversationId: conversationId,
                message: body.message,
                senderId: body.senderId,
            }
        })
        return NextResponse.json({message}, {status: 200})
        
    } catch (error) {
        return NextResponse.json({error: "something went wrong"}, {status: 500})
    }
}