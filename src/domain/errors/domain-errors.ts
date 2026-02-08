export type DomainErrorCode =
  | 'NOT_FOUND'
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'CONFLICT'
  | 'BUSINESS_RULE'
  | 'VALIDATION';

export class DomainError extends Error {
  public readonly code: DomainErrorCode;
  public readonly details?: Record<string, unknown>;

  constructor(
    code: DomainErrorCode,
    message: string,
    details?: Record<string, unknown>,
  ) {
    super(message);
    this.code = code;
    this.details = details;
  }
}

export class NotFoundError extends DomainError {
  constructor(message = 'Not found', details?: Record<string, unknown>) {
    super('NOT_FOUND', message, details);
  }
}

export class UnauthorizedError extends DomainError {
  constructor(message = 'Unauthorized', details?: Record<string, unknown>) {
    super('UNAUTHORIZED', message, details);
  }
}

export class ForbiddenError extends DomainError {
  constructor(message = 'Forbidden', details?: Record<string, unknown>) {
    super('FORBIDDEN', message, details);
  }
}

export class ConflictError extends DomainError {
  constructor(message = 'Conflict', details?: Record<string, unknown>) {
    super('CONFLICT', message, details);
  }
}

export class BusinessRuleError extends DomainError {
  constructor(
    message = 'Business rule violation',
    details?: Record<string, unknown>,
  ) {
    super('BUSINESS_RULE', message, details);
  }
}

export class ValidationError extends DomainError {
  constructor(message = 'Validation error', details?: Record<string, unknown>) {
    super('VALIDATION', message, details);
  }
}
