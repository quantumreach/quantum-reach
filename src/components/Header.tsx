
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Blogs', href: '/blogs' },
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
    // Close mobile menu if open
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo and company name */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-16 h-16 rounded-md flex items-center justify-center text-white font-bold text-xl">
              <img src="/qr.png" alt="QuantumReach Logo" className="w-16 h-16" />
            </div>
            <span className="text-xl font-display font-bold tracking-tight">
              Quantum<span className="text-quantum-400">Reach</span>
            </span>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`font-medium transition-colors duration-200 hover:text-quantum-400 ${
                  location.pathname === item.href ? 'text-quantum-400' : 'text-foreground'
                }`}
              >
                {item.name}
              </Link>
            ))}
            {user && (
              <Link
                to="/admin"
                className="font-medium transition-colors duration-200 hover:text-quantum-400"
              >
                Admin
              </Link>
            )}
          </nav>

          {/* Contact Button (Desktop) - Removed Login Button */}
          <div className="hidden md:flex items-center space-x-4">
            {user && (
              <Button variant="outline" onClick={() => signOut()}>
                Logout
              </Button>
            )}
            <Button onClick={scrollToContact}>
              Contact Us
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-foreground p-2"
              onClick={toggleMobileMenu}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="flex flex-col space-y-4 px-4 pt-2 pb-6 bg-background">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`font-medium px-3 py-2 rounded-md transition-colors duration-200 ${
                  location.pathname === item.href
                    ? 'bg-quantum-100 text-quantum-400'
                    : 'hover:bg-muted'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            {user && (
              <Link
                to="/admin"
                className="font-medium px-3 py-2 rounded-md transition-colors duration-200 hover:bg-muted"
                onClick={() => setMobileMenuOpen(false)}
              >
                Admin
              </Link>
            )}
            {user && (
              <Button 
                variant="outline" 
                className="mt-2" 
                onClick={() => {
                  signOut();
                  setMobileMenuOpen(false);
                }}
              >
                Logout
              </Button>
            )}
            <Button className="mt-2" onClick={scrollToContact}>
              Contact Us
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
