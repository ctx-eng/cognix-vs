export const ROOT_CONTEXT = {};
export const SpanStatusCode = { OK: 0, ERROR: 1, UNSET: 2 };

export const context = {
  active: () => ROOT_CONTEXT,
  with: (_ctx: any, fn: () => any) => fn(),
};

export const propagation = {
  inject: (_ctx: any, _carrier: any, _opts?: any) => {},
  extract: (_ctx: any, _carrier: any, _opts?: any) => ROOT_CONTEXT,
};

export const trace = {
  getTracer: () => ({
    startActiveSpan: (_name: string, fn: (span: any) => any) => fn({}),
    startSpan: () => ({}),
  }),
};

export const Span = class {};

const opentelemetry = {
  trace,
  context,
  propagation,
  ROOT_CONTEXT,
  SpanStatusCode,
};

export default opentelemetry;

export const fetchEventSource = async () => {};
