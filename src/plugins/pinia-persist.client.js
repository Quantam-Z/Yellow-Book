export default defineNuxtPlugin((nuxtApp) => {
  const pinia = nuxtApp.$pinia;
  if (!pinia) return;

  const persistPlugin = ({ store, options }) => {
    // Only run on client where localStorage exists
    if (process.server) return;

    const persistOption = options && options.persist;
    const shouldPersist = persistOption === true || (typeof persistOption === 'object' && persistOption.enabled !== false);
    if (!shouldPersist) return;

    const storageKey = (typeof persistOption === 'object' && persistOption.key) || `pinia:${store.$id}`;

    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        store.$patch(JSON.parse(raw));
      }
    } catch (_) {
      // ignore corrupted state
    }

    store.$subscribe((_mutation, state) => {
      try {
        localStorage.setItem(storageKey, JSON.stringify(state));
      } catch (_) {
        // storage might be full or unavailable
      }
    }, { detached: true });
  };

  pinia.use(persistPlugin);
});
