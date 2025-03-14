
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, Edit, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Stats {
  totalBlogs: number;
  publishedBlogs: number;
  draftBlogs: number;
  totalApplications: number;
  totalContacts: number;
}

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<Stats>({
    totalBlogs: 0,
    publishedBlogs: 0,
    draftBlogs: 0,
    totalApplications: 0,
    totalContacts: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        // Fetch blog counts
        const { count: totalBlogs } = await supabase
          .from('blogs')
          .select('*', { count: 'exact', head: true });
        
        const { count: publishedBlogs } = await supabase
          .from('blogs')
          .select('*', { count: 'exact', head: true })
          .eq('published', true);
        
        const { count: draftBlogs } = await supabase
          .from('blogs')
          .select('*', { count: 'exact', head: true })
          .eq('published', false);
        
        // Fetch application count
        const { count: totalApplications } = await supabase
          .from('careers_applications')
          .select('*', { count: 'exact', head: true });
        
        // Fetch contact submissions count
        const { count: totalContacts } = await supabase
          .from('contact_submissions')
          .select('*', { count: 'exact', head: true });
        
        setStats({
          totalBlogs: totalBlogs || 0,
          publishedBlogs: publishedBlogs || 0,
          draftBlogs: draftBlogs || 0,
          totalApplications: totalApplications || 0,
          totalContacts: totalContacts || 0
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {user?.email}
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center my-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-quantum-400"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Blog Posts</CardTitle>
                  <CardDescription>Manage your content</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-3xl font-bold">{stats.totalBlogs}</p>
                      <p className="text-sm text-muted-foreground">
                        {stats.publishedBlogs} published, {stats.draftBlogs} drafts
                      </p>
                    </div>
                    <Link to="/admin/blogs">
                      <Button size="sm">
                        <FileText className="h-4 w-4 mr-1" />
                        Manage
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Job Applications</CardTitle>
                  <CardDescription>Career inquiries</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-3xl font-bold">{stats.totalApplications}</p>
                      <p className="text-sm text-muted-foreground">
                        Total applications received
                      </p>
                    </div>
                    <Link to="/admin/applications">
                      <Button size="sm">
                        <Briefcase className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Contact Messages</CardTitle>
                  <CardDescription>Inquiries from users</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-3xl font-bold">{stats.totalContacts}</p>
                      <p className="text-sm text-muted-foreground">
                        Total contact submissions
                      </p>
                    </div>
                    <Link to="/admin/contacts">
                      <Button size="sm">
                        <Edit className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="bg-muted p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
              <div className="flex flex-wrap gap-4">
                <Link to="/admin/blogs/new">
                  <Button>Create New Blog Post</Button>
                </Link>
                <Link to="/admin/blogs">
                  <Button variant="outline">Manage Existing Posts</Button>
                </Link>
                <Link to="/blogs" target="_blank">
                  <Button variant="outline">View Blog Frontend</Button>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
