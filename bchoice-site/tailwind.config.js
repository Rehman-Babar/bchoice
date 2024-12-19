/** @type {import('tailwindcss').Config} */
// import tailwind-scrollbar-hide
import tailwindScrollBarHide from 'tailwind-scrollbar-hide'

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      
    },
  },
  variants: {
    extend: {
      scale: ["hover"],
    },
  },
  plugins: [tailwindScrollBarHide],
};
