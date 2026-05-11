export class AppError extends Error {
  public readonly code: string;
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(
    code: string,
    message: string,
    statusCode: number = 500,
    isOperational: boolean = true
  ) {
    super(message);
    this.name = 'AppError';
    this.code = code;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Object.setPrototypeOf(this, AppError.prototype);
  }

  toJSON() {
    return {
      error: {
        code: this.code,
        message: this.message,
      },
    };
  }
}

export class ValidationError extends AppError {
  public readonly fieldErrors: Record<string, string[]>;

  constructor(message: string, fieldErrors: Record<string, string[]> = {}) {
    super('VALIDATION_ERROR', message, 400);
    this.name = 'ValidationError';
    this.fieldErrors = fieldErrors;
    Object.setPrototypeOf(this, ValidationError.prototype);
  }

  toJSON() {
    return {
      error: {
        code: this.code,
        message: this.message,
        fields: this.fieldErrors,
      },
    };
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string, id?: string | number) {
    const message = id ? `${resource} with id '${id}' not found` : `${resource} not found`;
    super('NOT_FOUND', message, 404);
    this.name = 'NotFoundError';
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = 'Unauthorized') {
    super('UNAUTHORIZED', message, 401);
    this.name = 'UnauthorizedError';
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }
}

export class RateLimitError extends AppError {
  constructor(retryAfterSeconds: number = 60) {
    super('RATE_LIMITED', `Too many requests. Retry after ${retryAfterSeconds}s`, 429);
    this.name = 'RateLimitError';
    Object.setPrototypeOf(this, RateLimitError.prototype);
  }
}

export class DatabaseError extends AppError {
  constructor(message: string, cause?: Error) {
    super('DATABASE_ERROR', message, 500, false);
    this.name = 'DatabaseError';
    if (cause) this.cause = cause;
    Object.setPrototypeOf(this, DatabaseError.prototype);
  }
}

export class TimeoutError extends AppError {
  constructor(operation: string, timeoutMs: number) {
    super('TIMEOUT', `${operation} timed out after ${timeoutMs}ms`, 504);
    this.name = 'TimeoutError';
    Object.setPrototypeOf(this, TimeoutError.prototype);
  }
}

export function isOperationalError(error: unknown): error is AppError {
  return error instanceof AppError && error.isOperational;
}

export function isAppError(error: unknown): error is AppError {
  return error instanceof AppError;
}
