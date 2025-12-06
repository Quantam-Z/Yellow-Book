import { useAsyncData } from '#imports';
import { toValue } from 'vue';
import type { MaybeRefOrGetter } from 'vue';

import { searchStubResource, type StubSearchResult } from '~/services/stubSearch';

type UseStubSearchOptions<TData = any> = {
  key?: string;
  query?: MaybeRefOrGetter<Record<string, any>>;
  watch?: Array<MaybeRefOrGetter<unknown>>;
  default?: () => StubSearchResult<TData>;
};

const resolveDefault = <T>(factory?: () => T): T => {
  if (typeof factory === 'function') {
    return factory();
  }
  return { items: [], meta: {} } as T;
};

const resolveQuery = (query?: MaybeRefOrGetter<Record<string, any>>) => {
  if (!query) return {};
  return toValue(query) ?? {};
};

export const useStubSearch = <T = any>(
  resource: string,
  options: UseStubSearchOptions<T> = {},
) => {
  const dataKey = options.key ?? `stub-search:${resource}`;
  const watchDeps = options.watch ?? [];

  return useAsyncData<StubSearchResult<T>>(
    dataKey,
    () => searchStubResource<T>(resource, resolveQuery(options.query)),
    {
      watch: watchDeps,
      default: () => resolveDefault(options.default),
    },
  );
};
