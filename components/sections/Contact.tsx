"use client"
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "@/lib/toast";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        toast.success({
          title: "Message sent!",
          description: "We'll get back to you as soon as possible."
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        toast.error({
          title: "Error",
          description: data.error || "Failed to send message. Please try again."
        });
      }
    } catch (error) {
      toast.error({
        title: "Error",
        description: "Something went wrong. Please try again later."
      });
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 relative">
      <div className="absolute inset-0 z-0">
        <div className="line-grid">
          {/* Line grid will be styled using CSS */}
        </div>
      </div>
      
      <div className="relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-2">Get in Touch</h2>
          <p className="text-lg text-muted-foreground">
            Have a question or want to work with us? Send us a message.
          </p>
        </div>

        <Card className="max-w-lg mx-auto bg-background/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Contact Us</CardTitle>
            <CardDescription>
              Fill out the form below and we'll get back to you as soon as possible.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input 
                  id="name" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name" 
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com" 
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input 
                  id="subject" 
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What's this about?" 
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea 
                  id="message" 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message here..." 
                  rows={4}
                  required 
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
