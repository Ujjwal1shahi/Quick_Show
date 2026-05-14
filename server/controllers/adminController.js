import axios from "axios";
import Movie from "../models/movieModel.js";
import Show from "../models/showModel.js";
import User from "../models/auth.js";

const OMDB_BASE_URL = "https://www.omdbapi.com/";

const normalizeMovie = (movie) => {
  return {
    imdbID: movie.imdbID,
    title: movie.Title || "Untitled",
    poster_path: movie.Poster && movie.Poster !== "N/A" ? movie.Poster : "",
    backdrop_path: movie.Poster && movie.Poster !== "N/A" ? movie.Poster : "",
    overview: movie.Plot && movie.Plot !== "N/A" ? movie.Plot : "",
    release_date:
      movie.Released && movie.Released !== "N/A"
        ? movie.Released
        : movie.Year || "",
    runtime: movie.Runtime && movie.Runtime !== "N/A" ? movie.Runtime : "",
    genres:
      movie.Genre && movie.Genre !== "N/A"
        ? movie.Genre.split(",").map((genre) => genre.trim())
        : [],
    vote_average:
      movie.imdbRating && movie.imdbRating !== "N/A"
        ? Number(movie.imdbRating)
        : 0,
    language:
      movie.Language && movie.Language !== "N/A" ? movie.Language : "",
  };
};

export const searchMovies = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || query.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Search query is required",
      });
    }

    if (!process.env.OMDB_API_KEY) {
      return res.status(500).json({
        success: false,
        message: "OMDB API key is missing",
      });
    }

    const searchResponse = await axios.get(OMDB_BASE_URL, {
      params: {
        apikey: process.env.OMDB_API_KEY,
        s: query,
        type: "movie",
      },
    });

    if (searchResponse.data.Response === "False") {
      return res.status(200).json({
        success: true,
        movies: [],
        message: searchResponse.data.Error || "No movies found",
      });
    }

    const searchResults = searchResponse.data.Search || [];

    const detailedMovies = await Promise.all(
      searchResults.slice(0, 8).map(async (movie) => {
        const detailsResponse = await axios.get(OMDB_BASE_URL, {
          params: {
            apikey: process.env.OMDB_API_KEY,
            i: movie.imdbID,
            plot: "short",
          },
        });

        return normalizeMovie(detailsResponse.data);
      })
    );

    return res.status(200).json({
      success: true,
      movies: detailedMovies,
    });
  } catch (error) {
    console.log("Search movie error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to search movies",
    });
  }
};

export const addShow = async (req, res) => {
  try {
    const {
      movie,
      showDateTime,
      showPrice,
      totalSeats,
      language,
      format,
    } = req.body;

    if (!movie || !movie.imdbID) {
      return res.status(400).json({
        success: false,
        message: "Movie details are required",
      });
    }

    if (!showDateTime || !showPrice || !totalSeats) {
      return res.status(400).json({
        success: false,
        message: "Show date, time, price and total seats are required",
      });
    }

    let savedMovie = await Movie.findOne({ imdbID: movie.imdbID });

    if (!savedMovie) {
      savedMovie = await Movie.create({
        imdbID: movie.imdbID,
        title: movie.title,
        poster_path: movie.poster_path,
        backdrop_path: movie.backdrop_path,
        overview: movie.overview,
        release_date: movie.release_date,
        runtime: movie.runtime,
        genres: movie.genres,
        vote_average: movie.vote_average,
        language: movie.language,
      });
    }

    const show = await Show.create({
      movie: savedMovie._id,
      showDateTime,
      showPrice: Number(showPrice),
      totalSeats: Number(totalSeats),
      language: language || "Hindi",
      format: format || "2D",
      occupiedSeats: {},
    });

    const populatedShow = await Show.findById(show._id).populate("movie");

    return res.status(201).json({
      success: true,
      message: "Show added successfully",
      show: populatedShow,
    });
  } catch (error) {
    console.log("Add show error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to add show",
    });
  }
};

export const getDashboardData = async (req, res) => {
  try {
    const activeShows = await Show.find()
      .populate("movie")
      .sort({ showDateTime: 1 });

    const totalUser = await User.countDocuments();

    return res.status(200).json({
      success: true,
      dashboardData: {
        totalBookings: 0,
        totalRevenue: 0,
        activeShows,
        totalUser,
      },
    });
  } catch (error) {
    console.log("Dashboard error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Couldn't get dashboard data",
    });
  }
};