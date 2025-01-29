import { getAuthUser } from "@/auth";
import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        // this is the actual art 
        // as the req.query was going undefined i realy don't have any idea why 
        // and it pissed me so much and then i have to do  this 
        // and after these errors i wont be using nextjs again for any project 
        // unles or until i am getting paid a good chunk of mony for doing it 
        
        const userId = request.url.split("/posts/user/")[1];

        const posts = await prisma.post.findMany({
            where: {userId: userId},
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

