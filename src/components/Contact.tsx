
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, MapPin, Phone, Code, Database, Server, LayoutGrid, LineChart, MessagesSquare, Zap } from 'lucide-react';
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters")
});

type FormValues = z.infer<typeof formSchema>;

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: ''
    }
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      // First, save to database - fixed: pass data as a single object, not an array
      const { error: dbError } = await supabase
        .from('contact_submissions')
        .insert(data);

      if (dbError) throw dbError;

      // Then, send email via the Edge Function
      const { error: emailError } = await supabase.functions.invoke('send-contact-email', {
        body: data
      });

      if (emailError) throw emailError;

      toast.success("Message sent successfully! We'll get back to you soon.");
      form.reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error("Failed to send message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Floating icons configuration
  const floatingIcons = [
    { icon: <Code size={24} />, position: "top-[15%] left-[10%]", animation: "animate-float" },
    { icon: <Database size={28} />, position: "top-[25%] right-[15%]", animation: "animate-float-reverse" },
    { icon: <Server size={22} />, position: "bottom-[20%] left-[20%]", animation: "animate-float" },
    { icon: <LayoutGrid size={20} />, position: "bottom-[30%] right-[10%]", animation: "animate-float-reverse" },
    { icon: <LineChart size={26} />, position: "top-[40%] left-[30%]", animation: "animate-float" },
    { icon: <MessagesSquare size={18} />, position: "bottom-[15%] right-[25%]", animation: "animate-float-reverse" },
    { icon: <Zap size={24} />, position: "top-[60%] right-[30%]", animation: "animate-spin-slow" }
  ];

  return (
    <section id="contact" className="section-padding bg-background relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid-pattern bg-[length:40px_40px] opacity-30"></div>
      
      {/* Floating icons */}
      {floatingIcons.map((item, index) => (
        <div 
          key={index} 
          className={`floating-icon ${item.position} ${item.animation}`}
        >
          {item.icon}
        </div>
      ))}
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">Get in Touch</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have a question or ready to start your next project? Reach out to us.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-muted p-3 rounded-lg mr-4">
                  <Mail className="h-6 w-6 text-quantum-400" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Email</h4>
                  <a href="mailto:hr@quantumreach.in" className="text-muted-foreground hover:text-quantum-400 transition-colors">
                    hr@quantumreach.in
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 bg-muted p-3 rounded-lg mr-4">
                  <Phone className="h-6 w-6 text-quantum-400" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Phone</h4>
                  <p className="text-muted-foreground">+91 (123) 456-7890</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 bg-muted p-3 rounded-lg mr-4">
                  <MapPin className="h-6 w-6 text-quantum-400" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Office</h4>
                  <p className="text-muted-foreground">
                    123 Tech Park, Innovation Street<br />
                    Bangalore, Karnataka 560001<br />
                    India
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-6">Send us a message</h3>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input 
                            placeholder="Your Name" 
                            className="bg-muted"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input 
                            type="email"
                            placeholder="Your Email" 
                            className="bg-muted"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input 
                          placeholder="Subject" 
                          className="bg-muted"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea 
                          placeholder="Your Message" 
                          className="min-h-[150px] bg-muted"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full sm:w-auto"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
