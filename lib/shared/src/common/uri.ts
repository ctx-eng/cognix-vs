export type FileURI = string & { __brand: 'FileURI' };

export const SUPPORTED_URI_SCHEMAS = ['file', 'vscode-vfs', 'vscode-test-web', 'sourcegraph'] as const;

export function isFileURI(uri: string): boolean {
  return uri.startsWith('file://');
}

export function assertFileURI(uri: string): asserts uri is FileURI {
  if (!isFileURI(uri)) {
    throw new Error(`Expected a file:// URI, got: ${uri}`);
  }
}

export function uriBasename(uri: string): string {
  return uri.replace(/\/$/, '').split('/').pop() ?? '';
}

export function uriDirname(uri: string): string {
  const parts = uri.replace(/\/$/, '').split('/');
  parts.pop();
  return parts.join('/');
}

export function uriExtname(uri: string): string {
  const base = uriBasename(uri);
  const dotIndex = base.lastIndexOf('.');
  return dotIndex >= 0 ? base.slice(dotIndex) : '';
}

export function uriParseNameAndExtension(uri: string): { name: string; extension: string } {
  const base = uriBasename(uri);
  const dotIndex = base.lastIndexOf('.');
  if (dotIndex >= 0) {
    return { name: base.slice(0, dotIndex), extension: base.slice(dotIndex) };
  }
  return { name: base, extension: '' };
}
