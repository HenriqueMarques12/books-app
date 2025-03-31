import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "./vite.config";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: ["./src/tests/setup.ts"],
      include: ["./src/**/*.{test,spec}.{ts,tsx}"],
      css: false,
      coverage: {
        provider: "v8",
        reporter: ["text", "json", "html"],
        exclude: [
          "node_modules/",
          "src/tests/**",
          "**/*.d.ts",
          "**/*.config.*",
          "**/main.tsx",
        ],
      },
    },
  }),
);
