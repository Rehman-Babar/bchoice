import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from 'dotenv';

export default defineConfig({
  plugins: [react()],
  define: {
    // Expose environment variables
    'process.env': {
      VITE_KEY: JSON.stringify(process.env.VITE_KEY),
    },
  },
});
