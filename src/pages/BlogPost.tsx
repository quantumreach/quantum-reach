
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { supabase } from '@/integrations/supabase/client';
import ReactMarkdown from 'react-markdown';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  meta_title: string | null;
  meta_description: string | null;
  meta_keywords: string | null;
  featured_image: string | null;
  og_title: string | null;
  og_description: string | null;
  og_image: string | null;
  twitter_title: string | null;
  twitter_description: string | null;
  twitter_image: string | null;
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogPost = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('blogs')
          .select('*')
          .eq('slug', slug)
          .eq('published', true)
          .single();
        
        if (error) throw error;
        setPost(data);
      } catch (error: any) {
        console.error('Error fetching blog post:', error);
        setError(error.message || 'Failed to load blog post');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchBlogPost();
    }
  }, [slug]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-quantum-400"></div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-12 flex flex-col items-center justify-center">
          <h1 className="text-2xl font-lora font-semibold mb-4">Blog Post Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The blog post you're looking for doesn't exist or is no longer available.
          </p>
          <Link to="/blogs">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blogs
            </Button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Helmet>
        <title>{post.meta_title || post.title} | QuantumReach</title>
        <meta name="description" content={post.meta_description || ''} />
        {post.meta_keywords && <meta name="keywords" content={post.meta_keywords} />}
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.og_title || post.title} />
        <meta property="og:description" content={post.og_description || post.meta_description || ''} />
        {post.og_image && <meta property="og:image" content={post.og_image} />}
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.twitter_title || post.title} />
        <meta name="twitter:description" content={post.twitter_description || post.meta_description || ''} />
        {post.twitter_image && <meta name="twitter:image" content={post.twitter_image} />}
      </Helmet>

      <Header />
      <main className="flex-1 container mx-auto px-4 py-12">
        <article className="max-w-3xl mx-auto">
          <div className="mb-8">
            <Link to="/blogs" className="inline-flex items-center text-quantum-400 hover:underline mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to all blogs
            </Link>
            
            <h1 className="font-lora text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
            <div className="text-muted-foreground mb-8">
              Published on {formatDate(post.created_at)}
              {post.updated_at !== post.created_at && 
                ` • Updated on ${formatDate(post.updated_at)}`
              }
            </div>
            
            {post.featured_image && (
              <div className="mb-8">
                <img 
                  src={post.featured_image} 
                  alt={post.title} 
                  className="w-full rounded-lg shadow-md"
                />
              </div>
            )}
          </div>

          <div className="prose prose-lg max-w-none font-lora">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
