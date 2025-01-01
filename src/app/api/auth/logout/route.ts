import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    (await cookies()).delete("usertoken");
    (await cookies()).delete("refreshtoken");

    return NextResponse.json({message: "Logout successfully"}, {status: 200})
}