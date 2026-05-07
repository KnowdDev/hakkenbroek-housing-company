import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        stone: {
          50: '#f8f6f3',
          100: '#ede9e4',
          200: '#dcd6ce',
          300: '#bcb3a7',
          400: '#9e9488',
          500: '#827a70',
        },
        charcoal: '#1a1a1a',
        ink: '#2d2d2d',
        'warm-gray': '#6b6560',
        brass: {
          DEFAULT: '#a67c52',
          light: '#c49a6c',
          dark: '#8a6340',
        },
      },
    },
  },
  plugins: [],
};
export default config;
