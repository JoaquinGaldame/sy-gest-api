import { HttpStatus } from '@nestjs/common';
import type {
  APIResponse,
  PaginationMeta,
  ResponseDebug,
} from './api-response.types';

export class ApiResponseFactory {
  static success<T>(
    data: T,
    message = 'OK',
    meta?: PaginationMeta,
    debug?: ResponseDebug,
  ): APIResponse<T> {
    return this.build<T>({
      success: true,
      result: HttpStatus.OK,
      message,
      error: null,
      data,
      meta,
      debug,
    });
  }

  static created<T>(
    data: T,
    message = 'Created',
    meta?: PaginationMeta,
    debug?: ResponseDebug,
  ): APIResponse<T> {
    return this.build<T>({
      success: true,
      result: HttpStatus.CREATED,
      message,
      error: null,
      data,
      meta,
      debug,
    });
  }

  static accepted<T>(
    data: T | null = null,
    message = 'Accepted',
    meta?: PaginationMeta,
    debug?: ResponseDebug,
  ): APIResponse<T> {
    return this.build<T>({
      success: true,
      result: HttpStatus.ACCEPTED,
      message,
      error: null,
      data,
      meta,
      debug,
    });
  }

  static partialContent<T>(
    data: T,
    message = 'Partial Content',
    meta?: PaginationMeta,
    debug?: ResponseDebug,
  ): APIResponse<T> {
    return this.build<T>({
      success: true,
      result: HttpStatus.PARTIAL_CONTENT,
      message,
      error: null,
      data,
      meta,
      debug,
    });
  }

  static noContent(
    message = 'No Content',
    debug?: ResponseDebug,
  ): APIResponse<null> {
    return this.build<null>({
      success: true,
      result: HttpStatus.NO_CONTENT,
      message,
      error: null,
      data: null,
      debug,
    });
  }

  static movedPermanently(
    message = 'Moved Permanently',
    debug?: ResponseDebug,
  ): APIResponse<null> {
    return this.build<null>({
      success: true,
      result: HttpStatus.MOVED_PERMANENTLY,
      message,
      error: null,
      data: null,
      debug,
    });
  }

  static found(message = 'Found', debug?: ResponseDebug): APIResponse<null> {
    return this.build<null>({
      success: true,
      result: HttpStatus.FOUND,
      message,
      error: null,
      data: null,
      debug,
    });
  }

  static notModified(
    message = 'Not Modified',
    debug?: ResponseDebug,
  ): APIResponse<null> {
    return this.build<null>({
      success: true,
      result: HttpStatus.NOT_MODIFIED,
      message,
      error: null,
      data: null,
      debug,
    });
  }

  static badRequest(
    message = 'Bad Request',
    details?: unknown,
    debug?: ResponseDebug,
  ): APIResponse<null> {
    return this.build<null>({
      success: false,
      result: HttpStatus.BAD_REQUEST,
      message,
      error: 'BAD_REQUEST',
      data: null,
      details,
      debug,
    });
  }

  static unauthorized(
    message = 'Unauthorized',
    details?: unknown,
    debug?: ResponseDebug,
  ): APIResponse<null> {
    return this.build<null>({
      success: false,
      result: HttpStatus.UNAUTHORIZED,
      message,
      error: 'UNAUTHORIZED',
      data: null,
      details,
      debug,
    });
  }

  static notAuthorized(
    message = 'Forbidden',
    details?: unknown,
    debug?: ResponseDebug,
  ): APIResponse<null> {
    return this.build<null>({
      success: false,
      result: HttpStatus.FORBIDDEN,
      message,
      error: 'FORBIDDEN',
      data: null,
      details,
      debug,
    });
  }

  static notFound(
    message = 'Not Found',
    details?: unknown,
    debug?: ResponseDebug,
  ): APIResponse<null> {
    return this.build<null>({
      success: false,
      result: HttpStatus.NOT_FOUND,
      message,
      error: 'NOT_FOUND',
      data: null,
      details,
      debug,
    });
  }

  static methodNotAllowed(
    message = 'Method Not Allowed',
    details?: unknown,
    debug?: ResponseDebug,
  ): APIResponse<null> {
    return this.build<null>({
      success: false,
      result: HttpStatus.METHOD_NOT_ALLOWED,
      message,
      error: 'METHOD_NOT_ALLOWED',
      data: null,
      details,
      debug,
    });
  }

  static conflict(
    message = 'Conflict',
    details?: unknown,
    debug?: ResponseDebug,
  ): APIResponse<null> {
    return this.build<null>({
      success: false,
      result: HttpStatus.CONFLICT,
      message,
      error: 'CONFLICT',
      data: null,
      details,
      debug,
    });
  }

  static unprocessableEntity(
    message = 'Unprocessable Entity',
    details?: unknown,
    debug?: ResponseDebug,
  ): APIResponse<null> {
    return this.build<null>({
      success: false,
      result: HttpStatus.UNPROCESSABLE_ENTITY,
      message,
      error: 'UNPROCESSABLE_ENTITY',
      data: null,
      details,
      debug,
    });
  }

  static tooManyRequests(
    message = 'Too Many Requests',
    details?: unknown,
    debug?: ResponseDebug,
  ): APIResponse<null> {
    return this.build<null>({
      success: false,
      result: HttpStatus.TOO_MANY_REQUESTS,
      message,
      error: 'TOO_MANY_REQUESTS',
      data: null,
      details,
      debug,
    });
  }

