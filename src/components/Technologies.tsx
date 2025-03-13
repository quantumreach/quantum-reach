
import { Database, Code, Server, Globe } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const Technologies = () => {
  const techStacks = [
    {
      category: "Frontend",
      technologies: [
        { name: "React.js", proficiency: 95 },
        { name: "Next.js", proficiency: 90 },
        { name: "JavaScript", proficiency: 95 }
      ],
      icon: <Code className="h-10 w-10 text-quantum-400" />
    },
    {
      category: "Backend",
      technologies: [
        { name: "Python", proficiency: 90 },
        { name: "Node.js", proficiency: 85 },
        { name: "MongoDB", proficiency: 80 }
      ],
      icon: <Server className="h-10 w-10 text-quantum-400" />
    },
    {
      category: "Data",
      technologies: [
        { name: "Supabase", proficiency: 85 },
        { name: "PostgreSQL", proficiency: 80 },
        { name: "Data Analytics", proficiency: 90 }
      ],
      icon: <Database className="h-10 w-10 text-quantum-400" />
    },
    {
      category: "Other",
      technologies: [
        { name: "Cloud Services", proficiency: 85 },
        { name: "DevOps", proficiency: 80 },
        { name: "SEO", proficiency: 75 }
      ],
      icon: <Globe className="h-10 w-10 text-quantum-400" />
    }
  ];

  return (
    <section id="technologies" className="section-padding bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">Our Technology Stack</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We leverage cutting-edge technologies to deliver top-notch solutions for our clients.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {techStacks.map((stack, index) => (
            <div 
              key={index} 
              className="bg-background rounded-xl p-8 shadow-sm border border-border card-hover"
            >
              <div className="flex items-center mb-6">
                <div className="mr-4">{stack.icon}</div>
                <h3 className="text-xl font-bold">{stack.category}</h3>
              </div>
              <div className="space-y-6">
                {stack.technologies.map((tech, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">{tech.name}</span>
                      <span className="text-muted-foreground">{tech.proficiency}%</span>
                    </div>
                    <Progress value={tech.proficiency} className="h-2" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Technologies;
