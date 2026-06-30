export interface ModelConfigOverwrites {
  [modelRef: string]: {
    maxTokens?: number;
    temperature?: number;
    apiKey?: string;
    apiEndpoint?: string;
  };
}

export const configOverwrites: ModelConfigOverwrites = {};
