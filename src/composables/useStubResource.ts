import { useAsyncData } from "#imports";
import { useStubClient } from "~/services/stubClient";

type StubRequestResponse<TData> = {
  data: TData | null;
  meta?: Record<string, unknown>;
  status?: number;
  statusText?: string;
  duration?: number;
};

type UseStubResourceOptions<TData = unknown> = {
  key?: string;
  params?: {
    id?: string | number;
  };
  transform?: (data: TData | null, response: StubRequestResponse<TData>) => TData;
  default?: TData | null;
};

const structuredCloneSafe = <T>(value: T): T => {
  if (value === null || value === undefined) {
    return value;
  }
  if (typeof structuredClone === "function") {
    return structuredClone(value);
  }
  return JSON.parse(JSON.stringify(value));
};

export const useStubResource = <TData = unknown>(
  resource: string,
  options: UseStubResourceOptions<TData> = {},
) => {
  const stubClient = useStubClient();
  const { key, params, transform, default: defaultValue } = options;
  const dataKey = key || `stub:${resource}${params?.id ? `:${params.id}` : ""}`;

  const handler = async () => {
    const response = (await stubClient.request({
      resource,
      method: "GET",
      id: params?.id,
    })) as StubRequestResponse<TData>;

    const data = response.data ?? (defaultValue ?? null);
    return typeof transform === "function" ? transform(data, response) : data;
  };

  return useAsyncData<TData | null>(dataKey, handler, {
    default: () => structuredCloneSafe(defaultValue ?? null),
  });
};
