import { getAuthUser } from "@/auth";
import prisma from "@/lib/db"
import { NextResponse } from "next/server"


export async function GET(req: Request) {
    try {
        const userId = req.url.split("user/")[1]
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })
        return NextResponse.json(user, {status: 200})
    } catch (error) {
        return NextResponse.json({
            error: "something went wrong"
        })
    }
}
