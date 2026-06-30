export interface Disposable {
  dispose(): void;
}

export interface ContextGroup {
  id: string;
  name?: string;
  providers: ContextProvider[];
}

export interface ContextProvider {
  id: string;
  name: string;
  getContext(query: string): Promise<string[]>;
}

export interface SearchProvider {
  search(query: string, opts?: { maxResults?: number }): AsyncIterable<string>;
}

export interface LocalSearchProvider extends SearchProvider {
  searchLocal(query: string): AsyncIterable<string>;
}

export interface RemoteSearchProvider extends SearchProvider {
  searchRemote(query: string): AsyncIterable<string>;
}
