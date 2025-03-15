
import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function AboutPage() {
  return (
    <>
      <Helmet>
        <title>About | Quantum Reach</title>
      </Helmet>
      <Header />
      <div className="container mx-auto py-12">
        <h1 className="text-4xl font-bold mb-6">About Us</h1>
        <p className="text-lg mb-4">
          Welcome to Quantum Reach, where innovation meets excellence.
        </p>
        {/* Content from the original About page */}
      </div>
      <Footer />
    </>
  );
}
