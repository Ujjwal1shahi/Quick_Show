import React, { useState } from "react";
import {
  MapPinIcon,
  StarIcon,
  ClockIcon,
  SearchIcon,
  NavigationIcon,
} from "lucide-react";
import BlurCircle from "../components/BlurCircle";
import { Navigate, useNavigate } from "react-router-dom";


const theatersData = [
  {
    id: 1,
    name: "PVR Cinemas",
    location: "Patna, Bihar",
    rating: 4.7,
    distance: "2.5 km",
    image:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=900&q=80",
    shows: ["10:30 AM", "01:45 PM", "05:00 PM", "08:30 PM"],
    facilities: ["Dolby Atmos", "Recliner", "Food Court"],
  },
  {
    id: 2,
    name: "INOX Multiplex",
    location: "Boring Road, Patna",
    rating: 4.5,
    distance: "4.1 km",
    image:
      "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=900&q=80",
    shows: ["11:00 AM", "02:30 PM", "06:15 PM", "09:45 PM"],
    facilities: ["IMAX", "Parking", "Snacks"],
  },
  {
    id: 3,
    name: "Cinepolis",
    location: "Bailey Road, Patna",
    rating: 4.6,
    distance: "5.8 km",
    image:
      "https://images.unsplash.com/photo-1542204165-65bf26472b9b?auto=format&fit=crop&w=900&q=80",
    shows: ["09:45 AM", "12:50 PM", "04:20 PM", "07:55 PM"],
    facilities: ["4K Screen", "Luxury Seats", "Online Food"],
  },
  {
    id: 4,
    name: "MovieMax Theater",
    location: "Kankarbagh, Patna",
    rating: 4.3,
    distance: "6.2 km",
    image:
      "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=900&q=80",
    shows: ["10:15 AM", "01:20 PM", "05:40 PM", "10:00 PM"],
    facilities: ["AC Hall", "Parking", "Family Seats"],
  },
  {
    id: 5,
    name: "Esplande",
    location: "Kankarbagh, Patna",
    rating: 4.5,
    distance: "6.2 km",
    image:
      "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=900&q=80",
    shows: ["10:15 AM", "01:20 PM", "05:40 PM", "10:00 PM"],
    facilities: ["AC Hall", "Parking", "Family Seats"],
  },
  {
    id: 6,
    name: "Theater",
    location: "Kankarbagh, Patna",
    rating: 4.2,
    distance: "6.2 km",
    image:
      "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=900&q=80",
    shows: ["10:15 AM", "01:20 PM", "05:40 PM", "10:00 PM"],
    facilities: ["AC Hall", "Parking", "Family Seats"],
  },
];

const Theater = () => {
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const filteredTheaters = theatersData.filter(
    (theater) =>
      theater.name.toLowerCase().includes(search.toLowerCase()) ||
      theater.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative min-h-screen overflow-hidden px-6 pt-28 pb-20 md:px-16 lg:px-36">
      <BlurCircle top="100px" left="0px" />
      <BlurCircle bottom="80px" right="0px" />

      <div className="relative z-10">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-2 text-sm font-medium uppercase tracking-[0.3em] text-primary">
              Nearby Theaters
            </p>
            <h1 className="text-3xl font-bold text-white md:text-5xl">
              Choose Your Theater
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-gray-400 md:text-base">
              Find the best cinema near you and check available show timings.
            </p>
          </div>

          <div className="flex w-full items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-md md:w-80">
            <SearchIcon className="h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search theater or location"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-gray-500"
            />
          </div>
        </div>

        {filteredTheaters.length > 0 ? (
          <div className="grid gap-7 sm:grid-cols-2 xl:grid-cols-3">
            {filteredTheaters.map((theater) => (
              <div
                key={theater.id}
                className="group overflow-hidden rounded-3xl border border-white/10 bg-white/4 shadow-lg shadow-black/30 backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-primary/50 hover:bg-white/[0.07]"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={theater.image}
                    alt={theater.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-linear-to-t from-black via-black/30 to-transparent" />

                  <div className="absolute left-4 top-4 flex items-center gap-1 rounded-full bg-black/60 px-3 py-1 text-sm text-white backdrop-blur-md">
                    <StarIcon className="h-4 w-4 fill-primary text-primary" />
                    {theater.rating}
                  </div>

                  <div className="absolute bottom-4 left-4 right-4">
                    <h2 className="text-xl font-semibold text-white">
                      {theater.name}
                    </h2>

                    <div className="mt-1 flex items-center gap-2 text-sm text-gray-300">
                      <MapPinIcon className="h-4 w-4 text-primary" />
                      <span>{theater.location}</span>
                    </div>
                  </div>
                </div>

                <div className="p-5">
                  <div className="mb-4 flex items-center justify-between rounded-2xl border border-white/10 bg-black/30 px-4 py-3">
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <NavigationIcon className="h-4 w-4 text-primary" />
                      <span>{theater.distance} away</span>
                    </div>

                    <button className="text-sm font-medium text-primary hover:underline">
                      Direction
                    </button>
                  </div>

                  <div className="mb-4">
                    <p className="mb-3 flex items-center gap-2 text-sm font-medium text-gray-300">
                      <ClockIcon className="h-4 w-4 text-primary" />
                      Available Shows
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {theater.shows.map((time) => (
                        <button
                          key={time}
                          className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs text-primary transition hover:bg-primary hover:text-white"
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mb-5 flex flex-wrap gap-2">
                    {theater.facilities.map((facility) => (
                      <span
                        key={facility}
                        className="rounded-full bg-white/5 px-3 py-1 text-xs text-gray-400"
                      >
                        {facility}
                      </span>
                    ))}
                  </div>

                  <button onClick={() => navigate("/releases")} className="w-full rounded-full bg-primary py-3 text-sm font-semibold text-white transition hover:bg-primary/80">
                    View Shows
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex min-h-75 items-center justify-center rounded-3xl border border-white/10 bg-white/4">
            <p className="text-gray-400">No theater found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Theater;