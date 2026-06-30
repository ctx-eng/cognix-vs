import * as vscode from 'vscode';
import { WorkspaceSearch } from './workspaceSearch';
import { ProviderManager } from './providerManager';
import { PromptLibrary } from './promptLibrary';

export class ChatPanel {
  public static currentPanel: ChatPanel | undefined;
  private readonly panel: vscode.WebviewPanel;
  private disposables: vscode.Disposable[] = [];

  private constructor(
    panel: vscode.WebviewPanel,
    private readonly extensionUri: vscode.Uri,
    private readonly search: WorkspaceSearch,
    private readonly providerManager: ProviderManager,
    private readonly promptLibrary: PromptLibrary,
  ) {
    this.panel = panel;
    this.panel.webview.html = this.getHtmlForWebview();
    this.setWebviewMessageListener();
  }

  public static createOrShow(
    extensionUri: vscode.Uri,
    search: WorkspaceSearch,
    providerManager: ProviderManager,
    promptLibrary: PromptLibrary,
  ) {
    const column = vscode.window.activeTextEditor ? vscode.window.activeTextEditor.viewColumn : undefined;

    if (ChatPanel.currentPanel) {
      ChatPanel.currentPanel.panel.reveal(column);
    } else {
      const panel = vscode.window.createWebviewPanel('cognixVsChat', 'Cognix VS Chat', column || vscode.ViewColumn.One, {
        enableScripts: true,
      });
      ChatPanel.currentPanel = new ChatPanel(panel, extensionUri, search, providerManager, promptLibrary);
    }
  }

  private getHtmlForWebview(): string {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Cognix VS Chat</title>
  <style>
    body { font-family: var(--vscode-font-family, sans-serif); padding: 16px; color: var(--vscode-editor-foreground); background: var(--vscode-editor-background); }
    .history { margin-bottom: 16px; }
    .message { margin-bottom: 12px; padding: 8px; border-radius: 4px; }
    .message.user { background: var(--vscode-textBlockQuote-background); }
    .message.assistant { background: transparent; }
    .message.error { background: var(--vscode-inputValidation-errorBackground, #fdd); border: 1px solid var(--vscode-inputValidation-errorBorder, #f00); }
    .message .role { font-weight: bold; margin-bottom: 4px; }
    .message .role.user-role { color: var(--vscode-textLink-foreground); }
    .message .role.assistant-role { color: var(--vscode-editor-foreground); }
    .message .role.error-role { color: var(--vscode-errorForeground, #c33); }
    .input-area { display: flex; gap: 8px; }
    textarea { flex: 1; height: 80px; background: var(--vscode-input-background); color: var(--vscode-input-foreground); border: 1px solid var(--vscode-input-border); padding: 8px; font-family: var(--vscode-font-family); }
    button { background: var(--vscode-button-background); color: var(--vscode-button-foreground); border: none; padding: 8px 16px; cursor: pointer; }
    button:hover { background: var(--vscode-button-hoverBackground); }
    button:disabled { opacity: 0.5; cursor: default; }
    .loading { font-style: italic; color: var(--vscode-disabledForeground); }
  </style>
</head>
<body>
  <div class="history" id="history"></div>
  <div class="input-area">
    <textarea id="prompt" placeholder="Ask a question about your workspace..."></textarea>
    <button id="send">Send</button>
  </div>
  <script>
    const vscode = acquireVsCodeApi();
    const sendButton = document.getElementById('send');
    const textarea = document.getElementById('prompt');
    const history = document.getElementById('history');

    function addMessage(role, text, className) {
      const entry = document.createElement('div');
      entry.className = 'message ' + className;
      const roleEl = document.createElement('div');
      roleEl.className = 'role ' + role + '-role';
      roleEl.textContent = role.charAt(0).toUpperCase() + role.slice(1) + ':';
      const content = document.createElement('div');
      content.textContent = text;
      entry.appendChild(roleEl);
      entry.appendChild(content);
      history.appendChild(entry);
    }

    function setLoading(loading) {
      sendButton.disabled = loading;
      textarea.disabled = loading;
      if (loading) {
        const el = document.createElement('div');
        el.className = 'message loading';
        el.id = 'loading-indicator';
        el.textContent = 'Thinking...';
        history.appendChild(el);
      } else {
        const el = document.getElementById('loading-indicator');
        if (el) el.remove();
      }
    }

    sendButton.addEventListener('click', () => {
      const prompt = textarea.value.trim();
      if (!prompt) return;
      addMessage('user', prompt, 'user');
      textarea.value = '';
      setLoading(true);
      vscode.postMessage({ type: 'ask', prompt: prompt });
    });

    textarea.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
        sendButton.click();
      }
    });

    window.addEventListener('message', event => {
      setLoading(false);
      const message = event.data;
      if (message.type === 'response') {
        addMessage('assistant', message.text || 'No response available.', 'assistant');
      } else if (message.type === 'error') {
        addMessage('error', message.text, 'error');
      }
    });
  </script>
</body>
</html>`;
  }

  private setWebviewMessageListener() {
    this.panel.webview.onDidReceiveMessage(
      async (message) => {
        switch (message.type) {
          case 'ask': {
            const prompt = message.prompt as string;
            if (!prompt || !prompt.trim()) {
              this.panel.webview.postMessage({ type: 'error', text: 'Please enter a question.' });
              return;
            }
            try {
              const context = await this.search.searchWorkspace(prompt);
              const response = await this.providerManager.complete(
                `Answer the question using the following context:\n\n${context}\n\nQuestion: ${prompt}`,
              );
              this.panel.webview.postMessage({ type: 'response', text: response ?? 'No response available.' });
            } catch (err) {
              this.panel.webview.postMessage({ type: 'error', text: `Request failed: ${err instanceof Error ? err.message : err}` });
            }
            break;
          }
        }
      },
      null,
      this.disposables,
    );
  }

  public dispose() {
    ChatPanel.currentPanel = undefined;
    this.panel.dispose();
    while (this.disposables.length) {
      const d = this.disposables.pop();
      if (d) {
        d.dispose();
      }
    }
  }
}
