import useToken from "~/composables/useToken";

const API_CLIENT_KEY = "__nuxt_api_client";

/**
 * Build an API client bound to a specific Nuxt app instance.
 */
export const createApiClient = (nuxtApp) => {
  const { public: publicConfig } = nuxtApp.$config;

  const withAuthHeaders = (headers = {}) => {
    const token = useToken();
    const authHeaders = {};
    if (token) authHeaders.Authorization = `Bearer ${token}`;
    return { Accept: "application/json", ...authHeaders, ...headers };
  };

  const getNotifier = () => {
    if (process.server) return null;
    try {
      return nuxtApp.$awn || null;
    } catch (_) {
      return null;
    }
  };

  const showSuccess = (message) => {
    const notifier = getNotifier();
    notifier?.success(message || "Success");
  };

  const showError = (err, fallbackMessage) => {
    const notifier = getNotifier();
    if (!notifier) return;

    const response = err?.response || {};
    const status = response.status || err?.status;
    const data = response._data || err?.data || err;
    const statusText = response.statusText || err?.statusText;
    const detail = data?.message || data?.error || "";
    const message =
      fallbackMessage ||
      (status
        ? `${statusText || "Error"} (${status})${detail ? ": " + detail : ""}`
        : detail || "Something went wrong");

    notifier.alert(message);
  };

  const request = async (method, url, payload, options = {}) => {
    const {
      toast = { showSuccess: false, showError: true, successMessage: "" },
      headers,
      query,
    } = options;

    const isFormData = typeof FormData !== "undefined" && payload instanceof FormData;
    const body =
      payload && !isFormData && method !== "GET"
        ? typeof payload === "string"
          ? payload
          : JSON.stringify(payload)
        : payload;

    try {
      const data = await $fetch(url, {
        baseURL: publicConfig.apiBaseUrl,
        method,
        body,
        headers: isFormData
          ? withAuthHeaders(headers)
          : withAuthHeaders({ "Content-Type": "application/json", ...headers }),
        query,
        retry: 0,
        onRequest({ options }) {
          // Ensure headers object exists for downstream manipulations
          options.headers = options.headers || {};
        },
      });

      if (toast?.showSuccess) showSuccess(toast.successMessage || "Success");
      return data;
    } catch (err) {
      if (toast?.showError !== false) showError(err, toast?.errorMessage);
      throw err;
    }
  };

  return {
    get: (url, options) => request("GET", url, undefined, options),
    post: (url, payload, options) => request("POST", url, payload, options),
    put: (url, payload, options) => request("PUT", url, payload, options),
    patch: (url, payload, options) => request("PATCH", url, payload, options),
    delete: (url, options) => request("DELETE", url, undefined, options),
    request,
  };
};

/**
 * Access (and lazily instantiate) the shared API client.
 */
const useRequest = () => {
  const nuxtApp = useNuxtApp();

  if (!nuxtApp[API_CLIENT_KEY]) {
    nuxtApp[API_CLIENT_KEY] = createApiClient(nuxtApp);
  }

  return nuxtApp[API_CLIENT_KEY];
};

export default useRequest;
