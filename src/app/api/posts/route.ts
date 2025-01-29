import { getAuthUser } from "@/auth";
import prisma from "@/lib/db";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import { z } from "zod";

const postSchema = z.object({
    userId: z.string().min(1, {message: "userId is not valid"}),
    content: z.string().min(1, { message: 'post need some content' }),
})


// CREATE A POST (POST ROUTE )
export async function POST(request: Request) {
    try {
        const body = await  request.json();

        const authUser = await getAuthUser();
        if(!authUser || authUser.id != body.userId) {
            return NextResponse.json({
                error: "You are not authnticated"
            }, {status: 403})
        }
        
        
        const post = await prisma.post.create({
            data: {
                userId: body.userId,
                content: body.content,
                img: body.img
            }
        })
        return NextResponse.json(post, {status: 200});
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            error: "something went wrong"
        }, {status: 500});
    }
}

// GET ALL POSTS (GET ROUTE)
export async function GET(request: Request) {
    try {
        const posts = await prisma.post.findMany({
            select: {
                id: true,
                userId: true,
                content: true,
                img: true,
                createdAt: true,
                likes: true,
                user: {
                    select: {
                        name: true,
                        username: true,
                        profileImage: true,
                    }
                },
                _count: {
                    select: {
                        comments: true,
                    }
                }
            }
        });
        return NextResponse.json(posts, {status: 200});
    } catch (error) {
        return NextResponse.json({
            error: "something went wrong"
        }, {status: 500});
    }
}