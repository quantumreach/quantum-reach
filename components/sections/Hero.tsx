import { Button } from "@/components/ui/button";
import { Rocket, Info } from "lucide-react";

const Hero = () => {
  return (
    <section className="container py-24 md:py-32 space-y-12 relative">
      <div className="absolute inset-0 grid grid-cols-10 grid-rows-10 pointer-events-none">
        {/* Horizontal lines */}
        {Array.from({ length: 11 }).map((_, i) => (
          <div
            key={`horizontal-line-${i}`}
            className="absolute h-px w-full bg-blue-300/40"
            style={{
              top: `${i * 10}%`,
            }}
          />
        ))}

        {/* Vertical lines */}
        {Array.from({ length: 11 }).map((_, i) => (
          <div
            key={`vertical-line-${i}`}
            className="absolute w-px h-full bg-blue-300/40"
            style={{
              left: `${i * 10}%`,
            }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/50 to-white/20" />
      </div>

      <div className="flex flex-col items-center text-center space-y-6 relative">
        <div className="inline-block rounded-full bg-blue-100 px-4 py-1.5 text-sm font-medium text-blue-600 mb-2">
          Delivering excellence since 2023
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight text-gray-800">
          Innovative <span className="text-blue-600">Digital Solutions</span> for Your Business
        </h1>
        <p className="text-xl text-gray-600 md:w-3/4 max-w-3xl">
          Empowering businesses with cutting-edge technology solutions that drive growth and innovation in the digital age.
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-5 justify-center relative">
        <Button size="lg" className="bg-blue-500 text-white hover:bg-blue-600">
          <Rocket className="mr-2 h-5 w-5" /> Get Started
        </Button>
        <Button size="lg" variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-50">
          <Info className="mr-2 h-5 w-5" /> Learn More
        </Button>
      </div>
    </section>
  );
};

export default Hero;
