import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  StreamableFile,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { map } from 'rxjs/operators';
import { ApiResponseFactory } from './api-response.factory';
import type { ResponseDebug } from './api-response.types';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    const http = context.switchToHttp();
    const response = http.getResponse<Response>();
    const request = http.getRequest<Request>();
    const isDev = process.env.NODE_ENV !== 'production';

    return next.handle().pipe(
      map((data: unknown) => {
        if (data instanceof StreamableFile) return data;
        if (Buffer.isBuffer(data)) return data;
        if (data instanceof Uint8Array) return data;

        if (ApiResponseFactory.isApiResponse(data)) {
          if (isDev && !data.debug) {
            data.debug = this.buildDebug(request);
          }
          return data;
        }

        const status = response.statusCode ?? 200;
        const debug = isDev ? this.buildDebug(request) : undefined;

        return ApiResponseFactory.fromStatus({
          status,
          data: data ?? null,
          debug,
        });
      }),
    );
  }

  private buildDebug(request: Request): ResponseDebug {
    return {
      timestamp: new Date().toISOString(),
      path: request.originalUrl ?? request.url,
    };
  }
}
