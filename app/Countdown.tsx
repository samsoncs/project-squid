import { Duration } from "date-fns";
import { motion } from "framer-motion";

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

interface Props {
  timeToLaunch: Duration;
}

const Countdown: React.FC<Props> = ({ timeToLaunch }) => (
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
);

export default Countdown;
