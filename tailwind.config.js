/** @type {import('tailwindcss').Config} */
module.exports = {
    "content": [
          "./src/**/*.{js,jsx,ts,tsx,vue}"
    ],
    "theme": {
          "extend": {
                "colors": {
                      "gold": "#fcc207",
                      "goldenrod": "#e5b106",
                      "white": "#fff"
                },
                "fontFamily": {
                      "plus-jakarta-sans": "Plus Jakarta Sans"
                }
          }
    },
    "corePlugins": {
          "preflight": false
    }
}