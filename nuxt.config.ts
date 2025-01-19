// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: ["@nuxt/ui-pro"],

  modules: [
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/ui",
    "@vueuse/nuxt",
    "@pinia/nuxt",
    "pinia-plugin-persistedstate/nuxt",
    "@nuxtjs/i18n",
  ],

  devtools: {
    enabled: true,
  },

  colorMode: {
    disableTransition: true,
  },

  ui: {
    safelistColors: ["primary", "red", "orange", "green"],
  },

  routeRules: {
    // Temporary workaround for prerender regression. see https://github.com/nuxt/nuxt/issues/27490
    "/": { prerender: true },
  },

  future: {
    compatibilityVersion: 4,
  },

  compatibilityDate: "2024-07-11",

  typescript: {
    strict: false,
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: "never",
        braceStyle: "1tbs",
      },
    },
  },

  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],
  css: ["~/assets/style/style.css"],
  runtimeConfig: {
    public: {
      api: {
        adminServiceBaseUrl: process.env.ADMIN_SERVICE_BASE_URL || "",
      },
    },
  },
  i18n: {
    vueI18n: "./i18n.config.ts",
  },
});
