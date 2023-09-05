import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: 'var(--font-montserrat)',
        inter: 'var(--font-inter)',
      }
    },
  },
  darkMode: "class",
  plugins: [
    require("tailwind-scrollbar-hide"),
    require('tailwindcss-safe-area'),
    require("vidstack/tailwind.cjs")({
      prefix: "media",
    }),
  ],
}
export default config
