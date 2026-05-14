import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import BlurCircle from "./BlurCircle";
import { PlayCircleIcon } from "lucide-react";
import { getTrailers } from "../lib/api";

const TrailerSection = () => {
  const [trailers, setTrailers] = useState([]);
  const [currentTrailer, setCurrentTrailer] = useState(null);

  useEffect(() => {
    const loadTrailers = async () => {
      try {
        const data = await getTrailers();
        const apiTrailers = data.trailers || [];
        setTrailers(apiTrailers);
        setCurrentTrailer(apiTrailers[0] || null);
      } catch (error) {
        console.error(error.message);
      }
    };

    loadTrailers();
  }, []);

  const loopTrailers = [...trailers, ...trailers];

  if (!currentTrailer) return null;

  return (
    <section className="relative overflow-hidden px-6 py-20 md:px-16 lg:px-24 xl:px-44">
      <BlurCircle top="100px" left="100px" />
      <BlurCircle bottom="90px" right="90px" />

      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-primary">Trailers</p>
          <h2 className="mt-2 text-3xl font-semibold text-white md:text-4xl">Watch Trailers</h2>
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl border border-white/10 bg-black/30 p-3 shadow-2xl backdrop-blur-xl md:p-5">
        <div className="aspect-video overflow-hidden rounded-2xl bg-black">
          <ReactPlayer src={currentTrailer.videoUrl} width="100%" height="100%" controls />
        </div>
      </div>

      <div className="no-scrollbar mt-8 overflow-x-auto pb-4">
        <div className="flex w-max gap-5">
          {loopTrailers.map((trailer, index) => {
            const isActive = currentTrailer.videoUrl === trailer.videoUrl;
            return (
              <button
                key={`${trailer.videoUrl}-${index}`}
                onClick={() => setCurrentTrailer(trailer)}
                className={`group relative h-28 w-48 overflow-hidden rounded-2xl border transition-all duration-300 ${
                  isActive ? "border-primary" : "border-white/10 hover:border-primary/50"
                }`}
              >
                <img src={trailer.image} alt="Trailer" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-black/35" />
                <PlayCircleIcon className="absolute left-1/2 top-1/2 h-9 w-9 -translate-x-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-all cursor-pointer" />
                {isActive && <span className="absolute bottom-0 left-1/2 h-1 w-full -translate-x-1/2 rounded-full bg-primary shadow-[0_0_30px_rgba(255,0,90,0.9)]" />}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrailerSection;
