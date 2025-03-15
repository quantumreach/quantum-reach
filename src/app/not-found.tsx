
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function NotFoundPage() {
  return (
    <>
      <Header />
      <div className="container mx-auto py-12 text-center">
        <h1 className="text-4xl font-bold mb-6">404 - Page Not Found</h1>
        <p className="text-lg mb-4">The page you are looking for does not exist.</p>
      </div>
      <Footer />
    </>
  );
}
