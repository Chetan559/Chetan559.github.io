import { Hero } from "@/components/home/Hero";
import { About } from "@/components/home/About";
import { Experience } from "@/components/home/Experience";
import { Projects } from "@/components/home/Projects";
import { ResumeSection } from "@/components/home/ResumeSection";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Projects />
      <ResumeSection />
    </>
  );
}
