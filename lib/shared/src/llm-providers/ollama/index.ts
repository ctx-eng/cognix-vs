export const OLLAMA_DEFAULT_URL = 'http://localhost:11434';

export interface OllamaGenerateParams {
  model: string;
  prompt: string;
  stream?: boolean;
  options?: Record<string, any>;
}

export function createOllamaClient(baseUrl: string = OLLAMA_DEFAULT_URL) {
  return {
    async generate(params: OllamaGenerateParams): Promise<string> {
      const response = await fetch(`${baseUrl}/api/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });
      const data = await response.json();
      return data.response ?? '';
    },
  };
}

export const ollamaChatClient = createOllamaClient();
