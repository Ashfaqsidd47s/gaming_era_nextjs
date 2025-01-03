import { getAuthUser } from "@/auth";
import prisma from "@/lib/db";
import { NextResponse } from "next/server";


// GET USER DATA
export async function GET(req: Request) {
    try {
        const userId = req.url.split("user/newusers/")[1]
        const authUser = await getAuthUser();
        if(!authUser || authUser.id != userId){
            return NextResponse.json({
                error: "you are not authorized"
            }, {status: 403})
        }
        const users = await prisma.user.findMany({
            where: {
                id: {
                    not: userId,
                },
                AND: {
                    Following:{
                        none: { followerId: userId}
                    },
                    FollowRequestReciever: {
                        none: { senderId: userId}
                    }
                }
            },
            select: {
                id: true,
                username: true,
                name: true,
                profileImage: true
            }
        });
        return NextResponse.json(users, {status: 200})
    } catch (error) {
        return NextResponse.json({
            error: "something went wrong"
        })
    }
}
