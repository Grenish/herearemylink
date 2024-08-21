import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        customColor: {
          1: "#BD9391",
          2: "#ADBABD",
          3: "#91B7C7",
          4: "#6EB4D1",
          5: "#6CBEED",
          6: "#B99D9C",
        }
      }
    },
  },
  darkMode: "class",
  plugins: [nextui()]
};
export default config;
