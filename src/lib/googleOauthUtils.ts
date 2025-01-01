import axios from "axios";

interface GoogleTokenResponse {
    access_token: string;
    expires_in: number;
    refresh_token?: string; 
    scope: string;
    token_type: string;
    id_token: string; 
}

interface GoogleUserData {
    sub: string;        
    name: string;       
    given_name: string; 
    family_name: string; 
    picture: string;    
    email: string;
}

export function getGoogleOAuthUrl() {
    const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";

    const options = {
        redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI as string, 
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
        access_type: 'offline',
        response_type: 'code',
        prompt: 'consent',
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'
        ].join(' '),
    }

    
    const qs = new URLSearchParams(options);

    return `${rootUrl}?${qs.toString()}`
}

export async function getGoogleAuthToken({code}: {code: string}): Promise<GoogleTokenResponse> {
    const url = "https://oauth2.googleapis.com/token";

    const values = {
        code,
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
        client_secret: process.env.GOOGLE_CLIENT_SECRET as string,
        redirect_uri : process.env.NEXT_PUBLIC_REDIRECT_URI as string,
        grant_type: 'authorization_code'
    }

    try {
        const qs = new URLSearchParams(values)
        const res = await axios.post<GoogleTokenResponse>(url , qs, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.error_description || "Failed to get Google Auth Token");
    }
}

export async function getGoogleClientData(acces_token: string): Promise<GoogleUserData> {
    try {
        const res = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
            headers: {
                Authorization: `Bearer ${acces_token}`
            }
        })
        return res.data;
    } catch (error: any) {
        throw new Error(error || "Failed to get Google Auth Token");
    }
}