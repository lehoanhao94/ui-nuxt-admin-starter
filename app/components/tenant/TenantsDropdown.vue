<script setup lang="ts">
const tenantsStore = useTenantsStore()
const {
  topFiveTenantsDropdownItems,
  loadings,
  selectedTenant,
  selectedTenantId
} = storeToRefs(tenantsStore)

// const tenants = [
//   {
//     label: 'Miyawaka',
//     avatar: {
//       src:
//         'https://cdn.sugures.app/assets/0fc98f2e-d5d5-4ba0-8103-18b7ac20352a/images/chat-neko5.png'
//     },
//     click: () => {
//       tenant.value = tenants[0]
//     }
//   },
//   {
//     label: 'Playnext Lab',
//     avatar: {
//       src:
//         'data:image/jpeg;base64,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'
//     },
//     click: () => {
//       tenant.value = tenants[1]
//     }
//   }
// ]

const actions = [
  {
    label: 'テナントを追加',
    icon: 'i-heroicons-plus-circle'
  },
  {
    label: 'テナントを管理',
    icon: 'i-heroicons-cog-8-tooth'
  }
]
</script>

<template>
  <UDropdown
    mode="hover"
    :items="[topFiveTenantsDropdownItems, actions]"
    class="w-full"
    :ui="{ width: 'w-full' }"
    :popper="{ strategy: 'absolute' }"
  >
    <UButton
      color="gray"
      variant="ghost"
      :class="[open && 'bg-gray-50 dark:bg-gray-800']"
      class="w-full justify-start"
      block
      :loading="loadings.fetchTenants"
    >
      <UAvatar
        v-if="selectedTenant?.avatar?.src"
        :src="selectedTenant?.avatar?.src"
        size="2xs"
        :ui="{
          rounded: 'rounded-sm'
        }"
      />

      <span class="truncate text-gray-900 dark:text-white font-semibold">{{
        selectedTenant?.label
      }}</span>
      <UIcon
        name="octicon:arrow-switch-24"
        class="ml-auto"
      />
    </UButton>

    <template #more="{ item }">
      <div
        class="flex items-center gap-2"
      >
        <UAvatar
          :alt="'+ '+ item.remainAvatars?.length"
          size="2xs"
          :ui="{
            background: 'bg-gray-200 dark:bg-gray-700',
            text: 'text-gray-500 dark:text-gray-800'
          }"
        />

        <div>
          <span class="text-sm text-gray-500 dark:text-gray-400">他のテナント</span>
        </div>
      </div>
    </template>
  </UDropdown>
</template>
