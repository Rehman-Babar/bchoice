/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      width: {
        "fill-available": "-webkit-fill-available",
      },
      colors: {
        ffafcc: '#ffafcc',
        ffc8dd: '#ffc8dd',
        cdb4db: '#cdb4db',
      },
      fontFamily: {
        urbanist: ['Urbanist', 'sans-serif'], // Add Urbanist font
      },
    },
  },
  plugins: [],
};
