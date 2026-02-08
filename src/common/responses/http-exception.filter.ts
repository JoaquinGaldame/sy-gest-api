import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { DomainError } from '../../domain/errors/domain-errors';
import { ApiResponseFactory } from './api-response.factory';
import type { ResponseDebug } from './api-response.types';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const isDev = process.env.NODE_ENV !== 'production';
    const debug = isDev ? this.buildDebug(request) : undefined;

    if (exception instanceof DomainError) {
      const status = this.mapDomainStatus(exception.code);
      response.status(status).json(
        ApiResponseFactory.fromStatus({
          status,
          message: exception.message,
          error: exception.code,
          data: null,
          details: exception.details ?? null,
          debug,
        }),
      );
      return;
    }

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const { message, details, error } = this.extractHttpException(exception);
      response.status(status).json(
        ApiResponseFactory.fromStatus({
          status,
          message,
          error,
          data: null,
          details,
          debug,
        }),
      );
      return;
    }

    response
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json(
        ApiResponseFactory.error('Internal Server Error', undefined, debug),
      );
  }

  private extractHttpException(exception: HttpException): {
    message: string;
    details?: unknown;
    error?: string;
  } {
    const response = exception.getResponse();

    if (typeof response === 'string') {
      return { message: response };
    }

    if (typeof response === 'object' && response !== null) {
      const body = response as Record<string, unknown>;
      const rawMessage = body.message;
      const rawError = body.error;

      if (Array.isArray(rawMessage)) {
        return {
          message: 'Validation error',
          details: rawMessage,
          error: typeof rawError === 'string' ? rawError : 'BAD_REQUEST',
        };
      }

      return {
        message:
          typeof rawMessage === 'string' ? rawMessage : exception.message,
        details: body.details,
        error: typeof rawError === 'string' ? rawError : undefined,
      };
    }

    return { message: exception.message };
  }

  private mapDomainStatus(code: string): number {
    switch (code) {
      case 'NOT_FOUND':
        return HttpStatus.NOT_FOUND;
      case 'UNAUTHORIZED':
        return HttpStatus.UNAUTHORIZED;
      case 'FORBIDDEN':
        return HttpStatus.FORBIDDEN;
      case 'CONFLICT':
        return HttpStatus.CONFLICT;
      case 'BUSINESS_RULE':
        return HttpStatus.UNPROCESSABLE_ENTITY;
      case 'VALIDATION':
        return HttpStatus.BAD_REQUEST;
      default:
        return HttpStatus.BAD_REQUEST;
    }
  }

  private buildDebug(request: Request): ResponseDebug {
    return {
      timestamp: new Date().toISOString(),
      path: request.originalUrl ?? request.url,
    };
  }
}
