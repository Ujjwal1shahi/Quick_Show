import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    imdbID: {
      type: String,
      required: true,
      unique: true,
    },

    title: {
      type: String,
      required: true,
    },

    poster_path: {
      type: String,
      default: "",
    },

    backdrop_path: {
      type: String,
      default: "",
    },

    overview: {
      type: String,
      default: "",
    },

    release_date: {
      type: String,
      default: "",
    },

    runtime: {
      type: String,
      default: "",
    },

    genres: {
      type: [String],
      default: [],
    },

    vote_average: {
      type: Number,
      default: 0,
    },

    language: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;