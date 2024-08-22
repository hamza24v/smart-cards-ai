/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient': 'linear-gradient(135deg, #E8F5E9 0%, #FFFFFF 100%)',
        'green-gradient': 'linear-gradient(to right, #31C48D, #057A55)',
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
};
