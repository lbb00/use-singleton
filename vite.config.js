import { defineConfig } from "vite"
import dts from "vite-plugin-dts"

export default defineConfig({
  root: ".",
  mode: "production",
  build: {
    target: "esnext",
    outDir: "./dist",
    minify: "terser",
    lib: {
      entry: "./src/index.ts",
      formats: ["es", "cjs", "umd"],
      name: "UseSingleton",
      fileName: (format) => {
        if (format === "es") {
          return "index.mjs"
        } else if (format === "cjs") {
          return "index.cjs"
        } else {
          return "index.min.js"
        }
      },
    },
  },
  plugins: [
    dts({
      logLevel: "error",
    }),
  ],
})
