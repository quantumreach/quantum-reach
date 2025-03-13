
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Founders = () => {
  const founders = [
    {
      name: "Rushil Borsania",
      role: "Co-Founder & CTO",
      image: "https://i.pravatar.cc/300?img=12", // Placeholder image
      bio: "A visionary tech leader with extensive experience in data analytics and web development. Rushil leads our technical strategy and innovation initiatives.",
      social: [
        { name: "Twitter", icon: <Twitter className="h-5 w-5" />, url: "https://twitter.com/rushilborsania" },
        { name: "GitHub", icon: <Github className="h-5 w-5" />, url: "https://github.com/rushilborsania" },
        { name: "LinkedIn", icon: <Linkedin className="h-5 w-5" />, url: "https://linkedin.com/in/rushilborsania" }
      ]
    },
    {
      name: "Sahil Kumar Singh",
      role: "Co-Founder & CEO",
      image: "https://i.pravatar.cc/300?img=67", // Placeholder image
      bio: "A strategic business leader with a passion for leveraging technology to solve complex problems. Sahil oversees the business operations and client relationships.",
      social: [
        { name: "Twitter", icon: <Twitter className="h-5 w-5" />, url: "https://twitter.com/sahilkumarsingh" },
        { name: "GitHub", icon: <Github className="h-5 w-5" />, url: "https://github.com/sahilkumarsingh" },
        { name: "LinkedIn", icon: <Linkedin className="h-5 w-5" />, url: "https://linkedin.com/in/sahilkumarsingh" }
      ]
    }
  ];

  return (
    <section id="founders" className="section-padding bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">Meet Our Co-Founders</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            The visionary leaders behind Quantum Reach's innovative approach to technology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {founders.map((founder, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center text-center md:text-left md:flex-row md:items-start gap-8 bg-background rounded-xl p-8 shadow-sm border border-border card-hover"
            >
              <div className="w-40 h-40 overflow-hidden rounded-full border-4 border-quantum-300 flex-shrink-0">
                <img 
                  src={founder.image} 
                  alt={founder.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-1">{founder.name}</h3>
                <p className="text-quantum-400 font-medium mb-4">{founder.role}</p>
                <p className="text-muted-foreground mb-6">{founder.bio}</p>
                <div className="flex space-x-3 justify-center md:justify-start">
                  {founder.social.map((platform, idx) => (
                    <Button key={idx} variant="outline" size="icon" asChild>
                      <a href={platform.url} target="_blank" rel="noopener noreferrer" aria-label={platform.name}>
                        {platform.icon}
                      </a>
                    </Button>
                  ))}
                  <Button variant="outline" size="icon" asChild>
                    <a href="mailto:hr@quantumreach.in" aria-label="Email">
                      <Mail className="h-5 w-5" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Founders;
