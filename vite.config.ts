import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';

const path = require("path");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 8848
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src")
    }
  }
});
