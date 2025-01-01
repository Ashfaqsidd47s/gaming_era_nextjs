import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { isValidJwt } from './auth';


export async function middleware(request: Request) {
  const url = request.url;
  if (url.includes('/api/auth')) {
    return NextResponse.next();
  }
  const cookieStore = await cookies();
  const accessTokenCookie = cookieStore.get('usertoken');
    
  
  if (!accessTokenCookie || !accessTokenCookie.value) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const accessToken = accessTokenCookie.value; 

  try {
    
    const isValid = await isValidJwt(accessToken);
    if(!isValid){
      return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next(); 
  } catch (error) {
    
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: [
    "/",
    // Match all routes except static files, login, register, and api/auth (exact match)
    '/((?!_next|login|register|api/auth$|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes except exactly /api/auth
    '/(api)(.*)',
  ],
};
