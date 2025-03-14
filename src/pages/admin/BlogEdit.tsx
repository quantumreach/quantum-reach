
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import AdminLayout from '@/components/admin/AdminLayout';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MarkdownEditor } from '@/components/admin/MarkdownEditor';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Save, Eye, ArrowLeft, Sparkles } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  published: boolean;
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

const BlogEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isNewPost = !id;
  
  const [formData, setFormData] = useState<Partial<BlogPost>>({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    published: false,
    meta_title: '',
    meta_description: '',
    meta_keywords: '',
    featured_image: '',
    og_title: '',
    og_description: '',
    og_image: '',
    twitter_title: '',
    twitter_description: '',
    twitter_image: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(isNewPost ? false : true);
  const [previewMode, setPreviewMode] = useState(false);

  useEffect(() => {
    if (!isNewPost) {
      fetchBlogPost();
    }
  }, [id]);

  const fetchBlogPost = async () => {
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      if (data) {
        setFormData(data);
      }
    } catch (error) {
      console.error('Error fetching blog post:', error);
      toast({
        title: "Error",
        description: "Failed to load blog post",
        variant: "destructive"
      });
    } finally {
      setFetchLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleContentChange = (value: string) => {
    setFormData(prev => ({ ...prev, content: value }));
  };

  const handlePublishedChange = (value: boolean) => {
    setFormData(prev => ({ ...prev, published: value }));
  };

  const generateSlug = () => {
    if (formData.title) {
      const slug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      
      setFormData(prev => ({ ...prev, slug }));
    }
  };

  const populateSeoFields = () => {
    const newFormData = { ...formData };
    
    if (formData.title && !formData.meta_title) {
      newFormData.meta_title = formData.title;
    }
    
    if (formData.excerpt && !formData.meta_description) {
      newFormData.meta_description = formData.excerpt;
    }
    
    if (!formData.og_title) {
      newFormData.og_title = newFormData.meta_title || formData.title;
    }
    
    if (!formData.og_description) {
      newFormData.og_description = newFormData.meta_description || formData.excerpt;
    }
    
    if (!formData.twitter_title) {
      newFormData.twitter_title = newFormData.meta_title || formData.title;
    }
    
    if (!formData.twitter_description) {
      newFormData.twitter_description = newFormData.meta_description || formData.excerpt;
    }
    
    if (formData.featured_image && !formData.og_image) {
      newFormData.og_image = formData.featured_image;
    }
    
    if (formData.featured_image && !formData.twitter_image) {
      newFormData.twitter_image = formData.featured_image;
    }
    
    setFormData(newFormData);
    
    toast({
      title: "SEO fields populated",
      description: "SEO fields have been populated based on existing content"
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    if (!formData.title || !formData.slug || !formData.content) {
      toast({
        title: "Validation Error",
        description: "Title, slug, and content are required",
        variant: "destructive"
      });
      setLoading(false);
      return;
    }
    
    try {
      const now = new Date().toISOString();
      const updatedFormData = {
        ...formData,
        updated_at: now
      };
      
      if (isNewPost) {
        // Create new post
        const { data, error } = await supabase
          .from('blogs')
          .insert({ ...updatedFormData, created_at: now })
          .select('id')
          .single();
        
        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Blog post created successfully",
        });
        
        navigate(`/admin/blogs/${data.id}`);
      } else {
        // Update existing post
        const { error } = await supabase
          .from('blogs')
          .update(updatedFormData)
          .eq('id', id);
        
        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Blog post updated successfully",
        });
      }
    } catch (error: any) {
      console.error('Error saving blog post:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to save blog post",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-quantum-400"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/admin/blogs')}
              className="mr-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Posts
            </Button>
            <h1 className="text-3xl font-bold">
              {isNewPost ? 'Create New Blog Post' : 'Edit Blog Post'}
            </h1>
          </div>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              onClick={() => setPreviewMode(!previewMode)}
            >
              <Eye className="h-4 w-4 mr-2" />
              {previewMode ? 'Edit Mode' : 'Preview'}
            </Button>
            <Button 
              disabled={loading} 
              onClick={handleSubmit}
            >
              <Save className="h-4 w-4 mr-2" />
              {loading ? 'Saving...' : 'Save'}
            </Button>
          </div>
        </div>

        <Tabs defaultValue="content">
          <TabsList className="mb-6">
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="seo">SEO & Meta</TabsTrigger>
            <TabsTrigger value="social">Social</TabsTrigger>
          </TabsList>

          <TabsContent value="content">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Blog Content</CardTitle>
                    <CardDescription>Enter the main content of your blog post</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        name="title"
                        value={formData.title || ''}
                        onChange={handleChange}
                        placeholder="Enter blog post title"
                        className="w-full"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="slug">Slug</Label>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={generateSlug} 
                          type="button"
                          className="h-6 px-2 text-xs"
                        >
                          Generate from title
                        </Button>
                      </div>
                      <Input
                        id="slug"
                        name="slug"
                        value={formData.slug || ''}
                        onChange={handleChange}
                        placeholder="Enter URL slug (e.g. my-blog-post)"
                        className="w-full"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="excerpt">Excerpt</Label>
                      <Textarea
                        id="excerpt"
                        name="excerpt"
                        value={formData.excerpt || ''}
                        onChange={handleChange}
                        placeholder="Enter a short excerpt for your blog post"
                        className="min-h-[100px]"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Content</Label>
                      <div className="min-h-[400px] border rounded-md">
                        <MarkdownEditor 
                          value={formData.content || ''} 
                          onChange={handleContentChange}
                          preview={previewMode}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Publication Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="published"
                        checked={formData.published || false}
                        onChange={(e) => handlePublishedChange(e.target.checked)}
                        className="h-4 w-4 rounded border-gray-300 text-quantum-400 focus:ring-quantum-400"
                      />
                      <Label htmlFor="published" className="cursor-pointer">
                        Published
                      </Label>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {formData.published 
                          ? 'This post will be visible to all users.' 
                          : 'This post is currently a draft and not visible to users.'}
                      </p>
                    </div>

                    <div className="pt-4">
                      <Label htmlFor="featured_image">Featured Image URL</Label>
                      <Input
                        id="featured_image"
                        name="featured_image"
                        value={formData.featured_image || ''}
                        onChange={handleChange}
                        placeholder="https://example.com/image.jpg"
                        className="w-full mt-1"
                      />
                      {formData.featured_image && (
                        <div className="mt-2 rounded-md overflow-hidden border">
                          <img 
                            src={formData.featured_image} 
                            alt="Featured" 
                            className="w-full h-auto object-cover"
                          />
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="seo">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>SEO Settings</CardTitle>
                    <CardDescription>Optimize your blog post for search engines</CardDescription>
                  </div>
                  <Button variant="outline" onClick={populateSeoFields}>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Auto-populate
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="meta_title">Meta Title</Label>
                  <Input
                    id="meta_title"
                    name="meta_title"
                    value={formData.meta_title || ''}
                    onChange={handleChange}
                    placeholder="Enter meta title (for search results)"
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground">
                    Recommended length: 50-60 characters
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="meta_description">Meta Description</Label>
                  <Textarea
                    id="meta_description"
                    name="meta_description"
                    value={formData.meta_description || ''}
                    onChange={handleChange}
                    placeholder="Enter meta description"
                    className="min-h-[100px]"
                  />
                  <p className="text-xs text-muted-foreground">
                    Recommended length: 150-160 characters
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="meta_keywords">Meta Keywords</Label>
                  <Input
                    id="meta_keywords"
                    name="meta_keywords"
                    value={formData.meta_keywords || ''}
                    onChange={handleChange}
                    placeholder="quantum computing, technology, ai (comma separated)"
                    className="w-full"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="social">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Open Graph / Facebook</CardTitle>
                  <CardDescription>How your post appears when shared on Facebook</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="og_title">OG Title</Label>
                    <Input
                      id="og_title"
                      name="og_title"
                      value={formData.og_title || ''}
                      onChange={handleChange}
                      placeholder="Enter Open Graph title"
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="og_description">OG Description</Label>
                    <Textarea
                      id="og_description"
                      name="og_description"
                      value={formData.og_description || ''}
                      onChange={handleChange}
                      placeholder="Enter Open Graph description"
                      className="min-h-[100px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="og_image">OG Image URL</Label>
                    <Input
                      id="og_image"
                      name="og_image"
                      value={formData.og_image || ''}
                      onChange={handleChange}
                      placeholder="https://example.com/og-image.jpg"
                      className="w-full"
                    />
                    {formData.og_image && (
                      <div className="mt-2 rounded-md overflow-hidden border">
                        <img 
                          src={formData.og_image} 
                          alt="OG Preview" 
                          className="w-full h-auto object-cover"
                        />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Twitter</CardTitle>
                  <CardDescription>How your post appears when shared on Twitter</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="twitter_title">Twitter Title</Label>
                    <Input
                      id="twitter_title"
                      name="twitter_title"
                      value={formData.twitter_title || ''}
                      onChange={handleChange}
                      placeholder="Enter Twitter title"
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="twitter_description">Twitter Description</Label>
                    <Textarea
                      id="twitter_description"
                      name="twitter_description"
                      value={formData.twitter_description || ''}
                      onChange={handleChange}
                      placeholder="Enter Twitter description"
                      className="min-h-[100px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="twitter_image">Twitter Image URL</Label>
                    <Input
                      id="twitter_image"
                      name="twitter_image"
                      value={formData.twitter_image || ''}
                      onChange={handleChange}
                      placeholder="https://example.com/twitter-image.jpg"
                      className="w-full"
                    />
                    {formData.twitter_image && (
                      <div className="mt-2 rounded-md overflow-hidden border">
                        <img 
                          src={formData.twitter_image} 
                          alt="Twitter Preview" 
                          className="w-full h-auto object-cover"
                        />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default BlogEdit;
