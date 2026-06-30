import type { FileURI } from '../../common/uri';

export type PromptMode = 'chat' | 'edit' | 'inline';

export interface ContextFilters {
  include?: CognixContextFilterItem[];
  exclude?: CognixContextFilterItem[];
}

export interface CognixContextFilterItem {
  repoNamePattern?: string;
  filePathPattern?: string;
  lang?: string;
}

export const INCLUDE_EVERYTHING_CONTEXT_FILTERS: ContextFilters = { include: [{ repoNamePattern: '.*' }] };
export const EXCLUDE_EVERYTHING_CONTEXT_FILTERS: ContextFilters = { exclude: [{ repoNamePattern: '.*' }] };

export interface BrowserOrNodeResponse {
  status: number;
  headers: { forEach: (cb: (value: string, key: string) => void) => void };
  json: () => Promise<any>;
  text: () => Promise<string>;
}

export function isNodeResponse(response: BrowserOrNodeResponse): boolean {
  return typeof response.status === 'number';
}

export interface RepoListResponse {
  repos: Array<{ id: string; name: string }>;
}

export interface SuggestionsRepo {
  id: string;
  name: string;
  stars?: number;
  lastActive?: string;
}

export interface RepoSuggestionsSearchResponse {
  repos: SuggestionsRepo[];
}

export interface NLSSearchResult {
  repo: string;
  file: string;
  content: string;
  startLine: number;
  endLine: number;
}

export interface NLSSearchResponse {
  results: NLSSearchResult[];
}

export interface NLSSearchFileMatch {
  file: string;
  repo: string;
  content: string;
}

export interface NLSSearchDynamicFilter {
  kind: NLSSearchDynamicFilterKind;
  label: string;
  value: string;
  count: number;
}

export type NLSSearchDynamicFilterKind = 'repo' | 'lang' | 'file';

export interface GraphQLAPIClientConfig {
  endpoint: string;
  token?: string;
  customHeaders?: Record<string, string>;
}

export function setJSONAcceptContentTypeHeaders(headers: Record<string, string>): void {
  headers['Accept'] = 'application/json';
}

export function isCustomAuthChallengeResponse(response: any): boolean {
  return response?.status === 401 && response?.headers?.get('x-cognix-auth-challenge');
}

export interface CurrentUserCognixSubscription {
  plan: string;
  status: string;
  applyProRateLimit: boolean;
}

export interface CognixLLMSiteConfiguration {
  models: Array<{ model: string }>;
  maxTokens?: number;
}

export interface ContextSearchResult {
  results: Array<{ content: string; score: number }>;
}

export interface Prompt {
  id: string;
  text: string;
}

export interface event {
  type: string;
  data: any;
}

export async function verifyResponseCode(response: BrowserOrNodeResponse): Promise<BrowserOrNodeResponse> {
  if (response.status >= 400) {
    let body = '';
    try {
      body = await response.text();
    } catch { /* ignore */ }
    throw new Error(`HTTP ${response.status}: ${body}`);
  }
  return response;
}

export class CognixGraphQLAPIClient {
  constructor(private config: GraphQLAPIClientConfig) {}

  async fetch(query: string, variables?: Record<string, unknown>): Promise<any> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...this.config.customHeaders,
    };
    if (this.config.token) {
      headers['Authorization'] = `token ${this.config.token}`;
    }

    const response = await fetch(this.config.endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({ query, variables }),
    });

    return response.json();
  }
}

export const graphqlClient = new CognixGraphQLAPIClient({ endpoint: '' });
