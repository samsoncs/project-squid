import { pink, cyan } from "tailwindcss/colors";

/** @type {import('tailwindcss').Config} */
export const content = [
  "./app/**/*.{js,ts,jsx,tsx,mdx}",
  "./components/**/*.{js,ts,jsx,tsx,mdx}",
];
export const theme = {
  extend: {
    colors: {
      primary: pink,
      secondary: cyan,
      background: "hsl(var(--background))",
      foreground: "hsl(var(--foreground))",
      btn: {
        background: "hsl(var(--btn-background))",
        "background-hover": "hsl(var(--btn-background-hover))",
      },
    },
  },
};
export const plugins = [];
