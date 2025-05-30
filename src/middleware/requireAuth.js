import { useAuthStore } from "~/stores/auth";

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();
  const { token } = authStore;
  if (
    process.server &&
    !authStore.token &&
    !authStore?.user?.email_verified_at
  ) {
    return navigateTo('/profile?next=' + to.fullPath);
  } else if (process.client && !token && !authStore?.user?.email_verified_at) {
    return navigateTo('/profile?next=' + to.fullPath);
  }
});
