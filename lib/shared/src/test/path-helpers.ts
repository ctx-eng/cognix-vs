import type { FileURI } from '../common/uri';

export function testFileUri(path: string): FileURI {
  return `file:///${path.replace(/\\/g, '/')}` as FileURI;
}
