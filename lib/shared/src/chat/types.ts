export interface Chat {
  id: string;
  messages: Array<{ speaker: string; text: string }>;
  createdAt: string;
  updatedAt: string;
}

export interface ChatEvent {
  type: 'message' | 'error' | 'done';
  data?: any;
}

export interface ChatProvider {
  send(message: string): Promise<ChatEvent[]>;
  stream(message: string): AsyncIterable<ChatEvent>;
}
