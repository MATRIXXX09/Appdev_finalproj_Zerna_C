/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/**/**/*.{js,jsx,ts,tsx}",
    "./src/**/**/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        shop: {
          light: '#F0FDF4',
          bg: '#ffffff',
          red: '#DC143C',
          lightred: '#86EFAC',
          sofred: '#86EFAC',
          inputbg: '#D1FAE5',
          green: '#22C55E',
        }
      }
    },
  },
  plugins: [],
}
