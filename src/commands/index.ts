import * as vscode from 'vscode';
import type { ServiceManager } from '../services';
import { ChatPanel } from '../chatPanel';
import type { WorkspaceSearch } from '../workspaceSearch';
import type { ProviderManager } from '../providerManager';
import type { PromptLibrary } from '../promptLibrary';

export interface Command {
  id: string;
  title: string;
  category: string;
  handler(...args: unknown[]): unknown;
}

export function registerCommands(context: vscode.ExtensionContext, serviceManager: ServiceManager): vscode.Disposable[] {
  const commands: Command[] = [
    {
      id: 'cognix-vs.start',
      title: 'Start Cognix VS',
      category: 'Cognix VS',
      handler: () => {
        vscode.window.showInformationMessage('Cognix VS is ready. Use the Ask question command or open the prompt library.');
      },
    },
    {
      id: 'cognix-vs.askQuestion',
      title: 'Ask a Question',
      category: 'Cognix VS',
      handler: () => {
        ChatPanel.createOrShow(
          context.extensionUri,
          serviceManager.get<WorkspaceSearch>('workspaceSearch'),
          serviceManager.get<ProviderManager>('providerManager'),
          serviceManager.get<PromptLibrary>('promptLibrary'),
        );
      },
    },
    {
      id: 'cognix-vs.fixCode',
      title: 'Fix Code',
      category: 'Cognix VS',
      handler: async () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
          vscode.window.showWarningMessage('Open a file and select code to fix.');
          return;
        }
        const selection = editor.selection;
        const selectedText = editor.document.getText(selection).trim();
        if (!selectedText) {
          vscode.window.showWarningMessage('Select some code to fix first.');
          return;
        }

        const promptLibrary = serviceManager.get<PromptLibrary>('promptLibrary');
        const providerManager = serviceManager.get<ProviderManager>('providerManager');

        const prompt = promptLibrary.getPrompt('Fix code') ?? {
          title: 'Fix code',
          description: 'Fix the selected code snippet and preserve behavior.',
          template: 'Fix the following code:\n\n{{selection}}\n',
        };
        const response = await providerManager.complete(prompt.template, { selection: selectedText });
        if (response) {
          editor.edit((edit) => {
            edit.replace(selection, response);
          });
        }
      },
    },
    {
      id: 'cognix-vs.openPromptLibrary',
      title: 'Open Prompt Library',
      category: 'Cognix VS',
      handler: () => {
        serviceManager.get<PromptLibrary>('promptLibrary').openQuickPick();
      },
    },
  ];

  const disposables = commands.map(cmd =>
    vscode.commands.registerCommand(cmd.id, cmd.handler),
  );

  context.subscriptions.push(...disposables);
  return disposables;
}
