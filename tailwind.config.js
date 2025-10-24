/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,vue}",
  ],
  theme: {
    extend: {
      colors: {
        gold: "#fcc207",
        goldenrod: "#e5b106",
        white: "#fff",
        whitesmoke: "#eee",
        // Brand/semantic colors used across the landing navbar template
        oldlace: "#fff9e6",
        palegoldenrod: "#feecb2",
        dimgray: "#616161",
        khaki: "#f0e68c",
        ghostwhite: "#f8f8ff",
        gray: {
          100: "#fafafa",
          200: "#212121",
        },
        gainsboro: "#e0e0e0",
      },
      spacing: {
        "num-52": "52px",
        "num-10": "10px",
      },
      fontFamily: {
        "plus-jakarta-sans": ["Plus Jakarta Sans", "sans-serif"],
      },
      borderRadius: {
        "num-8": "8px",
      },
      padding: {
        "num-20": "20px",
        "num-16": "16px",
        "num-10": "10px",
      },
      fontSize: {
        "num-16": "16px",
        "num-14": "14px",
      },
      fontWeight: {
        body: 500,    // Medium/Semi-Bold for body
        heading: 500, // Medium for H1
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
};
