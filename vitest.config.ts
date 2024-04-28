import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
  },
  resolve: {
    alias: [
      { find: "@", replacement: path.resolve(__dirname, "./") },
      {
        find: "@/components",
        replacement: path.resolve(__dirname, "./app/components"),
      },
      { find: "@/store", replacement: path.resolve(__dirname, "./app/store") },
      { find: "@/hooks", replacement: path.resolve(__dirname, "./hooks") },
      { find: "@/utils", replacement: path.resolve(__dirname, "./utils") },
    ],
  },
});
