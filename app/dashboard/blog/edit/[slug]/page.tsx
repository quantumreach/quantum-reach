import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import BlogEditForm from './edit-form';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;
  
  // Fetch the blog data using the slug
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs/${slug}`, { 
    cache: 'no-store' 
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch blog');
  }
  
  const blog = await response.json();
  
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Edit Blog</h1>
      <BlogEditForm initialBlog={blog} />
    </div>
  );
}