export type CognixCommandType = 'chat' | 'edit' | 'inline' | 'custom';
export type CognixCommandMode = 'ask' | 'edit';

export interface CognixCommand {
  key: string;
  type: CognixCommandType;
  mode?: CognixCommandMode;
  description?: string;
  prompt?: string;
  context?: CognixCommandContext;
}

export interface CognixCommandContext {
  codebase?: boolean;
  selection?: boolean;
  currentFile?: boolean;
  openTabs?: boolean;
  command?: string;
  output?: string;
  filePath?: string;
}

export interface TerminalOutputArguments {
  command: string;
  output: string;
}

export enum CustomCommandType {
  User = 'user',
  Builtin = 'builtin',
}

export type DefaultCognixCommands = Record<string, CognixCommand>;

export enum DefaultChatCommands {
  Explain = 'explain',
  Fix = 'fix',
  Test = 'test',
  Doc = 'doc',
  Smell = 'smell',
  Optimize = 'optimize',
  Refactor = 'refactor',
  Search = 'search',
  Custom = 'custom',
}

export enum DefaultEditCommands {
  Edit = 'edit',
  Add = 'add',
  Fix = 'fix',
  Test = 'test',
  Doc = 'doc',
  Smell = 'smell',
}
