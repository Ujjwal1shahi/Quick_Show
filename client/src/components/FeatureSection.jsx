import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import BlurCircle from "./BlurCircle";
import { useNavigate } from "react-router-dom";
import { dummyShowsData } from "../assets/assets";
import MovieCard from "./MovieCard";
import "./HeroSection.css";

const FeatureSection = () => {
  const navigate = useNavigate();

  const goMovies = () => {
    navigate("/movies");
    window.scrollTo(0, 0);
  };

  return (
    <section className="relative overflow-hidden px-6 py-24 md:px-16 lg:px-24 xl:px-44">
      <BlurCircle top="100px" left="100px" />
      <BlurCircle top="200px" right="100px" />
      <BlurCircle bottom="90px" right="200px" />

      <div className="mx-auto max-w-[1180px] rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 shadow-[0_35px_120px_rgba(0,0,0,0.24)] backdrop-blur-xl md:p-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.28em] text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              Handpicked for you
            </div>
            <h2 className="text-3xl font-semibold text-white md:text-5xl">Now Showing</h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-gray-400">
              Book from the latest movies with premium seats, smooth checkout, and trailer previews.
            </p>
          </div>


          <button
            onClick={goMovies}
            className="group inline-flex w-fit cursor-pointer items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-5 py-3 text-sm font-medium text-gray-200 transition hover:border-primary/50 hover:bg-primary/10 hover:text-white"
          >
            View All Movies
            <ArrowRight className="h-4.5 w-4.5 transition group-hover:translate-x-1" />
          </button>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-4 lg:justify-between">
          {dummyShowsData.slice(0, 8).map((show) => (
            <MovieCard key={show._id} movie={show} />
          ))}
        </div>

        <div className="mt-14 flex justify-center">
          <button
            onClick={goMovies}
            className="cursor-pointer rounded-full bg-gradient-to-r from-primary to-rose-500 px-10 py-3 text-sm font-medium text-white shadow-[0_18px_45px_rgba(248,69,101,0.24)] transition hover:scale-[1.03]"
          >
            Show More Movies
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
