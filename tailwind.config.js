/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
    "./node_modules/react-tailwindcss-select/dist/index.esm.js",
    flowbite.content(), // Make sure this line is included
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin'),
    flowbite.plugin(), // Make sure to include this
  ],
};
