import type { CompletionParameters } from '../api/completions/types';
import type { CompletionCallbacks, CompletionLogger } from '../api/completions/client';

export interface CustomChatClientParams {
  completionsEndpoint: string;
  params: CompletionParameters;
  cb: CompletionCallbacks;
  logger?: CompletionLogger;
  signal?: AbortSignal;
}

export async function useCustomChatClient(params: CustomChatClientParams): Promise<boolean> {
  return false;
}
