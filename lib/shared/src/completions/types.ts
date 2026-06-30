export interface CompletionProviderConfig {
  provider: string;
  model: string;
  maxTokens?: number;
  temperature?: number;
}

export interface CompletionsConfig {
  providers: CompletionProviderConfig[];
  enabled: boolean;
}
