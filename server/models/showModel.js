import mongoose from "mongoose";

const showSchema = new mongoose.Schema(
  {
    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
      required: true,
    },

    showDateTime: {
      type: Date,
      required: true,
    },

    showPrice: {
      type: Number,
      required: true,
    },

    totalSeats: {
      type: Number,
      required: true,
    },

    language: {
      type: String,
      default: "Hindi",
    },

    format: {
      type: String,
      default: "2D",
    },

    occupiedSeats: {
      type: Object,
      default: {},
    },
  },
  { timestamps: true }
);

const Show = mongoose.model("Show", showSchema);

export default Show;