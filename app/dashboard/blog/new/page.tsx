import NewBlogForm from './new-blog-form'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export default async function NewBlogPage() {
  const cookieStore = await cookies()
  
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    }
  )
  
  // Verify session
  const { data: { session } } = await supabase.auth.getSession()

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Create New Blog</h1>
      <NewBlogForm />
    </div>
  )
}
