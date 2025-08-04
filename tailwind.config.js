/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        deepNavy: "#00105a",    
        neonGreen: "#43ef68",   
        royalBlue: "#083acf", 
        lightDeepNavy: '#0c226a',
        darkNeonGreen: '#32cc55',
        midnight: "#171520",
        offWhite: "#eef3f7",
      },
    },
  },
  plugins: [],
}

