
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RootLayout from './layout';
import HomePage from './page';
import AboutPage from '@/app/about/page';
import ServicesPage from '@/app/services/page';
import BlogsPage from '@/app/blogs/page';
import BlogPostPage from '@/app/blogs/[id]/page';
import LoginPage from '@/app/login/page';
import NotFoundPage from '@/app/not-found';
import ProtectedRoute from '@/components/ProtectedRoute';
import AdminLayout from '@/app/admin/layout';
import Dashboard from '@/app/admin/dashboard/page';
import BlogList from '@/app/admin/blogs/page';
import BlogEdit from '@/app/admin/blogs/[id]/page';
import ContactList from '@/app/admin/contacts/page';
import ApplicationList from '@/app/admin/applications/page';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <RootLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/blogs/:id" element={<BlogPostPage />} />
          <Route path="/login" element={<LoginPage />} />
          
          {/* Admin routes */}
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="blogs" element={<BlogList />} />
            <Route path="blogs/:id" element={<BlogEdit />} />
            <Route path="contacts" element={<ContactList />} />
            <Route path="applications" element={<ApplicationList />} />
          </Route>
          
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </RootLayout>
    </BrowserRouter>
  );
};

export default AppRouter;
