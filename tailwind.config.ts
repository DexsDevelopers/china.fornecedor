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
        primary: {
          50: "#FFF5E4",
          100: "#F5E2C4",
          200: "#E8C99A",
          300: "#D4A870",
          400: "#C9822A",
          500: "#7D4F2A",
          600: "#5A3620",
          700: "#3D2614",
          800: "#2D1B0E",
          900: "#1A1008",
        },
        gold: {
          300: "#F0C060",
          400: "#E8A84A",
          500: "#C9822A",
          600: "#A86820",
        },
        cream: {
          50: "#FFFBF5",
          100: "#FFF5E4",
          200: "#F5E2C4",
          300: "#E8C99A",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "hero-gradient":
          "linear-gradient(135deg, #2D1B0E 0%, #5A3620 50%, #7D4F2A 100%)",
        "gold-gradient":
          "linear-gradient(135deg, #C9822A 0%, #E8A84A 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
