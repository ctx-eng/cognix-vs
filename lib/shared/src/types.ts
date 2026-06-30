export interface PromptTemplate {
  title: string;
  description: string;
  template: string;
}

export interface CompletionRequest {
  prompt: string;
  variables?: Record<string, string>;
  model?: string;
  maxTokens?: number;
  temperature?: number;
}

export interface CompletionResponse {
  content: string;
  model: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

export interface LlmProvider {
  complete(request: CompletionRequest): Promise<CompletionResponse | undefined>;
  stream?(request: CompletionRequest): AsyncIterable<string>;
  listModels(): Promise<string[]>;
}

export interface ContextItem {
  filePath: string;
  content: string;
  score: number;
}
