import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const cookieStore = cookies()
  
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          // Type assertion to fix TypeScript error
          return (cookieStore as any).get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          // Type assertion to fix TypeScript error
          (cookieStore as any).set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          // Type assertion to fix TypeScript error
          (cookieStore as any).set({ name, value: '', ...options })
        },
      },
    }
  )
  
  await supabase.auth.signOut()
  
  return NextResponse.redirect(new URL('/login', request.url), {
    status: 302,
  })
}
