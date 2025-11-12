import { defineEventHandler, readBody, createError } from "h3";
import { executeStubRequest } from "~/services/stubClient";

type LoginPayload = {
  email?: string;
  password?: string;
};

const normalizeEmail = (value: unknown) =>
  typeof value === "string" ? value.trim().toLowerCase() : String(value ?? "").trim().toLowerCase();

export default defineEventHandler(async (event) => {
  const body = await readBody<LoginPayload>(event);
  const email = normalizeEmail(body?.email);

  if (!email) {
    throw createError({
      statusCode: 400,
      statusMessage: "Email is required",
      data: { error: "EMAIL_REQUIRED" },
    });
  }

  const response = await executeStubRequest({
    resource: "users",
    method: "GET",
    delay: 0,
  });

  const candidates = Array.isArray(response.data) ? response.data : [];
  const matchedUser =
    candidates.find(
      (candidate) => typeof candidate?.email === "string" && normalizeEmail(candidate.email) === email,
    ) ?? null;

  if (!matchedUser) {
    throw createError({
      statusCode: 401,
      statusMessage: "Invalid credentials",
      data: { error: "INVALID_CREDENTIALS" },
    });
  }

  const token = `stub-token-${matchedUser.id ?? "guest"}`;
  const user = { ...matchedUser };

  return {
    token,
    user,
    message: "Authenticated with stub credentials",
  };
});
