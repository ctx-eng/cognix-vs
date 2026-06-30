import * as assert from 'assert';
import * as vscode from 'vscode';

describe('Integration Test Suite', () => {
  it('activates the Cognix extension', async () => {
    const extension = vscode.extensions.getExtension('ctx-eng.cognix-vs');
    assert.ok(extension, 'Extension should be installed');
    await extension?.activate();
    assert.strictEqual(extension?.isActive, true);
  });
});
