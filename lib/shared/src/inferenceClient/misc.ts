export enum CompletionStopReason {
  StreamEnd = 'stream_end',
  MaxTokens = 'max_tokens',
  StopSequence = 'stop_sequence',
  ContentFilter = 'content_filter',
  Error = 'error',
}

export interface CodeCompletionsClient {
  complete(params: CodeCompletionsParams): Promise<CompletionResponseWithMetaData>;
  stream?(params: CodeCompletionsParams): AsyncIterable<CompletionResponseWithMetaData>;
}

export interface CodeCompletionsParams {
  messages: Array<{ speaker: string; text: string }>;
  maxTokensToSample: number;
  temperature?: number;
  model?: string;
}

export interface SerializedCodeCompletionsParams {
  messages: Array<{ speaker: string; text: string }>;
  maxTokensToSample: number;
  temperature?: number;
  model?: string;
}

export type CompletionResponseGenerator = AsyncGenerator<CompletionResponseWithMetaData>;

export interface CompletionResponseWithMetaData {
  completion: string;
  stopReason?: string;
  usage?: {
    completionTokens?: number;
    promptTokens?: number;
    totalTokens?: number;
  };
}

export type CodeCompletionProviderOptions = Record<string, any>;
