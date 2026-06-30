export enum FeatureFlag {
  CognixPro = 'cognix-pro',
  ContextSearch = 'context-search',
  CustomCommands = 'custom-commands',
  Autocomplete = 'autocomplete',
  Chat = 'chat',
  Edit = 'edit',
  Debug = 'debug',
  Experimental = 'experimental',
}

export interface FeatureFlagProvider {
  evaluate(flag: FeatureFlag): Promise<boolean>;
}

let currentProvider: FeatureFlagProvider | undefined;

export function setFeatureFlagProvider(provider: FeatureFlagProvider): void {
  currentProvider = provider;
}

export const featureFlagProvider: FeatureFlagProvider | undefined = currentProvider;

export function evaluateFeatureFlag(flag: FeatureFlag): Promise<boolean> {
  if (currentProvider) {
    return currentProvider.evaluate(flag);
  }
  return Promise.resolve(false);
}
