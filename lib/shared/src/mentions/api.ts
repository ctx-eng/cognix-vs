export interface ContextItemProps {
  uri: string;
  title: string;
  description?: string;
  icon?: string;
}

export interface ContextMentionProviderMetadata {
  id: string;
  title: string;
  description?: string;
  queryPatterns?: string[];
}

export type ContextMentionProviderID = string;

export const FILE_CONTEXT_MENTION_PROVIDER = 'file';
export const SYMBOL_CONTEXT_MENTION_PROVIDER = 'symbol';

export interface MentionProviderMetadataMap {
  [id: ContextMentionProviderID]: ContextMentionProviderMetadata;
}

export const mentionProvidersMetadata: MentionProviderMetadataMap = {
  [FILE_CONTEXT_MENTION_PROVIDER]: {
    id: FILE_CONTEXT_MENTION_PROVIDER,
    title: 'Files',
    description: 'Search files in the workspace',
  },
  [SYMBOL_CONTEXT_MENTION_PROVIDER]: {
    id: SYMBOL_CONTEXT_MENTION_PROVIDER,
    title: 'Symbols',
    description: 'Search symbols in the workspace',
  },
};

export const openCtxProviderMetadata: ContextMentionProviderMetadata = {
  id: 'openctx',
  title: 'Open Context',
  description: 'Providers registered via Open Context',
};
