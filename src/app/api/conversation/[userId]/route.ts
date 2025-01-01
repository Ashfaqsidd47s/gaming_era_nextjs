import { getAuthUser } from "@/auth";
import prisma from "@/lib/db";
import { NextResponse } from "next/server";

// GET ALL THE CONVERSATION FOR A USER 
export async function GET(request: Request) {
    try {
        const userId = request.url.split("/conversation/")[1];
        const authUser = await getAuthUser();
        if(!authUser || authUser.id != userId){
            return NextResponse.json({error: "you are not autherized"}, {status: 403})
        }
        const personalConversations = await prisma.user.findMany({
            where: {
                OR: [
                    {
                        ConversationUser1: {
                            some: {user2Id: userId}
                        }, 
                    },
                    {
                        ConversationUser1: {
                            some: {user1Id: userId}
                        }
                    }
                ],
                id: {not: userId },
            },
            select: {
                id: true,
                name: true,
                username: true,
                profileImage: true,
                ConversationUser1: {
                    where: {
                        user2Id: userId,
                    },
                    select: { id : true}
                },
                ConversationUser2: {
                    where: {
                        user1Id: userId,
                    },
                    select: { id : true}
                },
            }
        })
        const groups = await prisma.group.findMany({
            where: {
                members: {
                    some: {id: userId}
                }
            },
            select: {id: true}
        })

        const groupIds = groups.map( group => group.id)
        const groupConversation = await prisma.conversation.findMany({
            where: {
                conversationType: "group",
                groupId: {in: groupIds}
            },
            select: {
                id: true,
                groupId: true,
                group: {
                    select: {
                        name: true,
                        description: true,
                        groupImage: true
                    }
                }
            }
        })
        return NextResponse.json({personal: personalConversations, group: groupConversation}, {status: 200})
    } catch (error) {
        return NextResponse.json({error: "something went wrong"}, {status: 500})
    }
}