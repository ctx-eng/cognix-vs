import { isRateLimitError } from '../api/errors';

export function handleRateLimitError(error: unknown): { retryAfter?: number; message: string } | undefined {
  if (isRateLimitError(error)) {
    return {
      retryAfter: (error as any).retryAfter,
      message: (error as any).message ?? 'Rate limited',
    };
  }
  return undefined;
}
