/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Work Sans", "sans-serif"],
      },
      colors: {
        indigonight: "#3D0066", // dark indigo purple
        indigoflow: "#510087", // mid indigo purple
        indigospark: "#5C0099", // bright indigo purple
        yellowpulse: "#FDC500", // strong golden yellow
        goldflash: "#FFD500", // bright gold yellow
      },
    },
  },
  plugins: [],
};
