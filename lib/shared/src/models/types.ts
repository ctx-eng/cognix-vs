export type EditModel = string;
export type EditProvider = string;
export type ChatModel = string;
export type ChatProvider = string;

export enum ModelUsage {
  Chat = 'chat',
  Edit = 'edit',
  Autocomplete = 'autocomplete',
}

export interface ModelContextWindow {
  input: number;
  output: number;
  context?: {
    user: number;
    corpus?: number;
  };
}
