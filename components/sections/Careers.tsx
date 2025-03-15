"use client";
import React, { useState } from 'react';
import { FaBriefcase, FaEnvelope, FaUser, FaPhone, FaGraduationCap, FaComment, FaPaperPlane } from 'react-icons/fa';
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"

const Careers = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    job_title: '',
    job_type: '',
    experience: '',
    education: '',
    message: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/careers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitSuccess(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          job_title: '',
          job_type: '',
          experience: '',
          education: '',
          message: '',
        });
        
        // Reset success message after 5 seconds
        setTimeout(() => {
          setSubmitSuccess(false);
        }, 5000);
      } else {
        alert('Failed to submit application.');
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('An error occurred while submitting the application.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="careers" className="py-20 bg-gradient-to-b from-white to-blue-50">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-blue-800 mb-4">Join Our Team</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We're looking for talented individuals to help us build amazing products. Share your details with us and become part of our journey.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto grid md:grid-cols-5 gap-8"
        >
          {/* Left column - Form */}
          <Card className="md:col-span-3 border-blue-200 shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-500 text-white pb-6 relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-400 rounded-full opacity-20 -mt-16 -mr-16"></div>
              <div className="relative z-10">
                <CardTitle className="text-xl font-bold">Career Application</CardTitle>
                <CardDescription className="text-blue-100 mt-1">
                  Fill out the form below to apply
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit}>
                <div className="grid gap-5 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-700 font-medium flex items-center gap-2">
                      <FaUser className="text-blue-500" /> Name
                    </Label>
                    <Input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your Name"
                      required
                      className="focus-visible:ring-blue-500 border-blue-200 transition-all duration-200"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-700 font-medium flex items-center gap-2">
                      <FaEnvelope className="text-blue-500" /> Email
                    </Label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Your Email"
                      required
                      className="focus-visible:ring-blue-500 border-blue-200"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-gray-700 font-medium flex items-center gap-2">
                      <FaPhone className="text-blue-500" /> Phone
                    </Label>
                    <Input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Your Phone"
                      className="focus-visible:ring-blue-500 border-blue-200"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="job_title" className="text-gray-700 font-medium flex items-center gap-2">
                      <FaBriefcase className="text-blue-500" /> Job Title
                    </Label>
                    <Input
                      type="text"
                      id="job_title"
                      name="job_title"
                      value={formData.job_title}
                      onChange={handleChange}
                      placeholder="Desired Job Title"
                      required
                      className="focus-visible:ring-blue-500 border-blue-200"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="job_type" className="text-gray-700 font-medium flex items-center gap-2">
                      <FaBriefcase className="text-blue-500" /> Job Type
                    </Label>
                    <Select 
                      onValueChange={(value) => setFormData({ ...formData, job_type: value })}
                      value={formData.job_type}
                    >
                      <SelectTrigger className="w-full focus-visible:ring-blue-500 border-blue-200">
                        <SelectValue placeholder="Select Job Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="internship">Internship</SelectItem>
                        <SelectItem value="parttime">Part-Time</SelectItem>
                        <SelectItem value="fulltime">Full-Time</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="experience" className="text-gray-700 font-medium flex items-center gap-2">
                      <FaBriefcase className="text-blue-500" /> Experience
                    </Label>
                    <Input
                      type="text"
                      id="experience"
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      placeholder="Your Experience"
                      className="focus-visible:ring-blue-500 border-blue-200"
                    />
                  </div>
                </div>

                <div className="mt-5 space-y-2">
                  <Label htmlFor="education" className="text-gray-700 font-medium flex items-center gap-2">
                    <FaGraduationCap className="text-blue-500" /> Education
                  </Label>
                  <Input
                    type="text"
                    id="education"
                    name="education"
                    value={formData.education}
                    onChange={handleChange}
                    placeholder="Your Education"
                    className="focus-visible:ring-blue-500 border-blue-200"
                  />
                </div>

                <div className="mt-5 space-y-2">
                  <Label htmlFor="message" className="text-gray-700 font-medium flex items-center gap-2">
                    <FaComment className="text-blue-500" /> Message
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about yourself and why you want to join our team"
                    rows={4}
                    className="focus-visible:ring-blue-500 border-blue-200 resize-none"
                  />
                </div>
                
                <CardFooter className="flex justify-end pt-6 px-0">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-md transition-all duration-200 flex items-center gap-2"
                  >
                    {isSubmitting ? (
                      <>Processing <span className="animate-spin">⟳</span></>
                    ) : (
                      <>Submit Application <FaPaperPlane /></>
                    )}
                  </Button>
                </CardFooter>

                {submitSuccess && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-3 bg-green-100 text-green-700 rounded-md flex items-center gap-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Application submitted successfully! We'll be in touch soon.
                  </motion.div>
                )}
              </form>
            </CardContent>
          </Card>

          {/* Right column - Info */}
          <div className="md:col-span-2 space-y-6">
            <Card className="border-blue-200 shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-500 text-white pb-4 relative">
                <div className="absolute top-0 right-0 w-20 h-20 bg-blue-400 rounded-full opacity-20 -mt-8 -mr-8"></div>
                <div className="relative z-10">
                  <CardTitle className="text-lg font-bold">Why Join Us?</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <ul className="space-y-3">
                  <motion.li 
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-2"
                  >
                    <div className="bg-blue-100 p-1.5 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                      </svg>
                    </div>
                    <span>Collaborative team environment</span>
                  </motion.li>
                  <motion.li 
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-2"
                  >
                    <div className="bg-blue-100 p-1.5 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                        <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                      </svg>
                    </div>
                    <span>Competitive compensation</span>
                  </motion.li>
                  <motion.li 
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-2"
                  >
                    <div className="bg-blue-100 p-1.5 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span>Work with cutting-edge technologies</span>
                  </motion.li>
                  <motion.li 
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-2"
                  >
                    <div className="bg-blue-100 p-1.5 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 015.905-.75 1 1 0 001.937-.5A5.002 5.002 0 0010 2z" />
                      </svg>
                    </div>
                    <span>Flexible work arrangements</span>
                  </motion.li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-blue-200 shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-500 text-white pb-4 relative">
                <div className="absolute top-0 right-0 w-20 h-20 bg-blue-400 rounded-full opacity-20 -mt-8 -mr-8"></div>
                <div className="relative z-10">
                  <CardTitle className="text-lg font-bold">Job Types Available</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-4">
                  <motion.div 
                    whileHover={{ scale: 1.03 }}
                    className="p-3 bg-white rounded-md shadow-sm border border-blue-100 flex items-center gap-3"
                  >
                    <div className="bg-blue-100 p-2 rounded-full">
                      <FaBriefcase className="text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Internship</h4>
                      <p className="text-sm text-gray-500">Perfect for students</p>
                    </div>
                  </motion.div>
                  <motion.div 
                    whileHover={{ scale: 1.03 }}
                    className="p-3 bg-white rounded-md shadow-sm border border-blue-100 flex items-center gap-3"
                  >
                    <div className="bg-blue-100 p-2 rounded-full">
                      <FaBriefcase className="text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Part-Time</h4>
                      <p className="text-sm text-gray-500">Flexible hours</p>
                    </div>
                  </motion.div>
                  <motion.div 
                    whileHover={{ scale: 1.03 }}
                    className="p-3 bg-white rounded-md shadow-sm border border-blue-100 flex items-center gap-3"
                  >
                    <div className="bg-blue-100 p-2 rounded-full">
                      <FaBriefcase className="text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Full-Time</h4>
                      <p className="text-sm text-gray-500">Complete benefits</p>
                    </div>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Careers;
