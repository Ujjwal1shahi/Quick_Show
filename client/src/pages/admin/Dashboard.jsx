import {
  ChartLineIcon,
  CircleDollarSignIcon,
  PlayCircleIcon,
  StarIcon,
  UsersIcon,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { dummyDashboardData } from "../../assets/assets";
import Loading from "../../components/Loading";
import Title from "../../components/admin/Title";
import BlurCircle from "../../components/BlurCircle";
import { dateFormat } from "../../lib/dateFormat";

const Dashboard = () => {
  const currency = import.meta.env.VITE_CURRENCY;

  const [dashboardData, setDashboardData] = useState({
    totalBookings: 0,
    totalRevenue: 0,
    activeShows: [],
    totalUser: 0,
  });

  const [loading, setLoading] = useState(true);

  const dashboardCards = [
    {
      title: "Total Bookings",
      value: dashboardData.totalBookings || "0",
      icon: ChartLineIcon,
    },
    {
      title: "Total Revenue",
      value: `${currency}${dashboardData.totalRevenue || 0}`,
      icon: CircleDollarSignIcon,
    },
    {
      title: "Active Shows",
      value: dashboardData.activeShows.length || "0",
      icon: PlayCircleIcon,
    },
    {
      title: "Total Users",
      value: dashboardData.totalUser || "0",
      icon: UsersIcon,
    },
  ];

  const fetchDashboradData = async () => {
    setDashboardData(dummyDashboardData);
    setLoading(false);
  };

  useEffect(() => {
    fetchDashboradData();
  }, []);

  return !loading ? (
    <div className="relative min-h-screen overflow-hidden px-4 pb-10 text-white md:px-8">
      <BlurCircle top="80px" left="180px" />
      <BlurCircle bottom="360px" right="120px" />

      <Title text1="Admin" text2="Dashboard" />

      {/* Dashboard Cards */}
      <div className="relative mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {dashboardCards.map((card, index) => {
          const Icon = card.icon;

          return (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl border border-primary/20 bg-primary/10 p-5 shadow-lg shadow-black/20 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:bg-primary/15 hover:shadow-primary/20"
            >
              <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-primary/20 blur-2xl transition-all duration-300 group-hover:bg-primary/30" />

              <div className="relative flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">
                    {card.title}
                  </p>

                  <h2 className="mt-2 text-2xl font-semibold tracking-wide text-white">
                    {card.value}
                  </h2>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20 text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/25">
                  <Icon className="h-6 w-6" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Active Shows */}
      <div className="relative mt-12">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-white">Active Shows</h2>
            <p className="mt-1 text-sm text-gray-400">
              Currently running shows on your platform
            </p>
          </div>
        </div>

        <BlurCircle bottom="80px" left="100px" />

        <div className="grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {dashboardData.activeShows.map((show) => (
            <div
              key={show._id}
              className="group overflow-hidden rounded-2xl border border-primary/20 bg-primary/10 shadow-lg shadow-black/20 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-primary/50 hover:bg-primary/15 hover:shadow-primary/20"
            >
              <div className="relative h-64 w-full overflow-hidden">
                <img
                  src={show.movie.poster_path}
                  alt={show.movie.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 text-sm text-white backdrop-blur-md">
                  <StarIcon className="h-4 w-4 fill-primary text-primary" />
                  {show.movie.vote_average.toFixed(1)}
                </div>
              </div>

              <div className="p-4">
                <h3 className="truncate text-base font-semibold text-white">
                  {show.movie.title}
                </h3>

                <div className="mt-3 flex items-center justify-between">
                  <p className="text-lg font-semibold text-primary">
                    {currency} {show.showPrice}
                  </p>

                  <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs text-primary">
                    Active
                  </span>
                </div>

                <p className="mt-3 border-t border-gray-700/50 pt-3 text-sm text-gray-400">
                  {dateFormat(show.showDateTime)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Dashboard;