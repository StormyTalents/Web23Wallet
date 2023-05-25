const defaultTheme = require("tailwindcss/defaultTheme");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        orange: {
          500: "#FF9F0A",
        },
        purple: {
          300: "#C984EB",
        },
        indigo: {
          900: "#0A0939",
          800: "#100F61",
          500: "#2D2BDE",
          300: "#8583EC",
          200: "#B9B8F4",
        },
        yellow: {
          600: "#D1A700",
          500: "#FFCE0A",
          400: "#FFD83D",
        },
        blue: {
          900: "#002142",
          400: "#3D9EFF",
        },
        green: {
          500: "#9FDB7B",
          400: "#CCF3AC",
        },
        grey: {
          900: "#212121",
          800: "#383838",
          700: "#4F4F4F",
          600: "#696969",
          400: "#9E9E9E",
          300: "#B8B8B8",
          200: "#D6D6D6",
          100: "#E8E8E8",
          50: "#F4F4F4",
        },
        lime: {
          700: "#90B528",
          500: "#D7FC51",
        },
        red: {
          500: "#FF0A22",
          400: "#FF3D50",
        },
      },
      fontFamily: {
        satoshi: ["Satoshi", ...defaultTheme.fontFamily.sans],
      },
      animation: {
        connecting: "connect 2s ease-in-out infinite",
        dots: "dots 0.8s steps(5, end) infinite",
      },
    },
  },
  plugins: [require("tailwind-scrollbar"), require("@tailwindcss/line-clamp")],
};
