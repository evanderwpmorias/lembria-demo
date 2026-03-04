import type { H3Event } from "h3";
import { getRequestHeader, handleCors } from "h3";

const DEV_ORIGIN_PATTERNS = [
  /^https?:\/\/localhost(?::\d+)?$/,
  /^https?:\/\/127(?:\.\d+){3}(?::\d+)?$/,
];

const DEFAULT_PRODUCTION_ORIGINS = [
  "*"
];

const ENV_PRODUCTION_ORIGINS = (process.env.CORS_ALLOWED_ORIGINS || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

export const PRODUCTION_ALLOWED_ORIGINS = (
  ENV_PRODUCTION_ORIGINS.length > 0
    ? ENV_PRODUCTION_ORIGINS
    : DEFAULT_PRODUCTION_ORIGINS
);

const resolveOrigin = (originHeader?: string | null): string | undefined => {
  if (!originHeader) {
    return undefined;
  }

  if (process.env.NODE_ENV !== "production") {
    return DEV_ORIGIN_PATTERNS.some((pattern) => pattern.test(originHeader))
      ? originHeader
      : undefined;
  }

  return PRODUCTION_ALLOWED_ORIGINS.find((allowedOrigin) => allowedOrigin === originHeader);
};

/**
 * Central CORS handler. Delegates to h3's handleCors while constraining origins.
 * Allows localhost during development and the curated list during production.
 */
export const corsHandler = (event: H3Event): boolean => {
  const originHeader = getRequestHeader(event, "origin");
  const resolvedOrigin = resolveOrigin(originHeader);
  const allowedOrigins: (string | RegExp)[] = resolvedOrigin ? [resolvedOrigin] : [];

  return handleCors(event, {
    origin: allowedOrigins,
    methods: ["GET","POST"],
    allowHeaders: ["Authorization","Content-Type"],
    credentials: true,
    maxAge: "86400",
  });
};
