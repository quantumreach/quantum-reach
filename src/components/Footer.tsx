
import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const Footer = () => {
  const year = new Date().getFullYear();
  
  const links = {
    company: [
      { name: 'About', href: '/about' },
      { name: 'Services', href: '/services' },
      { name: 'Careers', href: '#' },
      { name: 'Contact', href: '#contact' }
    ],
    services: [
      { name: 'Web Development', href: '#services' },
      { name: 'Data Analytics', href: '#services' },
      { name: 'Business Intelligence', href: '#services' },
      { name: 'Digital Transformation', href: '#services' }
    ],
    legal: [
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' },
      { name: 'Cookie Policy', href: '#' }
    ]
  };

  return (
    <footer className="bg-muted border-t border-border pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 rounded-md bg-gradient-to-br from-quantum-300 to-quantum-400 flex items-center justify-center text-white font-bold text-xl">
                QR
              </div>
              <span className="text-xl font-display font-bold tracking-tight">
                Quantum<span className="text-quantum-400">Reach</span>
              </span>
            </Link>
            <p className="text-muted-foreground mb-6">
              Innovative data solutions and web development services for the modern world.
            </p>
            <div className="flex space-x-2">
              <Button variant="outline" size="icon" asChild>
                <a href="https://twitter.com/quantumreach" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                  <Twitter className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <a href="https://github.com/quantumreach" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <Github className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <a href="https://linkedin.com/company/quantumreach" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <Linkedin className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <a href="mailto:hr@quantumreach.in" aria-label="Email">
                  <Mail className="h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Company</h3>
            <ul className="space-y-3">
              {links.company.map((link, index) => (
                <li key={index}>
                  <Link to={link.href} className="text-muted-foreground hover:text-quantum-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Services</h3>
            <ul className="space-y-3">
              {links.services.map((link, index) => (
                <li key={index}>
                  <Link to={link.href} className="text-muted-foreground hover:text-quantum-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Legal</h3>
            <ul className="space-y-3">
              {links.legal.map((link, index) => (
                <li key={index}>
                  <Link to={link.href} className="text-muted-foreground hover:text-quantum-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground mb-4 sm:mb-0">
            &copy; {year} Quantum Reach. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Designed with 💜 by The Quantum Reach Team
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
