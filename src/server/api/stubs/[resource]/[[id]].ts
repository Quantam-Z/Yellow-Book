import { defineEventHandler, getMethod, getQuery, readBody, setResponseStatus } from "h3";
import { executeStubRequest, StubApiError } from "~/services/stubClient";

const METHODS_WITH_OPTIONAL_BODY = new Set(["POST", "PUT", "PATCH"]);

const parseDelay = (value: unknown) => {
  if (value === undefined || value === null || value === "") return undefined;
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : undefined;
};

export default defineEventHandler(async (event) => {
  const params = event.context.params || {};
  const resource = params.resource;
  const identifier = params.id;

  if (!resource) {
    setResponseStatus(event, 400);
    return {
      error: "Missing stub resource",
      status: 400,
      statusText: "Bad Request",
    };
  }

  const method = (getMethod(event) || "GET").toUpperCase();
  const query = getQuery(event);
  const delay = parseDelay(query?.delay);

  if (delay !== undefined) {
    delete query.delay;
  }

  let payload;
  if (METHODS_WITH_OPTIONAL_BODY.has(method)) {
    payload = await readBody(event);
  } else if (method === "DELETE") {
    try {
      payload = await readBody(event);
    } catch {
      payload = undefined;
    }
  }

  try {
    const response = await executeStubRequest({
      resource,
      method,
      id: identifier,
      payload,
      delay,
      query,
    });

    setResponseStatus(event, response.status);

    if (response.status === 204) {
      return null;
    }

    return {
      data: response.data,
      meta: response.meta,
      status: response.status,
      statusText: response.statusText,
      duration: response.duration,
    };
  } catch (error) {
    const statusCandidate =
      typeof error === "object" && error !== null && "status" in error
        ? Number((error as Record<string, unknown>).status)
        : undefined;

    const messageCandidate =
      error instanceof Error
        ? error.message
        : typeof error === "object" && error !== null && "message" in error
          ? String((error as Record<string, unknown>).message)
          : undefined;

    const normalizedStatus =
      typeof statusCandidate === "number" && Number.isFinite(statusCandidate) ? statusCandidate : 500;

    const stubError =
      error instanceof StubApiError
        ? error
        : new StubApiError(normalizedStatus, messageCandidate || "Stub request failed", { cause: error });

    setResponseStatus(event, stubError.status);

    return {
      error: stubError.message,
      status: stubError.status,
      statusText: stubError.statusText,
      details: stubError.details ?? {},
    };
  }
});
