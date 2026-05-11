import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import { getMovies, getShowDetails } from "../lib/api";

const MovieDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [recommended, setRecommended] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const loadShow = async () => {
      try {
        const data = await getShowDetails(id);
        setShow(data.show);
      } catch (error) {
        console.error(error.message);
      }
    };

    const loadRecommended = async () => {
      try {
        const data = await getMovies();
        setRecommended((data.movies || []).filter((movie) => movie._id !== id).slice(0, 4));
      } catch (error) {
        console.error(error.message);
      }
    };

    loadShow();
    loadRecommended();
  }, [id]);

  const handleTrailer = () => {
    navigate("/", { state: { scrollToTrailers: true } });
  };

  return show ? (
    <div className="relative min-h-screen overflow-hidden px-6 pb-20 pt-32 md:px-16 md:pt-44 lg:px-24 xl:px-44">
      <div className="relative mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[320px_1fr] lg:gap-14">
          <div className="relative mx-auto lg:mx-0">
            <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-primary/40 via-pink-500/20 to-transparent opacity-70 blur-xl" />

            <img
              src={show.movie.poster_path}
              alt={show.movie.title}
              className="relative h-[430px] w-[290px] rounded-[1.7rem] border border-white/10 object-cover shadow-[0_0_45px_rgba(255,0,90,0.18)] md:h-[480px] md:w-[320px]"
            />
          </div>

          <BlurCircle top="0px" right="-90px" />

          <div className="relative flex flex-col gap-4 pt-2 lg:pt-6">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-xs font-medium tracking-widest text-primary">
              <FilmIcon className="h-4 w-4" />
              {show.movie.original_language || "ENGLISH"}
            </div>

            <h1 className="max-w-3xl text-balance text-4xl font-semibold leading-tight text-white md:text-5xl lg:text-6xl">
              {show.movie.title}
            </h1>

            <BlurCircle top="90px" left="90px" />

            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-300">
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
                <StarIcon className="h-4 w-4 fill-primary text-primary" />
                <span className="font-medium text-white">
                  {Number(show.movie.vote_average || 0).toFixed(1)}
                </span>
                <span>IMDb Rating</span>
              </div>

              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
                <Clock3Icon className="h-4 w-4 text-primary" />
                <span>{timeFormat(show.movie.runtime || 120)}</span>
              </div>

              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
                <CalendarDaysIcon className="h-4 w-4 text-primary" />
                <span>{show.movie.release_date?.split("-")[0]}</span>
              </div>
            </div>

            <p className="mt-2 max-w-3xl text-sm leading-7 text-gray-400 md:text-base">
              {show.movie.overview}
            </p>

            <div className="mt-1 flex flex-wrap gap-2">
              {show.movie.genres?.map((genre) => (
                <span
                  key={genre.name}
                  className="rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs text-gray-300"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-4">
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
                <Heart className={`h-5 w-5 ${isFavorite ? "fill-white" : ""}`} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {show.movie.casts?.length > 0 && (
        <section className="relative mx-auto mt-20 max-w-7xl">
          <div className="mb-8 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium uppercase tracking-wider text-primary">Cast</p>
              <h2 className="text-2xl font-semibold text-white md:text-3xl">Your Favourite Cast</h2>
            </div>
          </div>

          <div className="no-scrollbar overflow-x-auto pb-5">
            <div className="flex w-max items-stretch gap-5 px-1">
              {show.movie.casts.slice(0, 12).map((cast, index) => (
                <div
                  key={index}
                  className="group w-28 rounded-2xl border border-white/10 bg-white/[0.04] p-3 text-center backdrop-blur-md transition-all duration-300 hover:border-primary/40 hover:bg-primary/10"
                >
                  <div className="relative mx-auto h-20 w-20">
                    <div className="absolute inset-0 rounded-full bg-primary/30 opacity-0 blur-md transition-opacity group-hover:opacity-70" />
                    <img
                      src={cast.profile_path}
                      alt={cast.name}
                      className="relative h-20 w-20 rounded-full border border-white/10 object-cover"
                    />
                  </div>

                  <p className="mt-3 line-clamp-2 text-xs font-medium text-gray-200">{cast.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <DateSelect dateTime={show.dateTime} id={id} />

      <section className="relative mx-auto mt-10 max-w-7xl">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium uppercase tracking-wider text-primary">Recommendations</p>
            <h2 className="text-2xl font-semibold text-white md:text-3xl">You May Also Like</h2>
          </div>
        </div>

        <div className="flex flex-wrap gap-8 max-sm:justify-center">
          {recommended.map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>

        <div className="mt-16 flex justify-center">
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
    <div className="flex min-h-screen items-center justify-center bg-[#09070d]">
      <Loading />
    </div>
  );
};

export default MovieDetails;
