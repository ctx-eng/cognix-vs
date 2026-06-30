export type ContextFileType = 'file' | 'directory' | 'symbol' | 'repository' | 'media';

export type SymbolKind =
  'class' | 'function' | 'method' | 'variable' | 'interface' | 'enum' | 'module' | 'namespace' | 'type' | 'property' | 'constant';

export enum ContextItemSource {
  Editor = 'editor',
  Search = 'search',
  Terminal = 'terminal',
  User = 'user',
  Selection = 'selection',
  OpenTabs = 'open-tabs',
}

export interface ContextItem {
  source: ContextItemSource;
  type: ContextFileType;
  uri?: string;
  content?: string;
  range?: { start: { line: number; character: number }; end: { line: number; character: number } };
  title?: string;
  description?: string;
}

export interface ContextItemFile extends ContextItem {
  type: 'file';
  uri: string;
}

export interface ContextItemOpenCtx extends ContextItem {
  type: 'file';
  providerUri: string;
}

export interface ContextItemWithContent extends ContextItem {
  content: string;
}

export interface ContextItemSymbol extends ContextItem {
  type: 'symbol';
  kind: SymbolKind;
  name: string;
}

export interface ContextItemTree extends ContextItem {
  type: 'directory';
  children: ContextItem[];
}

export interface ContextItemRepository extends ContextItem {
  type: 'repository';
  repoName: string;
}

export interface ContextItemCurrentSelection extends ContextItem {
  source: ContextItemSource.Selection;
}

export interface ContextItemCurrentFile extends ContextItem {
  source: ContextItemSource.Editor;
}

export interface ContextItemCurrentRepository extends ContextItem {
  type: 'repository';
}

export interface ContextItemCurrentDirectory extends ContextItem {
  type: 'directory';
}

export interface ContextItemCurrentOpenTabs extends ContextItem {
  source: ContextItemSource.OpenTabs;
}

export interface ContextItemMedia extends ContextItem {
  type: 'media';
  mediaType: 'image' | 'audio' | 'video';
  data: string;
}

export type DefaultContext = ContextItem[];

export interface ContextMessage {
  item: ContextItem;
  text: string;
}

export const FILE_RANGE_TOOLTIP_LABEL = 'View file range';
export const GENERAL_HELP_LABEL = 'How can I help you?';
export const IGNORED_FILE_WARNING_LABEL = 'This file is ignored by context filters';
export const LARGE_FILE_WARNING_LABEL = 'This file is too large for context';
export const NO_SYMBOL_MATCHES_HELP_LABEL = 'No symbols found matching your query';
