
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Services from '@/components/Services';
import Contact from '@/components/Contact';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const ServicesPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Services Hero */}
        <section className="py-20 bg-muted">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl sm:text-5xl font-display font-bold mb-6">
                Our <span className="gradient-text">Services</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Comprehensive technology solutions tailored to your business needs.
                From data analytics to web development, we help businesses thrive in the digital age.
              </p>
              <Button size="lg" asChild>
                <Link to="#services">
                  Explore Services <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <Services />
        
        {/* CTA Section */}
        <section className="py-20 bg-muted">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl font-display font-bold mb-6">
                Ready to Transform Your Business?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Let's discuss how our services can help you achieve your goals and drive success.
              </p>
              <div className="flex justify-center gap-4">
                <Button size="lg" asChild>
                  <Link to="#contact">
                    Contact Us <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/">
                    Learn More
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default ServicesPage;
