import { createError, defineEventHandler, getMethod, getQuery, readBody, setResponseStatus } from 'h3';
import { executeStubRequest, StubApiError } from '@/services/stubClient';

const METHODS_WITH_BODY = new Set(['POST', 'PUT', 'PATCH']);

const toOptionalNumber = (value?: string | string[]) => {
  if (Array.isArray(value)) return toOptionalNumber(value[0]);
  if (value === undefined || value === null || value === '') return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
};

export default defineEventHandler(async (event) => {
  const rawSegments = event.context.params?.segments as string | undefined;
  const segments = rawSegments ? rawSegments.split('/').filter(Boolean) : [];
  const [resourceSegment, idSegment] = segments;

  if (!resourceSegment) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Stub resource is required',
      data: { error: 'Missing stub resource in request path.' },
    });
  }

  const resource = decodeURIComponent(resourceSegment);
  const id = idSegment ? decodeURIComponent(idSegment) : undefined;
  const method = getMethod(event).toUpperCase();
  const query = getQuery(event);
  const delay = toOptionalNumber(query?.delay as string | string[]);
  const params = { ...query };
  if (delay !== undefined) {
    params.delay = delay;
  }

  const payload = METHODS_WITH_BODY.has(method) ? await readBody(event) : undefined;

  try {
    const response = await executeStubRequest({
      resource,
      id,
      method,
      payload,
      query: params,
      delay,
    });

    if (typeof response?.status === 'number') {
      setResponseStatus(event, response.status);
    }

    return response;
  } catch (error) {
    if (error instanceof StubApiError) {
      throw createError({
        statusCode: error.status || 500,
        statusMessage: error.statusText || error.message,
        data: {
          error: error.message,
          details: error.details ?? null,
          meta: {
            resource,
            id,
            duration: error.duration,
          },
        },
      });
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Stub request failed',
      data: {
        error: error instanceof Error ? error.message : 'Unknown error',
        resource,
        id,
      },
    });
  }
});
