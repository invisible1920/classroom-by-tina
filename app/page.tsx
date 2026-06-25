import Navbar from "../components/home/Navbar";
import Hero from "../components/home/Hero";
import Features from "../components/home/Features";
import DashboardPreview from "../components/home/DashboardPreview";
import About from "../components/home/About";
import Pricing from "../components/home/Pricing";
import FinalCTA from "../components/home/FinalCTA";
import Footer from "../components/home/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <DashboardPreview />
      <About />
      <Pricing />
      <FinalCTA />
      <Footer />
    </main>
  );
}