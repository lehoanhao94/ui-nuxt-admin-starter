<script setup lang="ts">
definePageMeta({
  layout: 'blank',
  notRequiresAuth: true
})
const app = useApp()

onMounted(() => {
  app.initialApp()
})
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-4">
    <div class="w-32 h-32 relative">
      <div class="loader-ring">
        <div class="loader-ring-light-green shadow-purple-500" />
        <div class="loader-ring-light-blue" />
        <div class="loader-ring-light-orange" />
        <div class="loader-ring-track" />
      </div>
    </div>
    <div class="text-center text-white flex flex-col items-center gap-2">
      <div class="text-xl font-semibold text-primary-800 dark:text-primary-500">
        LLM RAGへようこそ！
      </div>
      <div class="text-sm text-black dark:text-gray-200">
        データの読み込み中です。お待ちください...
      </div>
    </div>
  </div>
</template>

<style scoped lang="css">
.loader-ring {
  position: absolute;
  width: 120px;
  height: 120px;
  background-image: url("./llm.png");
  background-size: 90%;
  background-position: center;
  background-repeat: no-repeat;
  animation: pulse 2.5s linear infinite;
}

.loader-ring-light-green {
  width: 120px;
  height: 120px;
  -moz-border-radius: 120px;
  -webkit-border-radius: 120px;
  border-radius: 120px;
  box-shadow: 0 6px 12px 0px #2ec870;
  animation: rotate-360 2s linear infinite;
  mix-blend-mode: color-dodge;
}
.loader-ring-light-blue {
  position: absolute;
  top: 0;
  width: 120px;
  height: 120px;
  -moz-border-radius: 120px;
  -webkit-border-radius: 120px;
  border-radius: 120px;
  box-shadow: -6px 0px 12px 0px #1eaedb;
  animation: rotate-360 1.5s linear infinite;
  mix-blend-mode: color-dodge;
}
.loader-ring-light-orange {
  position: absolute;
  top: 0;
  width: 120px;
  height: 120px;
  -moz-border-radius: 120px;
  -webkit-border-radius: 120px;
  border-radius: 120px;
  box-shadow: 0 -7px 12px 0px #ed2222;
  animation: rotate-360 2.5s linear infinite;
  mix-blend-mode: color-dodge;
}

.loader-ring-track {
  position: absolute;
  top: 0;
  left: 0;
  width: 120px;
  height: 120px;
  -moz-border-radius: 120px;
  -webkit-border-radius: 120px;
  border-radius: 120px;
  box-shadow: 0 0 100px 2px rgba(229, 228, 245, 0.8);
}

@keyframes rotate-360 {
  0% {
    -moz-transform: rotate(0);
    -ms-transform: rotate(0);
    -webkit-transform: rotate(0);
    transform: rotate(0);
  }
  100% {
    -moz-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes pulse {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
  100% {
    opacity: 0.99999;
  }
}
</style>
