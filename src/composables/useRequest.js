import useToken from "~/composables/useToken";

/**
 * Reusable API client built on top of $fetch with
 * - Automatic baseURL from runtime config
 * - Auth token injection (Bearer)
 * - Safe JSON/FormData handling
 * - Optional success/error toasts
 */
const createClient = () => {
  const { public: publicConfig } = useRuntimeConfig();

  const withAuthHeaders = (headers = {}) => {
    const token = useToken();
    const authHeaders = {};
    if (token) authHeaders.Authorization = `Bearer ${token}`;
    return { Accept: "application/json", ...authHeaders, ...headers };
  };

  const showSuccess = (message) => {
    if (process.server) return;
    try {
      const { $awn } = useNuxtApp();
      $awn?.success(message || "Success");
    } catch (_) {}
  };

  const showError = (err, fallbackMessage) => {
    if (process.server) return;
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

    try {
      const { $awn } = useNuxtApp();
      $awn?.alert(message);
    } catch (_) {}
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

// Singleton instance per runtime for convenience
const $api = createClient();

export default $api;
