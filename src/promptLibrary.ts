import * as vscode from 'vscode';
import type { PromptTemplate } from '@cognix/cognix-shared';

const builtInPrompts: PromptTemplate[] = [
  {
    title: 'Fix code',
    description: 'Fix the selected code snippet and preserve behavior.',
    template: 'Fix the following code:\n\n{{selection}}\n',
  },
  {
    title: 'Document code',
    description: 'Write documentation comments for the selected code.',
    template: 'Write documentation comments for the following code:\n\n{{selection}}\n',
  },
];

export class PromptLibrary {
  constructor(private readonly context: vscode.ExtensionContext) {}

  public getPrompt(title: string): PromptTemplate | undefined {
    return builtInPrompts.find((prompt) => prompt.title === title);
  }

  public async openQuickPick() {
    const items = builtInPrompts.map((prompt) => ({ label: prompt.title, description: prompt.description }));
    const selected = await vscode.window.showQuickPick(items, { placeHolder: 'Select a prompt' });
    if (selected) {
      vscode.window.showInformationMessage(`Selected prompt: ${selected.label}`);
    }
  }
}
