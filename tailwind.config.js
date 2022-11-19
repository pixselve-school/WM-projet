/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {

          "primary": "#efaebf",

          "secondary": "#b52826",

          "accent": "#afea77",

          "neutral": "#282F34",

          "base-100": "#2D414D",

          "info": "#8EC7F6",

          "success": "#13AA4F",

          "warning": "#F4C862",

          "error": "#DD3668",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
