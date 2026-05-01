import React, { useEffect, useRef, useState } from "react";
import { dummyTrailers } from "../assets/assets";
import ReactPlayer from "react-player";
import BlurCircle from "./BlurCircle";
import { ArrowLeft, ArrowRight, PlayCircleIcon } from "lucide-react";

const TrailerSection = () => {
  const [currentTrailer, setCurrentTrailer] = useState(dummyTrailers[0]);
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef(null);

  const loopTrailers = [...dummyTrailers, ...dummyTrailers];

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const interval = setInterval(() => {
      if (isPaused) return;

      container.scrollLeft += 1;

      if (container.scrollLeft >= container.scrollWidth / 2) {
        container.scrollLeft = 0;
      }
    }, 22);

    return () => clearInterval(interval);
  }, [isPaused]);

  const scrollByAmount = (direction) => {
    const container = scrollRef.current;
    if (!container) return;
    container.scrollBy({ left: direction * 320, behavior: "smooth" });
  };

  const openCurrentTrailer = () => {
    if (!currentTrailer?.videoUrl) return;
    window.open(currentTrailer.videoUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="trailers" className="relative overflow-hidden px-6 py-24 md:px-16 lg:px-24 xl:px-44 scroll-mt-24">
      <BlurCircle top="100px" left="100px" />
      <BlurCircle top="100px" right="100px" />
      <BlurCircle bottom="100px" right="100px" />

      <div className="mx-auto max-w-[1180px]">
        <div className="mb-7 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 inline-flex rounded-full border border-primary/25 bg-primary/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.28em] text-primary">
              Watch before booking
            </p>
            <h2 className="text-3xl font-semibold text-white md:text-5xl">Trailers</h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-gray-400">
              Preview the latest releases and pick your next theatre experience.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => scrollByAmount(-1)}
              className="grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-white/10 bg-white/[0.06] text-white transition hover:border-primary/50 hover:bg-primary/10"
              aria-label="Scroll trailers left"
            >
              <ArrowLeft size={18} />
            </button>
            <button
              onClick={() => scrollByAmount(1)}
              className="grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-white/10 bg-white/[0.06] text-white transition hover:border-primary/50 hover:bg-primary/10"
              aria-label="Scroll trailers right"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-3 shadow-[0_35px_120px_rgba(0,0,0,0.25)] backdrop-blur-xl md:p-5">
          <div className="overflow-hidden rounded-[1.5rem] bg-black">
            <ReactPlayer
              src={currentTrailer.videoUrl}
              playing
              muted
              controls
              width="100%"
              height="min(58vw, 560px)"
              className="mx-auto max-w-full"
            />
          </div>

          <div className="mt-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-gray-400">
              Selected trailer is playing above. Open it on YouTube for fullscreen viewing.
            </p>
            <button
              onClick={openCurrentTrailer}
              className="inline-flex w-fit cursor-pointer items-center gap-2 rounded-full bg-gradient-to-r from-primary to-rose-500 px-5 py-3 text-sm font-medium text-white shadow-[0_18px_45px_rgba(248,69,101,0.2)] transition hover:scale-[1.03]"
            >
              <PlayCircleIcon size={18} />
              Open Trailer
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="scrollbar-hide mt-8 overflow-x-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="group flex w-max gap-4 md:gap-6">
            {loopTrailers.map((trailer, index) => (
              <button
                key={`${trailer.image}-${index}`}
                onClick={() => setCurrentTrailer(trailer)}
                className="relative w-44 flex-shrink-0 cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-white/[0.05] p-1 text-left transition duration-300 hover:border-primary/50 md:w-56"
              >
                <img
                  src={trailer.image}
                  alt="trailer"
                  className="h-26 w-full rounded-[0.85rem] object-cover brightness-75 transition duration-300 hover:brightness-100 md:h-32"
                />

                <PlayCircleIcon
                  strokeWidth={1.6}
                  className="absolute left-1/2 top-1/2 h-9 w-9 -translate-x-1/2 -translate-y-1/2 text-white drop-shadow-lg"
                />

                {currentTrailer.videoUrl === trailer.videoUrl && (
                  <div className="absolute bottom-0 left-0 h-[3px] w-full rounded-full bg-gradient-to-r from-transparent via-primary to-transparent shadow-[0_0_14px_rgba(248,69,101,0.85)]" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrailerSection;
