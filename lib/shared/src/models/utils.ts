import type { Model } from './model';
import { parseModelRef } from './ref';
import { ModelTag } from './tags';

export function getProviderName(model: Model): string {
  return parseModelRef(model.id as any).providerId;
}

export function getModelInfo(
  modelRefOrID: string,
): { provider: string; title: string } {
  try {
    const ref = parseModelRef(modelRefOrID as any);
    return { provider: ref.providerId, title: ref.modelId };
  } catch {
    return { provider: 'unknown', title: modelRefOrID };
  }
}

export function isCognixProModel(model: Model): boolean {
  return model.tags.includes(ModelTag.Pro);
}

export function isCustomModel(model: Model): boolean {
  return model.tags.includes(ModelTag.Custom);
}

export function toModelRefStr(model: Model): string {
  return model.id;
}

export function isWaitlistModel(model: Model): boolean {
  return model.tags.includes(ModelTag.Waitlist);
}
