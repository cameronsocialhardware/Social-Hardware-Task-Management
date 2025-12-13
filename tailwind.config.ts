import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-manrope)", "sans-serif"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          50: "#fff8f1",
          100: "#feefc3",
          200: "#f6da92",
          300: "#efc162",
          400: "#e8a832",
          500: "#e08e02", // Warm orange/gold
          600: "#b37102",
          700: "#865501",
          800: "#593801",
          900: "#2d1c00",
        },
        surface: {
          50: "#1a1a1a",
          100: "#262626",
          200: "#333333",
          300: "#404040",
          400: "#525252",
          500: "#737373",
          600: "#a3a3a3",
          700: "#d4d4d4",
          800: "#e5e5e5",
          900: "#f5f5f5",
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'tech-glow': 'conic-gradient(from 180deg at 50% 50%, #2a1208 0deg, #0a0a0a 180deg, #e85d04 360deg)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    },
  },
  plugins: [],
};
export default config;
