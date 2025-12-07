import { defineEventHandler, getQuery, setResponseStatus } from 'h3';
import type { H3Event } from 'h3';

import { searchStubResource } from '~/services/stubSearch';
import { StubApiError } from '~/services/stubClient';

type AnyQuery = Record<string, string | string[] | undefined>;

const respondWithSuccess = (event: H3Event, payload: any) => {
  setResponseStatus(event, 200, 'OK');
  return {
    status: 200,
    statusText: 'OK',
    data: payload,
  };
};

const respondWithError = (event: H3Event, error: unknown) => {
  const stubError =
    error instanceof StubApiError
      ? error
      : new StubApiError(500, error instanceof Error ? error.message : 'Stub search failed', {
          reason: 'stub-search-error',
        });

  setResponseStatus(event, stubError.status, stubError.statusText);
  return {
    error: stubError.message,
    status: stubError.status,
    statusText: stubError.statusText,
    details: stubError.details ?? {},
  };
};

const resolveCacheMode = (query: AnyQuery): 'default' | 'refresh' => {
  const raw = query?.cache;
  const value = Array.isArray(raw) ? raw[0] : raw;
  return value === 'refresh' ? 'refresh' : 'default';
};

const omitInternalParams = (query: AnyQuery) => {
  const entries: Record<string, string | string[] | undefined> = {};
  for (const [key, value] of Object.entries(query)) {
    if (key === 'cache') continue;
    entries[key] = value;
  }
  return entries;
};

export default defineEventHandler(async (event) => {
  const resource = event.context.params?.resource;
  if (!resource) {
    return respondWithError(event, new StubApiError(400, 'Search resource is required'));
  }

  const query = getQuery(event) as AnyQuery;
  const cache = resolveCacheMode(query);
  const filters = omitInternalParams(query);

  try {
    const result = await searchStubResource(resource, filters, { cache, transport: 'local-only' });
    return respondWithSuccess(event, result);
  } catch (error) {
    return respondWithError(event, error);
  }
});
