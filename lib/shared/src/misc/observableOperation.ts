import type { Observable } from './observable';

export interface ObservableOperation<T> {
  execute(): Observable<T>;
  abort(): void;
}

export function createObservableOperation<T>(factory: () => Observable<T>): ObservableOperation<T> {
  let disposed = false;

  return {
    execute: () => {
      if (disposed) throw new Error('Operation is disposed');
      return factory();
    },
    abort: () => {
      disposed = true;
    },
  };
}
