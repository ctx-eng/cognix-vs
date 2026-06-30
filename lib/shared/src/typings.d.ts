declare module '@microsoft/fetch-event-source' {
  export function fetchEventSource(
    url: string,
    options: {
      method?: string;
      headers?: Record<string, string>;
      body?: string;
      signal?: AbortSignal;
      openWhenHidden?: boolean;
      onopen?: (response: Response) => Promise<void>;
      onmessage?: (message: { event: string; data: string }) => void;
      onerror?: (error: Error) => void;
      fetch?: typeof globalThis.fetch;
    },
  ): Promise<void>;
}

declare module '@opentelemetry/api' {
  export interface Span {
    setAttribute(key: string, value: any): void;
    setAttributes(attributes: Record<string, any>): void;
    addEvent(name: string, attributes?: Record<string, any>): void;
    setStatus(status: { code: number }): void;
    recordException(error: Error): void;
    end(): void;
    spanContext(): { traceId: string; spanId: string };
  }

  export const ROOT_CONTEXT: Context;

  export const SpanStatusCode: {
    OK: number;
    ERROR: number;
    UNSET: number;
  };

  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface Context {}

  export const context: {
    active(): Context;
    with<T>(ctx: Context, fn: () => T): T;
  };

  export const propagation: {
    inject(context: Context, carrier: any, opts?: { set: (carrier: any, key: string, value: any) => void }): void;
    extract(context: Context, carrier: any, opts?: { get: (carrier: any, key: string) => any; keys: (carrier: any) => string[] }): Context;
  };

  export const trace: {
    getTracer(
      name: string,
      version?: string,
    ): {
      startActiveSpan<R>(name: string, fn: (span: Span) => R): R;
      startSpan(name: string): Span;
    };
    getActiveSpan(): Span | undefined;
  };
}

declare module 'immer' {
  export function enablePatches(): void;
  export function enableMapSet(): void;
}
