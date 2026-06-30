export interface FetchOptions {
  method?: string;
  headers?: Record<string, string>;
  body?: string;
  signal?: AbortSignal;
}

export async function fetchJSON<T>(url: string, options?: FetchOptions): Promise<T> {
  const response = await fetch(url, {
    method: options?.method ?? 'GET',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: options?.body,
    signal: options?.signal,
  });
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }
  return response.json() as Promise<T>;
}
