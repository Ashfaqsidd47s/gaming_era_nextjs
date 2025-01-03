import { getAuthUser } from "@/auth";
import prisma from "@/lib/db"
import { NextResponse } from "next/server"


// GET USER DATA
export async function GET(req: Request) {
    try {
        const userId = req.url.split("user/followers/noconversation/")[1]
        const authUser = await getAuthUser();
        if(!authUser || authUser.id != userId){
            return NextResponse.json({
                error: "you are not authorized"
            }, {status: 403})
        }
        const followings = await prisma.user.findMany({
            where: {
                Follow: {
                    some: {
                        followerId: userId,
                    }
                },
                AND: [
                    {
                        ConversationUser1: {
                            none: {
                                user2Id: userId,
                            }
                        },
                        ConversationUser2: {
                            none: {
                                user1Id: userId,
                            }
                        },
                        NOT: {id: userId}
                    }
                ]
            },
            select: {
                id: true,
                username: true,
                name: true,
                profileImage: true,
            }
        })
        return NextResponse.json(followings, {status: 200})
    } catch (error) {
        return NextResponse.json({
            error: "something went wrong"
        })
    }
}