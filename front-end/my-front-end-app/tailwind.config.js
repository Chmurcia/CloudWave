/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/pages/**/*.tsx", "./src/components/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Open Sans'", "sans-serif"],
      },
    },
  },
  plugins: [],
};
