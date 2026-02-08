/**
 * Standard API response contract for all HTTP responses.
 *
 * @template T - Data payload type.
 */
export interface APIResponse<T> {
  /** Indicates if the operation was successful. */
  success: boolean;
  /** HTTP status code returned by the server. */
  result: number;
  /** Human-readable message describing the outcome. */
  message: string;
  /** Error description when `success` is false, otherwise null. */
  error: string | null;
  /** Response payload, null when not applicable. */
  data: T | null;
  /** Optional error details (e.g., validation errors). */
  details?: unknown;
  /** Optional pagination metadata for list endpoints. */
  meta?: PaginationMeta;
  /** Optional debug info in development mode. */
  debug?: ResponseDebug;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  hasNext: boolean;
  hasPrev: boolean;
  totalPages?: number;
}

export interface ResponseDebug {
  timestamp: string;
  path: string;
}
