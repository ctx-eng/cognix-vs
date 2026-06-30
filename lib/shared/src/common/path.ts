export interface PathFunctions {
  basename: (path: string) => string;
  dirname: (path: string) => string;
  relative: (from: string, to: string) => string;
  join: (...paths: string[]) => string;
  normalize: (path: string) => string;
  resolve: (...paths: string[]) => string;
  sep: string;
}

function posix(): PathFunctions {
  return {
    basename: (path: string) => path.split('/').pop() ?? '',
    dirname: (path: string) => {
      const parts = path.split('/');
      parts.pop();
      return parts.join('/') || '.';
    },
    relative: (from: string, to: string) => {
      const fromParts = from.split('/');
      const toParts = to.split('/');
      let i = 0;
      while (i < fromParts.length && i < toParts.length && fromParts[i] === toParts[i]) i++;
      const up = fromParts.slice(i).map(() => '..');
      return up.concat(toParts.slice(i)).join('/');
    },
    join: (...paths: string[]) =>
      paths
        .map((p) => p.replace(/\\/g, '/'))
        .join('/')
        .replace(/\/+/g, '/'),
    normalize: (path: string) => {
      const parts = path.replace(/\\/g, '/').split('/');
      const result: string[] = [];
      for (const part of parts) {
        if (part === '.' || part === '') continue;
        if (part === '..') result.pop();
        else result.push(part);
      }
      return result.join('/');
    },
    resolve: (...paths: string[]) =>
      paths
        .map((p) => p.replace(/\\/g, '/'))
        .join('/')
        .replace(/\/+/g, '/'),
    sep: '/',
  };
}

function win32(): PathFunctions {
  return {
    basename: (path: string) => path.replace(/\\/g, '/').split('/').pop() ?? '',
    dirname: (path: string) => {
      const p = path.replace(/\\/g, '/');
      const parts = p.split('/');
      parts.pop();
      return parts.join('/') || '.';
    },
    relative: (from: string, to: string) => posix().relative(from.replace(/\\/g, '/'), to.replace(/\\/g, '/')),
    join: (...paths: string[]) => paths.join('\\').replace(/\\\\/g, '\\'),
    normalize: (path: string) => posix().normalize(path.replace(/\\/g, '/')),
    resolve: (...paths: string[]) => paths.join('\\').replace(/\\\\/g, '\\'),
    sep: '\\',
  };
}

export const posixFilePaths = posix();
export const defaultPathFunctions = posix();

export function pathFunctionsForURI(uri: string): PathFunctions {
  if (uri.startsWith('file:///')) {
    if (uri.startsWith('file:///C:') || uri.startsWith('file:///c:')) {
      return win32();
    }
  }
  return posix();
}
