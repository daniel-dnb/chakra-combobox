import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { globbySync } from "globby";
import { copyFileSync } from "node:fs";
import dts from "vite-plugin-dts";
import pkg from "./package.json";

export default defineConfig({
  plugins: [
    dts({
      entryRoot: "src",
      staticImport: true,
      exclude: ["**/*.stories.tsx"],
      afterBuild: () => {
        globbySync(["dist/**/*.d.ts", "dist/**.d.ts"]).map(file => {
          copyFileSync(file, file.replace(/\.d\.ts$/, ".d.cts"));
        });
      },
    }),
    react(),
  ],
  build: {
    target: "esnext",
    lib: {
      entry: "src/index.ts",
      name: "chakra-combobox",
      fileName: format => `index.${format}.js`,
    },
    rollupOptions: {
      external: [
        ...Object.keys(pkg.dependencies || {}),
        ...Object.keys(pkg.peerDependencies || {}),
      ],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "@chakra-ui/react": "ChakraUI",
          "@radix-ui/react-scroll-area": "RadixScrollArea",
          "@tanstack/react-virtual": "TanstackReactVirtual",
        },
      },
    },
  },
});
