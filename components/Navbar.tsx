"use client";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Mail, Menu } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationItems = [
    { name: 'Home', href: '/' },
    { name: 'Blogs', href: '/blogs' },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-blue-100 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm">
      <div className="container flex h-16 items-center justify-between px-4 md:px-8">
        <Link href="/" className="flex items-center">
          <Image 
            src="/qr.png" 
            alt="Quantum Reach Logo" 
            width={40} 
            height={40} 
            className="mr-2"
          />
          <span className="font-bold text-xl text-blue-600">Quantum Reach</span>
        </Link>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-gray-800"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Menu size={24} />
        </button>

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="#services" className="text-gray-600 hover:text-blue-600 transition-colors text-sm font-medium">Services</Link>
          <Link href="#tech-stack" className="text-gray-600 hover:text-blue-600 transition-colors text-sm font-medium">Tech Stack</Link>
          <Link href="#team" className="text-gray-600 hover:text-blue-600 transition-colors text-sm font-medium">Our Team</Link>
          <Link href="#faq" className="text-gray-600 hover:text-blue-600 transition-colors text-sm font-medium">FAQ</Link>
          <Link href="/blogs" className="text-gray-600 hover:text-blue-600 transition-colors text-sm font-medium">Blogs</Link>
          <Button className="bg-blue-500 text-white hover:bg-blue-600 px-4 py-2" size="sm">
            <Mail className="h-4 w-4 mr-2" /> Contact Us
          </Button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-white border-b border-blue-100 md:hidden shadow-md">
            <div className="flex flex-col p-4 space-y-4">
              <Link href="#services" className="text-gray-600 hover:text-blue-600 transition-colors" onClick={() => setIsMenuOpen(false)}>Services</Link>
              <Link href="#tech-stack" className="text-gray-600 hover:text-blue-600 transition-colors" onClick={() => setIsMenuOpen(false)}>Tech Stack</Link>
              <Link href="#team" className="text-gray-600 hover:text-blue-600 transition-colors" onClick={() => setIsMenuOpen(false)}>Our Team</Link>
              <Link href="#faq" className="text-gray-600 hover:text-blue-600 transition-colors" onClick={() => setIsMenuOpen(false)}>FAQ</Link>
              <Link href="/blogs" className="text-gray-600 hover:text-blue-600 transition-colors" onClick={() => setIsMenuOpen(false)}>Blogs</Link>
              <Button className="bg-blue-500 text-white hover:bg-blue-600 w-full px-4 py-2" onClick={() => setIsMenuOpen(false)}>
                <Mail className="h-4 w-4 mr-2" /> Contact Us
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
