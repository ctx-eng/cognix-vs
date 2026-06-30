import * as vscode from 'vscode';
import { ServiceManager } from './services';
import { registerCommands } from './commands';
import { WorkspaceSearch } from './workspaceSearch';
import { ProviderManager } from './providerManager';
import { PromptLibrary } from './promptLibrary';

export function activate(context: vscode.ExtensionContext) {
  const output = vscode.window.createOutputChannel('Cognix VS');
  output.appendLine('Cognix VS extension activated');

  const serviceManager = new ServiceManager();
  serviceManager
    .register('workspaceSearch', new WorkspaceSearch(context))
    .register('providerManager', new ProviderManager(context))
    .register('promptLibrary', new PromptLibrary(context));

  registerCommands(context, serviceManager);

  context.subscriptions.push({
    dispose: () => serviceManager.dispose(),
  });

  const testingApi = {
    ping: () => 'pong',
    getState: () => ({ active: true, commands: ['start', 'askQuestion', 'fixCode', 'openPromptLibrary'] }),
  };
  return testingApi;
}

export function deactivate() {}
