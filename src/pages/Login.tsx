
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { user, signIn, adminAccess } = useAuth();

  useEffect(() => {
    // If already logged in, redirect to admin
    if (user) {
      navigate('/admin');
    }
  }, [user, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setIsLoading(true);
    try {
      const { error } = await signIn(email, password);
      if (error) {
        toast({
          title: "Access denied",
          description: "Invalid credentials or you don't have access to this area",
          variant: "destructive"
        });
      } else {
        navigate('/admin');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDirectAdminAccess = async () => {
    setIsLoading(true);
    try {
      const { error } = await adminAccess();
      if (error) {
        toast({
          title: "Access denied",
          description: "You don't have permission to access the admin area",
          variant: "destructive"
        });
      } else {
        navigate('/admin');
      }
    } catch (error) {
      console.error('Admin access error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Administrative Access</CardTitle>
            <CardDescription className="text-center">This area is restricted to authorized personnel only</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Button 
              type="button" 
              className="w-full" 
              onClick={handleDirectAdminAccess}
              disabled={isLoading}
            >
              {isLoading ? 'Accessing...' : 'Access Admin Panel'}
            </Button>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t"></span>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or login with credentials</span>
              </div>
            </div>
            
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Logging in...' : 'Login with Credentials'}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-muted-foreground">
              Authorized personnel only. For regular users, please return to the <a href="/" className="text-quantum-400 hover:underline">homepage</a>.
            </p>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
};

export default Login;
