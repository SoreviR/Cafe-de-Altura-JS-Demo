/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/pages/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        "Grey-color": "var(--Grey)",
        "Dark-grey-color": "var(--Dark-grey)",
        "Black-color": "var(--Black)",
        "Taupe-color": "var(--Taupe)",
        "Green-color": "var(--Green)",
        "Off-white-color": "var(--Off-white)",
        "White-color": "var(--White)",
      },
      fontFamily: {
        body: ["Outfit", "sans-serif"],
      },
    },
  },
  plugins: [],
};
