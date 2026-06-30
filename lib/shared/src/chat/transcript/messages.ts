import type { PromptString } from '../../prompt/prompt-string';

export type EventSource = 'chat' | 'editor' | 'inline' | 'api' | 'custom' | 'codebase';

export const DEFAULT_EVENT_SOURCE: EventSource = 'chat';

export const EventSourceTelemetryMetadataMapping: Record<EventSource, string> = {
  chat: 'Chat',
  editor: 'Editor',
  inline: 'Inline',
  api: 'API',
  custom: 'Custom',
  codebase: 'Codebase',
};

export type ChatHistoryKey = string;

export interface ChatError {
  kind: string;
  message: string;
  statusCode?: number;
  retryAfter?: number;
}

export function errorToChatError(error: unknown): ChatError {
  if (error instanceof Error) {
    return {
      kind: error.name,
      message: error.message,
    };
  }
  return {
    kind: 'Unknown',
    message: String(error),
  };
}

export type ProcessType = 'add' | 'edit' | 'delete' | 'refactor' | 'doc' | 'fix' | 'explain' | 'test' | 'custom';

export interface ProcessingStep {
  processType: ProcessType;
  state: 'pending' | 'processing' | 'done' | 'error';
  startedAt?: string;
  completedAt?: string;
  error?: string;
}

export interface RankedContext {
  content: string;
  score: number;
  filePath?: string;
  repoName?: string;
}

export type ChatMessageWithSearch = ChatMessage & {
  search?: ChatMessageSearch;
};

export interface ChatMessageSearch {
  query?: string;
  results?: RankedContext[];
  job?: any;
}

export interface ChatMessage {
  id?: string;
  speaker: 'human' | 'assistant';
  text?: PromptString;
  content?: any[];
  displayText?: string;
  contextFiles?: any[];
  timestamp?: string;
  processingSteps?: ProcessingStep[];
  error?: ChatError;
}

export interface UserLocalHistory {
  chat: ChatHistory;
  input: string[];
}

export interface ChatHistory {
  [key: string]: ChatMessage[];
}

export interface AccountKeyedChatHistory {
  [account: string]: UserLocalHistory;
}

export interface SerializedChatMessage {
  speaker: 'human' | 'assistant' | 'system';
  text?: string;
  content?: any[] | null;
  displayText?: string;
  contextFiles?: any[];
  timestamp?: string;
}

export function serializeChatMessage(message: ChatMessage): SerializedChatMessage {
  return {
    speaker: message.speaker,
    text: message.text?.toString(),
    content: message.content,
    displayText: message.displayText,
    contextFiles: message.contextFiles,
    timestamp: message.timestamp,
  };
}
