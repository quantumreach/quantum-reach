"use client";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Code, Server, Database, Cloud, 
  Cpu, Search, Zap, Sparkles 
} from "lucide-react";

const technologies = [
  { category: "Frontend", name: "React.js", value: 95, icon: Code },
  { category: "Frontend", name: "Next.js", value: 90, icon: Zap },
  { category: "Frontend", name: "JavaScript", value: 95, icon: Code },
  { category: "Backend", name: "Python", value: 90, icon: Server },
  { category: "Backend", name: "Node.js", value: 85, icon: Server },
  { category: "Backend", name: "MongoDB", value: 80, icon: Database },
  { category: "Data", name: "Supabase", value: 85, icon: Database },
  { category: "Data", name: "PostgreSQL", value: 80, icon: Database },
  { category: "Data", name: "Data Analytics", value: 90, icon: Sparkles },
  { category: "Other", name: "Cloud Services", value: 85, icon: Cloud },
  { category: "Other", name: "DevOps", value: 80, icon: Cpu },
  { category: "Other", name: "SEO", value: 75, icon: Search },
];

// Group technologies by category
const groupedTechnologies = technologies.reduce((acc, tech) => {
  if (!acc[tech.category]) {
    acc[tech.category] = [];
  }
  acc[tech.category].push(tech);
  return acc;
}, {} as Record<string, typeof technologies>);

// Get category icon
const getCategoryIcon = (category: string) => {
  switch (category) {
    case "Frontend": return Code;
    case "Backend": return Server;
    case "Data": return Database;
    case "Other": return Cloud;
    default: return Zap;
  }
};

const TechStack = () => {
  const [progressValues, setProgressValues] = useState<Record<string, number>>({});
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  // Animate progress bars on component mount
  useEffect(() => {
    const timer = setTimeout(() => {
      const values = technologies.reduce((acc, tech) => {
        acc[tech.name] = tech.value;
        return acc;
      }, {} as Record<string, number>);
      setProgressValues(values);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="tech-stack" className="container py-24 space-y-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-4"
      >
        <p className="text-sm font-medium text-blue-600">EXPERTISE</p>
        <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-gray-800">Our Technology Stack</h2>
        <p className="text-gray-600 md:w-2/3 mx-auto">
          We leverage cutting-edge technologies to deliver top-notch solutions for our clients.
        </p>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
        {Object.entries(groupedTechnologies).map(([category, techs], index) => {
          const CategoryIcon = getCategoryIcon(category);
          return (
            <motion.div 
              key={category} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="space-y-6 bg-blue-50 p-6 rounded-lg border border-blue-100 shadow-sm hover:shadow-md transition-all"
            >
              <h3 className="text-xl font-semibold flex items-center gap-2 text-gray-800">
                <CategoryIcon className="text-blue-600" size={20} />
                {category}
                <Badge className="bg-blue-500 text-white hover:bg-blue-600">{techs.length}</Badge>
              </h3>
              <div className="space-y-6">
                {techs.map((tech) => {
                  const IconComponent = tech.icon;
                  return (
                    <motion.div 
                      key={tech.name} 
                      className="space-y-2"
                      whileHover={{ scale: 1.02 }}
                      onMouseEnter={() => setHoveredTech(tech.name)}
                      onMouseLeave={() => setHoveredTech(null)}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700 flex items-center gap-2">
                          <IconComponent 
                            size={16} 
                            className={`${hoveredTech === tech.name ? 'text-blue-600' : 'text-gray-600'} transition-colors`} 
                          />
                          {tech.name}
                        </span>
                        <span className="text-blue-600">{progressValues[tech.name] || 0}%</span>
                      </div>
                      <motion.div
                        initial={{ width: "0%" }}
                        animate={{ width: `${progressValues[tech.name] || 0}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      >
                        <Progress 
                          value={progressValues[tech.name] || 0} 
                          className={`h-2 ${hoveredTech === tech.name ? 'bg-blue-200' : 'bg-blue-100'} transition-colors`} 
                        />
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default TechStack;
