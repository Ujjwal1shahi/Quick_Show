import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    movieId: { type: String, required: true },
    movie: { type: Object, required: true },
    showId: { type: String, required: true },
    showDateTime: { type: Date, required: true },
    showPrice: { type: Number, required: true },
    bookedSeats: { type: [String], required: true },
    amount: { type: Number, required: true },
    isPaid: { type: Boolean, default: false },
    user: {
      name: { type: String, default: "Customer" },
      email: { type: String, default: "" },
    },
  },
  { timestamps: true }
);

const Booking = mongoose.models.Booking || mongoose.model("Booking", bookingSchema);

export default Booking;
