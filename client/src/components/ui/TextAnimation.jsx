import React from "react";
import { motion } from "framer-motion";

const TextAnimation = ({
  text = "",
  as = "h1",
  variants,
  className = "",
  classname = "",
  letterAnime = false,
}) => {
  const MotionTag = motion[as] || motion.h1;

  const finalClassName = className || classname;

  if (letterAnime) {
    return (
      <MotionTag
        className={finalClassName}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
      >
        {text.split("").map((char, index) => (
          <motion.span
            key={index}
            variants={variants}
            transition={{ duration: 0.35, delay: index * 0.025 }}
            className="inline-block"
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </MotionTag>
    );
  }

  return (
    <MotionTag
      className={finalClassName}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
    >
      {text.split(" ").map((word, index) => (
        <motion.span
          key={index}
          variants={variants}
          transition={{ duration: 0.45, delay: index * 0.08 }}
          className="inline-block mr-3"
        >
          {word}
        </motion.span>
      ))}
    </MotionTag>
  );
};

export default TextAnimation;