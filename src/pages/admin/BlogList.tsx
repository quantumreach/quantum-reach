
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Edit, 
  Trash2, 
  FilePlus, 
  Eye, 
  EyeOff 
} from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface Blog {
  id: string;
  title: string;
  slug: string;
  published: boolean;
  created_at: string;
  updated_at: string;
}

const BlogList = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select('id, title, slug, published, created_at, updated_at')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setBlogs(data || []);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      toast({
        title: "Error",
        description: "Failed to load blog posts",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStatusToggle = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('blogs')
        .update({ 
          published: !currentStatus,
          updated_at: new Date().toISOString()
        })
        .eq('id', id);
      
      if (error) throw error;
      
      // Update the local state to reflect the change
      setBlogs(blogs.map(blog => 
        blog.id === id ? { ...blog, published: !currentStatus } : blog
      ));
      
      toast({
        title: "Success",
        description: `Blog ${currentStatus ? 'unpublished' : 'published'} successfully`,
      });
    } catch (error) {
      console.error('Error toggling blog status:', error);
      toast({
        title: "Error",
        description: "Failed to update blog status",
        variant: "destructive"
      });
    }
  };

  const openDeleteDialog = (id: string) => {
    setBlogToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!blogToDelete) return;
    
    try {
      const { error } = await supabase
        .from('blogs')
        .delete()
        .eq('id', blogToDelete);
      
      if (error) throw error;
      
      // Remove the deleted blog from the local state
      setBlogs(blogs.filter(blog => blog.id !== blogToDelete));
      
      toast({
        title: "Success",
        description: "Blog post deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting blog:', error);
      toast({
        title: "Error",
        description: "Failed to delete blog post",
        variant: "destructive"
      });
    } finally {
      setDeleteDialogOpen(false);
      setBlogToDelete(null);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Blog Posts</h1>
          <Button onClick={() => navigate('/admin/blogs/new')}>
            <FilePlus className="mr-2 h-4 w-4" />
            Create New Post
          </Button>
        </div>

        {loading ? (
          <div className="flex justify-center my-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-quantum-400"></div>
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-12 bg-muted rounded-lg">
            <h3 className="text-xl font-semibold mb-4">No blog posts yet</h3>
            <p className="text-muted-foreground mb-6">Create your first blog post to get started</p>
            <Button onClick={() => navigate('/admin/blogs/new')}>
              <FilePlus className="mr-2 h-4 w-4" />
              Create First Post
            </Button>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Updated</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {blogs.map((blog) => (
                <TableRow key={blog.id}>
                  <TableCell className="font-medium">{blog.title}</TableCell>
                  <TableCell>
                    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      blog.published 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {blog.published ? 'Published' : 'Draft'}
                    </div>
                  </TableCell>
                  <TableCell>{formatDate(blog.created_at)}</TableCell>
                  <TableCell>{formatDate(blog.updated_at)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => handleStatusToggle(blog.id, blog.published)}
                        title={blog.published ? 'Unpublish' : 'Publish'}
                      >
                        {blog.published ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => navigate(`/admin/blogs/${blog.id}`)}
                        title="Edit"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => openDeleteDialog(blog.id)}
                        title="Delete"
                        className="text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      {blog.published && (
                        <Link to={`/blog/${blog.slug}`} target="_blank">
                          <Button 
                            variant="outline" 
                            size="icon"
                            title="View"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Blog Post</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this blog post? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default BlogList;
