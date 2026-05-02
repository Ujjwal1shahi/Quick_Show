import React, { useState } from "react";
import BlurCircle from "./BlurCircle";
import { ChevronLeftIcon, ChevronRightIcon, CalendarDaysIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const DateSelect = ({ dateTime, id }) => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);

  const dates = Object.keys(dateTime || {});

  const onBookHandler = () => {
    if (!selected) {
      return toast("Please select a date!");
    }

    navigate(`/movies/${id}/${selected}`);
    scrollTo(0, 0);
  };

  return (
    <div id="dateSelect" className="relative px-6 md:px-16 lg:px-24 xl:px-44 pt-24 pb-16 overflow-hidden">
      <BlurCircle top="100px" left="110px" />
      <BlurCircle bottom="90px" right="110px" />

      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-[0_0_45px_rgba(255,0,90,0.12)]">
        {/* Gradient glow layer */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-pink-500/10 pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10 p-6 md:p-10 lg:p-12">
          {/* Left content */}
          <div className="w-full flex-1">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center justify-center w-11 h-11 rounded-full bg-primary/15 border border-primary/30">
                <CalendarDaysIcon className="w-5 h-5 text-primary" />
              </div>

              <div>
                <p className="text-sm text-gray-400">Select your preferred show date</p>
                <h2 className="text-2xl md:text-3xl font-semibold text-white">
                  Choose Date
                </h2>
              </div>
            </div>

            <p className="text-gray-400 text-sm md:text-base max-w-xl mt-3">
              Pick a date to continue booking your movie tickets.
            </p>

            {/* Date selector */}
            <div className="flex items-center gap-3 md:gap-5 mt-8">
              <button
                type="button"
                className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-white/5 text-gray-300 hover:text-white hover:bg-primary/20 hover:border-primary/40 transition-all"
              >
                <ChevronLeftIcon className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-3 sm:grid-cols-4 md:flex md:flex-wrap gap-3 md:gap-4">
                {dates.map((date) => {
                  const dateObj = new Date(date);
                  const isSelected = selected === date;

                  return (
                    <button
                      type="button"
                      onClick={() => setSelected(date)}
                      key={date}
                      className={`group relative flex flex-col items-center justify-center h-20 w-20 rounded-2xl border transition-all duration-300
                        ${
                          isSelected
                            ? "bg-primary text-white border-primary shadow-[0_0_25px_rgba(255,0,90,0.45)] scale-105"
                            : "bg-white/5 text-gray-300 border-white/10 hover:bg-primary/15 hover:border-primary/40 hover:text-white"
                        }`}
                    >
                      <span className="text-xs uppercase tracking-wide opacity-80">
                        {dateObj.toLocaleDateString("en-US", {
                          weekday: "short",
                        })}
                      </span>

                      <span className="text-2xl font-bold leading-tight">
                        {dateObj.getDate()}
                      </span>

                      <span className="text-xs uppercase opacity-80">
                        {dateObj.toLocaleDateString("en-US", {
                          month: "short",
                        })}
                      </span>

                      {isSelected && (
                        <span className="absolute -bottom-1 w-8 h-1 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.9)]" />
                      )}
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-white/5 text-gray-300 hover:text-white hover:bg-primary/20 hover:border-primary/40 transition-all"
              >
                <ChevronRightIcon className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Book button */}
          <div className="w-full lg:w-auto flex justify-center lg:justify-end">
            <button
              type="button"
              onClick={onBookHandler}
              className="w-full sm:w-auto px-10 py-4 rounded-full bg-primary text-white font-medium shadow-[0_0_25px_rgba(255,0,90,0.35)] hover:bg-primary/90 hover:shadow-[0_0_35px_rgba(255,0,90,0.55)] active:scale-95 transition-all duration-300"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateSelect;