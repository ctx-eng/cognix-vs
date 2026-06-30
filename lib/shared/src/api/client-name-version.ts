let clientName = 'cognix-vs';
let clientVersion = '1.0.0';

export function setClientNameVersion(name: string, version: string): void {
  clientName = name;
  clientVersion = version;
}

export function addClientInfoParams(params: URLSearchParams): void {
  params.set('client-name', clientName);
  params.set('client-version', clientVersion);
}

export function getClientInfoQueryParams(): { clientName: string; clientVersion: string } {
  return { clientName, clientVersion };
}

export function getClientIdentificationHeaders(): Record<string, string> {
  return {
    'X-Cognix-Client-Name': clientName,
    'X-Cognix-Client-Version': clientVersion,
  };
}

export function addCognixClientIdentificationHeaders(headers: Headers): void {
  headers.set('X-Cognix-Client-Name', clientName);
  headers.set('X-Cognix-Client-Version', clientVersion);
}
