import Link from 'next/link';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export default async function Dashboard() {
  const cookieStore = cookies();
  
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );
  
  // Verify session
  const { data: { session } } = await supabase.auth.getSession();
  
  // Get recent blogs
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs?limit=5`, {
    headers: {
      'Cache-Control': 'no-cache',
      'Cookie': cookieStore.toString()
    },
    next: { revalidate: 0 }
  });
  const { data: recentBlogs } = await response.json();

  // Count total blogs (published and drafts)
  const allBlogsResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs/count`, {
    headers: {
      'Cache-Control': 'no-cache',
      'Cookie': cookieStore.toString()
    },
    next: { revalidate: 0 }
  });
  const { total, published, drafts } = await allBlogsResponse.json();

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Dashboard Overview</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
          <h2 className="text-lg font-semibold text-gray-700">Total Blogs</h2>
          <p className="text-3xl font-bold mt-2">{total || 0}</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
          <h2 className="text-lg font-semibold text-gray-700">Published</h2>
          <p className="text-3xl font-bold mt-2 text-green-600">{published || 0}</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
          <h2 className="text-lg font-semibold text-gray-700">Drafts</h2>
          <p className="text-3xl font-bold mt-2 text-amber-600">{drafts || 0}</p>
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6 mb-8 hover:shadow-md transition-shadow">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <Link 
            href="/dashboard/blog/new" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-md transition-colors"
          >
            Create New Blog
          </Link>
          <Link 
            href="/dashboard/blogs" 
            className="bg-gray-600 hover:bg-gray-700 text-white px-5 py-2.5 rounded-md transition-colors"
          >
            Manage All Blogs
          </Link>
        </div>
      </div>
      
      {/* Recent Blogs */}
      <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-semibold">Recent Blogs</h2>
          <Link href="/dashboard/blogs" className="text-blue-600 hover:text-blue-800 hover:underline">
            View all
          </Link>
        </div>
        
        <div className="divide-y">
          {recentBlogs && recentBlogs.length > 0 ? (
            recentBlogs.map((blog: any) => (
              <div key={blog.id} className="py-4 first:pt-0 last:pb-0">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium text-gray-900">{blog.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {blog.published ? (
                        <span className="text-green-600 font-medium">Published</span>
                      ) : (
                        <span className="text-amber-600 font-medium">Draft</span>
                      )}
                        {' • '}{new Date(Date.parse(blog.created_at)).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex space-x-3">
                    <Link 
                      href={`/dashboard/blog/edit/${blog.id}`}
                      className="text-blue-600 hover:text-blue-800 hover:underline text-sm font-medium"
                    >
                      Edit
                    </Link>
                    <Link 
                      href={`/blog/${blog.slug}`} 
                      target="_blank"
                      className="text-gray-600 hover:text-gray-800 hover:underline text-sm font-medium"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 py-4">No blogs created yet. Create your first blog!</p>
          )}
        </div>
      </div>
    </div>
  );
}
