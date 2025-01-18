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
];

const validate = (state: any) => {
  const errors = [];
  if (!state.email)
    errors.push({ path: "email", message: "メールアドレスは必須です" });
  if (!state.tenantId)
    errors.push({ path: "tenantId", message: "テナントIDは必須です" });
  return errors;
};

function onSubmit(data: any) {
  console.log("Submitted", data);
  // navigate to the reset password page
  navigateTo('/auth/reset-password')
}
</script>

<!-- eslint-disable vue/multiline-html-element-content-newline -->
<!-- eslint-disable vue/singleline-html-element-content-newline -->
<template>
  <UCard class="max-w-sm w-full bg-white/75 dark:bg-white/5 backdrop-blur">
    <UAuthForm
      :fields="fields"
      :validate="validate"
      title="パスワードを忘れた場合"
      align="top"
      icon="hugeicons:forgot-password"
      :ui="{ base: 'text-center', footer: 'text-center' }"
      :submit-button="{ trailingIcon: 'tabler:send', label: '送信' }"
      @submit="onSubmit"
    >
      <template #description>
        <div class="text-sm text-left pt-4">
          パスワードをリセットするためにメールアドレスにパスワードリセットリンクを送信します。
        </div>
      </template>
      <template #password-hint>
        <NuxtLink to="/auth/forgot-password" class="text-primary font-medium">
          パスワードをお忘れですか？
        </NuxtLink>
      </template>
      <template #footer>
        <div class="text-sm text-left pb-6">
          <UButton
            icon="i-heroicons-arrow-left-20-solid"
            size="lg"
            color="gray"
            variant="solid"
            label="ログイン画面に戻る"
            :trailing="false"
            :block="true"
            to="/auth/login"
          />
        </div>
        <div>PlayNext Lab @ {{ new Date().getFullYear() }}</div>
      </template>
    </UAuthForm>
  </UCard>
</template>
