export class AbortError extends Error {
  constructor(message?: string) {
    super(message ?? 'Aborted');
    this.name = 'AbortError';
  }
}

export function dependentAbortController(signal?: AbortSignal): AbortController {
  const controller = new AbortController();
  if (signal) {
    const onAbort = () => controller.abort();
    signal.addEventListener('abort', onAbort, { once: true });
    const originalAbort = controller.abort.bind(controller);
    controller.abort = () => {
      signal.removeEventListener('abort', onAbort);
      originalAbort();
    };
  }
  return controller;
}

export function onAbort(signal: AbortSignal | undefined, callback: () => void): void {
  if (signal) {
    signal.addEventListener('abort', callback, { once: true });
  }
}
