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
        kpop: {
          light: '#fff5f9',
          bg: '#ffffff',
          pink: '#ff1493',
          lightpink: '#ffc0cb',
          sofpink: '#ffb6c1',
          inputbg: '#ffe0f0',
          purple: '#d946ef',
        }
      }
    },
  },
  plugins: [],
}