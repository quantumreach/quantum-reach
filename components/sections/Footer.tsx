import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const Footer = () => {
  return (
    <footer className="bg-blue-50">
      <div className="container px-6 py-12 md:px-8 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg text-gray-800">Quantum Reach</h3>
            <p className="text-sm text-gray-600">
              Empowering businesses with cutting-edge technology solutions that drive growth and innovation.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-500 hover:text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                </svg>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect width="4" height="12" x="2" y="9"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </Link>
            </div>
          </div>
          
          {/* Links 1 */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg text-gray-800">Company</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-sm text-gray-600 hover:text-blue-600">About Us</Link></li>
              <li><Link href="#" className="text-sm text-gray-600 hover:text-blue-600">Careers</Link></li>
              <li><Link href="#" className="text-sm text-gray-600 hover:text-blue-600">Case Studies</Link></li>
              <li><Link href="#" className="text-sm text-gray-600 hover:text-blue-600">Blog</Link></li>
            </ul>
          </div>
          
          {/* Links 2 */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg text-gray-800">Services</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-sm text-gray-600 hover:text-blue-600">Data Analytics</Link></li>
              <li><Link href="#" className="text-sm text-gray-600 hover:text-blue-600">Web Development</Link></li>
              <li><Link href="#" className="text-sm text-gray-600 hover:text-blue-600">Business Intelligence</Link></li>
              <li><Link href="#" className="text-sm text-gray-600 hover:text-blue-600">Digital Transformation</Link></li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg text-gray-800">Stay Updated</h3>
            <p className="text-sm text-gray-600">
              Subscribe to our newsletter for the latest updates and insights.
            </p>
            <div className="flex gap-2">
              <Input placeholder="Enter your email" type="email" className="bg-white" />
              <Button className="bg-blue-500 hover:bg-blue-600">Subscribe</Button>
            </div>
          </div>
        </div>
        
        <Separator className="my-8 bg-blue-200" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} Quantum Reach. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="#" className="text-sm text-gray-600 hover:text-blue-600">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm text-gray-600 hover:text-blue-600">
              Terms of Service
            </Link>
            <Link href="#" className="text-sm text-gray-600 hover:text-blue-600">
              Cookies Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
