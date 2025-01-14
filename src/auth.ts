import { jwtVerify, SignJWT } from "jose"
import { User } from "@prisma/client";
import prisma from "./lib/db";
import { cookies } from "next/headers";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET)
const JWT_EXPIRATION_TIME = '2h'; 
const REFRESH_TOKEN_EXPIRATION_TIME = '7d';

interface JwtPayload {
    id: string;
    email: string;
    username: string;
    name: string;
    profileImage: string;
}

export const encryptJwt = async (user: User) => {
    try{
        const accessToken = await new SignJWT({
            id: user.id,
            email: user.email,
            username: user.username,
            name: user.name,
            profileImage: user.profileImage
        }).setProtectedHeader({alg: 'HS256'})
        .setExpirationTime(JWT_EXPIRATION_TIME)
        .sign(JWT_SECRET);

        const refereshToken = await new SignJWT({
            id: user.id,
        }).setProtectedHeader({alg: 'HS256'})
        .setExpirationTime(REFRESH_TOKEN_EXPIRATION_TIME)
        .sign(JWT_SECRET);

        (await cookies()).set('usertoken', accessToken, {
            httpOnly: true,
            maxAge: 60 * 60 * 2
        });
        (await cookies()).set('refreshtoken', refereshToken, {
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 7
        })

        return true;
    } catch (error) {
        return false;
    }
}

export const decryptJwt = async (token: string): Promise<JwtPayload | null> => {
    try {
        const { payload } = await jwtVerify(token, JWT_SECRET, {algorithms: ["HS256"]})
        return payload as unknown as JwtPayload; 
        
    } catch (error) {
        return null;
    }
}

export const updateJwt = async (refereshToken: string): Promise<boolean> => {
    try {
        const { payload } = await jwtVerify(refereshToken, JWT_SECRET);

        const userData = await prisma.user.findUnique({
            where: {id: String(payload.id)}
        })
        if(!userData){
            throw new Error("invalid token")
        }
        const accessToken = await new SignJWT({
            id: userData.id,
            email: userData.email,
            name: userData.name,
            username: userData.username,
            profileImage: userData.profileImage
        }).setProtectedHeader({alg: 'HS256'})
        .setExpirationTime(JWT_EXPIRATION_TIME)
        .sign(JWT_SECRET);

        (await cookies()).set('usertoken', accessToken, {
            httpOnly: true,
            maxAge: 60 * 60 * 2
        });
        return true;
    } catch (error) {
        console.log(error)
        return false;
    }
}

export const isValidJwt = async (token: string): Promise<boolean> => {
    try {
        await jwtVerify(token, JWT_SECRET);
        return true; 
    } catch (error) {
        return false; 
    }
};

export const getAuthUser = async (): Promise<JwtPayload | null> => {
    const cookieStore = await cookies();
    const accessTokenCookie = cookieStore.get('usertoken');

    if (!accessTokenCookie || !accessTokenCookie.value) {
        return null;
    }

    const decryptedUser = await decryptJwt(accessTokenCookie.value);
    return decryptedUser;
}



