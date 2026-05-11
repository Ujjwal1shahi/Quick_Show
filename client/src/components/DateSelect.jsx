import React, { useRef, useState } from "react";
import BlurCircle from "./BlurCircle";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CalendarDaysIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const DateSelect = ({ dateTime, id }) => {
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const [selected, setSelected] = useState(null);

  const dates = Object.keys(dateTime || {});

  const scrollDates = (direction) => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollBy({
      left: direction === "left" ? -260 : 260,
      behavior: "smooth",
    });
  };

  const onBookHandler = () => {
    if (!selected) {
      return toast("Please select a date!");
    }

    navigate(`/movies/${id}/${selected}`);
    scrollTo(0, 0);
  };

  return (
    <div
      id="dateSelect"
      className="relative overflow-hidden px-6 pt-24 pb-16 md:px-12 lg:px-16 xl:px-24"
    >
      <BlurCircle top="100px" left="110px" />
      <BlurCircle bottom="90px" right="110px" />

      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl border border-white/10 bg-white/4 shadow-[0_0_45px_rgba(255,0,90,0.12)] backdrop-blur-xl">
        <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-primary/20 via-transparent to-pink-500/10" />

        <div className="relative z-10 flex flex-col items-center justify-between gap-10 p-6 md:p-10 lg:flex-row lg:p-12">
          <div className="w-full flex-1 overflow-hidden">
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-primary/30 bg-primary/15">
                <CalendarDaysIcon className="h-5 w-5 text-primary" />
              </div>

              <div>
                <p className="text-sm text-gray-400">
                  Select your preferred show date
                </p>
                <h2 className="text-2xl font-semibold text-white md:text-3xl">
                  Choose Date
                </h2>
              </div>
            </div>

            <p className="mt-3 max-w-xl text-sm text-gray-400 md:text-base">
              Pick a date to continue booking your movie tickets.
            </p>

            <div className="mt-8 flex w-full items-center gap-3 md:gap-5">
              <button
                type="button"
                onClick={() => scrollDates("left")}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-300 transition-all hover:border-primary/40 hover:bg-primary/20 hover:text-white"
              >
                <ChevronLeftIcon className="h-5 w-5" />
              </button>

              <div
                ref={scrollRef}
                className="flex flex-1 gap-3 overflow-x-auto scroll-smooth py-2 md:gap-4 [&::-webkit-scrollbar]:hidden"
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
              >
                {dates.map((date) => {
                  const dateObj = new Date(date);
                  const isSelected = selected === date;

                  return (
                    <button
                      type="button"
                      onClick={() => setSelected(date)}
                      key={date}
                      className={`group relative flex h-20 w-24 shrink-0 flex-col items-center justify-center rounded-2xl border transition-all duration-300 md:w-26 lg:w-28 ${
                        isSelected
                          ? "scale-105 border-primary bg-primary text-white shadow-[0_0_25px_rgba(255,0,90,0.45)]"
                          : "border-white/10 bg-white/5 text-gray-300 hover:border-primary/40 hover:bg-primary/15 hover:text-white"
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
                        <span className="absolute -bottom-1 h-1 w-8 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.9)]" />
                      )}
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() => scrollDates("right")}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-300 transition-all hover:border-primary/40 hover:bg-primary/20 hover:text-white"
              >
                <ChevronRightIcon className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="flex w-full justify-center lg:w-auto lg:justify-end">
            <button
              type="button"
              onClick={onBookHandler}
              className="w-full rounded-full bg-primary px-10 py-4 font-medium text-white shadow-[0_0_25px_rgba(255,0,90,0.35)] transition-all duration-300 hover:bg-primary/90 hover:shadow-[0_0_35px_rgba(255,0,90,0.55)] active:scale-95 sm:w-auto"
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