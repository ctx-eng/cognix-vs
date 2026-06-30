import {
  CHAT_INPUT_TOKEN_BUDGET,
  CHAT_OUTPUT_TOKEN_BUDGET,
  EXTENDED_CHAT_INPUT_TOKEN_BUDGET,
  EXTENDED_USER_CONTEXT_TOKEN_BUDGET,
} from '../token/constants';
import type { ClientSideConfig, ContextWindow, ModelCapability, ModelCategory, ModelConfigAllTiers, ModelStatus, ModelTier } from './modelsService';
import { type ModelRef, type ModelRefStr, parseModelRef } from './ref';
import { ModelTag } from './tags';
import { type ModelContextWindow, ModelUsage } from './types';
import { getModelInfo } from './utils';

export interface Model {
  readonly id: string;
  readonly usage: ModelUsage[];
  readonly contextWindow: ModelContextWindow;
  readonly clientSideConfig?: ClientSideConfig;
  readonly provider: string;
  readonly title: string;
  readonly tags: ModelTag[];
  readonly modelRef?: ModelRef;
  disabled?: boolean;
}

interface ModelParams {
  id: string;
  modelRef?: ModelRefStr | ModelRef;
  usage: ModelUsage[];
  contextWindow?: ModelContextWindow;
  clientSideConfig?: ClientSideConfig;
  tags?: ModelTag[];
  provider?: string;
  title?: string;
}

export function createModel({
  id,
  modelRef: modelRefInput,
  usage,
  contextWindow = {
    input: CHAT_INPUT_TOKEN_BUDGET,
    output: CHAT_OUTPUT_TOKEN_BUDGET,
  },
  clientSideConfig,
  tags = [],
  provider,
  title,
}: ModelParams): Model {
  const resolvedRef: ModelRef = resolveModelRef(modelRefInput, id, provider, title);
  const resolvedTags = resolveModelTags(tags, clientSideConfig);

  return {
    id,
    modelRef: resolvedRef,
    usage,
    contextWindow,
    clientSideConfig,
    tags: resolvedTags,
    provider: resolvedRef.providerId,
    title: title ?? resolvedRef.modelId,
  };
}

function resolveModelRef(
  modelRefInput: ModelRefStr | ModelRef | undefined,
  id: string,
  provider?: string,
  title?: string,
): ModelRef {
  if (typeof modelRefInput === 'object' && modelRefInput !== null) {
    return modelRefInput;
  }
  if (typeof modelRefInput === 'string') {
    return parseModelRef(modelRefInput as ModelRefStr);
  }
  const info = getModelInfo(id);
  return {
    providerId: provider ?? info.provider,
    apiVersionId: 'unknown',
    modelId: title ?? info.title,
  };
}

function resolveModelTags(tags: ModelTag[], clientSideConfig?: ClientSideConfig): ModelTag[] {
  const result = [...tags];
  if (clientSideConfig?.options?.categories?.includes(ModelTag.Vision)) {
    result.push(ModelTag.Vision);
  }
  return result;
}

export interface ServerModel {
  modelRef: ModelRefStr;
  displayName: string;
  modelName: string;
  capabilities: ModelCapability[];
  category: ModelCategory;
  status: ModelStatus;
  tier: ModelTier;
  modelConfigAllTiers?: ModelConfigAllTiers;
  contextWindow: ContextWindow;
  clientSideConfig?: ClientSideConfig;
}

export function createModelFromServerModel(
  {
    modelRef,
    displayName,
    capabilities,
    category,
    tier,
    status,
    clientSideConfig,
    contextWindow,
  }: ServerModel,
  enhancedContextWindowFlagEnabled: boolean,
): Model {
  const ref = parseModelRef(modelRef);
  const { maxInputTokens, maxOutputTokens } = contextWindow;
  const resolvedContextWindow: ModelContextWindow = {
    input: maxInputTokens,
    output: maxOutputTokens,
  };
  const usage = capabilities.flatMap(capabilityToUsage);

  if (capabilities.includes('reasoning') && usage.includes(ModelUsage.Edit)) {
    usage.splice(usage.indexOf(ModelUsage.Edit), 1);
  }

  if (maxInputTokens === EXTENDED_CHAT_INPUT_TOKEN_BUDGET + EXTENDED_USER_CONTEXT_TOKEN_BUDGET) {
    resolvedContextWindow.input = EXTENDED_CHAT_INPUT_TOKEN_BUDGET;
    resolvedContextWindow.context = { user: EXTENDED_USER_CONTEXT_TOKEN_BUDGET };
  }

  if (
    enhancedContextWindowFlagEnabled &&
    contextWindow.maxUserInputTokens &&
    maxInputTokens > 0 &&
    maxInputTokens > contextWindow.maxUserInputTokens
  ) {
    resolvedContextWindow.input = contextWindow.maxUserInputTokens;
    resolvedContextWindow.context = {
      user: maxInputTokens - contextWindow.maxUserInputTokens,
    };
  }

  return createModel({
    id: modelRef,
    modelRef: ref,
    usage,
    contextWindow: resolvedContextWindow,
    clientSideConfig,
    tags: getServerModelTags(capabilities, category, status, tier),
    provider: ref.providerId,
    title: displayName,
  });
}

function capabilityToUsage(capability: ModelCapability): ModelUsage[] {
  switch (capability) {
    case 'autocomplete':
      return [ModelUsage.Autocomplete];
    case 'chat':
      return [ModelUsage.Chat];
    case 'edit':
      return [ModelUsage.Edit];
    default:
      return [];
  }
}

export function modelTier(model: Model): ModelTier {
  const tierSet = new Set<ModelTag>([ModelTag.Pro, ModelTag.Enterprise]);
  const tag = model.tags.find(t => tierSet.has(t));
  if (tag === ModelTag.Pro) return 'pro';
  if (tag === ModelTag.Enterprise) return 'enterprise';
  return 'free';
}

export function toLegacyModel(modelRefOrID: string): string {
  const parsed = parseModelRef(modelRefOrID as ModelRefStr);
  return parsed.modelId || modelRefOrID;
}

function getServerModelTags(
  capabilities: ModelCapability[],
  category: ModelCategory,
  status: ModelStatus,
  tier: ModelTier,
): ModelTag[] {
  const tags: ModelTag[] = [tier as unknown as ModelTag];

  if (capabilities.includes('vision')) {
    tags.push(ModelTag.Vision);
  }
  if (capabilities.includes('reasoning')) {
    tags.push(ModelTag.Reasoning);
  }

  if (status === 'waitlist') {
    tags.push(ModelTag.Waitlist);
    if (tier === 'pro') {
      tags.push(ModelTag.StreamDisabled);
    }
  } else if (status === 'internal') {
    tags.push(ModelTag.Internal);
  } else if (status === 'experimental') {
    tags.push(ModelTag.Experimental);
  }

  if (category === 'accuracy') {
    tags.push(ModelTag.Power);
  } else if (category === 'speed') {
    tags.push(ModelTag.Speed);
  } else if (category === 'balancer') {
    tags.push(ModelTag.Balancer);
  }

  return tags;
}

export const FIXTURE_MODEL = createModel({
  id: 'my-model',
  usage: [ModelUsage.Chat],
  tags: [ModelTag.Enterprise],
});
