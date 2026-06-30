export interface DisplayPathEnvInfo {
  workspaceFolders: string[];
  homeDir: string;
}

let envInfo: DisplayPathEnvInfo = {
  workspaceFolders: [],
  homeDir: '',
};

export function setDisplayPathEnvInfo(info: DisplayPathEnvInfo): void {
  envInfo = info;
}

export function displayPath(uri: string): string {
  for (const folder of envInfo.workspaceFolders) {
    if (uri.startsWith(folder)) {
      return uri.slice(folder.length).replace(/^\//, '');
    }
  }
  return uri;
}

export function displayPathWithLines(uri: string, startLine?: number, endLine?: number): string {
  let path = displayPath(uri);
  if (startLine !== undefined) {
    path += `:${startLine + 1}`;
    if (endLine !== undefined && endLine !== startLine) {
      path += `-${endLine + 1}`;
    }
  }
  return path;
}

export function displayPathBasename(uri: string): string {
  return uri.split('/').pop() ?? uri;
}

export function uriHasPrefix(uri: string, prefix: string): boolean {
  return uri.startsWith(prefix);
}

export function displayPathDirname(uri: string): string {
  const parts = uri.split('/');
  parts.pop();
  return parts.join('/');
}

export function displayPathWithoutWorkspaceFolderPrefix(uri: string): string {
  for (const folder of envInfo.workspaceFolders) {
    if (uri.startsWith(folder)) {
      return uri.slice(folder.length).replace(/^\//, '');
    }
  }
  return uri;
}

export function fixPathSep(path: string): string {
  return path.replace(/\\/g, '/');
}
