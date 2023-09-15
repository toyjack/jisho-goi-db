/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // Note the addition of the `app` directory.
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("daisyui"),
    require('@tailwindcss/typography'),
  ],

  darkMode: "class",

  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#F2E96D",
          secondary: "#D9C896",
          accent: "#A69472",
          neutral: "#514859",
          "base-100": "#F2F2EB",
          error: "#f26d6d",
        },
      },
      "dracula",
    ],
    logs: false,
    darkTheme: "dracula",
  },
}