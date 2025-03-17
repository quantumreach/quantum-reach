import Link from 'next/link'
import DeleteBlog from './delete-blog'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export default async function BlogsPage() {
  const cookieStore = cookies()
  
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
  
  // Get blogs
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs`, {
    headers: {
      'Cache-Control': 'no-cache',
      'Cookie': cookieStore.toString()
    },
    next: { revalidate: 0 }
  })
  const { data: blogs } = await response.json()

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Blogs</h1>
        <Link href="/dashboard/blog/new" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-md transition-colors">
          New Blog
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {blogs && blogs.length > 0 ? (
              blogs.map((blog: any) => (
                <tr key={blog.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{blog.title}</div>
                    <div className="text-sm text-gray-500">{blog.slug}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {blog.published ? (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Published
                      </span>
                    ) : (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-amber-100 text-amber-800">
                        Draft
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(Date.parse(blog.created_at)).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-3">
                      <Link href={`/dashboard/blog/edit/${blog.slug}`} className="text-blue-600 hover:text-blue-900">
                        Edit
                      </Link>
                      <Link href={`/blog/${blog.slug}`} target="_blank" className="text-gray-600 hover:text-gray-900">
                        View
                      </Link>
                      <DeleteBlog slug={blog.slug} />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">
                  No blogs found. Create your first blog!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
