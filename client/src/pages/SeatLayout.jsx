import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { assets, dummyDateTimeData, dummyShowsData } from "../assets/assets";
import Loading from "../components/Loading";
import {
  ArrowRightIcon,
  ClockIcon,
  ArmchairIcon,
  CheckCircleIcon,
} from "lucide-react";
import isoTimeFormat from "../lib/isoTimeFormat";
import BlurCircle from "../components/BlurCircle";
import toast from "react-hot-toast";

const SeatLayout = () => {
  const groupRows = [
    ["A", "B"],
    ["C", "D"],
    ["E", "F"],
    ["G", "H"],
    ["I", "J"],
  ];

  const { id, date } = useParams();

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [show, setShow] = useState(null);

  const navigate = useNavigate();

  const getShow = async () => {
    const show = dummyShowsData.find((show) => show._id === id);

    if (show) {
      setShow({
        movie: show,
        dateTime: dummyDateTimeData,
      });
    }
  };

  const handleSeatClick = (seatId) => {
    if (!selectedTime) {
      return toast("Please select time first");
    }

    if (!selectedSeats.includes(seatId) && selectedSeats.length >= 5) {
      return toast("You can only select 5 seats");
    }

    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((seat) => seat !== seatId)
        : [...prev, seatId]
    );
  };

  const handleCheckout = () => {
    if (!selectedTime) {
      return toast("Please select show time");
    }

    if (selectedSeats.length === 0) {
      return toast("Please select at least one seat");
    }

    navigate("/my-bookings");
    scrollTo(0, 0);
  };

  const renderSeats = (row, count = 9) => (
    <div key={row} className="flex gap-2 mt-2">
      <div className="flex flex-wrap items-center justify-center gap-2">
        {Array.from({ length: count }, (_, i) => {
          const seatId = `${row}${i + 1}`;
          const isSelected = selectedSeats.includes(seatId);

          return (
            <button
              key={seatId}
              onClick={() => handleSeatClick(seatId)}
              className={`group relative h-9 w-9 rounded-lg border text-[11px] font-medium transition-all duration-300 active:scale-95
                ${
                  isSelected
                    ? "border-primary bg-primary/40 text-white shadow-[0_0_18px_rgba(255,0,90,0.45)]"
                    : "border-white/10 bg-white/[0.04] text-gray-300 hover:border-primary/50 hover:bg-primary/15 hover:text-white"
                }`}
            >
              {seatId}

              {isSelected && (
                <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.9)]" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );

  useEffect(() => {
    getShow();
  }, [id]);

  return show ? (
    <div className="relative min-h-screen overflow-hidden bg-[#09070d] px-6 md:px-16 lg:px-24 xl:px-44 pt-32 md:pt-44 pb-20">
      

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-10 lg:flex-row">
        {/* Available Timings */}
<aside className="w-full lg:w-96 h-fit rounded-3xl border border-primary/20 bg-primary/10 p-4 backdrop-blur-xl shadow-[0_0_35px_rgba(255,0,90,0.10)] lg:sticky lg:top-32">
  <div className="mb-4">
    <p className="text-sm font-medium uppercase tracking-wider text-primary">
      Showtime
    </p>
    <h2 className="mt-1 text-lg font-semibold text-white/80">
      Available Timings
    </h2>
  </div>

  <div className="space-y-2">
    {show.dateTime[date]?.map((item, index) => (
      <button
        key={index}
        onClick={() => setSelectedTime(item)}
        className={`flex w-full items-center gap-3 rounded-2xl border px-4 py-2 text-left transition-all duration-300 active:scale-95
          ${
            selectedTime?.time === item.time
              ? "border-primary bg-primary/40 text-white shadow-[0_0_22px_rgba(255,0,90,0.40)]"
              : "border-white/10 bg-white/[0.04] text-gray-300 hover:border-primary/40 hover:bg-primary/15 hover:text-white"
          }`}
      >
        <span
          className={`flex h-8 w-8 items-center justify-center rounded-full ${
            selectedTime?.time === item.time
              ? "bg-white/20"
              : "bg-primary/15"
          }`}
        >
          <ClockIcon className="h-4 w-4" />
        </span>

        <span className="text-sm font-medium">
          {isoTimeFormat(item.time)}
        </span>
      </button>
    ))}
  </div>
</aside>

        {/* Seats Layout */}
        <main className="relative flex flex-1 flex-col items-center rounded-3xl border border-primary/20 bg-primary-dull/10 px-3 py-6 md:px-5 lg:px-5 backdrop-blur-xl shadow-[0_0_40px_rgba(255,0,90,0.08)]">
          <BlurCircle top="-100px" left="-100px" />
          <BlurCircle bottom="0" right="0" />

          <div className="relative z-10 flex w-full flex-col items-center">
            <div className="mb-8 text-center">
              <h1 className="mt-1 text-xl md:text-3xl font-semibold text-white/80">
                Select Your Seat
              </h1>

              <p className="mt-3 text-sm text-gray-400">
                Choose your preferred seats before checkout.
              </p>
            </div>

            {/* Screen */}
            <div className="relative mb-3 w-full max-w-3xl">
              <div className="absolute left-1/2 top-4 h-10 w-3/4 -translate-x-1/2 rounded-full bg-primary/25 blur-2xl" />

              <img
                src={assets.screenImage}
                alt="screen"
                className="relative mx-auto w-full max-w-xl opacity-90"
              />
            </div>

            <p className="mb-8 text-xs font-medium uppercase tracking-[0.35em] text-gray-400">
              Screen Side
            </p>

            {/* Seat indicators */}
            <div className="mb-8 flex flex-wrap items-center justify-center gap-5 text-xs text-gray-400">
              <div className="flex items-center gap-2">
                <span className="h-4 w-4 rounded border border-primary/20 bg-white/[0.04]" />
                Available
              </div>

              <div className="flex items-center gap-2">
                <span className="h-4 w-4 rounded border border-primary bg-primary shadow-[0_0_12px_rgba(255,0,90,0.45)]" />
                Selected
              </div>
            </div>

            {/* Seats */}
            <div className="w-full overflow-x-auto no-scrollbar pb-4">
              <div className="mx-auto flex w-max min-w-max flex-col items-center rounded-3xl border border-white/10 bg-black/20 p-5 md:p-8">
                <div className="mb-8 grid grid-cols-2 gap-8 md:grid-cols-1 md:gap-2">
                  {groupRows[0].map((row) => renderSeats(row))}
                </div>

                <div className="grid grid-cols-2 gap-6 md:gap-10">
                  {groupRows.slice(1).map((group, idx) => (
                    <div key={idx}>
                      {group.map((row) => renderSeats(row))}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Selected seat info */}
            <div className="mt-6 grid w-full max-w-3xl grid-cols-1 gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                <div className="flex items-center gap-2 text-primary">
                  <CheckCircleIcon className="h-4 w-4" />
                  <p className="text-sm font-medium">Selected Seats</p>
                </div>

                <p className="mt-3 text-sm text-gray-300">
                  {selectedSeats.length > 0
                    ? selectedSeats.join(", ")
                    : "No seats selected"}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <div className="flex items-center gap-2 text-primary">
                  <ClockIcon className="h-4 w-4" />
                  <p className="text-sm font-medium">Selected Time</p>
                </div>

                <p className="mt-3 text-sm text-gray-300">
                  {selectedTime ? isoTimeFormat(selectedTime.time) : "No time selected"}
                </p>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="mt-12 flex items-center gap-2 rounded-full bg-primary px-10 py-4 text-sm font-medium text-white shadow-[0_0_25px_rgba(255,0,90,0.35)] transition-all duration-300 hover:bg-primary/90 hover:shadow-[0_0_35px_rgba(255,0,90,0.55)] active:scale-95"
            >
              Proceed to Checkout
              <ArrowRightIcon strokeWidth={4} className="h-4 w-4" />
            </button>
          </div>
        </main>
      </div>
    </div>
  ) : (
    <div className="flex min-h-screen items-center justify-center bg-[#09070d]">
      <Loading />
    </div>
  );
};

export default SeatLayout;