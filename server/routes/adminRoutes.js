import express from "express";
import {
  searchMovies,
  addShow,
  getDashboardData,
} from "../controllers/adminController.js";

const adminRouter = express.Router();

adminRouter.get("/search-movies", searchMovies);
adminRouter.post("/add-show", addShow);
adminRouter.get("/dashboard", getDashboardData);

export default adminRouter;