import { encryptJwt } from "@/auth";
import prisma from "@/lib/db";
import { getGoogleAuthToken, getGoogleClientData } from "@/lib/googleOauthUtils";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function GET(request: NextApiRequest) {
    try {
        const url = request.url || ""; 
        const queryString = url.split("?")[1] || "";
        const searchParams = new URLSearchParams(queryString);
        const code = searchParams.get("code");
        if(!code){
            return NextResponse.json({ error: "Code query parameter is required" }, {status: 400})
        }
        
        const {id_token, access_token} = await getGoogleAuthToken({code})
        
        const {email, name, picture} = await getGoogleClientData(access_token);
        
        const existingUser = await prisma.user.findUnique({
            where:{
                email: email,
            }
        })
        if(existingUser){
            const isAuthenticated = await encryptJwt(existingUser);
            if(!isAuthenticated){
                return NextResponse.json({
                    error: "Something went wrong"
                }, { status: 500})
            }
            return NextResponse.redirect(process.env.BASE_URL as string + "/feeds")
        }
        const newUser = await prisma.user.create({
            data: {
              name,
              username: email.split("@")[0] + generateRandomDigits(3),
              email,
              password: "google" + generateRandomDigits(6),
              profileImage: picture || null,
              coverImage: null,
            },
        });
        const isAuthenticated = await encryptJwt(newUser);
        if(!isAuthenticated){
            return NextResponse.json({
                error: "Something went wrong"
            }, { status: 500})
        }
        return NextResponse.redirect(process.env.BASE_URL as string)
    } catch (error) {
        return NextResponse.json({ error: "Something went wrong" }, {status: 500})
    }
    
}

function generateRandomDigits(n: number): string {
    let result = '';
    for (let i = 0; i < n; i++) {
      result += Math.floor(Math.random() * 10).toString(); // Generate a random digit between 0 and 9
    }
    return result;
}