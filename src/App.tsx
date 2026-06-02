import { Navbar, Footer } from "./components/Layout";
import { Hero } from "./components/Hero";
import { Categories, HowItWorks, Features } from "./components/Sections";
import { TopWorkers } from "./components/Workers";
import { CTASection } from "./components/CTA";

export default function App() {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-[#FF7315] selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <Categories />
        <HowItWorks />
        <TopWorkers />
        <Features />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
