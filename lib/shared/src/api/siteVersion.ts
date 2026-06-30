import { isDotCom } from './environments';

export interface SiteAndCognixAPIVersions {
  site: string;
  api: string;
}

let cachedSiteVersion: string | undefined;
let cachedCurrentVersion: string | undefined;

export function siteVersion(): string {
  return cachedSiteVersion ?? '0.0.0';
}

export function currentSiteVersion(): string {
  return cachedCurrentVersion ?? '0.0.0';
}

export function isValidVersion(version: string): boolean {
  return /^\d+\.\d+\.\d+/.test(version);
}

export function checkVersion(version: string, minVersion: string): boolean {
  const vParts = version.split('.').map(Number);
  const mParts = minVersion.split('.').map(Number);
  for (let i = 0; i < Math.max(vParts.length, mParts.length); i++) {
    const v = vParts[i] ?? 0;
    const m = mParts[i] ?? 0;
    if (v > m) return true;
    if (v < m) return false;
  }
  return true;
}

let _supportsPromptCaching = false;

export function serverSupportsPromptCaching(): boolean {
  return _supportsPromptCaching;
}

export function setServerSupportsPromptCaching(value: boolean): void {
  _supportsPromptCaching = value;
}
