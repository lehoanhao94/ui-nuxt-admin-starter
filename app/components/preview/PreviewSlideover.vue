<script setup lang="ts">
const { isPreviewSlideoverOpen } = useDashboard()

const chatTextarea = ref()

watch(
  () => isPreviewSlideoverOpen.value,
  (isOpen) => {
    if (isOpen) {
      nextTick(() => {
        chatTextarea.value?.textarea?.focus()
        console.log('🚀 ~ nextTick ~ chatTextarea.value:', chatTextarea.value)
      })
    }
  }
)
</script>

<template>
  <UDashboardSlideover
    v-model="isPreviewSlideoverOpen"
    title="チャットボットのプレビュー"
    :ui="{
      body: {
        base: 'scrollbar-thin'
      }
    }"
  >
    <div class="space-y-4">
      <ChatBubble
        v-for="i in 100"
        :key="i"
      />
    </div>
    <template #footer>
      <div class="w-full">
        <form @submit.prevent>
          <UTextarea
            ref="chatTextarea"
            color="gray"
            required
            size="xl"
            :rows="1"
            autoresize
            :maxrows="5"
            placeholder="メッセージを入力"
          >
            <UButton
              type="submit"
              size="xs"
              color="primary"
              label="送信"
              variant="solid"
              icon="i-heroicons-paper-airplane"
              class="absolute bottom-2 right-2"
            />
          </UTextarea>
        </form>
      </div>
    </template>
  </UDashboardSlideover>
</template>
