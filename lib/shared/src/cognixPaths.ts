export const COGNIX_DIR_NAME = '.cognix';
export const COGNIX_IGNORE_FILE_NAME = '.cognixignore';
export const COGNIX_SETTINGS_FILE_NAME = 'settings.json';

export function cognixAppDataPath(): string | undefined {
  if (typeof process !== 'undefined' && process.env?.COGNIX_APP_DATA_PATH) {
    return process.env.COGNIX_APP_DATA_PATH;
  }
  return undefined;
}
