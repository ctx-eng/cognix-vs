export interface ClientCapabilities {
  chat: boolean;
  edit: boolean;
  autocomplete: boolean;
  customCommands: boolean;
  contextSearch: boolean;
}

export const defaultClientCapabilities: ClientCapabilities = {
  chat: true,
  edit: true,
  autocomplete: true,
  customCommands: true,
  contextSearch: true,
};
