const PLATFORM = typeof process !== 'undefined' ? process.platform : '';

export const isWindows: boolean = PLATFORM === 'win32';
export const isMacOS: boolean = PLATFORM === 'darwin';
