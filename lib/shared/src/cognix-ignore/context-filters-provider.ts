import type { ContextFilters } from '../api/graphql/client';

export interface ContextFiltersProvider {
  include?: ContextFilters;
  exclude?: ContextFilters;
  filter(text: string): string;
}

let currentProvider: ContextFiltersProvider | undefined;

export function setContextFiltersProvider(provider: ContextFiltersProvider): void {
  currentProvider = provider;
}

export const contextFiltersProvider: ContextFiltersProvider = {
  filter(text: string): string {
    if (currentProvider) {
      return currentProvider.filter(text);
    }
    return text;
  },
};
