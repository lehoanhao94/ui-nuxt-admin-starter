<script setup lang="ts">
definePageMeta({
  layout: 'auth',
  notRequiresAuth: true
})

useSeoMeta({
  title: 'Login'
})

const authStore = useAuthStore()
const { loadings, errors, authenticated } = storeToRefs(authStore)
const fields = [
  {
    name: 'tenant_id',
    type: 'text',
    label: 'テナントID',
    placeholder: 'Ex: playnextlab',
    tabindex: 1
  },
  {
    name: 'username',
    type: 'text',
    label: 'ユーザー名',
    placeholder: 'Ex: john.doe',
    tabindex: 2
  },
  {
    name: 'password',
    label: 'パスワード',
    type: 'password',
    placeholder: 'パスワードを入力してください',
    tabindex: 3
  }
]

const validate = (state: any) => {
  const errors = []
  if (!state.tenant_id)
    errors.push({ path: 'tenant_id', message: 'テナントIDは必須です' })
  if (!state.username) errors.push({ path: 'username', message: 'ユーザー名は必須です' })
  if (!state.password) errors.push({ path: 'password', message: 'パスワードは必須です' })
  return errors
}

async function onSubmit(data: { tenant_id: string, username: string, password: string }) {
  const result = await authStore.login(data.tenant_id, data.username, data.password)
  if (result) {
    navigateTo('/')
  }
}

onMounted(() => {
  if (authenticated.value) {
    navigateTo('/')
  }
})
</script>

<!-- eslint-disable vue/multiline-html-element-content-newline -->
<!-- eslint-disable vue/singleline-html-element-content-newline -->
<template>
  <UCard class="max-w-sm w-full bg-white/75 dark:bg-white/5 backdrop-blur">
    <UAuthForm
      :fields="fields"
      :validate="validate"
      title="おかえりなさい"
      align="top"
      icon="i-heroicons-lock-closed"
      :ui="{ base: 'text-center', footer: 'text-center' }"
      :submit-button="{
        trailingIcon: 'i-heroicons-arrow-right-20-solid',
        label: 'ログイン'
      }"
      :loading="loadings.login"
      @submit="onSubmit"
    >
      <template #description>
        <div class="text-sm">LLM RAG管理へログイン</div>
      </template>
      <template #validation>
        <UAlert
          v-if="errors.login"
          color="red"
          icon="i-heroicons-information-circle-20-solid"
          title="ログイン失敗"
          :description="errors.login?.error_code"
        />
      </template>
      <template #password-hint>
        <NuxtLink
          to="/auth/forgot-password"
          class="text-primary font-medium"
        >
          パスワードをお忘れですか？
        </NuxtLink>
      </template>
      <template #footer> PlayNext Lab @ {{ new Date().getFullYear() }} </template>
    </UAuthForm>
  </UCard>
</template>
