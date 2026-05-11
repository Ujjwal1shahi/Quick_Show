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
} from "lucide-react";
import BlurCircle from "../../components/BlurCircle";
import Loading from "../../components/Loading";
import { getMovies } from "../../lib/api";

const AddShows = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [price, setPrice] = useState("");
  const [seats, setSeats] = useState("");
  const [language, setLanguage] = useState("Hindi");
  const [format, setFormat] = useState("2D");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const data = await getMovies();
        setMovies(data.movies || []);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedMovie) {
      setMessage("Please select a movie first.");
      return;
    }

    const showData = {
      movie: selectedMovie,
      date,
      time,
      price,
      seats,
      language,
      format,
    };

    console.log(showData);
    setMessage("Show data is ready. Add a database show model later to save it permanently.");
  };

  if (loading) return <Loading />;

  return (
    <div className="relative min-h-[calc(100vh-64px)] overflow-hidden px-4 py-8 sm:px-6 md:px-10">
      <BlurCircle top="90px" left="90px" />
      <BlurCircle bottom="90px" right="90px" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-8">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-primary">Admin Panel</p>
          <h1 className="mt-2 text-3xl font-bold text-white md:text-4xl">Add New Show</h1>
          <p className="mt-2 max-w-2xl text-sm text-gray-400">
            Select a movie fetched from OMDb, then add show date, timing, price, and seat details.
          </p>
        </div>

        <div className="mb-8">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-white">Select Movie</h2>
              <p className="text-sm text-gray-400">Choose a movie to create a show</p>
            </div>

            <div className="hidden rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm text-primary md:block">
              {selectedMovie ? "Movie Selected" : "No Movie Selected"}
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {movies.map((movie) => (
              <div
                key={movie._id}
                onClick={() => setSelectedMovie(movie)}
                className={`group cursor-pointer overflow-hidden rounded-3xl border bg-white/4 shadow-xl backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-primary/70 hover:shadow-primary/20 ${
                  selectedMovie?._id === movie._id ? "border-primary shadow-primary/30" : "border-white/10"
                }`}
              >
                <div className="relative h-72 overflow-hidden">
                  <img src={movie.poster_path} alt={movie.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent" />

                  {selectedMovie?._id === movie._id && (
                    <div className="absolute right-3 top-3 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white shadow-lg">Selected</div>
                  )}

                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="line-clamp-1 text-lg font-bold text-white">{movie.title}</h3>
                    <div className="mt-2 flex items-center justify-between gap-2 text-xs text-gray-300">
                      <span>{movie.release_date?.split("-")[0]}</span>
                      <span className="flex items-center gap-1 rounded-full bg-black/50 px-2 py-1 text-yellow-400">
                        <StarIcon className="h-3.5 w-3.5 fill-yellow-400" />
                        {Number(movie.vote_average || 0).toFixed(1)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 p-4">
                  <p className="line-clamp-2 text-sm leading-6 text-gray-400">{movie.overview}</p>
                  <button
                    type="button"
                    className={`w-full rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                      selectedMovie?._id === movie._id ? "bg-primary text-white" : "bg-white/10 text-gray-200 hover:bg-primary hover:text-white"
                    }`}
                  >
                    {selectedMovie?._id === movie._id ? "Selected" : "Select Movie"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <form onSubmit={handleSubmit} className="rounded-3xl border border-white/10 bg-white/4 p-5 shadow-2xl backdrop-blur-xl md:p-7">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/15 text-primary"><FilmIcon className="h-5 w-5" /></div>
              <div>
                <h2 className="text-xl font-semibold text-white">Show Details</h2>
                <p className="text-sm text-gray-400">Fill all required show information</p>
              </div>
            </div>

            {message && <div className="mb-5 rounded-2xl border border-primary/20 bg-primary/10 px-4 py-3 text-sm text-primary">{message}</div>}
            {!selectedMovie && <div className="mb-5 rounded-2xl border border-yellow-500/20 bg-yellow-500/10 px-4 py-3 text-sm text-yellow-300">Please select a movie card first.</div>}

            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">Selected Movie</label>
                <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-black/30 p-3">
                  {selectedMovie ? (
                    <>
                      <img src={selectedMovie.poster_path} alt={selectedMovie.title} className="h-16 w-12 rounded-lg object-cover" />
                      <div>
                        <h3 className="font-semibold text-white">{selectedMovie.title}</h3>
                        <p className="text-sm text-gray-400">{selectedMovie.release_date?.split("-")[0]} • Rating {Number(selectedMovie.vote_average || 0).toFixed(1)}</p>
                      </div>
                    </>
                  ) : (
                    <p className="py-3 text-sm text-gray-500">No movie selected</p>
                  )}
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-300"><CalendarDaysIcon className="h-4 w-4 text-primary" />Show Date</label>
                  <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition focus:border-primary" required />
                </div>
                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-300"><ClockIcon className="h-4 w-4 text-primary" />Show Time</label>
                  <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition focus:border-primary" required />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-300"><IndianRupeeIcon className="h-4 w-4 text-primary" />Ticket Price</label>
                  <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="199" className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition focus:border-primary" required />
                </div>
                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-300"><ArmchairIcon className="h-4 w-4 text-primary" />Total Seats</label>
                  <input type="number" value={seats} onChange={(e) => setSeats(e.target.value)} placeholder="120" className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition focus:border-primary" required />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-300"><LanguagesIcon className="h-4 w-4 text-primary" />Language</label>
                  <select value={language} onChange={(e) => setLanguage(e.target.value)} className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition focus:border-primary">
                    <option>Hindi</option><option>English</option><option>Tamil</option><option>Telugu</option>
                  </select>
                </div>
                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-300"><MonitorPlayIcon className="h-4 w-4 text-primary" />Format</label>
                  <select value={format} onChange={(e) => setFormat(e.target.value)} className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition focus:border-primary">
                    <option>2D</option><option>3D</option><option>IMAX</option><option>4DX</option>
                  </select>
                </div>
              </div>

              <button type="submit" className="w-full rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary/90 disabled:opacity-50" disabled={!selectedMovie}>Create Show</button>
            </div>
          </form>

          <div className="rounded-3xl border border-white/10 bg-white/4 p-5 shadow-2xl backdrop-blur-xl md:p-7">
            <h2 className="text-xl font-semibold text-white">Preview</h2>
            <p className="mt-2 text-sm text-gray-400">This preview uses selected OMDb movie details.</p>
            {selectedMovie ? (
              <div className="mt-5 overflow-hidden rounded-2xl border border-white/10 bg-black/30">
                <img src={selectedMovie.poster_path} alt={selectedMovie.title} className="h-80 w-full object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-white">{selectedMovie.title}</h3>
                  <p className="mt-2 text-sm text-gray-400">{date || "Select date"} • {time || "Select time"}</p>
                  <p className="mt-2 text-sm text-primary">₹{price || "0"} • {seats || "0"} seats • {language} • {format}</p>
                </div>
              </div>
            ) : (
              <div className="mt-5 rounded-2xl border border-white/10 bg-black/30 p-8 text-center text-sm text-gray-500">Select a movie to see preview.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddShows;
