export default defineNuxtRouteMiddleware(() => {
  const authStore = useAuthStore()
  const { authenticated } = storeToRefs(authStore)
  if (!authenticated.value) {
    return navigateTo('/auth/login')
  }
})
