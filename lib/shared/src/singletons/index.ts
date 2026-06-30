let currentServerEndpoint: string | undefined;

export function setServerEndpoint(endpoint: string): void {
  currentServerEndpoint = endpoint;
}

export function getServerEndpoint(): string | undefined {
  return currentServerEndpoint;
}
