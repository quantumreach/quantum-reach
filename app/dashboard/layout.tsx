'use client'

import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClientSupabaseClient } from '@/lib/supabase';
import { Toaster } from "@/components/ui/sonner"

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClientSupabaseClient();
  const [currentPath, setCurrentPath] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Only execute client-side code in this effect
    if (typeof window !== 'undefined') {
      // Set the current path once we're on the client side
      setCurrentPath(window.location.pathname);
      
      async function checkAuth() {
        try {
          const { data: { session } } = await supabase.auth.getSession();
          
          // Debug logging
          console.log('Auth check - session exists:', !!session);
          setIsAuthenticated(!!session);

          // If no session and not on login page, redirect to login
          if (!session && !window.location.pathname.includes('/dashboard/login')) {
            console.log('No session, redirecting to login');
            router.push('/dashboard/login');
          } else {
            setIsLoading(false);
          }
        } catch (error) {
          console.error('Error checking auth:', error);
          setIsLoading(false);
        }
      }

      checkAuth();
    }
  }, [router, supabase]);

  // Handle sign out
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/dashboard/login');
  };

  if (isLoading && currentPath && !currentPath.includes('/dashboard/login')) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  // Only show nav bar if authenticated or on login page
  const showNavbar = isAuthenticated || (currentPath && currentPath.includes('/dashboard/login'));

  return (
    <div className="dashboard-layout min-h-screen bg-gray-50">
      {showNavbar && currentPath && !currentPath.includes('/dashboard/login') && (
        <nav className="bg-white shadow-sm p-4 sticky top-0 z-10">
          <div className="container mx-auto flex justify-between items-center">
            <Link href="/dashboard" className="font-bold text-xl hover:text-blue-600">Dashboard</Link>
            <div className="space-x-6">
              <Link href="/dashboard" className="hover:text-blue-600">Home</Link>
              <Link href="/dashboard/blogs" className="hover:text-blue-600">Blogs</Link>
              <button onClick={handleSignOut} className="text-red-500 hover:text-red-700">
                Sign out
              </button>
            </div>
          </div>
        </nav>
      )}
      <main className="container mx-auto py-8 px-4 sm:px-6">{children}</main>
      <Toaster />
    </div>
  );
}
