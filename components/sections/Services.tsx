import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  BarChart2,
  Code2,
  PieChart,
  RefreshCw,
  Check
} from "lucide-react";

const serviceData = [
  {
    title: "Data Analytics",
    description: "Transform your raw data into actionable insights with our advanced analytics solutions.",
    icon: <BarChart2 className="h-8 w-8" />,
    features: [
      "Predictive modeling",
      "Business intelligence",
      "Data visualization",
      "Custom reporting"
    ]
  },
  {
    title: "Web Development",
    description: "Create stunning, high-performance web applications that deliver exceptional user experiences.",
    icon: <Code2 className="h-8 w-8" />,
    features: [
      "Responsive design",
      "Progressive web apps",
      "E-commerce solutions",
      "CMS integration"
    ]
  },
  {
    title: "Business Intelligence",
    description: "Make data-driven decisions with our comprehensive business intelligence solutions.",
    icon: <PieChart className="h-8 w-8" />,
    features: [
      "KPI dashboards",
      "Real-time analytics",
      "Market trend analysis",
      "Strategic reporting"
    ]
  },
  {
    title: "Digital Transformation",
    description: "Modernize your business operations with comprehensive digital solutions.",
    icon: <RefreshCw className="h-8 w-8" />,
    features: [
      "Process automation",
      "Cloud migration",
      "Legacy system integration",
      "Digital strategy"
    ]
  }
];

const Services = () => {
  return (
    <section id="services" className="container py-24 space-y-16">
      <div className="text-center space-y-6">
        <p className="text-base font-medium text-blue-600">SERVICES</p>
        <h2 className="text-4xl font-bold tracking-tighter md:text-5xl text-gray-800">Our Services</h2>
        <p className="text-lg text-gray-600 md:w-2/3 mx-auto">
          We provide a wide range of digital services to help your business grow and succeed in today's competitive market.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {serviceData.map((service, index) => (
          <Card key={index} className="bg-white border-blue-100 transition-all duration-300 hover:shadow-xl hover:shadow-blue-100 hover:-translate-y-2 p-2">
            <CardHeader className="pb-6">
              <div className="p-4 w-fit rounded-md bg-blue-100 text-blue-600 mb-6">
                {service.icon}
              </div>
              <CardTitle className="text-2xl font-bold text-gray-800 mb-2">{service.title}</CardTitle>
              <CardDescription className="text-base text-gray-600">{service.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-base text-gray-600">
                    <Check className="h-5 w-5 mr-3 text-blue-500" />
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Services;
