export const events = {
  CHAT_STARTED: 'cognix.chat.started',
  CHAT_MESSAGE_SENT: 'cognix.chat.messageSent',
  CHAT_MESSAGE_RECEIVED: 'cognix.chat.messageReceived',
  EDIT_COMPLETED: 'cognix.edit.completed',
  AUTOCOMPLETE_SUGGESTION: 'cognix.autocomplete.suggestion',
  AUTOCOMPLETE_ACCEPTED: 'cognix.autocomplete.accepted',
  COMMAND_EXECUTED: 'cognix.command.executed',
  ERROR_OCCURRED: 'cognix.error.occurred',
} as const;
