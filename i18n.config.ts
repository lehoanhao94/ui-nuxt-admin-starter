import ja from "~/locales/ja.json";
export default defineI18nConfig(() => ({
  legacy: false,
  globalInjection: true,
  locale: "ja",
  defaultLocale: "ja",
  silentFallbackWarn: true,
  missingWarn: false,
  fallbackWarn: false,
  messages: {
    ja,
  },
}));
