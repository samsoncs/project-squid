"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const AnimatedCircle = () => (
  <svg
    className="h-16 w-16 stroke-zinc-400"
    width="52"
    height="52"
    viewBox="0 0 52 52"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <motion.circle
      cx="26"
      cy="26"
      r="23.5"
      strokeWidth="5"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1.01 }}
      transition={{
        duration: 0.8,
      }}
    />
  </svg>
);

const AnimatedTriangle = () => (
  <svg
    className="h-16 w-16 stroke-secondary-500"
    width="52"
    height="46"
    viewBox="0 0 52 46"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <motion.path
      d="M28.1651 3.75L48.9497 39.75C49.9119 41.4167 48.7091 43.5 46.7846 43.5H5.21538C3.29089 43.5 2.08807 41.4167 3.05033 39.75L23.8349 3.74999C24.7972 2.08333 27.2028 2.08333 28.1651 3.75Z"
      strokeWidth="5"
      initial={{ pathLength: 0, pathOffset: 0 }}
      animate={{ pathLength: 1.01 }}
      exit={{ pathOffset: 1 }}
      transition={{ duration: 0.8, delay: 0.25, opacity: { duration: 0.01 } }}
    />
  </svg>
);

const AnimatedSquare = () => (
  <svg
    className="h-16 w-16 stroke-pink-600"
    width="50"
    height="50"
    viewBox="0 0 50 50"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <motion.rect
      x="2.5"
      y="2.5"
      width="45"
      height="45"
      rx="2.5"
      strokeWidth="5"
      initial={{ pathLength: 0, pathOffset: 0 }}
      animate={{ pathLength: 1.01 }}
      exit={{ pathOffset: 1 }}
      transition={{ duration: 0.8, delay: 0.5, opacity: { duration: 0.01 } }}
    />
  </svg>
);

const Index = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <>
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="mb-2 text-2xl font-bold text-zinc-400"
        >
          Do you dare to play?
        </motion.h1>
        <div className="mb-6 flex justify-between gap-2 pb-2">
          <AnimatedCircle />
          <AnimatedTriangle />
          <AnimatedSquare />
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <Link
            className="rounded-md bg-primary-600 p-4 text-lg"
            href="/dashboard"
          >
            Enter
          </Link>
        </motion.div>
      </>
    </div>
  );
};

export default Index;
