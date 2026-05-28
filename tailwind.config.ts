import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-jost)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['var(--font-cormorant)', 'ui-serif', 'Georgia', 'serif'],
        display: ['var(--font-cormorant)', 'ui-serif', 'Georgia', 'serif'],
        body: ['var(--font-jost)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        stone: {
          50: '#f8f6f3',
          100: '#ede9e4',
          200: '#dcd6ce',
          300: '#bcb3a7',
          400: '#9e9488',
          500: '#827a70',
        },
        charcoal: '#0f0f0f',
        ink: '#1a1a1a',
        'warm-gray': '#5a5450',
        brass: {
          DEFAULT: '#003D15',
          light: '#2E7D4A',
          lighter: '#5CB85C',
          dark: '#002910',
        },
      },
    },
  },
  plugins: [],
};
export default config;
