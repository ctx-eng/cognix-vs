import type { Model } from '../models/model';

export function getCompletionsModelConfig(model: Model): { model: string; maxTokens?: number } {
  return {
    model: model.id,
    maxTokens: model.contextWindow?.output,
  };
}
