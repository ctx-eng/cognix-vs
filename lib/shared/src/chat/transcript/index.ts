export { serializeChatMessage } from './messages';
export type { SerializedChatMessage } from './messages';

export interface SerializedChatInteraction {
  humanMessage: import('./messages').SerializedChatMessage;
  assistantMessage?: import('./messages').SerializedChatMessage;
  timestamp?: string;
}

export interface SerializedChatTranscript {
  interactions: SerializedChatInteraction[];
  id?: string;
  chatTitle?: string;
}
