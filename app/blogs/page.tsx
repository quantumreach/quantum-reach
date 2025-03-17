import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Blog Posts',
  description: 'Read our latest blog posts',
};

async function getBlogs() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const url = new URL(`/api/blogs`, baseUrl);
  const res = await fetch(url.toString(), {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Failed to fetch blogs');
  const data = await res.json();
  return data.data;
}

export default async function BlogsPage() {
  const blogs = await getBlogs();

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-lora mb-8">Blog Posts</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog: any) => (
          <Link 
            href={`/blogs/${blog.slug}`} 
            key={blog.slug}
            className="block p-6 border rounded-lg hover:shadow-lg transition"
          >
            {blog.featuredImage && (
              <img 
                src={blog.featuredImage} 
                alt={blog.title}
                className="w-full h-48 object-cover rounded mb-4"
              />
            )}
            <h2 className="text-2xl font-lora mb-2">{blog.title}</h2>
            <p className="text-gray-600">{blog.excerpt}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
