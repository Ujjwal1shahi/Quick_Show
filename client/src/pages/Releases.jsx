import React, { useEffect, useState } from "react";
import {
  CalendarDaysIcon,
  ClockIcon,
  PlayCircleIcon,
  StarIcon,
  BellIcon,
  Loader2Icon,
} from "lucide-react";
import BlurCircle from "../components/BlurCircle";

const releaseMovieTitles = [
  "Avatar: Fire and Ash",
  "Avengers: Doomsday",
  "The Batman Part II",
  "Superman",
  "Jurassic World Rebirth",
  "Mission: Impossible - The Final Reckoning",
  "Dune: Part Two",
  "Inside Out 2",
];

const filterOptions = ["All", "Upcoming", "Now Released"];

const Releases = () => {
  const apiKey = import.meta.env.VITE_OMDB_API_KEY;

  const [releases, setReleases] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  const getMovieStatus = (year) => {
    const currentYear = new Date().getFullYear();
    const movieYear = Number(year);

    if (!movieYear) return "Upcoming";

    return movieYear >= currentYear ? "Upcoming" : "Now Released";
  };

  const fetchReleases = async () => {
    try {
      setLoading(true);

      const moviePromises = releaseMovieTitles.map(async (title) => {
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${apiKey}&t=${encodeURIComponent(
            title
          )}`
        );

        const data = await res.json();

        if (data.Response === "True") {
          return {
            id: data.imdbID,
            title: data.Title,
            genre: data.Genre,
            date: data.Released,
            duration: data.Runtime,
            rating: data.Rated,
            imdbRating: data.imdbRating,
            year: data.Year,
            status: getMovieStatus(data.Year),
            image:
              data.Poster !== "N/A"
                ? data.Poster
                : "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=900&q=80",
            plot: data.Plot,
          };
        }

        return null;
      });

      const movies = await Promise.all(moviePromises);
      setReleases(movies.filter(Boolean));
    } catch (error) {
      console.log("Error fetching releases:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReleases();
  }, []);

  const filteredReleases =
    activeFilter === "All"
      ? releases
      : releases.filter((movie) => movie.status === activeFilter);

  const featuredMovie = releases[0];

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        <Loader2Icon className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden px-6 pt-28 pb-20 md:px-16 lg:px-36">
      <BlurCircle top="120px" left="0px" />
      <BlurCircle bottom="60px" right="0px" />

      <div className="relative z-10">
        <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-2 text-sm font-medium uppercase tracking-[0.3em] text-primary">
              New & Upcoming
            </p>

            <h1 className="text-3xl font-bold text-white md:text-5xl">
              Movie Releases
            </h1>

            <p className="mt-3 max-w-2xl text-sm text-gray-400 md:text-base">
              Latest movie details fetched from OMDB API.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {filterOptions.map((item) => (
              <button
                key={item}
                onClick={() => setActiveFilter(item)}
                className={`rounded-full border px-5 py-2 text-sm font-medium transition ${
                  activeFilter === item
                    ? "border-primary bg-primary text-white shadow-lg shadow-primary/30"
                    : "border-white/10 bg-white/5 text-gray-300 hover:border-primary/50 hover:text-primary"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {featuredMovie && (
          <div className="mb-12 overflow-hidden rounded-3xl border border-white/10 bg-white/4 p-5 backdrop-blur-xl md:p-7">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
              <div className="relative h-64 overflow-hidden rounded-3xl lg:h-80 lg:w-[45%]">
                <img
                  src={featuredMovie.image}
                  alt={featuredMovie.title}
                  className="h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-linear-to-t from-black via-black/30 to-transparent" />

                <div className="absolute left-5 top-5 rounded-full bg-primary px-4 py-1.5 text-sm font-semibold text-white">
                  Featured Release
                </div>
              </div>

              <div className="flex-1">
                <p className="mb-3 text-sm uppercase tracking-[0.25em] text-primary">
                  {featuredMovie.status}
                </p>

                <h2 className="text-3xl font-bold text-white md:text-5xl">
                  {featuredMovie.title}
                </h2>

                <p className="mt-4 max-w-2xl text-gray-400">
                  {featuredMovie.plot}
                </p>

                <div className="mt-6 flex flex-wrap gap-4 text-sm text-gray-300">
                  <span className="flex items-center gap-2">
                    <CalendarDaysIcon className="h-4 w-4 text-primary" />
                    {featuredMovie.date}
                  </span>

                  <span className="flex items-center gap-2">
                    <ClockIcon className="h-4 w-4 text-primary" />
                    {featuredMovie.duration}
                  </span>

                  <span className="flex items-center gap-2">
                    <StarIcon className="h-4 w-4 text-primary" />
                    {featuredMovie.imdbRating}/10
                  </span>
                </div>

                <div className="mt-8 flex flex-wrap gap-4">
                  <button className="flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary/80">
                    <BellIcon className="h-4 w-4" />
                    Notify Me
                  </button>

                  <button className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-primary hover:text-primary">
                    <PlayCircleIcon className="h-5 w-5" />
                    Watch Trailer
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <h2 className="mb-6 text-xl font-semibold text-white md:text-2xl">
          All Releases
        </h2>

        {filteredReleases.length > 0 ? (
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredReleases.map((movie) => (
              <div
                key={movie.id}
                className="group overflow-hidden rounded-3xl border border-white/10 bg-white/4 backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-primary/50 hover:bg-white/[0.07]"
              >
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={movie.image}
                    alt={movie.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-linear-to-t from-black via-black/30 to-transparent" />

                  <span
                    className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-semibold ${
                      movie.status === "Now Released"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-primary/20 text-primary"
                    }`}
                  >
                    {movie.status}
                  </span>

                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="line-clamp-1 text-lg font-semibold text-white">
                      {movie.title}
                    </h3>
                    <p className="mt-1 line-clamp-1 text-sm text-gray-400">
                      {movie.genre}
                    </p>
                  </div>
                </div>

                <div className="p-5">
                  <div className="space-y-3 text-sm text-gray-300">
                    <p className="flex items-center gap-2">
                      <CalendarDaysIcon className="h-4 w-4 text-primary" />
                      {movie.date}
                    </p>

                    <p className="flex items-center gap-2">
                      <ClockIcon className="h-4 w-4 text-primary" />
                      {movie.duration}
                    </p>

                    <p className="flex items-center gap-2">
                      <StarIcon className="h-4 w-4 text-primary" />
                      {movie.imdbRating}/10
                    </p>
                  </div>

                  <button className="mt-5 w-full rounded-full bg-primary py-3 text-sm font-semibold text-white transition hover:bg-primary/80">
                    {movie.status === "Now Released"
                      ? "Book Tickets"
                      : "Notify Me"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-10 flex min-h-62.5 items-center justify-center rounded-3xl border border-white/10 bg-white/4">
            <p className="text-gray-400">No releases found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Releases;