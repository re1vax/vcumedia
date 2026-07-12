import dynamic from "next/dynamic";
import MotionProvider from "@/components/motion-provider";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";

// Below-fold sections load as separate chunks: HTML is still fully
// server-rendered, but hydration is split into smaller tasks (lower TBT).
const Mission = dynamic(() => import("@/components/Mission"));
const Services = dynamic(() => import("@/components/Services"));
const Work = dynamic(() => import("@/components/Work"));
const Process = dynamic(() => import("@/components/Process"));
const Testimonials = dynamic(() => import("@/components/Testimonials"));
const FAQ = dynamic(() => import("@/components/FAQ"));
const Contact = dynamic(() => import("@/components/Contact"));
const Footer = dynamic(() => import("@/components/Footer"));

export default function Home() {
  return (
    <MotionProvider>
      <SmoothScroll />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Mission />
        <Services />
        <Work />
        <Process />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </MotionProvider>
  );
}
