import Hero from "@/components/sections/Hero";
import Noticing from "@/components/sections/Noticing";
import Craft from "@/components/sections/Craft";
import Proof from "@/components/sections/Proof";
import Momentum from "@/components/sections/Momentum";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";

// The spine: one continuous scroll telling the story in order.
// Hero -> Noticing (human) -> Craft (precision) -> Proof (projects) -> Momentum (close)
// Navbar anchors: #about -> Noticing, #projects -> Proof, #contact -> Momentum
export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <div id="about">
        <Noticing />
        <Craft />
      </div>
      <div id="projects">
        <Proof />
      </div>
      <div id="contact">
        <Momentum />
      </div>
      <Footer />
    </main>
  );
}