  static error(
    message = 'Internal Server Error',
    details?: unknown,
    debug?: ResponseDebug,
  ): APIResponse<null> {
    return this.build<null>({
      success: false,
      result: HttpStatus.INTERNAL_SERVER_ERROR,
      message,
      error: 'INTERNAL_SERVER_ERROR',
      data: null,
      details,
      debug,
    });
  }

  static badGateway(
    message = 'Bad Gateway',
    details?: unknown,
    debug?: ResponseDebug,
  ): APIResponse<null> {
    return this.build<null>({
      success: false,
      result: HttpStatus.BAD_GATEWAY,
      message,
      error: 'BAD_GATEWAY',
      data: null,
      details,
      debug,
    });
  }

  static serviceUnavailable(
    message = 'Service Unavailable',
    details?: unknown,
    debug?: ResponseDebug,
  ): APIResponse<null> {
    return this.build<null>({
      success: false,
      result: HttpStatus.SERVICE_UNAVAILABLE,
      message,
      error: 'SERVICE_UNAVAILABLE',
      data: null,
      details,
      debug,
    });
  }

  static gatewayTimeout(
    message = 'Gateway Timeout',
    details?: unknown,
    debug?: ResponseDebug,
  ): APIResponse<null> {
    return this.build<null>({
      success: false,
      result: HttpStatus.GATEWAY_TIMEOUT,
      message,
      error: 'GATEWAY_TIMEOUT',
      data: null,
      details,
      debug,
    });
  }

  static fromStatus<T>(params: {
    status: number;
    data?: T | null;
    message?: string;
    error?: string | null;
    details?: unknown;
    meta?: PaginationMeta;
    debug?: ResponseDebug;
  }): APIResponse<T> {
    const success = params.status < 400;
    return this.build<T>({
      success,
      result: params.status,
      message: params.message ?? this.defaultMessage(params.status),
      error: success
        ? null
        : (params.error ?? this.defaultError(params.status)),
      data: params.data ?? null,
      details: params.details,
      meta: params.meta,
      debug: params.debug,
    });
  }

  static build<T>(payload: {
    success: boolean;
    result: number;
    message: string;
    error: string | null;
    data: T | null;
    details?: unknown;
    meta?: PaginationMeta;
    debug?: ResponseDebug;
  }): APIResponse<T> {
    return payload;
  }

  static isApiResponse(value: unknown): value is APIResponse<unknown> {
    if (typeof value !== 'object' || value === null) return false;
    const maybe = value as Record<string, unknown>;
    return (
      'success' in maybe &&
      'result' in maybe &&
      'message' in maybe &&
      'error' in maybe &&
      'data' in maybe
    );
  }

  static defaultMessage(status: number): string {
    const messages: Record<number, string> = {
      [HttpStatus.OK]: 'OK',
      [HttpStatus.CREATED]: 'Created',
      [HttpStatus.ACCEPTED]: 'Accepted',
      [HttpStatus.NO_CONTENT]: 'No Content',
      [HttpStatus.PARTIAL_CONTENT]: 'Partial Content',
      [HttpStatus.MOVED_PERMANENTLY]: 'Moved Permanently',
      [HttpStatus.FOUND]: 'Found',
      [HttpStatus.NOT_MODIFIED]: 'Not Modified',
      [HttpStatus.BAD_REQUEST]: 'Bad Request',
      [HttpStatus.UNAUTHORIZED]: 'Unauthorized',
      [HttpStatus.FORBIDDEN]: 'Forbidden',
      [HttpStatus.NOT_FOUND]: 'Not Found',
      [HttpStatus.METHOD_NOT_ALLOWED]: 'Method Not Allowed',
      [HttpStatus.CONFLICT]: 'Conflict',
      [HttpStatus.UNPROCESSABLE_ENTITY]: 'Unprocessable Entity',
      [HttpStatus.TOO_MANY_REQUESTS]: 'Too Many Requests',
      [HttpStatus.INTERNAL_SERVER_ERROR]: 'Internal Server Error',
      [HttpStatus.BAD_GATEWAY]: 'Bad Gateway',
      [HttpStatus.SERVICE_UNAVAILABLE]: 'Service Unavailable',
      [HttpStatus.GATEWAY_TIMEOUT]: 'Gateway Timeout',
    };
    return messages[status] ?? 'OK';
  }

  static defaultError(status: number): string {
    const errors: Record<number, string> = {
      [HttpStatus.BAD_REQUEST]: 'BAD_REQUEST',
      [HttpStatus.UNAUTHORIZED]: 'UNAUTHORIZED',
      [HttpStatus.FORBIDDEN]: 'FORBIDDEN',
      [HttpStatus.NOT_FOUND]: 'NOT_FOUND',
      [HttpStatus.METHOD_NOT_ALLOWED]: 'METHOD_NOT_ALLOWED',
      [HttpStatus.CONFLICT]: 'CONFLICT',
      [HttpStatus.UNPROCESSABLE_ENTITY]: 'UNPROCESSABLE_ENTITY',
      [HttpStatus.TOO_MANY_REQUESTS]: 'TOO_MANY_REQUESTS',
      [HttpStatus.BAD_GATEWAY]: 'BAD_GATEWAY',
      [HttpStatus.SERVICE_UNAVAILABLE]: 'SERVICE_UNAVAILABLE',
      [HttpStatus.GATEWAY_TIMEOUT]: 'GATEWAY_TIMEOUT',
      [HttpStatus.INTERNAL_SERVER_ERROR]: 'INTERNAL_SERVER_ERROR',
    };
    return errors[status] ?? 'INTERNAL_SERVER_ERROR';
  }
}
