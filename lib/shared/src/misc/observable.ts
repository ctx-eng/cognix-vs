export interface Observable<T> {
  subscribe(observer: { next?: (value: T) => void; error?: (err: any) => void; complete?: () => void }): () => void;
}

export function observableFrom<T>(values: T[]): Observable<T> {
  return {
    subscribe(observer) {
      for (const value of values) {
        observer.next?.(value);
      }
      observer.complete?.();
      return () => {};
    },
  };
}

export function mapObservable<T, R>(obs: Observable<T>, fn: (value: T) => R): Observable<R> {
  return {
    subscribe(observer) {
      return obs.subscribe({
        next: (value) => observer.next?.(fn(value)),
        error: (err) => observer.error?.(err),
        complete: () => observer.complete?.(),
      });
    },
  };
}

export function combineLatest<T, R>(observables: Observable<T>[], combine: (...values: T[]) => R): Observable<R> {
  return {
    subscribe(observer) {
      const latest = new Array<T>(observables.length).fill(undefined as any);
      const hasValue = new Array<boolean>(observables.length).fill(false);
      const disposers: (() => void)[] = [];

      function notifyIfAllReady() {
        if (hasValue.every(Boolean)) {
          observer.next?.(combine(...latest));
        }
      }

      for (let i = 0; i < observables.length; i++) {
        const idx = i;
        disposers.push(
          observables[idx].subscribe({
            next: (value) => {
              latest[idx] = value;
              hasValue[idx] = true;
              notifyIfAllReady();
            },
            error: (err) => observer.error?.(err),
            complete: () => {},
          }),
        );
      }

      return () => disposers.forEach((d) => d());
    },
  };
}

export function isObservable(value: any): value is Observable<any> {
  return value && typeof value.subscribe === 'function';
}
