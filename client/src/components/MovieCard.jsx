import React from "react";
import { useNavigate } from "react-router-dom";
import { StarIcon, Ticket } from "lucide-react";
import timeFormat from "../lib/timeFormat";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  const openMovie = () => {
    navigate(`/movies/${movie._id}`);
    window.scrollTo(0, 0);
  };

  return (
    <article className="group relative w-66 overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.055] p-3 shadow-[0_24px_80px_rgba(0,0,0,0.25)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-primary/45 hover:bg-white/[0.08]">
      <button onClick={openMovie} className="block w-full overflow-hidden rounded-2xl">
        <img
          src={movie.backdrop_path}
          alt={movie.title}
          className="h-52 w-full object-cover object-right-bottom transition duration-500 group-hover:scale-105"
        />
      </button>

      <div className="pointer-events-none absolute inset-x-3 top-3 h-52 rounded-2xl bg-gradient-to-t from-black/70 via-transparent to-transparent" />

      <div className="relative pt-4">
        <p className="truncate text-base font-semibold text-white">{movie.title}</p>

        <p className="mt-2 line-clamp-1 text-sm text-gray-400">
          {new Date(movie.release_date).getFullYear()} • {" "}
          {movie.genres
            .slice(0, 2)
            .map((genre) => genre.name)
            .join(" | ")} {" "}
          • {timeFormat(movie.runtime)}
        </p>

        <div className="mt-5 flex items-center justify-between pb-2">
          <button
            onClick={openMovie}
            className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-gradient-to-r from-primary to-rose-500 px-4 py-2 text-xs font-medium text-white shadow-[0_10px_28px_rgba(248,69,101,0.22)] transition hover:scale-[1.03]"
          >
            <Ticket className="h-3.5 w-3.5" />
            Buy Tickets
          </button>

          <p className="mt-1 flex items-center gap-1 rounded-full border border-white/10 bg-black/20 px-2.5 py-1 text-sm text-gray-300">
            <StarIcon className="h-4 w-4 fill-primary text-primary" />
            {movie.vote_average.toFixed(1)}
          </p>
        </div>
      </div>
    </article>
  );
};

export default MovieCard;
