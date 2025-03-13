
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Technologies from '@/components/Technologies';
import Founders from '@/components/Founders';
import FAQ from '@/components/FAQ';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Services />
        <Technologies />
        <Founders />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
