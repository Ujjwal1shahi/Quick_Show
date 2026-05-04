import React, { useEffect, useState } from "react";
import { dummyBookingData } from "../../assets/assets";
import Loading from "../../components/Loading";
import Title from "../../components/admin/Title";
import { dateFormat } from "../../lib/dateFormat";
import BlurCircle from "../../components/BlurCircle";

const ListBookings = () => {
  const currency = import.meta.env.VITE_CURRENCY;

  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getAllBookings = async () => {
    setBookings(dummyBookingData);
    setIsLoading(false);
  };

  useEffect(() => {
    getAllBookings();
  }, []);

  return !isLoading ? (
    <div className="relative min-h-screen overflow-hidden px-4 pb-10 text-white md:px-8">
      <Title text1="List" text2="Bookings" />
      <BlurCircle top="90px" left="100px"/>
      <BlurCircle top="200px" right="100px"/>
      <div className="mt-8 max-w-6xl">
        <div className="mb-5">
          <h2 className="text-xl font-semibold text-white">All Bookings</h2>
          <p className="mt-1 text-sm text-gray-400">
            View user bookings, selected seats, show timings, and payment amount.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-primary/20 bg-primary/5 shadow-lg shadow-black/20 backdrop-blur-md">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-primary/20 bg-primary/20 text-white">
                  <th className="px-5 py-4 font-medium">User Name</th>
                  <th className="px-5 py-4 font-medium">Movie Name</th>
                  <th className="px-5 py-4 font-medium">Show Time</th>
                  <th className="px-5 py-4 font-medium">Seats</th>
                  <th className="px-5 py-4 font-medium text-right">Amount</th>
                </tr>
              </thead>

              <tbody>
                {bookings.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b border-primary/10 bg-black/10 transition-all duration-300 hover:bg-primary/10 last:border-b-0"
                  >
                    <td className="px-5 py-4">
                      <div className="flex flex-col">
                        <span className="font-medium text-white">
                          Name
                        </span>
                        <span className="mt-1 text-xs text-gray-500">
                          Customer
                        </span>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <span className="font-medium text-gray-200">
                        {item.show.movie.title}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-gray-400">
                      {dateFormat(item.show.showDateTime)}
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex max-w-xs flex-wrap gap-2">
                        {Object.keys(item.bookedSeats).map((seat) => (
                          <span
                            key={seat}
                            className="rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary"
                          >
                            {item.bookedSeats[seat]}
                          </span>
                        ))}
                      </div>
                    </td>

                    <td className="px-5 py-4 text-right">
                      <span className="font-semibold text-primary">
                        {currency} {item.amount}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {bookings.length === 0 && (
          <div className="mt-10 rounded-2xl border border-primary/20 bg-primary/5 p-8 text-center text-gray-400">
            No bookings found.
          </div>
        )}
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default ListBookings;