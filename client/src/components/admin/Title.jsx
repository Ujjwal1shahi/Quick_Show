import React from "react";

const Title = ({ text1, text2 }) => {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-semibold tracking-wide text-white md:text-3xl">
        {text1}{" "}
        <span className="relative inline-block text-primary">
          {text2}
          <span className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-linear-to-r from-primary via-primary/70 to-transparent shadow-[0_0_12px_rgba(255,0,80,0.8)]" />
        </span>
      </h1>
    </div>
  );
};

export default Title;