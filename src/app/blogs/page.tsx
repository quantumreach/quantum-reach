
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function BlogsPage() {
  return (
    <>
      <Header />
      <div className="container mx-auto py-12">
        <h1 className="text-4xl font-bold mb-6">Our Blog</h1>
        {/* Blogs listing content */}
      </div>
      <Footer />
    </>
  );
}
