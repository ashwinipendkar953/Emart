import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    historyApiFallback: true,
  },
  optimizeDeps: {
    exclude: ["js-big-decimal"],
    include: ["react-icons/fa", "react-icons/ri"],
  },
});
