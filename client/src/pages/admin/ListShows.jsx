import React, { useEffect, useState } from "react";
import { dummyShowsData } from "../../assets/assets";
import Loading from "../../components/Loading";
import Title from "../../components/admin/Title";
import { dateFormat } from "../../lib/dateFormat";
import BlurCircle from "../../components/BlurCircle";

const ListShows = () => {
  const currency = import.meta.env.VITE_CURRENCY;

  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllShows = async () => {
    try {
      setShows([
        {
          movie: dummyShowsData[0],
          showDateTime: "2025-06-30T02:30:00.000Z",
          showPrice: 59,
          occupiedSeats: {
            A1: "user_1",
            B1: "user_2",
            C1: "user_3",
          },
        },
      ]);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllShows();
  }, []);

  return !loading ? (
    <div className="relative min-h-screen overflow-hidden px-4 pb-10 text-white md:px-8">
      <Title text1="List" text2="Shows" />
      <BlurCircle top="90px" left="100px"/>
      <div className="mt-8 max-w-6xl">
        <div className="mb-5">
          <h2 className="text-xl font-semibold text-white">All Shows</h2>
          <p className="mt-1 text-sm text-gray-400">
            Manage movie shows, timings, bookings, and total earnings.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-primary/20 bg-primary/5 shadow-lg shadow-black/20 backdrop-blur-md">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-primary/20 bg-primary/20 text-white">
                  <th className="px-5 py-4 font-medium">Movie Name</th>
                  <th className="px-5 py-4 font-medium">Show Time</th>
                  <th className="px-5 py-4 font-medium text-center">
                    Total Bookings
                  </th>
                  <th className="px-5 py-4 font-medium text-right">
                    Earnings
                  </th>
                </tr>
              </thead>

              <tbody>
                {shows.map((show, index) => {
                  const totalBookings = Object.keys(show.occupiedSeats).length;
                  const earnings = totalBookings * show.showPrice;

                  return (
                    <tr
                      key={index}
                      className="border-b border-primary/10 bg-black/10 transition-all duration-300 hover:bg-primary/10 last:border-b-0"
                    >
                      <td className="px-5 py-4">
                        <div className="flex flex-col">
                          <span className="font-medium text-white">
                            {show.movie.title}
                          </span>
                          <span className="mt-1 text-xs text-gray-500">
                            Movie Show
                          </span>
                        </div>
                      </td>

                      <td className="px-5 py-4 text-gray-400">
                        {dateFormat(show.showDateTime)}
                      </td>

                      <td className="px-5 py-4 text-center">
                        <span className="inline-flex rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                          {totalBookings} Bookings
                        </span>
                      </td>

                      <td className="px-5 py-4 text-right">
                        <span className="font-semibold text-primary">
                          {currency} {earnings}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {shows.length === 0 && (
          <div className="mt-10 rounded-2xl border border-primary/20 bg-primary/5 p-8 text-center text-gray-400">
            No shows found.
          </div>
        )}
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default ListShows;