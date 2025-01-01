
import { decryptJwt, encryptJwt, isValidJwt } from "@/auth";
import prisma from "@/lib/db";
import bcrypt from "bcrypt"
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { z } from "zod";

const signInSchema = z.object({
    username: z.string().min(1, {message: "usename / email is not valid"}),
    password: z.string().min(6, { message: 'Invalid password' }),
})

export async function POST(request: Request) {
    try{
        const body = await request.json();
        
        const validatedData = signInSchema.safeParse(body);

        if(!validatedData.success){
            return NextResponse.json({
                error: validatedData.error.errors[0].message
            })
        }

        const { username, password } = validatedData.data;

        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [
                    {username: username},
                    {email: username}
                ]
            }
        })

        if(!existingUser){
            return NextResponse.json({
                error: "username/ email not found"
            }, {status: 400})
        }
        const isPasswordValid = await bcrypt.compare(password, existingUser.password)
        console.log(isPasswordValid)
        
        if(!isPasswordValid){
            return NextResponse.json({
                error: "Incorrect password"
            }, {status: 403})
        }

        const isAuthenticated = await encryptJwt(existingUser);
        if(!isAuthenticated){
            return NextResponse.json({
                error: "Something went wrong"
            }, { status: 500})
        }
        return NextResponse.json({
            message: "logged in successfully", 
            user: existingUser
        }, { status: 200})
    } catch (error) {
        return NextResponse.json({
            error: "Something went wrong"
        }, { status: 500})
    }
}

// this get route returns the current authenticated user 
export async function GET(request: Request) {
    try {
        const cookieStore = await cookies();
        const accessTokenCookie = cookieStore.get('usertoken');
            
        
        if (!accessTokenCookie || !accessTokenCookie.value) {
            return NextResponse.redirect(new URL('/login', request.url));
        }

        const accessToken = accessTokenCookie.value; 
    
        const decryptedUser = await decryptJwt(accessToken);
        if(!decryptedUser){
            return NextResponse.json({
                message: "You are not authenticated"
            }, {status: 403})
        }
        
        return NextResponse.json(decryptedUser, {status: 200}); 
    } catch (error) {
        return NextResponse.json({
            error: "Something went wrong"
        }, { status: 500})
    }
}

