import React, { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import BlurCircle from "../components/BlurCircle";
import Loading from "../components/Loading";
import { getMovies } from "../lib/api";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const loadMovies = async (query = "") => {
    setLoading(true);
    try {
      const data = await getMovies(query);
      setMovies(data.movies || []);
    } catch (error) {
      console.error(error.message);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMovies();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    loadMovies(search.trim());
  };

  return (
    <div className="relative my-40 mb-60 min-h-[80vh] overflow-hidden px-6 md:px-16 lg:px-40 xl:px-44">
      <BlurCircle top="150px" left="0px" />
      <BlurCircle bottom="90px" right="50px" />

      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-lg font-medium">Now Showing</h1>
          <p className="mt-1 text-sm text-gray-400">Loaded from OMDb through your backend API.</p>
        </div>

        <form onSubmit={handleSubmit} className="flex w-full max-w-md gap-2">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search movies from OMDb..."
            className="flex-1 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-white outline-none focus:border-primary"
          />
          <button className="rounded-full bg-primary px-5 py-3 text-sm font-medium text-white">
            Search
          </button>
        </form>
      </div>

      {loading ? (
        <Loading />
      ) : movies.length > 0 ? (
        <div className="flex flex-wrap gap-8 max-sm:justify-center">
          {movies.map((movie) => (
            <MovieCard movie={movie} key={movie._id} />
          ))}
        </div>
      ) : (
        <div className="flex h-96 flex-col items-center justify-center">
          <h1 className="text-center text-3xl font-bold">No Movies Available</h1>
        </div>
      )}
    </div>
  );
};

export default Movies;
