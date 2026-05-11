import axios from "axios";
import Booking from "../models/Booking.js";

const DEFAULT_MOVIE_TITLES = [
  "Avengers Endgame",
  "Spider-Man No Way Home",
  "Black Panther",
  "Iron Man",
  "The Batman",
  "Joker",
  "Guardians of the Galaxy",
  "Doctor Strange",
  "Interstellar",
  "Inception",
  "Avatar",
  "Dune",
];

const PLACEHOLDER_POSTER =
  "https://placehold.co/500x750/111827/ffffff?text=No+Poster";

const getOmdbBaseUrl = () => {
  const raw = process.env.OMDB_API?.trim();

  if (!raw) {
    throw new Error("OMDB_API is missing in server/.env");
  }

  // Supports both formats:
  // OMDB_API=http://www.omdbapi.com/?apikey=YOUR_KEY&
  // OMDB_API=YOUR_KEY
  if (raw.startsWith("http")) {
    return raw.replace("[", "").replace("]", "");
  }

  return `https://www.omdbapi.com/?apikey=${raw.replace("[", "").replace("]", "")}&`;
};

const omdbRequest = async (params) => {
  const baseURL = getOmdbBaseUrl();
  const separator = baseURL.includes("?") ? "" : "?";
  const url = `${baseURL}${separator}`;

  const { data } = await axios.get(url, {
    params,
    timeout: 10000,
  });

  if (data?.Response === "False") {
    throw new Error(data?.Error || "OMDb request failed");
  }

  return data;
};

const parseRuntime = (runtime = "") => {
  const match = String(runtime).match(/\d+/);
  return match ? Number(match[0]) : 120;
};

const parseRating = (rating = "") => {
  const value = Number.parseFloat(rating);
  return Number.isFinite(value) ? value : 7.5;
};

const parseVoteCount = (votes = "") => {
  const value = Number(String(votes).replace(/,/g, ""));
  return Number.isFinite(value) ? value : 0;
};

const getReleaseDate = (released, year) => {
  const parsed = Date.parse(released);
  if (!Number.isNaN(parsed)) return new Date(parsed).toISOString().slice(0, 10);

  const cleanYear = String(year || "2025").slice(0, 4);
  return `${cleanYear}-01-01`;
};

