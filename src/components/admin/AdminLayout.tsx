
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { 
  LayoutDashboard, 
  FileText, 
  Briefcase, 
  Mail, 
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileSidebarOpen, setMobileSidebarOpen] = React.useState(false);

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Blog Posts', href: '/admin/blogs', icon: FileText },
    { name: 'Applications', href: '/admin/applications', icon: Briefcase },
    { name: 'Contact Messages', href: '/admin/contacts', icon: Mail },
  ];

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
    navigate('/');
  };

  const toggleMobileSidebar = () => {
    setMobileSidebarOpen(!mobileSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-30">
        <Button 
          variant="outline" 
          size="icon"
          onClick={toggleMobileSidebar}
          className="bg-background"
        >
          {mobileSidebarOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {/* Sidebar for mobile */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-20 bg-black/50 lg:hidden" onClick={toggleMobileSidebar}></div>
      )}

      {/* Sidebar */}
      <div 
        className={`fixed lg:static top-0 left-0 z-20 w-64 h-full bg-background border-r border-border transform transition-transform duration-200 ease-in-out ${
          mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-border">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8">
                <img src="/qr.png" alt="QuantumReach Logo" className="w-full h-full" />
              </div>
              <span className="text-xl font-display font-bold">Admin</span>
            </Link>
          </div>

          <nav className="flex-1 p-4 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  location.pathname === item.href
                    ? 'bg-quantum-100 text-quantum-400'
                    : 'text-muted-foreground hover:bg-muted'
                }`}
                onClick={() => setMobileSidebarOpen(false)}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="p-4 border-t border-border">
            <Button 
              variant="ghost" 
              className="w-full justify-start text-muted-foreground hover:text-foreground"
              onClick={handleSignOut}
            >
              <LogOut className="mr-3 h-5 w-5" />
              Sign out
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
