export const COGNIX_PASSTHROUGH_VSCODE_OPEN_COMMAND_ID = 'cognix.open';

export function webviewOpenURIForContextItem(uri: string): string {
  return `command:${COGNIX_PASSTHROUGH_VSCODE_OPEN_COMMAND_ID}?${encodeURIComponent(JSON.stringify(uri))}`;
}
