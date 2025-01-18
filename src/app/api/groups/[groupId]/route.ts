import { getAuthUser } from "@/auth";
import prisma from "@/lib/db";
import { NextResponse } from "next/server";


// GET THE GROUP INFO 
export async function GET(request: Request) {
    try {
        const groupId = request.url.split("/groups/")[1];
        if(!groupId){
            return NextResponse.json("Group not found ", {status: 400});
        }
        const group = await prisma.group.findUnique({
            where: {id: groupId},
            select: {
                id: true,
                name: true,
                description: true,
                adminName: true,
                groupImage: true,
                groupCoverImage: true,
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
        
        return NextResponse.json({group}, {status: 200});
    } catch (error) {
        return NextResponse.json({error: "something went wrong"}, {status: 500})
    }
}

//UPDATE GROUP 
export async function PUT(request:Request) {
    try {
        const groupId = request.url.split("/groups/")[1];
        if(!groupId){
            return NextResponse.json("Group not found ", {status: 400});
        }
        const group = await prisma.group.findUnique({
            where: {id: groupId}
        })
        if(!group){
            return NextResponse.json("Group not found ", {status: 400});
        }
        const authUser = await getAuthUser();
        if(!authUser || authUser.id != group.adminId){
            return NextResponse.json("You are not admin ", {status: 403});
        }
        const body = await request.json();
        const updateGroup = await prisma.group.update({
            where: {id: group.id},
            data: {
                name: body.name,
                description: body.description,
                groupImage: body.groupImage,
                groupCoverImage: body.groupImage,
            }
        })

        return NextResponse.json({message: "Group updated successfully"}, {status: 200});
    } catch (error) {
        return NextResponse.json({error: "something went wrong"}, {status: 500});
    }
}

// DELETE A GROUP
export async function DELETE(request: Request) {
    try {
        const groupId = request.url.split("/groups/")[1];
        if(!groupId){
            return NextResponse.json("Group not found ", {status: 400});
        }
        const group = await prisma.group.findUnique({
            where: {id: groupId}
        })
        if(!group){
            return NextResponse.json("Group not found ", {status: 400});
        }
        const authUser = await getAuthUser();
        if(!authUser || authUser.id != group.adminId){
            return NextResponse.json("You are not admin ", {status: 403});
        }
        const deleteGroup = await prisma.group.delete({
            where: {id: group.id}
        })
        return NextResponse.json({message: "Group deleted successfully"}, {status: 200});
    } catch (error) {
        return NextResponse.json({error: "something went wrong"}, {status: 500});
    }
}