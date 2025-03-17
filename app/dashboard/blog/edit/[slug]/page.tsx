import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import BlogEditForm from './edit-form';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export default async function EditBlogPage({ params }: { params: { slug: string } }) {
  const cookieStore = cookies();
  
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: any) { /* ...existing code... */ },
        remove(name: string, options: any) { /* ...existing code... */ }
      },
    }
  );
  
  // Log session and debugging info
  console.log('Editing blog with slug:', params.slug);
  
  // Get blog data using API with slug
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    console.log(`Fetching blog from API: ${apiUrl}/api/blogs/${params.slug}`);
    
    const response = await fetch(`${apiUrl}/api/blogs/${params.slug}`, {
      headers: {
        'Cache-Control': 'no-cache',
        'Cookie': cookieStore.toString()
      },
      next: { revalidate: 0 }
    });

    if (!response.ok) {
      console.log(`API request failed with status ${response.status}. Trying direct Supabase query...`);
      
      // Fallback to query Supabase using slug
      const { data: blogData, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('slug', params.slug)
        .single();
      
      if (error || !blogData) {
        console.error('Supabase query failed:', error);
        throw new Error(`Failed to fetch blog: ${error?.message || 'Not found'}`);
      }
      
      console.log('Retrieved blog from Supabase');
      return (
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Edit Blog</h1>
          <BlogEditForm initialBlog={blogData} />
        </div>
      );
    }
    
    const { data: blog } = await response.json();
    console.log('Retrieved blog from API');
    if (!blog) {
      return notFound();
    }
    return (
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Edit Blog</h1>
        <BlogEditForm initialBlog={blog} />
      </div>
    );
  } catch (error) {
    console.error('Error fetching blog data:', error);
    return (
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Error</h1>
        <div className="bg-red-50 p-4 rounded-md border border-red-200 text-red-700">
          <p className="font-medium mb-2">Failed to load blog data.</p>
          <p className="text-sm">Error details: {error instanceof Error ? error.message : 'Unknown error'}</p>
        </div>
        <div className="mt-6">
          <Link href="/dashboard/blogs" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Back to blogs
          </Link>
        </div>
      </div>
    );
  }
}