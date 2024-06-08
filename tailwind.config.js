/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        fade: "fadeIn 0.5s ease-in-out",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
      },
    },
    colors: {
      "board-orange": "#ea8d48",
      "tile-pink": "#FCF8FA",
      "dark-orange": "#1A1625",
      "dark-pink": "#2F2B3A",
    },
  },
  plugins: [],
};
