
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

interface JobApplication {
  id: string;
  name: string;
  email: string;
  phone: string;
  job_title: string;
  job_type: string;
  education: string;
  experience: string | null;
  message: string | null;
  created_at: string;
}

const ApplicationList: React.FC = () => {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchApplications = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const { data, error } = await supabase
          .from('careers_applications')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        setApplications(data || []);
      } catch (err) {
        console.error('Error fetching applications:', err);
        setError('Failed to load job applications. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const filteredApplications = filter === 'all' 
    ? applications 
    : applications.filter(app => app.job_type === filter);

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Job Applications</h1>
          <p className="text-muted-foreground">
            View and manage career applications
          </p>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {loading ? (
          <div className="flex justify-center my-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-quantum-400"></div>
          </div>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>All Job Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all" className="mb-6">
                <TabsList>
                  <TabsTrigger value="all" onClick={() => setFilter('all')}>All</TabsTrigger>
                  <TabsTrigger value="full-time" onClick={() => setFilter('full-time')}>Full-time</TabsTrigger>
                  <TabsTrigger value="part-time" onClick={() => setFilter('part-time')}>Part-time</TabsTrigger>
                  <TabsTrigger value="contract" onClick={() => setFilter('contract')}>Contract</TabsTrigger>
                  <TabsTrigger value="internship" onClick={() => setFilter('internship')}>Internship</TabsTrigger>
                </TabsList>
              </Tabs>

              {filteredApplications.length === 0 ? (
                <p className="text-center py-8 text-muted-foreground">No applications found.</p>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Position</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Education</TableHead>
                        <TableHead>Experience</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredApplications.map((application) => (
                        <TableRow key={application.id}>
                          <TableCell className="whitespace-nowrap">
                            {format(new Date(application.created_at), 'MMM d, yyyy')}
                          </TableCell>
                          <TableCell>{application.name}</TableCell>
                          <TableCell>{application.job_title}</TableCell>
                          <TableCell>
                            <Badge variant={application.job_type === 'full-time' ? 'default' : 'outline'}>
                              {application.job_type}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div>
                              <a href={`mailto:${application.email}`} className="text-quantum-400 hover:underline block">
                                {application.email}
                              </a>
                              <span className="text-sm text-muted-foreground">{application.phone}</span>
                            </div>
                          </TableCell>
                          <TableCell>{application.education}</TableCell>
                          <TableCell className="max-w-xs">
                            <div className="max-h-20 overflow-y-auto">
                              {application.experience || 'Not specified'}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
};

export default ApplicationList;
