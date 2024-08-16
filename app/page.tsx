"use client";

import { Duration, intervalToDuration } from "date-fns";
import { motion } from "framer-motion";
import Link from "next/link";
import { SetStateAction, useState } from "react";

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

const AnimatedCircleSmall = () => (
  <svg
    className="h-8 w-8 stroke-zinc-400"
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
      animate={{
        pathLength: [0, 1, 1, 1],
        pathOffset: [0, 0, 1, 1],
        opacity: [1, 1, 1, 0],
      }}
      transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
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

const AnimatedTriangleSmall = () => (
  <svg
    className="h-8 w-8 stroke-secondary-500"
    width="52"
    height="46"
    viewBox="0 0 52 46"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <motion.path
      d="M28.1651 3.75L48.9497 39.75C49.9119 41.4167 48.7091 43.5 46.7846 43.5H5.21538C3.29089 43.5 2.08807 41.4167 3.05033 39.75L23.8349 3.74999C24.7972 2.08333 27.2028 2.08333 28.1651 3.75Z"
      strokeWidth="5"
      animate={{
        pathLength: [0, 1, 1, 1],
        pathOffset: [0, 0, 1, 1],
        opacity: [1, 1, 1, 0],
      }}
      transition={{
        duration: 1.5,
        delay: 1.5,
        repeat: Infinity,
        repeatDelay: 3,
      }}
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

const AnimatedSquareSmall = () => (
  <svg
    className="h-8 w-8 stroke-pink-600"
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
      animate={{
        pathLength: [0, 1, 1, 1],
        pathOffset: [0, 0, 1, 1],
        opacity: [1, 1, 1, 0],
      }}
      transition={{ duration: 1.5, delay: 3, repeat: Infinity, repeatDelay: 3 }}
    />
  </svg>
);

const DateSegment: React.FC<{ interval?: number; description: string }> = ({
  interval,
  description,
}) => (
  <div className="flex w-16 flex-col items-center text-zinc-300">
    <div className="text-3xl font-bold">{!interval ? "0" : interval}</div>
    <div className="text-lg">{description}</div>
  </div>
);

const Index = () => {
  const launchDate = new Date(2024, 8, 14);
  const [timeToLaunch, setTimeToLaunch] = useState(
    intervalToDuration({ start: new Date(), end: launchDate }),
  );
  const refresher = setInterval(() => {
    setTimeToLaunch(intervalToDuration({ start: new Date(), end: launchDate }));
  }, 1000);

  if (timeToLaunch.days && timeToLaunch.days < 1) {
    clearInterval(refresher);
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      {timeToLaunch.days && timeToLaunch.days > 0 && (
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <DateSegment interval={timeToLaunch.days} description="Days" />
            <DateSegment interval={timeToLaunch.hours} description="Hours" />
            <DateSegment interval={timeToLaunch.minutes} description="Min" />
            <DateSegment interval={timeToLaunch.seconds} description="Sec" />
          </div>

          <div className="flex justify-center gap-10">
            <AnimatedCircleSmall />
            <AnimatedTriangleSmall />
            <AnimatedSquareSmall />
          </div>
        </div>
      )}

      {!timeToLaunch.days ||
        (timeToLaunch.days && timeToLaunch.days <= 0 && (
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
        ))}
    </div>
  );
};

export default Index;
