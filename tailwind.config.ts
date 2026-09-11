import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        impact: {
          high: "#b3261e",
          medium: "#9a6a08",
          low: "#2e7d4f",
        },
      },
    },
  },
  plugins: [],
};

export default config;

