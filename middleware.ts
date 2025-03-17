import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // If user is not signed in and the current path is not /dashboard/login,
  // redirect the user to /dashboard/login
  if (!session && req.nextUrl.pathname.startsWith('/dashboard') && 
      !req.nextUrl.pathname.includes('/login')) {
    const redirectUrl = new URL('/dashboard/login', req.url);
    return NextResponse.redirect(redirectUrl);
  }

  // If user is signed in and the current path is /dashboard/login,
  // redirect the user to /dashboard
  if (session && req.nextUrl.pathname === '/dashboard/login') {
    const redirectUrl = new URL('/dashboard', req.url);
    return NextResponse.redirect(redirectUrl);
  }

  return res;
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
