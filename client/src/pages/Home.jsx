import React from "react";
import HeroSection from "../components/HeroSection";
import FeatureSection from "../components/FeatureSection";
import TrailerSection from "../components/TrailerSection";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <main className="min-h-screen overflow-hidden bg-[#09090B]">
      <HeroSection />

      <section className="relative z-10 bg-[radial-gradient(circle_at_top_left,rgba(248,69,101,0.12),transparent_28%),linear-gradient(180deg,#09090B_0%,#0d0b10_48%,#09090B_100%)]">
        <FeatureSection />
        <TrailerSection />
      </section>

    </main>
  );
};

export default Home;
