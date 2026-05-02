import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { dummyDateTimeData, dummyShowsData } from "../assets/assets";
import BlurCircle from "../components/BlurCircle";
import {
  StarIcon,
  Heart,
  PlayCircleIcon,
  Clock3Icon,
  CalendarDaysIcon,
  FilmIcon,
} from "lucide-react";
import timeFormat from "../lib/timeFormat";
import DateSelect from "../components/DateSelect";
import MovieCard from "../components/MovieCard";
import Loading from "../components/Loading";

const MovieDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isTrailerClicked, setIsTrailerClicked] = useState(false);

  const getShow = async () => {
    const show = dummyShowsData.find((show) => show._id === id);

    if (show) {
      setShow({
        movie: show,
        dateTime: dummyDateTimeData,
      });
    }
  };

  useEffect(() => {
    getShow();
  }, [id]);

   const handleTrailer = () => {
  navigate("/");

  setTimeout(() => {
    document
      .getElementById("trailers")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 300);
};


  return show ? (
    <div className="relative min-h-screen overflow-hidden px-6 md:px-16 lg:px-24 xl:px-44 pt-32 md:pt-44 pb-20">
   

      {/* Movie details section */}
      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-10 lg:gap-14 items-start">
          {/* Poster */}
          <div className="relative mx-auto lg:mx-0">
            <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-primary/40 via-pink-500/20 to-transparent blur-xl opacity-70" />

            <img
              src={show.movie.poster_path}
              alt={show.movie.title}
              className="relative h-[430px] w-[290px] md:h-[480px] md:w-[320px] object-cover rounded-[1.7rem] border border-white/10 shadow-[0_0_45px_rgba(255,0,90,0.18)]"
            />
          </div>

          <BlurCircle top="0px" right="-90px" />

          {/* Movie content */}
          <div className="relative flex flex-col gap-4 pt-2 lg:pt-6">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-xs font-medium tracking-widest text-primary">
              <FilmIcon className="h-4 w-4" />
              ENGLISH
            </div>

            <h1 className="max-w-3xl text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight text-white text-balance">
              {show.movie.title}
            </h1>

             <BlurCircle top="90px" left="90px" />

            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-300">
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
                <StarIcon className="h-4 w-4 text-primary fill-primary" />
                <span className="font-medium text-white">
                  {show.movie.vote_average.toFixed(1)}
                </span>
                <span>User Rating</span>
              </div>

              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
                <Clock3Icon className="h-4 w-4 text-primary" />
                <span>{timeFormat(show.movie.runtime)}</span>
              </div>

              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
                <CalendarDaysIcon className="h-4 w-4 text-primary" />
                <span>{show.movie.release_date.split("-")[0]}</span>
              </div>
            </div>

            <p className="max-w-3xl text-sm md:text-base leading-7 text-gray-400 mt-2">
              {show.movie.overview}
            </p>

            <div className="flex flex-wrap gap-2 mt-1">
              {show.movie.genres.map((genre) => (
                <span
                  key={genre.name}
                  className="rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs text-gray-300"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            <div className="flex items-center flex-wrap gap-4 mt-6">
              <button onClick={handleTrailer} className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/8 px-7 py-3 text-sm font-medium text-white shadow-lg transition-all duration-300 hover:border-primary/40 hover:bg-primary/15 active:scale-95">
                <PlayCircleIcon className="h-5 w-5 text-primary transition-transform group-hover:scale-110" />
                Watch Trailer
              </button>

              <a
                href="#dateSelect"
                className="rounded-full bg-primary px-9 py-3 text-sm font-medium text-white shadow-[0_0_25px_rgba(255,0,90,0.35)] transition-all duration-300 hover:bg-primary/90 hover:shadow-[0_0_35px_rgba(255,0,90,0.55)] active:scale-95"
              >
                Buy Tickets
              </a>

              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className={`rounded-full border p-3 transition-all duration-300 active:scale-95 ${
                  isFavorite
                    ? "border-primary bg-primary text-white shadow-[0_0_22px_rgba(255,0,90,0.45)]"
                    : "border-white/10 bg-white/5 text-gray-300 hover:border-primary/40 hover:bg-primary/15 hover:text-white"
                }`}
              >
                <Heart
                  className={`h-5 w-5 ${
                    isFavorite ? "fill-white" : ""
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Cast section */}
      <section className="relative max-w-7xl mx-auto mt-20">
        <div className="flex items-center justify-between gap-4 mb-8">
          <div>
            <p className="text-sm text-primary font-medium tracking-wider uppercase">
              Cast
            </p>
            <h2 className="text-2xl md:text-3xl font-semibold text-white">
              Your Favourite Cast
            </h2>
          </div>
        </div>

        <div className="overflow-x-auto no-scrollbar pb-5">
          <div className="flex items-stretch gap-5 w-max px-1">
            {show.movie.casts.slice(0, 12).map((cast, index) => (
              <div
                key={index}
                className="group w-28 rounded-2xl border border-white/10 bg-white/[0.04] p-3 text-center backdrop-blur-md transition-all duration-300 hover:border-primary/40 hover:bg-primary/10"
              >
                <div className="relative mx-auto h-20 w-20">
                  <div className="absolute inset-0 rounded-full bg-primary/30 blur-md opacity-0 transition-opacity group-hover:opacity-70" />
                  <img
                    src={cast.profile_path}
                    alt={cast.name}
                    className="relative h-20 w-20 rounded-full object-cover border border-white/10"
                  />
                </div>

                <p className="mt-3 line-clamp-2 text-xs font-medium text-gray-200">
                  {cast.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Already updated component */}
      <DateSelect dateTime={show.dateTime} id={id} />

      {/* Recommended movies */}
      <section className="relative max-w-7xl mx-auto mt-10">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm text-primary font-medium tracking-wider uppercase">
              Recommendations
            </p>
            <h2 className="text-2xl md:text-3xl font-semibold text-white">
              You May Also Like
            </h2>
          </div>
        </div>

        <div className="flex flex-wrap max-sm:justify-center gap-8">
          {dummyShowsData.slice(0, 4).map((movie, index) => (
            <MovieCard key={index} movie={movie} />
          ))}
        </div>

        <div className="flex justify-center mt-16">
          <button
            onClick={() => {
              navigate("/movies");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="rounded-full bg-primary px-10 py-3 text-sm font-medium text-white shadow-[0_0_25px_rgba(255,0,90,0.35)] transition-all duration-300 hover:bg-primary/90 hover:shadow-[0_0_35px_rgba(255,0,90,0.55)] active:scale-95"
          >
            Show More
          </button>
        </div>
      </section>
    </div>
  ) : (
    <div className="min-h-screen flex items-center justify-center bg-[#09070d]">
      <Loading />
    </div>
  );
};

export default MovieDetails;