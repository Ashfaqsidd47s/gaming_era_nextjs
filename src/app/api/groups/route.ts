import { getAuthUser } from "@/auth";
import prisma from "@/lib/db";
import { NextResponse } from "next/server";

// CREATE A GROUP
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const authUser = await getAuthUser();
        if(!authUser || authUser.id != body.userId){
            return NextResponse.json({error: "You are not authorized"}, {status: 403});
        }
        const group = await prisma.group.create({
            data: {
                adminId: body.userId,
                adminName: body.userName,
                name: body.name, 
                description: body.description ? body.description: "",
                groupImage: body.groupImage ? body.groupImage : "",
            }
        })
        const member = await prisma.member.create({
            data: {
                userId: body.userId, 
                groupId: group.id,
                role: "admin"
            }
        })
        return NextResponse.json({message: "Group created successfully", group},{status: 200})
    } catch (error) {
        return NextResponse.json({error: "something went wrong"}, {status: 500})
    }
}



