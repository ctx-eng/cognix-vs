export interface WebviewMessage {
  type: string;
  data?: any;
  requestId?: string;
}

export interface WebviewAPI {
  postMessage(message: WebviewMessage): void;
  onMessage(callback: (message: WebviewMessage) => void): () => void;
}

export interface ExtensionAPI {
  postMessage(message: WebviewMessage): void;
  onMessage(callback: (message: WebviewMessage) => void): () => void;
}
