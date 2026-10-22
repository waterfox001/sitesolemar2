import { defineConfig } from "@lovable.dev/vite-tanstack-config";

const isVercel = Boolean(
  process.env.VERCEL === "1" ||
  process.env.NOW_BUILDER === "1" ||
  process.env.NITRO_PRESET === "vercel",
);

export default defineConfig({
  vite: {
    define: {
      "process.env.NODE_ENV": JSON.stringify("production"),
    },
    oxc: {
      jsx: {
        development: false,
      },
    },
    build: {
      rolldownOptions: {
        transform: {
          jsx: {
            development: false,
          },
        },
      },
    },
  },
  nitro: {
    ...(isVercel ? { preset: "vercel" } : {}),
    vercel: {
      entryFormat: "node",
    },
  },
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
});


