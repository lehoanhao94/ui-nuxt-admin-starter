<script setup lang="ts">
const authStore = useAuthStore();
const { isHelpSlideoverOpen } = useDashboard();
const { user } = storeToRefs(authStore);

const items = computed(() => [
  [
    {
      slot: "account",
      label: "",
      disabled: true,
    },
  ],
  [
    {
      label: "設定",
      icon: "i-heroicons-cog-8-tooth",
      to: "/settings",
    },
    {
      label: "ヘルプ＆サポート",
      icon: "i-heroicons-question-mark-circle",
      shortcuts: ["?"],
      click: () => (isHelpSlideoverOpen.value = true),
    },
  ],
  [
    {
      label: "ドキュメント",
      icon: "i-heroicons-book-open",
      to: "https://ui.nuxt.com/pro/getting-started",
      target: "_blank",
    },
  ],
  [
    {
      label: "ログアウト",
      icon: "i-heroicons-arrow-left-on-rectangle",
      click: () => authStore.logout(),
    },
  ],
]);
</script>

<template>
  <UDropdown
    mode="click"
    :items="items"
    :ui="{ width: 'w-full', item: { disabled: 'cursor-text select-text' } }"
    :popper="{ strategy: 'absolute', placement: 'top' }"
    class="w-full"
  >
    <template #default="{ open }">
      <UButton
        color="gray"
        variant="ghost"
        class="w-full"
        :label="user?.username"
        :class="[open && 'bg-gray-50 dark:bg-gray-800']"
      >
        <template #leading>
          <UAvatar src="https://avatars.githubusercontent.com/u/739984?v=4" size="2xs" />
        </template>

        <template #trailing>
          <UIcon name="i-heroicons-ellipsis-vertical" class="w-5 h-5 ml-auto" />
        </template>
      </UButton>
    </template>

    <template #account>
      <div class="flex flex-row w-full items-center justify-between">
        <div class="text-left w-1/2">
          <p class="truncate font-medium text-gray-900 dark:text-white">
            {{ user?.username }}
          </p>
        </div>
        <div>
          <UBadge>
            {{ $t(user?.role || "") }}
          </UBadge>
        </div>
      </div>
    </template>
  </UDropdown>
</template>
