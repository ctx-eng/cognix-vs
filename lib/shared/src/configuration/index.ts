export interface CognixConfiguration {
  serverEndpoint: string;
  token?: string;
  customHeaders?: Record<string, string>;
  debug?: boolean;
  codebaseSearch?: boolean;
}

export function getConfiguration(): CognixConfiguration {
  return {
    serverEndpoint: process.env.COGNIX_SERVER_ENDPOINT ?? 'https://cognix.ai',
    token: process.env.COGNIX_ACCESS_TOKEN,
    debug: process.env.COGNIX_DEBUG === 'true',
    codebaseSearch: true,
  };
}
