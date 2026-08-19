import HeroStack from "@/components/sections/HeroStack";
import Craft from "@/components/sections/Craft";
import Proof from "@/components/sections/Proof";
import Momentum from "@/components/sections/Momentum";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";

// The spine: one continuous scroll telling the story in order.
// Hero -> Noticing (human) -> Craft (precision) -> Proof (projects) -> Momentum (close)
// Hero + Noticing are combined in HeroStack: Hero stays pinned via
// `position: sticky` while Noticing scrolls up and covers it.
// Navbar anchors: #about -> Noticing (inside HeroStack), #projects -> Proof, #contact -> Momentum
export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroStack />
      <Craft />
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
