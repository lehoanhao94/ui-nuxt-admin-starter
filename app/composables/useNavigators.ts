import { createSharedComposable } from "@vueuse/core";

const _useNavigators = () => {
  const { isPreviewSlideoverOpen } = useDashboard();

  const settingsNavigators = computed(() => (withIcon = true) => {
    return [
      {
        label: "システム設定",
        to: "/settings",
        icon: withIcon && "tdesign:system-setting-filled",
        exact: true,
      },
      {
        label: "基本設定",
        to: "/settings/basic",
        icon: withIcon && "ri:chat-settings-line",
      },
      {
        label: "ユーザ管理",
        to: "/settings/users",
        icon: withIcon && "la:users-cog",
      },
      {
        label: "ラベル管理",
        to: "/settings/labels",
        icon: withIcon && "pajamas:labels",
      },
      {
        label: "カテゴリ管理",
        to: "/settings/categories",
        icon: withIcon && "carbon:category-new-each",
      },
      {
        label: "プロンプト特殊指示",
        to: "/settings/prompts",
        icon: withIcon && "fluent:prompt-20-regular",
      },
    ];
  });
  const navigators = computed(() => {
    return [
      {
        id: "dashboard",
        label: "ダッシュボード",
        icon: "hugeicons:dashboard-browsing",
        to: "/",
        tooltip: {
          text: "ダッシュボード",
          shortcuts: ["G", "D"],
        },
      },
      {
        id: "training-data",
        label: "学習データ",
        icon: "iconoir:learning",
        to: "/training-data",
        tooltip: {
          text: "学習データ",
        },
      },
      {
        id: "logs",
        label: "ログ情報",
        icon: "mdi:math-log",
        to: "/logs",
        badge: "4",
        tooltip: {
          text: "ログ情報",
          shortcuts: ["G", "I"],
        },
      },

      {
        id: "settings",
        label: "設定",
        to: "/settings",
        icon: "i-heroicons-cog-8-tooth",
        children: settingsNavigators.value(false),
        tooltip: {
          text: "設定",
          shortcuts: ["G", "S"],
        },
      },
    ];
  });

  const footerNavigators = computed(() => {
    return [
      {
        label: "プレビュー",
        icon: "hugeicons:message-preview-01",
        tooltip: {
          text: "プレビュー",
          shortcuts: ["G", "P"],
        },
        click: () => isPreviewSlideoverOpen.value = true,
      },
    ];
  });

  return {
    navigators,
    settingsNavigators,
    footerNavigators,
  };
};

export const useNavigators = createSharedComposable(_useNavigators);
