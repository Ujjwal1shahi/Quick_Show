import React, { useEffect, useState } from "react";
import Loading from "../components/Loading";
import BlurCircle from "../components/BlurCircle";
import timeFormat from "../lib/timeFormat";
import { dateFormat } from "../lib/dateFormat";
import { getBookings, markBookingPaid } from "../lib/api";
import {
  Armchair,
  Calendar,
  CalendarDays,
  Clapperboard,
  Clock,
  CreditCard,
  Languages,
  Star,
  Ticket,
} from "lucide-react";

const MyBookings = () => {
  const currency = import.meta.env.VITE_CURRENCY || "$";
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadBookings = async () => {
      try {
        const data = await getBookings();
        setBookings(data.bookings || []);
      } catch (error) {
        console.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadBookings();
  }, []);

  const handlePayNow = async (bookingId) => {
    try {
      await markBookingPaid(bookingId);
      setBookings((prev) =>
        prev.map((booking) =>
          booking._id === bookingId ? { ...booking, isPaid: true } : booking
        )
      );
    } catch (error) {
      console.error(error.message);
    }
  };

  return !isLoading ? (
    <div className="relative min-h-[80vh] overflow-hidden px-6 pt-30 md:px-16 md:pt-40 lg:px-40">
      <BlurCircle top="100px" left="100px" />
      <BlurCircle bottom="100px" right="60px" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <h1 className="mb-6 text-2xl font-semibold text-white">My Bookings</h1>

        {bookings.length === 0 ? (
          <p className="text-gray-400">No bookings found.</p>
        ) : (
          <div className="space-y-6">
            {bookings.map((item) => {
              const movie = item.show.movie;
              const genres = movie.genres?.map((genre) => genre.name).join(" | ");

              return (
                <div key={item._id} className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-2xl backdrop-blur-xl">
                  <div className="absolute left-0 top-0 h-full w-1 bg-primary opacity-80" />

                  <div className="flex flex-col md:flex-row">
                    <div className="relative w-full shrink-0 md:w-52">
                      <img src={movie.poster_path} alt={movie.title} className="h-48 w-full object-cover object-top md:h-full" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent md:bg-gradient-to-r md:from-transparent md:to-black/40" />
                    </div>

                    <div className="flex min-h-[250px] flex-1 flex-col justify-between p-4 md:p-5">
                      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                        <div className="max-w-xl">
                          <h2 className="text-lg font-semibold leading-tight text-white transition-colors group-hover:text-primary md:text-xl">{movie.title}</h2>

                          <div className="mt-2 flex items-start gap-2 text-xs text-gray-400">
                            <Clapperboard size={14} className="mt-0.5 shrink-0 text-primary" />
                            <span className="line-clamp-1">{genres}</span>
                          </div>

                          <div className="mt-3 flex flex-wrap gap-2 text-xs text-gray-300">
                            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5">
                              <Clock size={14} className="text-primary" />
                              <span>{timeFormat(movie.runtime || 120)}</span>
                            </div>

                            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5">
                              <CalendarDays size={14} className="text-primary" />
                              <span>{dateFormat(item.show.showDateTime)}</span>
                            </div>
                          </div>
                        </div>

                        <div className="shrink-0 lg:text-right">
                          <p className="mb-1 text-xs text-gray-400">Total Amount</p>
                          <p className="text-xl font-bold text-white md:text-2xl">{currency}{item.amount}</p>

                          {!item.isPaid ? (
                            <button
                              onClick={() => handlePayNow(item._id)}
                              className="mt-2 inline-flex cursor-pointer items-center gap-2 rounded-full bg-primary px-4 py-1.5 text-xs font-medium shadow-[0_0_15px_rgba(255,0,80,0.35)] transition-all duration-300 hover:opacity-85"
                            >
                              <CreditCard size={14} /> Pay Now
                            </button>
                          ) : (
                            <span className="mt-2 inline-flex rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-xs text-green-400">Paid</span>
                          )}
                        </div>
                      </div>

                      <div className="my-4 grid grid-cols-1 gap-2 sm:grid-cols-3">
                        <div className="rounded-xl border border-white/10 bg-black/20 px-3 py-2">
                          <div className="mb-1 flex items-center gap-2 text-xs text-primary"><Star size={13} /><span>Rating</span></div>
                          <p className="text-sm font-semibold text-white">{Number(movie.vote_average || 0).toFixed(1)} / 10</p>
                        </div>
                        <div className="rounded-xl border border-white/10 bg-black/20 px-3 py-2">
                          <div className="mb-1 flex items-center gap-2 text-xs text-primary"><Languages size={13} /><span>Language</span></div>
                          <p className="text-sm font-semibold uppercase text-white">{movie.original_language || "EN"}</p>
                        </div>
                        <div className="rounded-xl border border-white/10 bg-black/20 px-3 py-2">
                          <div className="mb-1 flex items-center gap-2 text-xs text-primary"><Calendar size={13} /><span>Release</span></div>
                          <p className="text-sm font-semibold text-white">{movie.release_date ? new Date(movie.release_date).getFullYear() : "N/A"}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-2 border-t border-white/10 pt-4 text-xs sm:grid-cols-2">
                        <div className="flex items-center justify-between rounded-xl border border-white/10 bg-black/20 px-3 py-2.5">
                          <div className="flex items-center gap-2 text-gray-300"><Ticket size={14} className="text-primary" /><span>Total Tickets</span></div>
                          <span className="font-semibold text-white">{item.bookedSeats.length}</span>
                        </div>
                        <div className="flex items-center justify-between rounded-xl border border-white/10 bg-black/20 px-3 py-2.5">
                          <div className="flex items-center gap-2 text-gray-300"><Armchair size={14} className="text-primary" /><span>Seats</span></div>
                          <span className="text-right font-semibold text-white">{item.bookedSeats.join(", ")}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default MyBookings;
