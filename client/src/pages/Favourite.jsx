import React, { useEffect, useState } from "react";
import BlurCircle from "../components/BlurCircle";
import MovieCard from "../components/MovieCard";
import Loading from "../components/Loading";
import { getMovies } from "../lib/api";

const Favourite = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const data = await getMovies();
        setMovies((data.movies || []).slice(0, 4));
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, []);

  if (loading) return <Loading />;

  return movies.length > 0 ? (
    <div className="relative my-40 mb-60 min-h-[80vh] overflow-hidden px-6 md:px-16 lg:px-40 xl:px-44">
      <BlurCircle top="150px" left="0px" />
      <BlurCircle bottom="50px" right="50px" />

      <h1 className="my-4 text-lg font-medium">Favourites</h1>
      <div className="flex flex-wrap gap-8 max-sm:justify-center">
        {movies.map((movie) => (
          <MovieCard movie={movie} key={movie._id} />
        ))}
      </div>
    </div>
  ) : (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="text-center text-3xl font-bold">Nothing is added to Favourites</h1>
    </div>
  );
};

export default Favourite;
