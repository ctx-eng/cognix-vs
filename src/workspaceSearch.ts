import * as vscode from 'vscode';

export class WorkspaceSearch {
  constructor(private readonly context: vscode.ExtensionContext) {}

  public async searchWorkspace(query: string): Promise<string> {
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders || workspaceFolders.length === 0) {
      return 'No workspace folders found.';
    }

    const files = await vscode.workspace.findFiles('**/*.{ts,js,tsx,jsx,json,md}', '**/node_modules/**', 100);
    const snippets: string[] = [];

    for (const file of files.slice(0, 30)) {
      try {
        const document = await vscode.workspace.openTextDocument(file);
        const text = document.getText();
        if (text.toLowerCase().includes(query.toLowerCase())) {
          snippets.push(`File: ${file.fsPath}\n${text.slice(0, 512)}`);
        }
      } catch {
        // skip files that can't be read
      }
    }

    if (snippets.length === 0) {
      return 'No matching workspace content found.';
    }

    return snippets.join('\n\n---\n\n');
  }
}
