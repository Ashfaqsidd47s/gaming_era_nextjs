import { getAuthUser } from "@/auth";
import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request:Request) {
    try {
        const userId = request.url.split("/groups/user/my/")[1];
        if(!userId){
            return NextResponse.json("user not found", {status: 400});
        }
        const authUser = await getAuthUser()
        if( !authUser || userId != authUser.id){
            return NextResponse.json("you are not authorized", {status: 403});
        }

        const groups = await prisma.group.findMany({
            where: {
                adminId: userId
            },
            select: {
                id: true,
                name: true,
                description: true,
                groupImage: true,
                members:{
                    take: 5,
                    select:{
                        user:{
                            select:{
                                profileImage: true
                            }
                            
                        }
                    }
                    
                }
            }
        })
        
        return NextResponse.json({groups}, {status: 200});
    } catch (error) {
        return NextResponse.json({error: "something went wrong"}, {status: 500})
    }
}