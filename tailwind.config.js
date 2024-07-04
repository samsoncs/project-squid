import { pink, cyan, zinc } from 'tailwindcss/colors';


/** @type {import('tailwindcss').Config} */
export const content = [
  "./app/**/*.{js,ts,jsx,tsx,mdx}",
  "./components/**/*.{js,ts,jsx,tsx,mdx}",
];
export const theme = {
  colors: {
    primary: pink,
    secondary: cyan,
    background: zinc
  }
};
export const plugins = [];
