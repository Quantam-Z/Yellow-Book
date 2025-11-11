import { useAsyncData } from "#app";
import { STUB_REGISTRY, DEFAULT_STUB_DELAY } from "~/services/stubRegistry";

const HTTP_STATUS_TEXT = {
  200: "OK",
  201: "Created",
  204: "No Content",
  400: "Bad Request",
  403: "Forbidden",
  404: "Not Found",
  405: "Method Not Allowed",
  409: "Conflict",
  422: "Unprocessable Entity",
  500: "Internal Server Error",
};

const DEFAULT_COLLECTION_PRIMARY_KEY = "id";
const STUB_STATE_KEY = "__NUXT_STUB_STATE__";

const globalState = (() => {
  if (!globalThis[STUB_STATE_KEY]) {
    Object.defineProperty(globalThis, STUB_STATE_KEY, {
      value: {},
      enumerable: false,
      configurable: false,
      writable: false,
    });
  }
  return globalThis[STUB_STATE_KEY];
})();

class StubApiError extends Error {
  constructor(status = 500, message = "Stub request failed", details = {}) {
    super(message);
    this.name = "StubApiError";
    this.status = status;
    this.statusText = HTTP_STATUS_TEXT[status] || "Error";
    this.details = details;
  }
}

const structuredCloneSafe = (value) => {
  if (value === null || value === undefined) return value;
  if (typeof structuredClone === "function") return structuredClone(value);
  return JSON.parse(JSON.stringify(value));
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const getStatusText = (status) => HTTP_STATUS_TEXT[status] || "OK";

const defaultStatusFor = (method) => {
  switch (method) {
    case "POST":
      return 201;
    case "DELETE":
      return 204;
    default:
      return 200;
  }
};

const toStubError = (err, fallbackStatus = 500) => {
  if (err instanceof StubApiError) return err;
  if (err?.status) {
    return new StubApiError(err.status, err.message || "Stub request failed", err.details);
  }
  return new StubApiError(fallbackStatus, err?.message || "Stub request failed", {
    cause: err,
  });
};

const logStart = (method, resource, meta) => {
  const label = `[stub] ${method} ${resource}${meta?.id ? ` (${meta.id})` : ""}`;
  if (typeof console.groupCollapsed === "function") {
    console.groupCollapsed(`${label} – request`, meta?.payload ? meta.payload : "");
  } else {
    console.log(label, "payload:", meta?.payload);
  }
};

const logEnd = (method, resource, response) => {
  const label = `[stub] ${method} ${resource}`;
  const suffix = `${response.status} ${response.statusText} in ${response.duration}ms`;
  if (typeof console.groupEnd === "function") {
    console.log("response:", response.data);
    console.log("meta:", response.meta);
    console.log("status:", suffix);
    console.groupEnd();
  } else {
    console.log(`${label} ->`, suffix, { data: response.data, meta: response.meta });
  }
};

const logError = (method, resource, error, duration) => {
  const label = `[stub] ${method} ${resource}`;
  if (typeof console.groupEnd === "function") {
    console.error(`${label} failed in ${duration}ms`, error);
    console.groupEnd();
  } else {
    console.error(`${label} failed in ${duration}ms`, error);
  }
};

const resolveConfig = (resource) => {
  const config = STUB_REGISTRY[resource];
  if (!config) {
    throw new StubApiError(404, `Unknown stub resource "${resource}"`);
  }
  return config;
};

const ensureResourceState = async (resource) => {
  const config = resolveConfig(resource);
  if (!globalState[resource]) {
    globalState[resource] = {
      data: null,
      version: 0,
      config,
    };
  }
  const state = globalState[resource];
  if (!state.data) {
    state.data = await loadStubFromDisk(config.file, config.type);
    state.version += 1;
  }
  return state;
};

const loadStubFromDisk = async (file, type) => {
  const parseJson = async (raw) => {
    try {
      return JSON.parse(raw);
    } catch (error) {
      throw new StubApiError(500, `Failed to parse stub file "${file}"`, { cause: error });
    }
  };

  if (import.meta.server) {
    const [{ readFile }, { join }] = await Promise.all([
      import("node:fs/promises"),
      import("node:path"),
    ]);
    const filePath = join(process.cwd(), "public", "stubs", file);
    try {
      const raw = await readFile(filePath, "utf-8");
      const json = await parseJson(raw);
      validateType(json, type, file);
      return json;
    } catch (error) {
      if (error.code === "ENOENT") {
        throw new StubApiError(404, `Stub file "${file}" not found`);
      }
      if (error instanceof StubApiError) throw error;
      throw new StubApiError(500, `Unable to load stub file "${file}"`, { cause: error });
    }
  } else {
    const response = await fetch(`/stubs/${file}`);
    if (!response.ok) {
      throw new StubApiError(response.status, `Failed to load stub file "${file}"`);
    }
    const json = await response.json();
    validateType(json, type, file);
    return json;
  }
};

const validateType = (payload, type, file) => {
  if (type === "collection" && !Array.isArray(payload)) {
    throw new StubApiError(500, `Stub file "${file}" must export an array`);
  }
  if (type === "singleton" && (Array.isArray(payload) || typeof payload !== "object" || payload === null)) {
    throw new StubApiError(500, `Stub file "${file}" must export an object`);
  }
};

const generateIdentifier = (items, key) => {
  let next = 1;
  for (const item of items) {
    const numeric = Number(item?.[key]);
    if (!Number.isNaN(numeric) && numeric >= next) {
      next = numeric + 1;
    }
  }
  return next;
};

const perform = async (resource, method, handler, meta = {}) => {
  const delay = meta.delay ?? DEFAULT_STUB_DELAY;
  const started = Date.now();
  logStart(method, resource, meta);
  try {
    if (delay > 0) await sleep(delay);
    const outcome = await handler();
    const status = outcome?.status ?? defaultStatusFor(method);
    const response = {
      ok: status >= 200 && status < 300,
      status,
      statusText: getStatusText(status),
      data: structuredCloneSafe(outcome?.data ?? null),
      meta: outcome?.meta ?? {},
      duration: Date.now() - started,
    };
    logEnd(method, resource, response);
    return response;
  } catch (error) {
    const stubError = toStubError(error);
    const duration = Date.now() - started;
    logError(method, resource, stubError, duration);
    stubError.duration = duration;
    throw stubError;
  }
};

const ensureMutable = (config, method) => {
  if (!config.mutable) {
    throw new StubApiError(405, `Resource "${method}" is read-only`);
  }
};

const assertCollection = (state, operation) => {
  if (!Array.isArray(state.data)) {
    throw new StubApiError(500, `Cannot ${operation} non-collection stub data`);
  }
};

const stubClient = {
  async list(resource, options = {}) {
    return this.request({
      resource,
      method: "GET",
      ...options,
    }).then((res) => res.data);
  },

  async get(resource, id, options = {}) {
    const response = await this.request({
      resource,
      method: "GET",
      id,
      ...options,
    });
    if (Array.isArray(response.data)) {
      return response.data.find((item) => String(item.id) === String(id)) ?? null;
    }
    return response.data;
  },

  async create(resource, payload, options = {}) {
    return this.request({
      resource,
      method: "POST",
      payload,
      ...options,
    }).then((res) => res.data);
  },

  async update(resource, id, payload, options = {}) {
    return this.request({
      resource,
      method: "PUT",
      id,
      payload,
      ...options,
    }).then((res) => res.data);
  },

  async remove(resource, id, options = {}) {
    return this.request({
      resource,
      method: "DELETE",
      id,
      ...options,
    }).then((res) => res);
  },

  async reset(resource) {
    const state = globalState[resource];
    if (state) {
      state.data = null;
    }
    return this.list(resource, { delay: 0 });
  },

  async request({ resource, method = "GET", id, payload, delay }) {
    method = method.toUpperCase();
    const state = await ensureResourceState(resource);
    const config = state.config;
    const meta = { id, payload, delay };

    switch (method) {
      case "GET":
        return perform(
          resource,
          method,
          async () => {
            if (id != null) {
              assertCollection(state, "retrieve");
              const pk = config.primaryKey || DEFAULT_COLLECTION_PRIMARY_KEY;
              const item = state.data.find((entry) => String(entry?.[pk]) === String(id));
              if (!item) {
                throw new StubApiError(404, `Item ${id} not found in "${resource}"`);
              }
              return {
                data: item,
                meta: { version: state.version, resource, id },
              };
            }
            return {
              data: state.data,
              meta: { version: state.version, resource },
            };
          },
          meta,
        );

      case "POST":
        ensureMutable(config, method);
        return perform(
          resource,
          method,
          async () => {
            if (config.type === "singleton") {
              if (typeof payload !== "object" || payload === null) {
                throw new StubApiError(400, "Payload must be an object");
              }
              state.data = { ...structuredCloneSafe(payload) };
              state.version += 1;
              return {
                status: 201,
                data: state.data,
                meta: { version: state.version, resource },
              };
            }

            assertCollection(state, "create");
            const pk = config.primaryKey || DEFAULT_COLLECTION_PRIMARY_KEY;
            const records = state.data;
            const nextId = payload?.[pk] ?? generateIdentifier(records, pk);
            const record = { ...structuredCloneSafe(payload), [pk]: nextId };

            records.push(record);
            state.version += 1;
            return {
              status: 201,
              data: record,
              meta: { version: state.version, resource, id: nextId },
            };
          },
          meta,
        );

      case "PUT":
      case "PATCH":
        ensureMutable(config, method);
        return perform(
          resource,
          method,
          async () => {
            if (config.type === "singleton") {
              if (typeof payload !== "object" || payload === null) {
                throw new StubApiError(400, "Payload must be an object");
              }
              state.data = { ...state.data, ...structuredCloneSafe(payload) };
              state.version += 1;
              return {
                status: 200,
                data: state.data,
                meta: { version: state.version, resource },
              };
            }

            assertCollection(state, "update");
            const pk = config.primaryKey || DEFAULT_COLLECTION_PRIMARY_KEY;
            const records = state.data;
            const targetIndex = records.findIndex((entry) => String(entry?.[pk]) === String(id));

            if (targetIndex === -1) {
              throw new StubApiError(404, `Item ${id} not found in "${resource}"`);
            }

            const updated = { ...records[targetIndex], ...structuredCloneSafe(payload) };
            records[targetIndex] = updated;
            state.version += 1;
            return {
              status: 200,
              data: updated,
              meta: { version: state.version, resource, id },
            };
          },
          meta,
        );

      case "DELETE":
        ensureMutable(config, method);
        return perform(
          resource,
          method,
          async () => {
            assertCollection(state, "delete");
            const pk = config.primaryKey || DEFAULT_COLLECTION_PRIMARY_KEY;
            const records = state.data;
            const targetIndex = records.findIndex((entry) => String(entry?.[pk]) === String(id));

            if (targetIndex === -1) {
              throw new StubApiError(404, `Item ${id} not found in "${resource}"`);
            }

            const [removed] = records.splice(targetIndex, 1);
            state.version += 1;
            return {
              status: 204,
              data: null,
              meta: { version: state.version, resource, id, removed: structuredCloneSafe(removed) },
            };
          },
          meta,
        );

      default:
        throw new StubApiError(405, `Unsupported method "${method}"`);
    }
  },
};

export const useStubClient = () => stubClient;

export const useStubResource = (resource, options = {}) => {
  const { key, params, transform, default: defaultValue } = options;

  const dataKey = key || `stub:${resource}${params?.id ? `:${params.id}` : ""}`;

  const handler = async () => {
    const response = await stubClient.request({
      resource,
      method: "GET",
      id: params?.id,
    });
    const data = response.data ?? defaultValue ?? null;
    return typeof transform === "function" ? transform(data, response) : data;
  };

  return useAsyncData(dataKey, handler, {
    default: () => structuredCloneSafe(defaultValue ?? null),
  });
};

export { StubApiError };
