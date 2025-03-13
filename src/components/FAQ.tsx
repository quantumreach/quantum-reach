
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";

const FAQ = () => {
  const faqs = [
    {
      question: "What services does Quantum Reach offer?",
      answer: "Quantum Reach specializes in data analytics and web development. Our services include predictive modeling, business intelligence, data visualization, custom web applications, e-commerce solutions, and digital transformation consulting."
    },
    {
      question: "How can data analytics benefit my business?",
      answer: "Data analytics can help your business identify patterns, predict trends, optimize operations, improve decision-making, and gain a competitive edge. Our tailored analytics solutions transform raw data into actionable insights that drive business growth."
    },
    {
      question: "What technologies do you use for web development?",
      answer: "We use a modern tech stack including React.js, Next.js, Node.js, Python, MongoDB, and Supabase. Our technology choices are always aligned with your specific project requirements to ensure optimal performance and scalability."
    },
    {
      question: "Do you offer ongoing support after project completion?",
      answer: "Yes, we provide comprehensive support and maintenance services after project completion. Our team ensures your solutions remain up-to-date, secure, and optimized for performance."
    },
    {
      question: "How do you handle data security and privacy?",
      answer: "We implement industry-standard security protocols and best practices to ensure data protection. Our solutions comply with relevant data privacy regulations, and we work closely with clients to address specific security requirements."
    },
    {
      question: "What is your typical project timeline?",
      answer: "Project timelines vary based on scope and complexity. We provide detailed project plans with clear milestones and regular progress updates. Our agile approach allows for flexibility while ensuring timely delivery."
    }
  ];

  return (
    <section id="faq" className="section-padding bg-muted">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about our services and approach.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
                {index < faqs.length - 1 && <Separator className="my-2" />}
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
