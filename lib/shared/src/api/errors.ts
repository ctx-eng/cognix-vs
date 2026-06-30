export class TracedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'TracedError';
  }
}

export class AbortError extends Error {
  constructor(message?: string) {
    super(message ?? 'Aborted');
    this.name = 'AbortError';
  }
}

export class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthError';
  }
}

export class AuthConfigError extends AuthError {
  constructor(message: string) {
    super(message);
    this.name = 'AuthConfigError';
  }
}

export class InvalidAccessTokenError extends AuthError {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidAccessTokenError';
  }
}

export class NeedsAuthChallengeError extends AuthError {
  constructor(message: string) {
    super(message);
    this.name = 'NeedsAuthChallengeError';
  }
}

export class ExternalAuthProviderError extends AuthError {
  constructor(message: string) {
    super(message);
    this.name = 'ExternalAuthProviderError';
  }
}

export class EnterpriseUserDotComError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'EnterpriseUserDotComError';
  }
}

export class NetworkError extends Error {
  constructor(
    message: string,
    public readonly status?: number,
  ) {
    super(message);
    this.name = 'NetworkError';
  }
}

export class RateLimitError extends Error {
  constructor(
    message: string,
    public readonly retryAfter?: number,
    public readonly limit?: number,
  ) {
    super(message);
    this.name = 'RateLimitError';
  }
}

export class TimeoutError extends Error {
  constructor(message?: string) {
    super(message ?? 'Request timed out');
    this.name = 'TimeoutError';
  }
}

export class AvailabilityError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AvailabilityError';
  }
}

export function isAbortError(error: unknown): error is AbortError {
  return error instanceof AbortError || (error instanceof Error && error.name === 'AbortError');
}

export function isAbortErrorOrSocketHangUp(error: unknown): error is Error {
  return isAbortError(error) || (error instanceof Error && error.message.includes('socket hang up'));
}

export function isAuthError(error: unknown): error is AuthError {
  return error instanceof AuthError || (error instanceof Error && error.name === 'AuthError');
}

export function isAvailabilityError(error: unknown): error is AvailabilityError {
  return error instanceof AvailabilityError;
}

export function isContextWindowLimitError(error: unknown): boolean {
  return error instanceof Error && error.message.toLowerCase().includes('context window');
}

export function isEnterpriseUserDotComError(error: unknown): error is EnterpriseUserDotComError {
  return error instanceof EnterpriseUserDotComError;
}

export function isExternalProviderAuthError(error: unknown): error is ExternalAuthProviderError {
  return error instanceof ExternalAuthProviderError;
}

export function isInvalidAccessTokenError(error: unknown): error is InvalidAccessTokenError {
  return error instanceof InvalidAccessTokenError;
}

export function isNeedsAuthChallengeError(error: unknown): error is NeedsAuthChallengeError {
  return error instanceof NeedsAuthChallengeError;
}

export function isNetworkError(error: unknown): error is NetworkError {
  return error instanceof NetworkError;
}

export function isNetworkLikeError(error: unknown): error is Error {
  if (error instanceof Error) {
    const msg = error.message.toLowerCase();
    return (
      error instanceof NetworkError ||
      error instanceof TimeoutError ||
      error instanceof AbortError ||
      msg.includes('network') ||
      msg.includes('fetch') ||
      msg.includes('timeout') ||
      msg.includes('econnrefused') ||
      msg.includes('econnreset') ||
      msg.includes('enotfound')
    );
  }
  return false;
}

export function isRateLimitError(error: unknown): error is RateLimitError {
  return error instanceof RateLimitError;
}
