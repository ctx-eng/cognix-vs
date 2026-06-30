export const DOTCOM_URL = new URL('https://cognix.ai');

export function isDotCom(url: string | URL): boolean {
  if (typeof url === 'string') url = new URL(url);
  return url.hostname === 'cognix.ai' || url.hostname === 'cognix.com';
}

export const DOTCOM_WORKSPACE_UPGRADE_URL = new URL('https://cognix.ai/workspace/upgrade');

export function isS2(url: string | URL): boolean {
  if (typeof url === 'string') url = new URL(url);
  return url.hostname === 'sourcegraph.com' || url.hostname === 's2.dev';
}

export function isWorkspaceInstance(url: string | URL): boolean {
  if (typeof url === 'string') url = new URL(url);
  return url.hostname.includes('workspace');
}
