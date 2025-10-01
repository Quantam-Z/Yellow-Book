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
            gray: {
              100: "#fafafa",
              200: "#212121",
            },
            gainsboro: "#e0e0e0",
          },
          spacing: {
            "num-52": "52px",
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
          },
          fontSize: {
            "num-16": "16px",
          },
        },
      },
      corePlugins: {
        preflight: false,
      },
    };
    