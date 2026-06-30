export interface ResolvedConfiguration {
  auth: {
    token?: string;
    serverEndpoint: string;
  };
  configuration: {
    customHeaders?: Record<string, string>;
  };
}

let config: ResolvedConfiguration = {
  auth: { serverEndpoint: 'https://cognix.ai' },
  configuration: {},
};

export function setResolvedConfig(conf: ResolvedConfiguration): void {
  config = conf;
}

export async function currentResolvedConfig(): Promise<ResolvedConfiguration> {
  return config;
}
