export interface ChatClient {
  sendMessage(message: string): Promise<string>;
  streamMessage(message: string): AsyncIterable<string>;
  abort(): void;
}

export function createChatClient(transport: any): ChatClient {
  return {
    async sendMessage(message: string): Promise<string> {
      return `Echo: ${message}`;
    },
    async *streamMessage(message: string): AsyncIterable<string> {
      yield `Echo: ${message}`;
    },
    abort() {},
  };
}
