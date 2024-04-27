import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {},
  daisyui: {
    themes: [
      {
        theme: {
          ...require("daisyui/src/theming/themes")["winter"],
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
export default config;
