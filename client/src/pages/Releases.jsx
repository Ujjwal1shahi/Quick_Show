import React, { useEffect, useState } from "react";
import {
  CalendarDaysIcon,
  ClockIcon,
  PlayCircleIcon,
  StarIcon,
  BellIcon,
  Loader2Icon,
  TicketIcon,
  RefreshCwIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import BlurCircle from "../components/BlurCircle";
import { getReleases } from "../lib/api";

const filterOptions = ["All", "Upcoming", "Now Released"];

const fallbackPoster =
  "https://placehold.co/600x900/111827/ffffff?text=No+Poster";

const Releases = () => {
  const navigate = useNavigate();

  const [releases, setReleases] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const getMovieStatus = (movie) => {
    const currentDate = new Date();

    const releaseDate =
      movie.Released && movie.Released !== "N/A"
        ? new Date(movie.Released)
        : movie.date
        ? new Date(movie.date)
        : null;

    if (releaseDate && !isNaN(releaseDate.getTime())) {
      return releaseDate > currentDate ? "Upcoming" : "Now Released";
    }

    const currentYear = new Date().getFullYear();
    const movieYear = Number(movie.Year || movie.year);

    if (!movieYear) return "Upcoming";

    return movieYear >= currentYear ? "Upcoming" : "Now Released";
  };

  const normalizeMovie = (movie, index) => {
    const poster = movie.Poster || movie.poster || movie.image;

    return {
      id: movie.imdbID || movie._id || movie.id || index,
      title: movie.Title || movie.title || "Untitled Movie",
      year: movie.Year || movie.year || "N/A",
      date: movie.Released || movie.released || movie.date || "Coming Soon",
      duration: movie.Runtime || movie.runtime || movie.duration || "N/A",
      genre: movie.Genre || movie.genre || "Movie",
      plot: movie.Plot || movie.plot || "No plot available.",
      imdbRating: movie.imdbRating || movie.rating || "N/A",
      image: poster && poster !== "N/A" ? poster : fallbackPoster,
      trailerUrl: movie.trailerUrl || movie.trailer || "",
      status: movie.status || getMovieStatus(movie),
    };
  };

  const fetchReleases = async (isManualRefresh = false) => {
    try {
      if (isManualRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      const data = await getReleases();

      const apiMovies = Array.isArray(data)
        ? data
        : data?.releases || data?.movies || data?.Search || [];

      const movies = apiMovies.map((movie, index) =>
        normalizeMovie(movie, index)
      );

      setReleases(movies);
    } catch (error) {
      console.log("Error fetching releases:", error);
      toast.error("Failed to load realtime movies");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchReleases();

    const interval = setInterval(() => {
      fetchReleases(true);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleNotify = (movie) => {
    const savedNotifications =
      JSON.parse(localStorage.getItem("releaseNotifications")) || [];

    const alreadyExists = savedNotifications.some(
      (item) => item.id === movie.id
    );

    if (alreadyExists) {
      toast.success("Already added to notifications");
      return;
    }

    const updatedNotifications = [
      ...savedNotifications,
      {
        id: movie.id,
        title: movie.title,
        date: movie.date,
        image: movie.image,
        status: movie.status,
      },
    ];

    localStorage.setItem(
      "releaseNotifications",
      JSON.stringify(updatedNotifications)
    );

    toast.success(`You will be notified for ${movie.title}`);
  };

  const handleWatchTrailer = (movie) => {
    if (movie.trailerUrl) {
      window.open(movie.trailerUrl, "_blank");
      return;
    }

    const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(
      `${movie.title} official trailer`
    )}`;

    window.open(youtubeSearchUrl, "_blank");
  };

  const handleBookTickets = (movie) => {
    if (movie.status !== "Now Released") {
      handleNotify(movie);
      return;
    }

    navigate(`/movies/${movie.id}`);
  };

  const handleViewDetails = (movie) => {
    navigate(`/movies/${movie.id}`);
  };

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
              Realtime movie details fetched directly from your API.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
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

            <button
              onClick={() => fetchReleases(true)}
              disabled={refreshing}
              className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm font-medium text-gray-300 transition hover:border-primary/50 hover:text-primary disabled:opacity-60"
            >
              <RefreshCwIcon
                className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`}
              />
              Refresh
            </button>
          </div>
        </div>

        {featuredMovie && (
          <div className="mb-12 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl md:p-7">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
              <div
                onClick={() => handleViewDetails(featuredMovie)}
                className="relative h-64 cursor-pointer overflow-hidden rounded-3xl lg:h-80 lg:w-[45%]"
              >
                <img
                  src={featuredMovie.image}
                  alt={featuredMovie.title}
                  onError={(e) => {
                    e.currentTarget.src = fallbackPoster;
                  }}
                  className="h-full w-full object-cover transition duration-500 hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                <div className="absolute left-5 top-5 rounded-full bg-primary px-4 py-1.5 text-sm font-semibold text-white">
                  Featured Release
                </div>
              </div>

              <div className="flex-1">
                <p className="mb-3 text-sm uppercase tracking-[0.25em] text-primary">
                  {featuredMovie.status}
                </p>

                <h2
                  onClick={() => handleViewDetails(featuredMovie)}
                  className="cursor-pointer text-3xl font-bold text-white transition hover:text-primary md:text-5xl"
                >
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
                  <button
                    onClick={() => handleNotify(featuredMovie)}
                    className="flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary/80"
                  >
                    <BellIcon className="h-4 w-4" />
                    Notify Me
                  </button>

                  <button
                    onClick={() => handleWatchTrailer(featuredMovie)}
                    className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-primary hover:text-primary"
                  >
                    <PlayCircleIcon className="h-5 w-5" />
                    Watch Trailer
                  </button>

                  {featuredMovie.status === "Now Released" && (
                    <button
                      onClick={() => handleBookTickets(featuredMovie)}
                      className="flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-6 py-3 text-sm font-semibold text-primary transition hover:bg-primary hover:text-white"
                    >
                      <TicketIcon className="h-4 w-4" />
                      Book Tickets
                    </button>
                  )}
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
                className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-primary/50 hover:bg-white/[0.07]"
              >
                <div
                  onClick={() => handleViewDetails(movie)}
                  className="relative h-72 cursor-pointer overflow-hidden"
                >
                  <img
                    src={movie.image}
                    alt={movie.title}
                    onError={(e) => {
                      e.currentTarget.src = fallbackPoster;
                    }}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                  <span
                    className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-semibold ${
                      movie.status === "Now Released"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-primary/20 text-primary"
                    }`}
                  >
                    {movie.status}
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleWatchTrailer(movie);
                    }}
                    className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md transition hover:bg-primary"
                  >
                    <PlayCircleIcon className="h-5 w-5" />
                  </button>

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

                  <button
                    onClick={() => handleBookTickets(movie)}
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3 text-sm font-semibold text-white transition hover:bg-primary/80"
                  >
                    {movie.status === "Now Released" ? (
                      <>
                        <TicketIcon className="h-4 w-4" />
                        Book Tickets
                      </>
                    ) : (
                      <>
                        <BellIcon className="h-4 w-4" />
                        Notify Me
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-10 flex min-h-[250px] items-center justify-center rounded-3xl border border-white/10 bg-white/[0.04]">
            <p className="text-gray-400">No realtime releases found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Releases;