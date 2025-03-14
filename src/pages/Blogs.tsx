
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

// Update the index.html to import Google Lora font
// This is added in index.html:
// <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600;700&display=swap">

interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  created_at: string;
  meta_description: string | null;
}

const Blogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const blogsPerPage = 6;

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        // Count total blogs for pagination
        const { count } = await supabase
          .from('blogs')
          .select('*', { count: 'exact', head: true })
          .eq('published', true);
        
        const totalCount = count || 0;
        setTotalPages(Math.ceil(totalCount / blogsPerPage));
        
        // Fetch blogs for current page
        const { data, error } = await supabase
          .from('blogs')
          .select('id, title, slug, excerpt, created_at, meta_description')
          .eq('published', true)
          .order('created_at', { ascending: false })
          .range((page - 1) * blogsPerPage, page * blogsPerPage - 1);
        
        if (error) throw error;
        setBlogs(data || []);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [page]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <h1 className="font-lora text-4xl md:text-5xl font-bold mb-6 text-center">Our Blog</h1>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Explore our latest insights, industry trends, and expert perspectives on quantum computing and emerging technologies.
          </p>

          {loading ? (
            <div className="flex justify-center my-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-quantum-400"></div>
            </div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-lora mb-4">No blog posts available yet</h3>
              <p className="text-muted-foreground">Check back soon for new content!</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {blogs.map((blog) => (
                  <Link key={blog.id} to={`/blog/${blog.slug}`}>
                    <Card className="h-full hover:shadow-md transition-shadow duration-300">
                      <CardHeader className="pb-4">
                        <CardTitle className="font-lora text-xl font-semibold">{blog.title}</CardTitle>
                        <CardDescription>{formatDate(blog.created_at)}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground line-clamp-3">
                          {blog.excerpt || blog.meta_description || "Read this article to learn more..."}
                        </p>
                      </CardContent>
                      <CardFooter>
                        <p className="text-quantum-400 font-medium">Read more →</p>
                      </CardFooter>
                    </Card>
                  </Link>
                ))}
              </div>

              {totalPages > 1 && (
                <Pagination className="my-8">
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                        className={page === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                      />
                    </PaginationItem>
                    
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
                      <PaginationItem key={pageNum}>
                        <PaginationLink 
                          isActive={page === pageNum}
                          onClick={() => setPage(pageNum)}
                          className="cursor-pointer"
                        >
                          {pageNum}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    
                    <PaginationItem>
                      <PaginationNext 
                        onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                        className={page === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blogs;
