import Hero from "@/components/sections/Hero";
import Noticing from "@/components/sections/Noticing";
import Craft from "@/components/sections/Craft";
import Proof from "@/components/sections/Proof";
import Momentum from "@/components/sections/Momentum";
import Footer from "@/components/shared/Footer";

// The spine: one continuous scroll telling the story in order.
// Hero -> Noticing (human) -> Craft (precision) -> Proof (projects) -> Momentum (close)
export default function Home() {
  return (
    <main>
      <Hero />
      <Noticing />
      <Craft />
      <Proof />
      <Momentum />
      <Footer />
    </main>
  );
}
