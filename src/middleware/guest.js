import { useAuthStore } from "~/stores/auth";

export default defineNuxtRouteMiddleware((to) => {
  const auth = useAuthStore();
  if (process.client && !auth.token) auth.hydrateFromStorage?.();

  if (auth.isAuthenticated) {
    const redirectTo = to.query?.next ? String(to.query.next) : "/";
    return navigateTo(redirectTo);
  }
});
