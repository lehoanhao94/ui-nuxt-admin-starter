<script setup lang="ts">
definePageMeta({
  layout: "auth",
});

useSeoMeta({
  title: "Login",
});

const fields = [
  {
    name: "tenantId",
    type: "text",
    label: "テナントID",
    placeholder: "Ex: playnextlab",
  },
  {
    name: "email",
    type: "email",
    label: "メールアドレス",
    placeholder: "Ex: example@email.com",
  },
  {
    name: "password",
    label: "パスワード",
    type: "password",
    placeholder: "パスワードを入力してください",
  },
];

const validate = (state: any) => {
  const errors = [];
  if (!state.tenantId) errors.push({ path: "tenantId", message: "テナントIDは必須です" });
  if (!state.email) errors.push({ path: "email", message: "メールアドレスは必須です" });
  if (!state.password) errors.push({ path: "password", message: "パスワードは必須です" });
  return errors;
};

function onSubmit(data: any) {
  console.log("Submitted", data);

  // navigate to the dashboard
  navigateTo("/");
}
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
        label: 'ログイン',
      }"
      @submit="onSubmit"
    >
      <template #description>
        <div class="text-sm">LLM RAG管理へログイン</div>
      </template>
      <template #password-hint>
        <NuxtLink to="/auth/forgot-password" class="text-primary font-medium">
          パスワードをお忘れですか？
        </NuxtLink>
      </template>
      <template #footer> PlayNext Lab @ {{ new Date().getFullYear() }} </template>
    </UAuthForm>
  </UCard>
</template>
