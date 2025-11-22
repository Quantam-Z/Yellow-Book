import { defineEventHandler, readBody, getQuery, setResponseStatus, createError } from 'h3';
import { executeStubRequest, StubApiError } from '~/services/stubClient';

const METHODS_WITH_BODY = new Set(['POST', 'PUT', 'PATCH', 'DELETE']);

export default defineEventHandler(async (event) => {
  const resource = event.context.params?.resource;
  const id = event.context.params?.id;

  if (!resource) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Stub resource is required',
    });
  }

  const method = (event.method || 'GET').toUpperCase();
  const query = getQuery(event);
  const delayRaw = Array.isArray(query.delay) ? query.delay[0] : query.delay;
  const parsedDelay = Number(delayRaw);
  const delay = Number.isFinite(parsedDelay) ? parsedDelay : undefined;

  let payload: unknown = undefined;
  if (METHODS_WITH_BODY.has(method)) {
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
      id,
      payload,
      params: query,
      delay,
    });

    setResponseStatus(event, response.status, response.statusText);

    return {
      data: response.data ?? null,
      meta: response.meta ?? {},
      duration: response.duration ?? null,
    };
  } catch (error) {
    if (error instanceof StubApiError) {
      throw createError({
        statusCode: error.status,
        statusMessage: error.message,
        data: {
          statusText: error.statusText,
          details: error.details ?? {},
        },
      });
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Unexpected stub server error',
      data: {
        cause: error,
      },
    });
  }
});

