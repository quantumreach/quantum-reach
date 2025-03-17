import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';

interface Props {
  params: {
    slug: string;
  };
}

async function getBlog(slug: string) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const url = new URL(`/api/blogs/${slug}`, baseUrl);
  const res = await fetch(url.toString(), {
    cache: 'no-store',
  });
  if (!res.ok) return null;
  const data = await res.json();
  return data.data;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params;
  const blog = await getBlog(slug);
  if (!blog) return { title: 'Blog Not Found' };
  
  return {
    title: blog.metaTitle || blog.title,
    description: blog.metaDescription,
    keywords: blog.metaKeywords,
  };
}

export default async function BlogPage({ params }: Props) {
  const { slug } = params;
  const blog = await getBlog(slug);
  if (!blog) notFound();

  return (
    <article className="container mx-auto px-4 py-8 max-w-3xl">
      {blog.featuredImage && (
        <img 
          src={blog.featuredImage} 
          alt={blog.title}
          className="w-full h-64 object-cover rounded-lg mb-8"
        />
      )}
      <h1 className="text-4xl font-lora mb-4">{blog.title}</h1>
      <div className="prose font-lora max-w-none">
        <ReactMarkdown>{blog.content}</ReactMarkdown>
      </div>
    </article>
  );
}
