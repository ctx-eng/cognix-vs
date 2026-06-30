export type ReadonlyDeep<T> = {
  readonly [P in keyof T]: ReadonlyDeep<T[P]>;
};

export function assertUnreachable(_value: never, message?: string): never {
  throw new Error(message ?? 'Unreachable code reached');
}

export function convertGitCloneURLToCodebaseName(url: string): string {
  const match = url.match(/(?:https?:\/\/|git@)([^/:]+)[/:]([^/]+)\/(.+)\.git/);
  if (match) {
    return `${match[1]}/${match[2]}/${match[3]}`;
  }
  return url;
}

export function createSubscriber<T = unknown>() {
  const listeners: Set<(value: T) => void> = new Set();
  return {
    subscribe: (listener: (value: T) => void) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    notify: (value: T) => {
      listeners.forEach((l) => l(value));
    },
  };
}

export function isError(value: unknown): value is Error {
  return value instanceof Error;
}

export function nextTick(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, 0));
}

export function promise<T>() {
  let resolve!: (value: T | PromiseLike<T>) => void;
  let reject!: (reason?: unknown) => void;
  const p = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise: p, resolve, reject };
}
