const mockFindFiles = async (_include?: string, _exclude?: string, _maxResults?: number) => [];

const mockOpenTextDocument = async (_uri?: any) => ({ getText: () => '' });

const mockGetConfiguration = () => ({
  get: (_key: string) => '',
  has: () => false,
  inspect: () => undefined,
  update: async () => undefined,
});

export const workspace = {
  workspaceFolders: [{ uri: { fsPath: '/test/workspace' }, name: 'workspace', index: 0 }],
  findFiles: mockFindFiles,
  openTextDocument: mockOpenTextDocument,
  getConfiguration: mockGetConfiguration,
};

export const window = {
  showInformationMessage: async (_msg: string) => undefined,
  showWarningMessage: async (_msg: string) => undefined,
  showErrorMessage: async (_msg: string) => undefined,
  showQuickPick: async (_items: any[], _options: any) => undefined,
  createOutputChannel: (_name: string) => ({ appendLine: (_msg: string) => {} }),
  activeTextEditor: undefined,
  createWebviewPanel: (_viewType: string, _title: string, _column: number, _options: any) => ({
    webview: {
      html: '',
      onDidReceiveMessage: (_cb: any, _thisArgs?: any, _disposables?: any[]) => ({ dispose: () => {} }),
      postMessage: async (_msg: any) => true,
      asWebviewUri: (uri: any) => uri,
    },
    reveal: () => {},
    onDidDispose: (_cb: any) => ({ dispose: () => {} }),
    dispose: () => {},
  }),
};

export const commands = {
  registerCommand: (_cmd: string, _handler: any) => ({ dispose: () => {} }),
};

export const Uri = {
  file: (path: string) => ({ fsPath: path, path, scheme: 'file' }),
  parse: (s: string) => ({ fsPath: s, path: s, scheme: 'file' }),
  joinPath: (base: any, ...segments: string[]) => ({
    fsPath: [base.fsPath || base.path, ...segments].join('/'),
  }),
};

export const ViewColumn = { One: 1, Two: 2, Three: 3 };

export const EventEmitter = class {
  event = () => () => {};
  fire = () => {};
  dispose = () => {};
};

export const Disposable = class {
  static from = (...disposables: any[]) => disposables;
  dispose = () => {};
};

export const StatusBarAlignment = { Left: 1, Right: 2 };

const vscode = {
  workspace,
  window,
  commands,
  Uri,
  ViewColumn,
  EventEmitter,
  Disposable,
  StatusBarAlignment,
};

export default vscode;
