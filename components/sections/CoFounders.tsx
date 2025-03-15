import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Github, Linkedin, Twitter } from "lucide-react";

const founders = [
  {
    name: "Rushil Borsania",
    role: "CEO & Co-Founder",
    image: "/rushil.jpeg",
    fallback: "RB",
    bio: "Learning to create value for the world. Passionate about building a better future.",
    expertise: ["Strategic Planning", "Leadership", "Business Development"],
    social: {
      linkedin: "https://www.linkedin.com/in/rushil-borsania-576517259/",
      twitter: "#",
      github: "#"
    }
  },
  { 
    name: "Sahil Kumar Singh",
    role: "CTO & Co-Founder",
    image: "/sks.jpeg",
    fallback: "SKS",
    bio: "Passion for creating elegant solutions to complex problems. Expert in AI integration.",
    expertise: ["System Architecture", "AI & ML", "Cloud Infrastructure"],
    social: {
      linkedin: "https://www.linkedin.com/in/kyameinsahilwho",
      twitter: "https://www.x.com/kyameinsahilwho",
      github: "https://www.github.com/kyameinsahilwho"
    }
  }
];

const CoFounders = () => {
  return (
    <section id="team" className="container py-24 space-y-12">
      <div className="text-center space-y-4">
        <p className="text-sm font-medium text-blue-600">OUR TEAM</p>
        <h2 className="text-4xl font-bold tracking-tighter md:text-5xl text-gray-800">Meet Our Co-Founders</h2>
        <p className="text-xl text-gray-600 md:w-2/3 mx-auto">
          Our leadership team brings decades of experience and expertise to drive innovation and excellence.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16 max-w-4xl mx-auto">
        {founders.map((founder) => (
          <Card key={founder.name} className="bg-white border-blue-100 overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-blue-100">
            <CardHeader className="text-center pb-2">
              <div className="flex justify-center mb-4">
                <Avatar className="h-32 w-32 border-2 border-blue-500 ring-2 ring-blue-200">
                  <AvatarImage src={founder.image} alt={founder.name} />
                  <AvatarFallback className="text-xl bg-blue-50 text-blue-600">{founder.fallback}</AvatarFallback>
                </Avatar>
              </div>
              <CardTitle className="text-2xl text-gray-800">{founder.name}</CardTitle>
              <CardDescription className="text-lg text-blue-600">{founder.role}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg text-gray-600">{founder.bio}</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {founder.expertise.map((skill) => (
                  <Badge key={skill} variant="outline" className="text-base border-blue-500 text-blue-600 bg-transparent hover:bg-blue-50 px-3 py-1">
                    {skill}
                  </Badge>
                ))}
              </div>
              <div className="flex justify-center gap-6 pt-4">
                <a target="_blank" href={founder.social.linkedin} className="text-gray-500 hover:text-blue-600 transition-colors">
                  <Linkedin size={24} />
                </a>
                <a target="_blank" href={founder.social.twitter} className="text-gray-500 hover:text-blue-600 transition-colors">
                  <Twitter size={24} />
                </a>
                <a target="_blank" href={founder.social.github} className="text-gray-500 hover:text-blue-600 transition-colors">
                  <Github size={24} />
                </a>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default CoFounders;
