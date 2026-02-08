import { HttpStatus } from '@nestjs/common';
import { ApiResponseFactory } from './api-response.factory';

describe('ApiResponseFactory', () => {
  it('builds success response', () => {
    const payload = ApiResponseFactory.success({ ok: true }, 'All good');
    expect(payload.success).toBe(true);
    expect(payload.result).toBe(HttpStatus.OK);
    expect(payload.message).toBe('All good');
    expect(payload.error).toBeNull();
    expect(payload.data).toEqual({ ok: true });
  });

  it('builds created response', () => {
    const payload = ApiResponseFactory.created({ id: 1 });
    expect(payload.result).toBe(HttpStatus.CREATED);
    expect(payload.success).toBe(true);
  });

  it('builds bad request response', () => {
    const payload = ApiResponseFactory.badRequest('Invalid', [
      'field required',
    ]);
    expect(payload.success).toBe(false);
    expect(payload.result).toBe(HttpStatus.BAD_REQUEST);
    expect(payload.error).toBe('BAD_REQUEST');
    expect(payload.details).toEqual(['field required']);
  });

  it('builds fromStatus for error', () => {
    const payload = ApiResponseFactory.fromStatus({
      status: HttpStatus.NOT_FOUND,
      message: 'Missing',
    });
    expect(payload.success).toBe(false);
    expect(payload.result).toBe(HttpStatus.NOT_FOUND);
    expect(payload.message).toBe('Missing');
    expect(payload.error).toBe('NOT_FOUND');
  });
});
