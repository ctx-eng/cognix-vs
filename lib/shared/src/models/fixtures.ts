import { ModelTag } from './tags';
import { type Model, createModel } from './model';
import { ModelUsage } from './types';

export const FIXTURE_MODELS: Model[] = [
  createModel({
    id: 'anthropic::2024-01-01::claude-3-opus',
    usage: [ModelUsage.Chat, ModelUsage.Edit],
    tags: [ModelTag.Pro, ModelTag.Recommended],
    provider: 'Anthropic',
    title: 'Claude 3 Opus',
  }),
  createModel({
    id: 'anthropic::2024-01-01::claude-3-sonnet',
    usage: [ModelUsage.Chat, ModelUsage.Edit],
    tags: [ModelTag.Pro],
    provider: 'Anthropic',
    title: 'Claude 3 Sonnet',
  }),
  createModel({
    id: 'anthropic::2024-01-01::claude-3-haiku',
    usage: [ModelUsage.Chat, ModelUsage.Autocomplete],
    tags: [ModelTag.Free, ModelTag.Recommended],
    provider: 'Anthropic',
    title: 'Claude 3 Haiku',
  }),
  createModel({
    id: 'openai::2024-01-01::gpt-4',
    usage: [ModelUsage.Chat],
    tags: [ModelTag.Pro],
    provider: 'OpenAI',
    title: 'GPT-4',
  }),
  createModel({
    id: 'openai::2024-01-01::gpt-3.5-turbo',
    usage: [ModelUsage.Chat],
    tags: [ModelTag.Free],
    provider: 'OpenAI',
    title: 'GPT-3.5 Turbo',
  }),
];
