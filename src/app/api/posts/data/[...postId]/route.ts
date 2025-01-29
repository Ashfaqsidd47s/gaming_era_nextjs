import { getAuthUser } from "@/auth";
import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
    try {
        const postId = request.url.split("/posts/data/")[1];

        const post = await prisma.post.findUnique({
            where: {id: postId},
            select: {
                userId: true
            }
        })
        if(!post) {
            return NextResponse.json({error: "post not found"}, {status: 404})
        }
        const authUser = await getAuthUser();
        if(!authUser || authUser.id != post.userId){
            return NextResponse.json({error: "you are not autherized"}, {status: 403})
        }
        
        const deltePost = await prisma.post.delete({
            where: {id: postId}
        })
        return NextResponse.json({message: "post deleted successfully"}, {status: 200});
    } catch (error) {
        return NextResponse.json({
            error: "something went wrong"
        }, {status: 500});
    }
}