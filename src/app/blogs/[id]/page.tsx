
import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function BlogPostPage() {
  const { id } = useParams();
  
  return (
    <>
      <Header />
      <div className="container mx-auto py-12">
        <h1 className="text-4xl font-bold mb-6">Blog Post {id}</h1>
        {/* Blog post content */}
      </div>
      <Footer />
    </>
  );
}
