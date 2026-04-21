import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  resolve: {
    // Ensure only one copy of React is used — prevents the
    // "Cannot read properties of null (reading 'useContext')" crash
    // that occurs when Firebase pulls in a second React instance.
    dedupe: ["react", "react-dom", "react/jsx-runtime"],
  },
  ssr: {
    // Bundle Firebase for SSR so it doesn't try to load its own
    // CJS version of React on the server side.
    noExternal: ["firebase"],
  },
});
