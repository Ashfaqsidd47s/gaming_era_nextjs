import { getAuthUser } from "@/auth";
import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        // authorization part
        const body = await request.json();
        const authUser = await getAuthUser();
        if(!authUser || authUser.id != body.userId){
            return NextResponse.json({error: "you are not authorized "}, {status: 403})
        }
        
        const post = await prisma.post.findUnique({
            where: {id: body.postId}
        })
        if(!post){
            return NextResponse.json({error: "post not found "}, {status: 404}); 
        }
        let isLiked = false;
        let count = post.likes.length
        if(post.likes.includes(body.userId)){
            await prisma.post.update({
                where: {id: post.id},
                data: {likes: post.likes.filter((l) => l != body.userId)}
            })
            isLiked = false;
            count--
        } else {
            post.likes.push(body.userId)
            await prisma.post.update({
                where: {id: post.id},
                data: {likes : post.likes}
            })
            isLiked = true;
            count++
        }

        return NextResponse.json({message: "Like updated successfully", isLiked, likes: count}, {status: 200})
    } catch (error) {
        return NextResponse.json({error: "something went wrong"}, {status: 500})
    }
    
}