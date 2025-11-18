const normalize = (value?: string) =>
  String(value ?? '')
    .trim()
    .toLowerCase();

export const normalizeEmail = (value?: string) => normalize(value);

export const buildStubToken = (id?: string | number) => `stub-token-${id ?? 'guest'}`;

export const parseStubToken = (token?: string | null) => {
  if (!token) return null;
  const match = /^stub-token-(?<id>[\w-]+)$/i.exec(String(token).trim());
  return match?.groups?.id ?? null;
};
