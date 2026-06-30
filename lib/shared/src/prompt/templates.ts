export function assignGroupId(groupId: string): string {
  return `[groupId: ${groupId}]`;
}

export function populateCurrentEditorContextTemplate(editorContent: string, filePath?: string): string {
  return `Current file${filePath ? ` (${filePath})` : ''}:\n\`\`\`\n${editorContent}\n\`\`\``;
}

export function populateCurrentSelectionContextTemplate(selectionContent: string, filePath?: string): string {
  return `Selected code${filePath ? ` from ${filePath}` : ''}:\n\`\`\`\n${selectionContent}\n\`\`\``;
}

export function populateTerminalOutputContextTemplate(output: string, command: string): string {
  return `Terminal output from \`${command}\`:\n\`\`\`\n${output}\n\`\`\``;
}

export function populateCodebaseContextTemplate(content: string, source?: string): string {
  const prefix = source ? `From ${source}:\n` : '';
  return `${prefix}\`\`\`\n${content}\n\`\`\``;
}
