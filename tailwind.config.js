/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          neutral: "#eaeaea",
          accent: "#bababa",
          secondary: "#566abb",
          "primary-content": "#000",
          "task-card": "#ec973b",
        },
      },
      {
        dark: {
          ...require("daisyui/src/theming/themes")["dark"],
          accent: "#41425d",
          secondary: "#566abb",
          "primary-content": "#fff",
          "task-card": "#652fa5",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
