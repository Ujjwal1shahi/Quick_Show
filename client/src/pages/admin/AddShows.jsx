import React, { useEffect, useState } from "react";
import {
  CalendarDaysIcon,
  ClockIcon,
  IndianRupeeIcon,
  FilmIcon,
  ArmchairIcon,
  LanguagesIcon,
  MonitorPlayIcon,
  StarIcon,
  SearchIcon,
  XIcon,
} from "lucide-react";
import BlurCircle from "../../components/BlurCircle";
import Loading from "../../components/Loading";
import { addShow, searchMovies } from "../../lib/api";

const AddShows = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [searching, setSearching] = useState(false);

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [price, setPrice] = useState("");
  const [seats, setSeats] = useState("");
  const [language, setLanguage] = useState("Hindi");
  const [format, setFormat] = useState("2D");

  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const delaySearch = setTimeout(async () => {
      if (!searchQuery.trim()) {
        setMovies([]);
        setSelectedMovie(null);
        return;
      }

      try {
        setSearching(true);
        setMessage("");

        const data = await searchMovies(searchQuery);
        setMovies(data.movies || []);
      } catch (error) {
        console.error(error.message);
        setMovies([]);
        setMessage(error.message || "Failed to search movies.");
      } finally {
        setSearching(false);
      }
    }, 500);

    return () => clearTimeout(delaySearch);
  }, [searchQuery]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedMovie) {
      setMessage("Please select a movie first.");
      return;
    }

    try {
      setSaving(true);
      setMessage("");

      const showData = {
        movie: selectedMovie,
        showDateTime: `${date}T${time}`,
        showPrice: Number(price),
        totalSeats: Number(seats),
        language,
        format,
      };

      await addShow(showData);

      setMessage("Show added successfully. It will now appear on dashboard.");

      setSelectedMovie(null);
      setMovies([]);
      setSearchQuery("");
      setDate("");
      setTime("");
      setPrice("");
      setSeats("");
      setLanguage("Hindi");
      setFormat("2D");
    } catch (error) {
      console.error(error.message);
      setMessage(error.message || "Failed to add show.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-64px)] overflow-hidden px-4 py-8 sm:px-6 md:px-10">
      <BlurCircle top="90px" left="90px" />
      <BlurCircle bottom="90px" right="90px" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-8">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-primary">
            Admin Panel
          </p>

          <h1 className="mt-2 text-3xl font-bold text-white md:text-4xl">
            Add New Show
          </h1>

          <p className="mt-2 max-w-2xl text-sm text-gray-400">
            Search any movie from API, select it, then add show date, timing,
            price, and seat details.
          </p>
        </div>

        <div className="mb-8">
          <div className="mb-4 flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h2 className="text-xl font-semibold text-white">Search Movie</h2>

              <p className="text-sm text-gray-400">
                Search and select a movie to create a show
              </p>
            </div>

            <div className="rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm text-primary">
              {selectedMovie ? "Movie Selected" : "No Movie Selected"}
            </div>
          </div>

          <div className="mb-3 flex items-center gap-3 rounded-2xl border border-white/10 bg-black/30 px-4 py-3">
            <SearchIcon className="h-5 w-5 text-primary" />

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search movie by name..."
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-gray-500"
            />

            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setMovies([]);
                  setSelectedMovie(null);
                }}
                className="rounded-full bg-white/10 p-1 text-gray-300 hover:bg-white/20 hover:text-white"
              >
                <XIcon className="h-4 w-4" />
              </button>
            )}
          </div>

          {searching && (
            <p className="mb-4 text-sm text-gray-400">Searching movies...</p>
          )}

          {!searchQuery.trim() ? (
            <div className="rounded-3xl border border-white/10 bg-white/4 p-10 text-center text-gray-400">
              Search a movie to show results.
            </div>
          ) : movies.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {movies.map((movie) => {
                const movieKey = movie.imdbID || movie._id || movie.title;
                const isSelected =
                  selectedMovie?.imdbID === movie.imdbID ||
                  selectedMovie?._id === movie._id;

                return (
                  <div
                    key={movieKey}
                    onClick={() => setSelectedMovie(movie)}
                    className={`group cursor-pointer overflow-hidden rounded-3xl border bg-white/4 shadow-xl backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-primary/70 hover:shadow-primary/20 ${
                      isSelected
                        ? "border-primary shadow-primary/30"
                        : "border-white/10"
                    }`}
                  >
                    <div className="relative h-72 overflow-hidden">
                      {movie.poster_path ? (
                        <img
                          src={movie.poster_path}
                          alt={movie.title}
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                            e.currentTarget.nextSibling.style.display = "flex";
                          }}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                      ) : null}

                      <div
                        className="hidden h-full w-full items-center justify-center bg-black/40 text-sm text-gray-400"
                        style={{ display: movie.poster_path ? "none" : "flex" }}
                      >
                        No Poster
                      </div>

                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="line-clamp-1 text-lg font-bold text-white">
                          {movie.title}
                        </h3>

                        <div className="mt-2 flex items-center justify-between gap-2 text-xs text-gray-300">
                          <span>
                            {movie.release_date?.split(" ").pop() ||
                              movie.release_date?.split("-")[0] ||
                              "N/A"}
                          </span>

                          <span className="flex items-center gap-1 rounded-full bg-black/50 px-2 py-1 text-yellow-400">
                            <StarIcon className="h-3.5 w-3.5 fill-yellow-400" />
                            {Number(movie.vote_average || 0).toFixed(1)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 p-4">
                      <p className="line-clamp-2 text-sm leading-6 text-gray-400">
                        {movie.overview || "No overview available."}
                      </p>

                      <button
                        type="button"
                        className={`w-full rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                          isSelected
                            ? "bg-primary text-white"
                            : "bg-white/10 text-gray-200 hover:bg-primary hover:text-white"
                        }`}
                      >
                        {isSelected ? "Selected" : "Select Movie"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            !searching && (
              <div className="rounded-3xl border border-white/10 bg-white/4 p-10 text-center text-gray-400">
                No movie found for "{searchQuery}".
              </div>
            )
          )}
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-white/10 bg-white/4 p-5 shadow-2xl backdrop-blur-xl md:p-7"
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/15 text-primary">
                <FilmIcon className="h-5 w-5" />
              </div>

              <div>
                <h2 className="text-xl font-semibold text-white">
                  Show Details
                </h2>

                <p className="text-sm text-gray-400">
                  Fill all required show information
                </p>
              </div>
            </div>

            {message && (
              <div className="mb-5 rounded-2xl border border-primary/20 bg-primary/10 px-4 py-3 text-sm text-primary">
                {message}
              </div>
            )}

            {!selectedMovie && (
              <div className="mb-5 rounded-2xl border border-yellow-500/20 bg-yellow-500/10 px-4 py-3 text-sm text-yellow-300">
                Please search and select a movie first.
              </div>
            )}

            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Selected Movie
                </label>

                <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-black/30 p-3">
                  {selectedMovie ? (
                    <>
                      {selectedMovie.poster_path ? (
                        <img
                          src={selectedMovie.poster_path}
                          alt={selectedMovie.title}
                          className="h-16 w-12 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="flex h-16 w-12 items-center justify-center rounded-lg bg-black/40 text-[10px] text-gray-500">
                          No Poster
                        </div>
                      )}

                      <div>
                        <h3 className="font-semibold text-white">
                          {selectedMovie.title}
                        </h3>

                        <p className="text-sm text-gray-400">
                          {selectedMovie.release_date || "N/A"} • Rating{" "}
                          {Number(selectedMovie.vote_average || 0).toFixed(1)}
                        </p>
                      </div>
                    </>
                  ) : (
                    <p className="py-3 text-sm text-gray-500">
                      No movie selected
                    </p>
                  )}
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-300">
                    <CalendarDaysIcon className="h-4 w-4 text-primary" />
                    Show Date
                  </label>

                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition focus:border-primary"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-300">
                    <ClockIcon className="h-4 w-4 text-primary" />
                    Show Time
                  </label>

                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition focus:border-primary"
                    required
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-300">
                    <IndianRupeeIcon className="h-4 w-4 text-primary" />
                    Ticket Price
                  </label>

                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="199"
                    className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition focus:border-primary"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-300">
                    <ArmchairIcon className="h-4 w-4 text-primary" />
                    Total Seats
                  </label>

                  <input
                    type="number"
                    value={seats}
                    onChange={(e) => setSeats(e.target.value)}
                    placeholder="120"
                    className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition focus:border-primary"
                    required
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-300">
                    <LanguagesIcon className="h-4 w-4 text-primary" />
                    Language
                  </label>

                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition focus:border-primary"
                  >
                    <option>Hindi</option>
                    <option>English</option>
                    <option>Tamil</option>
                    <option>Telugu</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-300">
                    <MonitorPlayIcon className="h-4 w-4 text-primary" />
                    Format
                  </label>

                  <select
                    value={format}
                    onChange={(e) => setFormat(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition focus:border-primary"
                  >
                    <option>2D</option>
                    <option>3D</option>
                    <option>IMAX</option>
                    <option>4DX</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={!selectedMovie || saving}
                className="w-full rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {saving ? "Adding Show..." : "Create Show"}
              </button>
            </div>
          </form>

          <div className="rounded-3xl border border-white/10 bg-white/4 p-5 shadow-2xl backdrop-blur-xl md:p-7">
            <h2 className="text-xl font-semibold text-white">Preview</h2>

            <p className="mt-2 text-sm text-gray-400">
              Preview of selected movie and show details.
            </p>

            {selectedMovie ? (
              <div className="mt-5 overflow-hidden rounded-2xl border border-white/10 bg-black/30">
                {selectedMovie.poster_path ? (
                  <img
                    src={selectedMovie.poster_path}
                    alt={selectedMovie.title}
                    className="h-80 w-full object-cover"
                  />
                ) : (
                  <div className="flex h-80 w-full items-center justify-center bg-black/40 text-gray-500">
                    No Poster Available
                  </div>
                )}

                <div className="p-4">
                  <h3 className="text-lg font-semibold text-white">
                    {selectedMovie.title}
                  </h3>

                  <p className="mt-2 text-sm text-gray-400">
                    {date || "Select date"} • {time || "Select time"}
                  </p>

                  <p className="mt-2 text-sm text-primary">
                    ₹{price || "0"} • {seats || "0"} seats • {language} •{" "}
                    {format}
                  </p>
                </div>
              </div>
            ) : (
              <div className="mt-5 rounded-2xl border border-white/10 bg-black/30 p-8 text-center text-sm text-gray-500">
                Search and select a movie to see preview.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddShows;
