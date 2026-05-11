import express from "express";
import {
  createBooking,
  getBookings,
  getDashboardData,
  getMovieDetails,
  getMovies,
  getShowDetails,
  getTrailers,
  markBookingPaid,
} from "../controllers/movieController.js";

const movieRouter = express.Router();

movieRouter.get("/movies", getMovies);
movieRouter.get("/movies/:id", getMovieDetails);
movieRouter.get("/shows/:id", getShowDetails);
movieRouter.get("/trailers", getTrailers);
movieRouter.post("/bookings", createBooking);
movieRouter.get("/bookings", getBookings);
movieRouter.patch("/bookings/:id/pay", markBookingPaid);
movieRouter.get("/admin/dashboard", getDashboardData);
movieRouter.get("/admin/bookings", getBookings);

export default movieRouter;
