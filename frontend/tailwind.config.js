/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors:{
        "theme-primary":"#5440FF",
        "theme-orange":"#FDCF02",
        "theme-gray":"#7D7D7D",
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
