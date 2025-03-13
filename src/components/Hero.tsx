
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-background">
      {/* Background decoration */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-quantum-100 rounded-full filter blur-3xl opacity-50"></div>
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-quantum-100 rounded-full filter blur-3xl opacity-40"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 animate-fade-right">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight mb-6">
              Innovative <span className="gradient-text">data solutions</span> for the modern world
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-lg">
              We combine cutting-edge data analytics with exceptional web development to create solutions that transform businesses.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link to="/services">
                  Explore Services <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
          <div className="order-1 md:order-2 animate-fade-left">
            <div className="relative">
              {/* Main hero image/illustration */}
              <div className="relative z-10 bg-white p-2 rounded-2xl shadow-xl">
                <svg className="w-full h-auto" viewBox="0 0 500 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="500" height="400" rx="8" fill="#F8F9FD" />
                  <circle cx="250" cy="200" r="100" fill="#E5DEFF" />
                  <path d="M250 120C202.5 120 164 158.5 164 206C164 253.5 202.5 292 250 292C297.5 292 336 253.5 336 206C336 158.5 297.5 120 250 120ZM250 272C213.5 272 184 242.5 184 206C184 169.5 213.5 140 250 140C286.5 140 316 169.5 316 206C316 242.5 286.5 272 250 272Z" fill="#9B87F5" />
                  <path d="M250 160C224.5 160 204 180.5 204 206C204 231.5 224.5 252 250 252C275.5 252 296 231.5 296 206C296 180.5 275.5 160 250 160ZM250 232C235.5 232 224 220.5 224 206C224 191.5 235.5 180 250 180C264.5 180 276 191.5 276 206C276 220.5 264.5 232 250 232Z" fill="#7E69AB" />
                  <circle cx="250" cy="206" r="15" fill="#8B5CF6" />
                  <path d="M390 80L356 114M356 80L390 114" stroke="#8B5CF6" strokeWidth="6" strokeLinecap="round" />
                  <rect x="100" y="70" width="80" height="10" rx="5" fill="#E5DEFF" />
                  <rect x="100" y="90" width="60" height="10" rx="5" fill="#E5DEFF" />
                  <rect x="100" y="110" width="40" height="10" rx="5" fill="#E5DEFF" />
                  <rect x="100" y="300" width="80" height="10" rx="5" fill="#E5DEFF" />
                  <rect x="100" y="320" width="60" height="10" rx="5" fill="#E5DEFF" />
                  <circle cx="390" cy="300" r="30" fill="#E5DEFF" />
                  <path d="M380 300L390 310L400 290" stroke="#8B5CF6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              {/* Decorative elements */}
              <div className="absolute top-1/2 -left-4 transform -translate-y-1/2 w-8 h-32 bg-quantum-300 rounded-full filter blur-xl opacity-70 animate-pulse-soft"></div>
              <div className="absolute bottom-10 right-10 w-16 h-16 bg-quantum-400 rounded-full filter blur-xl opacity-60 animate-pulse-soft" style={{ animationDelay: '1s' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
