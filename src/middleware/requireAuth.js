import { useAuthStore } from "~/stores/auth";

export default defineNuxtRouteMiddleware((to) => {
  const auth = useAuthStore();

  if (process.client && !auth.token) auth.hydrateFromStorage?.();

  const isVerified = Boolean(auth?.user?.email_verified_at);
  if (!auth.isAuthenticated || !isVerified) {
    const next = encodeURIComponent(to.fullPath || "/");
    return navigateTo(`/profile?next=${next}`);
  }
});
