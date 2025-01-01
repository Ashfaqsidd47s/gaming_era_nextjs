import { getAuthUser } from "@/auth";
import prisma from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function GET(req: NextApiRequest) {
    try {
        // this is the actual art 
        // as the req.query was going undefined i realy don't have any idea why 
        // and it pissed me so much and then i have to do  this 
        // and after these errors i wont be using nextjs again for any project 
        // unles of untill i am getting paid a good chunk of mony for doing it 
        const splitUrl = req.url?.split("posts/")[1] ;
        const slug = splitUrl?.split("/");
        if(!slug){
            return NextResponse.json({
                error: "route not found"
            }, {status: 404});
        }

        if(slug[0] == "user"){
            // GET POSTS OF A SPECIFIC USER
            const posts = await prisma.post.findMany({
                where: {
                    userId: slug[1]
                }
            })
            
            return NextResponse.json(posts, {status: 200});
        } else if ( slug[0] == "follows") {
            // GET POSTS OF A SPECIFIC USER

            const user = await prisma.user.findUnique({
                where: {
                    id: slug[1]
                }, select: {followings: true}
            })
            if (!user) {
                return NextResponse.json({
                    error: "User not found"
                }, {status: 403});
            }
            const posts = await prisma.post.findMany({
                where: {
                    userId: { in: user.followings }
                }
            })
            
            return NextResponse.json(posts, {status: 200});
        } 
        return NextResponse.json({
            error: "route not found"
        }, {status: 404});
    } catch (error) {
        return NextResponse.json({
            error: "something went wrong"
        }, {status: 500});
    }
}

export async function DELETE(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { slug } = req.query;
        if(!slug){
            return res.status(404).json({ error: "route not found" });
        }
        // THIS PART IS AUTHORIZAIOTN (NOT AUTHENTICATION)
        const authUser = await getAuthUser()
        if(!authUser ){
            return res.status(403).json({ error: "User not autherized" });
        }
        const post = await prisma.post.findUnique({
            where : { id : slug[0]}
        })
        if(!post) return res.status(404).json({error: "post not found"});
        if(post.userId != authUser.id) return res.status(403).json({error: "user not authorized "});
        
        await prisma.post.delete({
            where: { id: post.id },
        });
        return res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
        res.status(500).json({error: "something went wrong"})
    }
}