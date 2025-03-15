import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { HelpCircle } from "lucide-react";

const faqItems = [
  {
    question: "What industries do you specialize in?",
    answer: "We work across multiple industries including finance, healthcare, e-commerce, education, and manufacturing. Our team has specialized experience in each sector, allowing us to provide tailored solutions that address industry-specific challenges."
  },
  {
    question: "How long does a typical project take to complete?",
    answer: "Project timelines vary based on scope and complexity. A simple web application might take 4-8 weeks, while enterprise-level solutions could take 3-6 months. During our initial consultation, we'll provide a detailed timeline specific to your project needs."
  },
  {
    question: "Do you offer maintenance and support after project completion?",
    answer: "Yes, we offer several maintenance and support packages to ensure your solution continues to perform optimally. Our support includes bug fixes, security updates, performance optimization, and feature enhancements based on your subscription level."
  },
  {
    question: "How do you handle data security and privacy?",
    answer: "We implement industry-best security practices including encryption, secure authentication, regular security audits, and compliance with regulations like GDPR and CCPA. All our solutions are built with a security-first mindset to protect your sensitive data."
  },
  {
    question: "Can you work with our existing systems and technologies?",
    answer: "Absolutely. We specialize in integration with legacy systems and can work with your existing technology stack. Our team has experience with a wide range of technologies and can develop solutions that seamlessly connect with your current infrastructure."
  },
  {
    question: "What makes Quantum Reach different from other tech companies?",
    answer: "Our unique combination of technical expertise, business acumen, and commitment to client success sets us apart. We don't just build technology – we create strategic solutions that drive measurable business outcomes. Additionally, our collaborative approach ensures that clients are involved throughout the development process."
  }
];

const FAQ = () => {
  return (
    <section id="faq" className="container py-24 space-y-12">
      <div className="text-center space-y-4">
        <p className="text-base font-medium text-blue-600">QUESTIONS & ANSWERS</p>
        <h2 className="text-4xl font-bold tracking-tighter md:text-5xl text-gray-800">Frequently Asked Questions</h2>
        <p className="text-lg text-gray-600 md:w-2/3 mx-auto">
          Find answers to common questions about our services, process, and technologies.
        </p>
      </div>
      <Card className="mx-auto max-w-3xl mt-8 bg-white border-blue-100 shadow-md">
        <div className="p-6">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-blue-100">
                <AccordionTrigger className="text-left text-gray-800 hover:text-blue-600 py-4 text-lg">
                  <div className="flex items-center">
                    <HelpCircle className="h-5 w-5 mr-2 text-blue-500" />
                    {item.question}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-base text-gray-600 pb-4 pt-1 pl-7">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Card>
    </section>
  );
};

export default FAQ;
