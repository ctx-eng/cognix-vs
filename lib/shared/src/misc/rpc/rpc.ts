export interface RequestMessage {
  type: string;
  args?: any[];
  requestId: string;
}

export interface ResponseMessage {
  type: string;
  result?: any;
  error?: string;
  requestId: string;
}

export interface GenericVSCodeWrapper {
  postMessage(message: any): void;
  onMessage(callback: (message: any) => void): () => void;
}

export interface GenericWebviewAPIWrapper {
  postMessage(message: any): void;
  onMessage(callback: (message: any) => void): () => void;
}

export function proxyExtensionAPI<T extends Record<string, any>>(wrapper: GenericWebviewAPIWrapper, methods: string[]): T {
  const api = {} as T;
  for (const method of methods) {
    (api as any)[method] = (...args: any[]) => {
      const requestId = Math.random().toString(36).slice(2);
      wrapper.postMessage({ type: method, args, requestId });
    };
  }
  return api;
}

export function addMessageListenersForExtensionAPI(
  wrapper: GenericVSCodeWrapper,
  handlers: Record<string, (...args: any[]) => any>,
): () => void {
  return wrapper.onMessage((message: any) => {
    const handler = handlers[message.type];
    if (handler) {
      try {
        const result = handler(...(message.args ?? []));
        if (message.requestId) {
          wrapper.postMessage({ type: 'response', requestId: message.requestId, result });
        }
      } catch (error: any) {
        if (message.requestId) {
          wrapper.postMessage({ type: 'response', requestId: message.requestId, error: error.message });
        }
      }
    }
  });
}

export function createMessageAPIForWebview(
  wrapper: GenericVSCodeWrapper,
  methods: string[],
): Record<string, (...args: any[]) => Promise<any>> {
  const api: Record<string, (...args: any[]) => Promise<any>> = {};
  const pending = new Map<string, { resolve: (value: any) => void; reject: (reason?: any) => void }>();

  wrapper.onMessage((message: any) => {
    if (message.type === 'response' && message.requestId) {
      const pending_call = pending.get(message.requestId);
      if (pending_call) {
        pending.delete(message.requestId);
        if (message.error) {
          pending_call.reject(new Error(message.error));
        } else {
          pending_call.resolve(message.result);
        }
      }
    }
  });

  for (const method of methods) {
    api[method] = (...args: any[]) => {
      return new Promise((resolve, reject) => {
        const requestId = Math.random().toString(36).slice(2);
        pending.set(requestId, { resolve, reject });
        wrapper.postMessage({ type: method, args, requestId });
      });
    };
  }

  return api;
}

export function createMessageAPIForExtension(
  wrapper: GenericWebviewAPIWrapper,
  handlers: Record<string, (...args: any[]) => any>,
): () => void {
  return addMessageListenersForExtensionAPI(wrapper as any, handlers);
}
