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
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href:
            'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap',
        },
      ],
      meta: [
        { name: "description", content: metaInfo.siteDescription },
        { property: "og:title", content: metaInfo.siteName },
        { property: "og:description", content: metaInfo.siteDescription },
        { property: "og:image", content: metaInfo.siteLogo },
      ],
    },
  },

  nitro: {
    preset: "vercel-edge",
  },

  modules: [
    "@nuxtjs/tailwindcss",
    "@formkit/nuxt",
    "@pinia/nuxt",
    "nuxt-icon",
    "@kevinmarrec/nuxt-pwa"
  ],

  css: [
    "~/assets/scss/main.scss",
    "awesome-notifications/dist/style.css",
  ],

  formkit: {
    defaultConfig: true,
    configFile: "./src/config/formkit.config.js",
  },

  pwa: {
    meta: {
      title: metaInfo.siteName,
      ogSiteName: metaInfo.siteName,
      description: metaInfo.siteDescription,
      author: "Author.",
      theme_color: "#ffffff",
    },
    manifest: {
      name: metaInfo.siteName,
      short_name: "Yellow-Book",
      lang: "en",
      icons: [],
    },
    workbox: { enabled: false },
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
      gtagId: "G-HXRZKQV1EN",
      siteName: "Yellow-Book",
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:8000/api/",
    },
  },

  compatibilityDate: "2025-09-18",
});
