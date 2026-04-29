import React, { useState } from "react";
import BlurCircle from "./BlurCircle";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const DateSelect = ({ dateTime, id }) => {
  const navigate = useNavigate();

  const [selected, setSelected] = useState(null);

  const onBookHandler = () => {
    if (!selected) {
      return toast("Please select a date!");
    }
    navigate(`/movies/${id}/${selected}`);
    scrollTo(0, 0);
  };

  return (
    <div id="dateSelect" className="pt-30">
      <div className="flex flex-col md:flex-row items-center justify-between gap-10 relative p-8 md:p-10 bg-primary/10 border border-primary/20 rounded-xl">
        <BlurCircle top="-100px" left="-100px" />
        <BlurCircle top="100px" right="0px" />

        <div className="relative z-10 flex flex-col gap-3 flex-1">
          <p className="text-lg font-semibold">Choose Date</p>
          <div className="flex items-center gap-4 text-sm mt-5">
            <ChevronLeftIcon className="w-6 h-6 text-primary cursor-pointer" />
            <span className="grid grid-cols-3 md:flex flex-wrap md:max-w-lg gap-4">
              {Object.keys(dateTime || {}).map((date) => (
                <button
                  onClick={() => setSelected(date)}
                  key={date}
                  className={`flex flex-col items-center justify-center h-14 w-14 rounded-lg transition-all
${
  selected === date
    ? "bg-primary text-white shadow-lg scale-105"
    : "border border-primary/40 hover:bg-primary/20"
}`}
                >
                  <span className="text-xs opacity-80">
                    {new Date(date).getDate()}
                  </span>
                  <span className="text-xs opacity-80">
                    {new Date(date).toLocaleDateString("en-US", {
                      month: "short",
                    })}
                  </span>
                </button>
              ))}
            </span>
            <ChevronRightIcon className="w-6 h-6 text-primary cursor-pointer" />
          </div>
        </div>

        <button
          onClick={onBookHandler}
          className="bg-primary text-white px-10 py-3 rounded-3xl hover:bg-primary/90 transition-all shadow-lg"
        >Book Now</button>
      </div>
    </div>
  );
};

export default DateSelect;
