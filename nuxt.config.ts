// https://nuxt.com/docs/api/configuration/nuxt-config

const baseURL = process.env.BASE_URL || "/";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  ssr: false,

  app: {
    baseURL,
    head: {
      title: "ProgrammierKlub",
      htmlAttrs: { lang: "de" },
      link: [
        { rel: "icon", type: "image/png", href: `${baseURL}Favicon.png` },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap",
        },
      ],
    },
  },

  nitro: {
    preset: "github_pages",
  },

  css: ["@/assets/styles/_main.css"],
});
