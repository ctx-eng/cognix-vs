export async function addAuthHeaders(auth: { token?: string; serverEndpoint: string }, headers: Headers, url: URL): Promise<void> {
  if (auth.token) {
    headers.set('Authorization', `token ${auth.token}`);
  }
  headers.set('X-Cognix-Server-Endpoint', auth.serverEndpoint);
}
