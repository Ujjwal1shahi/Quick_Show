import React, { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import Title from "../../components/admin/Title";
import BlurCircle from "../../components/BlurCircle";
import { dateFormat } from "../../lib/dateFormat";
import timeFormat from "../../lib/timeFormat";
import { getDashboardData } from "../../lib/api";

const ListShows = () => {
  const currency = import.meta.env.VITE_CURRENCY || "$";
  const [shows, setShows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadShows = async () => {
      try {
        const data = await getDashboardData();
        setShows(data.dashboardData?.activeShows || []);
      } catch (error) {
        console.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadShows();
  }, []);

  return !isLoading ? (
    <div className="relative min-h-screen overflow-hidden px-4 pb-10 text-white md:px-8">
      <Title text1="List" text2="Shows" />
      <BlurCircle top="90px" left="100px" />
      <BlurCircle top="200px" right="100px" />

      <div className="mt-8 max-w-6xl">
        <div className="mb-5">
          <h2 className="text-xl font-semibold text-white">All Shows</h2>
          <p className="mt-1 text-sm text-gray-400">Active shows loaded from backend data created using OMDb movies.</p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-primary/20 bg-primary/5 shadow-lg shadow-black/20 backdrop-blur-md">
          <div className="overflow-x-auto">
            <table className="w-full min-w-200 border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-primary/20 bg-primary/20 text-white">
                  <th className="px-5 py-4 font-medium">Movie</th>
                  <th className="px-5 py-4 font-medium">Show Time</th>
                  <th className="px-5 py-4 font-medium">Runtime</th>
                  <th className="px-5 py-4 font-medium text-right">Price</th>
                </tr>
              </thead>

              <tbody>
                {shows.map((item) => (
                  <tr key={item._id} className="border-b border-primary/10 bg-black/10 transition hover:bg-primary/10 last:border-b-0">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <img src={item.movie.poster_path} alt={item.movie.title} className="h-14 w-10 rounded-lg object-cover" />
                        <div>
                          <p className="font-medium text-white">{item.movie.title}</p>
                          <p className="text-xs text-gray-500">{item.movie.genres?.slice(0, 2).map((g) => g.name).join(" | ")}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-gray-400">{dateFormat(item.showDateTime)}</td>
                    <td className="px-5 py-4 text-gray-400">{timeFormat(item.movie.runtime || 120)}</td>
                    <td className="px-5 py-4 text-right font-semibold text-primary">{currency} {item.showPrice}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {shows.length === 0 && <div className="mt-10 rounded-2xl border border-primary/20 bg-primary/5 p-8 text-center text-gray-400">No shows found.</div>}
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default ListShows;
