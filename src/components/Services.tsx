
import { Database, Code, BarChart3, Globe } from 'lucide-react';

const Services = () => {
  const services = [
    {
      title: "Data Analytics",
      description: "Transform your raw data into actionable insights with our advanced analytics solutions.",
      icon: <Database className="h-10 w-10 text-quantum-400" />,
      features: ["Predictive modeling", "Business intelligence", "Data visualization", "Custom reporting"]
    },
    {
      title: "Web Development",
      description: "Create stunning, high-performance web applications that deliver exceptional user experiences.",
      icon: <Code className="h-10 w-10 text-quantum-400" />,
      features: ["Responsive design", "Progressive web apps", "E-commerce solutions", "CMS integration"]
    },
    {
      title: "Business Intelligence",
      description: "Make data-driven decisions with our comprehensive business intelligence solutions.",
      icon: <BarChart3 className="h-10 w-10 text-quantum-400" />,
      features: ["KPI dashboards", "Real-time analytics", "Market trend analysis", "Strategic reporting"]
    },
    {
      title: "Digital Transformation",
      description: "Modernize your business operations with comprehensive digital solutions.",
      icon: <Globe className="h-10 w-10 text-quantum-400" />,
      features: ["Process automation", "Cloud migration", "Legacy system integration", "Digital strategy"]
    }
  ];

  return (
    <section id="services" className="section-padding bg-muted">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">Our Services</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We deliver innovative technology solutions to help businesses thrive in the digital age.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="bg-background rounded-xl p-8 shadow-sm card-hover"
            >
              <div className="mb-6">{service.icon}</div>
              <h3 className="text-xl font-bold mb-3">{service.title}</h3>
              <p className="text-muted-foreground mb-6">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center">
                    <span className="w-2 h-2 bg-quantum-300 rounded-full mr-2"></span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
