import { getAuthUser } from "@/auth";
import prisma from "@/lib/db";
import { NextResponse } from "next/server";

// GET ALL THE COMMENTS OF THE POST
export async function GET(request: Request) {
    try {
        const postId = request.url.split("comment/")[1];
        if (!postId) {
            return NextResponse.json({ error: "Invalid postId" }, { status: 400 });
        }
        
        const post = await prisma.post.findUnique({
            where: {id: postId}
        })
        if(!post){
            return NextResponse.json({error: "post not found"},{status: 404})
        }

        const comments = await prisma.comment.findMany({
            where: {postId: postId}
        })
        console.log("reached after finding comment")
        return NextResponse.json(comments, {status: 200});
    } catch (error) {
        return NextResponse.json({error: "something went wrong"},{status: 500})
    }
}

// GET ALL THE COMMENTS OF THE POST
export async function POST(request: Request) {
    try { 
        const body = await request.json();
        const authUser = await getAuthUser();
        if(!authUser || authUser.id != body.userId){
            return NextResponse.json({error: "you are not authorized "}, {status: 403})
        }
        const comment = await prisma.comment.create({
            data: {
                userId: body.userId,
                postId: body.postId,
                text: body.text
            }
        })
        return NextResponse.json({message: "comment added successfully", comment}, {status: 200});
    } catch (error) {
        return NextResponse.json({error: "something went wrong"},{status: 500})
    }
    
}