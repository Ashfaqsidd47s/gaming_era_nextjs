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
                id: {not: userId },
                OR: [
                    {
                        ConversationUser1: {
                            some: {user2Id: userId}
                        }, 
                    },
                    {
                        ConversationUser2: {
                            some: {user1Id: userId}
                        }
                    }
                ],
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
        const simplifiedConversations = personalConversations.map(user => ({
            id: user.id,
            name: user.name,
            username: user.username,
            profileImage: user.profileImage,
            conversationId:
              user.ConversationUser1.length > 0
                ? user.ConversationUser1[0].id
                : user.ConversationUser2.length > 0
                ? user.ConversationUser2[0].id
                : null,
          }));
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
        return NextResponse.json({personal: simplifiedConversations, group: groupConversation}, {status: 200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({error: "something went wrong"}, {status: 500})
    }
}