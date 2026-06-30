import type { Model } from './model';
import type { ModelRef } from './ref';

export interface ModelsService {
  getModels(): Promise<Model[]>;
  getModel(id: string): Promise<Model | undefined>;
}

let service: ModelsService | undefined;

export function setModelsService(svc: ModelsService): void {
  service = svc;
}

export function getModelsService(): ModelsService | undefined {
  return service;
}

export type { ModelRef } from './ref';
export type { ModelRefStr } from './ref';

export type ModelCapability = 'autocomplete' | 'chat' | 'edit' | 'vision' | 'reasoning';

export type ModelCategory = 'accuracy' | 'speed' | 'balancer';

export type ModelStatus = 'internal' | 'experimental' | 'stable' | 'waitlist' | 'deprecated';

export type ModelTier = 'enterprise' | 'pro' | 'free';

export interface ContextWindow {
  maxInputTokens: number;
  maxOutputTokens: number;
  maxUserInputTokens?: number;
}

export interface ClientSideConfig {
  options?: {
    categories?: string[];
  };
  [key: string]: unknown;
}

export interface ModelConfigAllTiers {
  [tier: string]: {
    maxInputTokens?: number;
    maxOutputTokens?: number;
  };
}