const getAvatar = (name) =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(
    name
  )}&background=111827&color=fff&size=160`;

const normalizeMovie = (movie) => {
  const poster = movie.Poster && movie.Poster !== "N/A" ? movie.Poster : PLACEHOLDER_POSTER;
  const genres = movie.Genre && movie.Genre !== "N/A"
    ? movie.Genre.split(",").map((name, index) => ({ id: index + 1, name: name.trim() }))
    : [{ id: 1, name: "Drama" }];

  const casts = movie.Actors && movie.Actors !== "N/A"
    ? movie.Actors.split(",").map((name) => ({
        name: name.trim(),
        profile_path: getAvatar(name.trim()),
      }))
    : [];

  return {
    _id: movie.imdbID,
    id: movie.imdbID,
    imdbID: movie.imdbID,
    title: movie.Title,
    overview: movie.Plot && movie.Plot !== "N/A" ? movie.Plot : "Movie details are not available right now.",
    poster_path: poster,
    backdrop_path: poster,
    genres,
    casts,
    release_date: getReleaseDate(movie.Released, movie.Year),
    original_language: movie.Language && movie.Language !== "N/A" ? movie.Language.split(",")[0].trim() : "English",
    tagline: movie.Awards && movie.Awards !== "N/A" ? movie.Awards : "Book your seats now.",
    vote_average: parseRating(movie.imdbRating),
    vote_count: parseVoteCount(movie.imdbVotes),
    runtime: parseRuntime(movie.Runtime),
    rated: movie.Rated,
    director: movie.Director,
    writer: movie.Writer,
    country: movie.Country,
    type: movie.Type,
  };
};

const createDateTimeData = () => {
  const showTimes = ["10:30:00", "13:30:00", "16:30:00", "19:30:00", "22:15:00"];
  const dateTime = {};

  for (let i = 0; i < 5; i += 1) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    const dateKey = date.toISOString().slice(0, 10);

    dateTime[dateKey] = showTimes.map((time, index) => ({
      time: `${dateKey}T${time}`,
      showId: `${dateKey}-${index + 1}`,
      price: 199 + index * 50,
    }));
  }

  return dateTime;
};

const getMovieByTitle = async (title) => {
  const data = await omdbRequest({ t: title, plot: "full" });
  return normalizeMovie(data);
};

export const getMovies = async (req, res) => {
  try {
    const search = req.query.search?.trim();

    if (search) {
      const searchData = await omdbRequest({ s: search, type: "movie" });
      const ids = (searchData.Search || []).slice(0, 12).map((movie) => movie.imdbID);
      const movies = await Promise.all(
        ids.map(async (id) => {
          try {
            const data = await omdbRequest({ i: id, plot: "full" });
            return normalizeMovie(data);
          } catch {
            return null;
          }
        })
      );

      return res.json({ success: true, movies: movies.filter(Boolean) });
    }

    const movies = await Promise.all(
      DEFAULT_MOVIE_TITLES.map(async (title) => {
        try {
          return await getMovieByTitle(title);
        } catch {
          return null;
        }
      })
    );

    res.json({ success: true, movies: movies.filter(Boolean) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message, movies: [] });
  }
};

export const getMovieDetails = async (req, res) => {
  try {
    const data = await omdbRequest({ i: req.params.id, plot: "full" });
    res.json({ success: true, movie: normalizeMovie(data) });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

export const getShowDetails = async (req, res) => {
  try {
    const data = await omdbRequest({ i: req.params.id, plot: "full" });
    const dateTime = createDateTimeData();

    const bookings = await Booking.find({ movieId: req.params.id }).lean();
    const occupiedSeats = bookings.reduce((acc, booking) => {
      if (!acc[booking.showId]) acc[booking.showId] = [];
      acc[booking.showId].push(...(booking.bookedSeats || []));
      return acc;
    }, {});

    res.json({
      success: true,
      show: {
        movie: normalizeMovie(data),
        dateTime,
        occupiedSeats,
      },
    });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

export const getTrailers = async (req, res) => {
  // OMDb does not provide trailer URLs, so these are stable YouTube trailer links.
  res.json({
    success: true,
    trailers: [
      { image: "https://img.youtube.com/vi/TcMBFSGVi1c/maxresdefault.jpg", videoUrl: "https://www.youtube.com/watch?v=TcMBFSGVi1c" },
      { image: "https://img.youtube.com/vi/JfVOs4VSpmA/maxresdefault.jpg", videoUrl: "https://www.youtube.com/watch?v=JfVOs4VSpmA" },
      { image: "https://img.youtube.com/vi/xjDjIWPwcPU/maxresdefault.jpg", videoUrl: "https://www.youtube.com/watch?v=xjDjIWPwcPU" },
      { image: "https://img.youtube.com/vi/mqqft2x_Aa4/maxresdefault.jpg", videoUrl: "https://www.youtube.com/watch?v=mqqft2x_Aa4" },
      { image: "https://img.youtube.com/vi/8ugaeA-nMTc/maxresdefault.jpg", videoUrl: "https://www.youtube.com/watch?v=8ugaeA-nMTc" },
      { image: "https://img.youtube.com/vi/5PSNL1qE6VY/maxresdefault.jpg", videoUrl: "https://www.youtube.com/watch?v=5PSNL1qE6VY" },
    ],
  });
};

export const getDashboardData = async (req, res) => {
  try {
    const movies = await Promise.all(DEFAULT_MOVIE_TITLES.slice(0, 6).map(getMovieByTitle));
    const bookings = await Booking.find().lean();

    const activeShows = movies.map((movie, index) => {
      const showDateTime = new Date(Date.now() + index * 86400000).toISOString();
      const movieBookings = bookings.filter((booking) => booking.movieId === movie._id);
      const occupiedSeats = movieBookings.reduce((acc, booking) => {
        acc[booking.showId] = [...(acc[booking.showId] || []), ...(booking.bookedSeats || [])];
        return acc;
      }, {});

      return {
        _id: `${movie._id}-${index}`,
        movie,
        showDateTime,
        showPrice: 199 + index * 40,
        occupiedSeats,
      };
    });

    res.json({
      success: true,
      dashboardData: {
        totalBookings: bookings.length,
        totalRevenue: bookings.reduce((total, booking) => total + Number(booking.amount || 0), 0),
        activeShows,
        totalUser: new Set(bookings.map((booking) => booking.user?.email || booking.user?.name || "Customer")).size,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createBooking = async (req, res) => {
  try {
    const { movieId, showId, showDateTime, showPrice, bookedSeats, user } = req.body;

    if (!movieId || !showId || !showDateTime || !Array.isArray(bookedSeats) || bookedSeats.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Movie, show time, and selected seats are required",
      });
    }

    const movieData = await omdbRequest({ i: movieId, plot: "full" });
    const movie = normalizeMovie(movieData);
    const price = Number(showPrice) || 199;

    const alreadyBooked = await Booking.find({ movieId, showId }).lean();
    const occupiedSeats = alreadyBooked.flatMap((booking) => booking.bookedSeats || []);
    const duplicateSeats = bookedSeats.filter((seat) => occupiedSeats.includes(seat));

    if (duplicateSeats.length > 0) {
      return res.status(409).json({
        success: false,
        message: `Seat already booked: ${duplicateSeats.join(", ")}`,
      });
    }

    const booking = await Booking.create({
      movieId,
      movie,
      showId,
      showDateTime: new Date(showDateTime),
      showPrice: price,
      bookedSeats,
      amount: bookedSeats.length * price,
      isPaid: false,
      user: {
        name: user?.name || "Customer",
        email: user?.email || "",
      },
    });

    res.status(201).json({ success: true, booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const markBookingPaid = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { isPaid: true },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    res.json({ success: true, booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getBookings = async (req, res) => {
  try {
    const rawBookings = await Booking.find().sort({ createdAt: -1 }).lean();

    const bookings = rawBookings.map((booking) => ({
      _id: booking._id,
      show: {
        movie: booking.movie,
        showDateTime: booking.showDateTime,
        showId: booking.showId,
        showPrice: booking.showPrice,
      },
      bookedSeats: booking.bookedSeats || [],
      amount: booking.amount,
      isPaid: booking.isPaid,
      user: booking.user || { name: "Customer" },
      createdAt: booking.createdAt,
    }));

    res.json({ success: true, bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message, bookings: [] });
  }
};
