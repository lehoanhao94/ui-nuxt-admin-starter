export default defineNuxtRouteMiddleware((to) => {
  if (!useAuthStore().authenticated) {
    return navigateTo("/auth/login");
  }
});
