
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Founders from '@/components/Founders';
import Technologies from '@/components/Technologies';
import Contact from '@/components/Contact';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const About = () => {
  const values = [
    {
      title: "Innovation",
      description: "We continuously seek new and improved ways to solve problems and deliver value."
    },
    {
      title: "Excellence",
      description: "We strive for the highest quality in everything we do, from code to client communication."
    },
    {
      title: "Integrity",
      description: "We maintain honest and transparent relationships with our clients and partners."
    },
    {
      title: "Collaboration",
      description: "We believe in the power of teamwork and partnership to achieve exceptional results."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* About Hero */}
        <section className="py-20 bg-muted">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl sm:text-5xl font-display font-bold mb-6">
                About <span className="gradient-text">Quantum Reach</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                We are a team of passionate technologists dedicated to empowering businesses 
                through innovative data solutions and exceptional web development.
              </p>
              <Button size="lg" asChild>
                <Link to="#our-story">
                  Our Story <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section id="our-story" className="section-padding bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl font-display font-bold mb-6">Our Story</h2>
                <p className="text-muted-foreground mb-4">
                  Founded in 2023 by Rushil Borsania and Sahil Kumar Singh, Quantum Reach was born from a shared vision 
                  to bridge the gap between data analytics and web development expertise.
                </p>
                <p className="text-muted-foreground mb-4">
                  With backgrounds in data science and software engineering, our founders recognized that businesses
                  needed partners who could both create compelling digital experiences and extract meaningful insights from data.
                </p>
                <p className="text-muted-foreground mb-6">
                  Today, Quantum Reach helps organizations of all sizes harness the power of data and technology
                  to drive growth, innovation, and competitive advantage.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild>
                    <Link to="/services">
                      Our Services <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="#founders">
                      Meet Our Team
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="bg-white p-3 rounded-xl shadow-lg">
                  <svg className="w-full h-auto" viewBox="0 0 500 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="500" height="400" rx="8" fill="#F8F9FD" />
                    <path d="M250 70C167 70 100 137 100 220C100 303 167 370 250 370C333 370 400 303 400 220C400 137 333 70 250 70Z" fill="#E5DEFF" />
                    <path d="M250 100C183.8 100 130 153.8 130 220C130 286.2 183.8 340 250 340C316.2 340 370 286.2 370 220C370 153.8 316.2 100 250 100ZM250 310C200.3 310 160 269.7 160 220C160 170.3 200.3 130 250 130C299.7 130 340 170.3 340 220C340 269.7 299.7 310 250 310Z" fill="#9B87F5" />
                    <path d="M250 160C217.9 160 192 185.9 192 218C192 250.1 217.9 276 250 276C282.1 276 308 250.1 308 218C308 185.9 282.1 160 250 160ZM250 246C234.5 246 222 233.5 222 218C222 202.5 234.5 190 250 190C265.5 190 278 202.5 278 218C278 233.5 265.5 246 250 246Z" fill="#7E69AB" />
                    <circle cx="250" cy="218" r="20" fill="#8B5CF6" />
                    <circle cx="159" cy="110" r="30" fill="#E5DEFF" />
                    <path d="M146 109L156 119L172 103" stroke="#8B5CF6" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="341" cy="320" r="30" fill="#E5DEFF" />
                    <path d="M328 319L338 329L354 313" stroke="#8B5CF6" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="absolute -bottom-5 -right-5 w-20 h-20 bg-quantum-300 rounded-full filter blur-xl opacity-70 animate-pulse-soft"></div>
                <div className="absolute -top-5 -left-5 w-20 h-20 bg-quantum-400 rounded-full filter blur-xl opacity-60 animate-pulse-soft" style={{ animationDelay: '1s' }}></div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="section-padding bg-muted">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">Our Values</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                The principles that guide our work and relationships.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <div key={index} className="bg-background rounded-xl p-8 shadow-sm border border-border card-hover">
                  <div className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-quantum-400 mr-4 mt-1" />
                    <div>
                      <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                      <p className="text-muted-foreground">{value.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Separator />
        <Founders />
        <Technologies />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default About;
