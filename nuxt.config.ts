import { metaInfo } from "./metaTag";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: "./src/",
  ssr: true,
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      title: metaInfo.siteName,
      meta: [
        {
          name: "description",
          content: metaInfo.description,
        },
        {
          name: "description",
          content: metaInfo.siteDescription,
        },
        { property: "og:title", content: metaInfo.siteName },
        { property: "og:description", content: metaInfo.siteDescription },
        { property: "og:image", content: metaInfo.siteLogo },
      ],
      script: [
        {
            hid: 'gtm',
            innerHTML: `(function (w, d, s, l, i) {
            w[l] = w[l] || [];
            w[l].push({
            'gtm.start': new Date().getTime(), event: 'gtm.js'
             });
            var f = d.getElementsByTagName(s)[0],
            j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : '';
            j.async = true;
            j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
            f.parentNode.insertBefore(j, f);
            })(window, document, 'script', 'dataLayer', 'GTM-KSJ3PR2X');`,
            type: 'text/javascript'
        }
    ],
    },
  },
  nitro: {
    preset: "vercel-edge",
  },
  modules: ["@nuxtjs/tailwindcss", "@formkit/nuxt", "@pinia/nuxt", "nuxt-icon"],
  plugins: [{ src: "~/plugins/katex.js", mode: "client", ssr: false }],
  css: [
    // '~/assets/css/main.css',
    "~/assets/scss/main.scss",
    "awesome-notifications/dist/style.css",
  ],
  formkit: {
    defaultConfig: true,
    configFile: "./src/config/formkit.config.js",
    // ^ this is now a full config replacement, not override.
  },
  pwa: {
    meta: {
      title: metaInfo.siteName,
      ogSiteName: metaInfo.siteName,
      description:  metaInfo.siteDescription,
      author: "Author.",
    },
    manifest: {
      name: metaInfo.siteName,
      short_name: "",
      lang: "en",
    },
    workbox: {
      enabled: false,
    },
  },
  vue: {
    compilerOptions: {
      directiveTransforms: {
        motion: () => ({
          props: [],
          needRuntime: true,
        }),
      },
    },
  },
  runtimeConfig: {
    public: {
      gtagId: 'G-HXRZKQV1EN',
      siteName: "কারিগরি পাঠশালা",
      apiBaseUrl: process.env.NUXT_API_BASE_URL || "http://127.0.0.1:8000/api/",
    },
  },
});
