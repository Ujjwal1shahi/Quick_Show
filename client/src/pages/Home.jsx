import React from "react";
import HeroSection from "../components/HeroSection";
import FeatureSection from "../components/FeatureSection";
import TrailerSection from "../components/TrailerSection";
import Footer from "../components/Footer";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollToTrailers) {
      setTimeout(() => {
        document
          .getElementById("trailers")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300);
    }
  }, [location]);

  return (
    <main className="min-h-screen overflow-hidden bg-[#09090B]">
      <HeroSection />

      <section className="relative z-10 bg-[radial-gradient(circle_at_top_left,rgba(248,69,101,0.12),transparent_28%),linear-gradient(180deg,#09090B_0%,#0d0b10_48%,#09090B_100%)]">
        <FeatureSection />
        <div id="trailers">
          <TrailerSection />
        </div>
      </section>
    </main>
  );
};

export default Home;
