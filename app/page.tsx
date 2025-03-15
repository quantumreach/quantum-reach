import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import TechStack from "@/components/sections/TechStack";
import CoFounders from "@/components/sections/CoFounders";
import Contact from "@/components/sections/Contact";
import FAQ from "@/components/sections/FAQ";
import Careers from "@/components/sections/Careers";

export default function Home() {
  return (
    <main className="min-h-screen container mx-auto py-8 px-4">
      <Hero />
      <Services />
      <TechStack />
      <CoFounders />
      <Contact />
      <Careers />
      <FAQ />
    </main>
  );
}
