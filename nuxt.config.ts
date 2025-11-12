import { metaInfo } from "./metaTag";

export default defineNuxtConfig({
  // ✅ Source directory for all app code
  srcDir: "./src/",

  // ✅ Enable SSR (recommended for SEO and Nuxt features)
  ssr: true,

  // ✅ Application <head> defaults
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      title: metaInfo.siteName,
      meta: [
        { name: "description", content: metaInfo.siteDescription },
        { property: "og:title", content: metaInfo.siteName },
        { property: "og:description", content: metaInfo.siteDescription },
        { property: "og:image", content: metaInfo.siteLogo },
      ],
      link: [
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap",
        },
      ],
    },
  },

  // ✅ Nitro handles Vercel automatically
  nitro: {
    preset: "vercel", // use "vercel" (NOT vercel-edge)
  },

  // ✅ Nuxt modules
  modules: [
    "@nuxtjs/tailwindcss",
    "@formkit/nuxt",
    "@pinia/nuxt",
    "nuxt-icon",
    "@kevinmarrec/nuxt-pwa",
  ],

  // ✅ Global CSS
  css: [
    "~/assets/scss/main.scss",
    "awesome-notifications/dist/style.css",
  ],

  // ✅ FormKit config
  formkit: {
    defaultConfig: true,
    configFile: "./src/config/formkit.config.js",
  },

    // ✅ Tailwind customizations handled in tailwind.config.js

    // ✅ PWA setup (auto handled by @kevinmarrec/nuxt-pwa)
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
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/",
        icons: [], // Add icons later if needed
      },
      workbox: { enabled: false },
    },

    // ✅ Runtime config (Vercel env support)
    runtimeConfig: {
      public: {
        gtagId: "G-HXRZKQV1EN",
        siteName: "Yellow-Book",
        /**
         * Default to the local Nuxt server handlers so the app works with dummy APIs out of the box.
         * Supply NUXT_PUBLIC_API_BASE_URL to point at a real backend (ensure it ends with a slash).
         */
        apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL ?? "/api/",
      },
    },

  // ✅ Vue compiler options (for custom directives, e.g. motion)
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

  // ✅ Compatibility
  compatibilityDate: "2025-09-18",
});
