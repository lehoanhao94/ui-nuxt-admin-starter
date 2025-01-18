<script setup lang="ts">
definePageMeta({
  layout: "auth",
});

useSeoMeta({
  title: "Login",
});

const fields = [
  {
    name: "code",
    type: "text",
    label: "メールに送られたコード",
    placeholder: "Ex: 123456",
  },
  {
    name: "newPassword",
    label: "パスワード",
    type: "password",
    placeholder: "新しいパスワードを入力してください",
  },
  {
    name: "confirmPassword",
    label: "パスワードの確認",
    type: "password",
    placeholder: "新しいパスワードを再度入力してください",
  },
];

const validate = (state: any) => {
  const errors = [];
  if (!state.code) errors.push({ path: "code", message: "コードは必須です" });
  if (!state.confirmPassword)
    errors.push({
      path: "confirmPassword",
      message: "パスワードの確認は必須です",
    });
    if (!state.newPassword)
    errors.push({
      path: "newPassword",
      message: "パスワードの確認は必須です",
    });
  if (state.newPassword !== state.confirmPassword)
    errors.push({
      path: "confirmPassword",
      message: "パスワードが一致しません",
    });

  return errors;
};

function onSubmit(data: any) {
  console.log("Submitted", data);
}

const form = ref<any>(null);
const passwordRequirements = computed(() => {
  if (!form.value?.state) return [];
  const { newPassword } = form.value?.state;

  return [
    {
      label: "長さ：8文字以上",
      valid: newPassword?.length >= 8,
    },
    {
      label: "英大文字（最低1文字）",
      valid: /[A-Z]/.test(newPassword),
    },
    {
      label: "英小文字（最低1文字）",
      valid:
        /[a-z]/.test(newPassword) && newPassword !== newPassword?.toUpperCase(),
    },
    {
      label: "数字（最低1文字）",
      valid: /[0-9]/.test(newPassword),
    },
  ];
});
</script>

<!-- eslint-disable vue/multiline-html-element-content-newline -->
<!-- eslint-disable vue/singleline-html-element-content-newline -->
<template>
  <UCard class="max-w-sm w-full bg-white/75 dark:bg-white/5 backdrop-blur">
    <UAuthForm
      ref="form"
      :fields="fields"
      :validate="validate"
      title="パスワードのリセット"
      align="top"
      icon="hugeicons:reset-password"
      :ui="{ base: 'text-center', footer: 'text-center' }"
      :submit-button="{
        trailingIcon: 'i-heroicons-arrow-right-20-solid',
        label: '確定',
      }"
      @submit="onSubmit"
    >
      <template #description>
        <div class="text-sm text-left pt-4">
          パスワードをリセットするためにメールに送られたコードと新しいパスワードを入力してください。
        </div>
      </template>
      <template #newPassword-help>
        <div class="text-xs text-left pt-1">
          パスワードは下記の条件を満たす必要があります。
          <ul class="list-none pl-0">
            <li
              v-for="requirement in passwordRequirements"
              :key="requirement.label"
            >
              <span
                :class="[
                  requirement.valid ? 'text-green-600' : 'dark:text-gray-400',
                ]"
                class="flex items-center gap-1"
              >
                <UIcon
                  :name="
                    requirement.valid
                      ? 'i-heroicons-check-circle-solid'
                      : 'i-heroicons-x-circle-solid'
                  "
                  :class="[
                    requirement.valid ? 'text-green-600' : 'dark:text-red-400',
                  ]"
                />
                {{ requirement.label }}
              </span>
            </li>
          </ul>
        </div>
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
