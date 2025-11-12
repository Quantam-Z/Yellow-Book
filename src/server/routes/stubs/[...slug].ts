import { defineEventHandler, setHeader, createError } from "h3";
import { STUB_REGISTRY } from "~/services/stubRegistry";
import { executeStubRequest } from "~/services/stubClient";

const JSON_EXTENSION = ".json";

const normalizeResource = (slug: string) => {
  let resource = slug.trim();
  if (!resource) {
    throw createError({ statusCode: 400, statusMessage: "Missing stub resource" });
  }

  if (resource.endsWith(JSON_EXTENSION)) {
    resource = resource.slice(0, -JSON_EXTENSION.length);
  }

  return resource;
};

export default defineEventHandler(async (event) => {
  const params = event.context.params || {};
  const slugParam = params.slug;

  const segments = Array.isArray(slugParam) ? slugParam : [slugParam].filter(Boolean);

  if (!segments.length) {
    throw createError({ statusCode: 400, statusMessage: "Missing stub resource" });
  }

  if (segments.length > 2) {
    throw createError({
      statusCode: 404,
      statusMessage: `Page not found: /stubs/${segments.join("/")}`,
    });
  }

  const [resourceSegment, idSegment] = segments as [string, string?];
  const resource = normalizeResource(String(resourceSegment));

  if (!STUB_REGISTRY[resource]) {
    throw createError({
      statusCode: 404,
      statusMessage: `Unknown stub resource "${resource}"`,
    });
  }

  let identifier: string | number | undefined;
  if (idSegment != null) {
    let normalizedId = String(idSegment).trim();
    if (!normalizedId) {
      throw createError({
        statusCode: 400,
        statusMessage: `Invalid stub identifier for resource "${resource}"`,
      });
    }

    if (normalizedId.endsWith(JSON_EXTENSION)) {
      normalizedId = normalizedId.slice(0, -JSON_EXTENSION.length);
    }

    identifier = normalizedId;
  }

  const response = await executeStubRequest({
    resource,
    method: "GET",
    delay: 0,
    id: identifier,
  });

  setHeader(event, "Content-Type", "application/json; charset=utf-8");
  return response.data ?? null;
});
