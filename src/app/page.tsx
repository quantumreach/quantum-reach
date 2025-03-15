
import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Technologies from '@/components/Technologies';
import Founders from '@/components/Founders';
import Contact from '@/components/Contact';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <>
      <Header />
      <Hero />
      <Services />
      <Technologies />
      <Founders />
      <Contact />
      <FAQ />
      <Footer />
    </>
  );
}
