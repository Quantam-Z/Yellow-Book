export default defineNuxtPlugin((nuxtApp) => {
  if (process.server) return;

  const { gtagId } = useRuntimeConfig().public;
  if (!gtagId) return;

  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function gtag() {
      window.dataLayer.push(arguments);
    };

  window.gtag('js', new Date());
  window.gtag('config', gtagId, { send_page_view: false });

  useHead({
    script: [
      {
        src: `https://www.googletagmanager.com/gtag/js?id=${gtagId}`,
        async: true,
      },
    ],
  });

  let lastTrackedLocation;

  const resolveCategoryName = (rawName) => {
    if (!rawName) return null;
    const value = Array.isArray(rawName) ? rawName[0] : rawName;
    if (typeof value !== 'string') return null;
    try {
      return decodeURIComponent(value.replace(/\+/g, ' '));
    } catch {
      return value;
    }
  };

  const trackPageView = () => {
    if (typeof window.gtag !== 'function') return;

    const pageLocation = window.location.href;
    if (!pageLocation || pageLocation === lastTrackedLocation) {
      return;
    }
    lastTrackedLocation = pageLocation;

    const pagePath = window.location.pathname + window.location.search;
    const route = nuxtApp.$router?.currentRoute.value;

    const payload = {
      page_title: document.title || route?.meta?.title || '',
      page_location: pageLocation,
      page_path: pagePath,
    };

    const categoryName = resolveCategoryName(route?.query?.name);
    if (categoryName) {
      payload.category_name = categoryName;
    }

    const referrer = document.referrer;
    if (referrer) {
      payload.page_referrer = referrer;
    }

    window.gtag('event', 'page_view', payload);
  };

  nuxtApp.hook('page:finish', () => {
    trackPageView();
  });

  window.addEventListener('load', trackPageView, { once: true });
});