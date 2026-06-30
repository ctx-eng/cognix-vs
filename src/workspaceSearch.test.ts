import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as vscode from 'vscode';

import { WorkspaceSearch } from './workspaceSearch';

const { workspace } = vscode;

describe('WorkspaceSearch', () => {
  let search: WorkspaceSearch;

  beforeEach(() => {
    vi.clearAllMocks();
    search = new WorkspaceSearch({} as any);
  });

  it('should return no folders message when no workspace folders', async () => {
    const original = (workspace as any).workspaceFolders;
    (workspace as any).workspaceFolders = undefined;
    const result = await search.searchWorkspace('test');
    expect(result).toBe('No workspace folders found.');
    (workspace as any).workspaceFolders = original;
  });

  it('should return no matching content when no files found', async () => {
    workspace.findFiles = vi.fn().mockResolvedValue([]);
    const result = await search.searchWorkspace('test');
    expect(result).toBe('No matching workspace content found.');
    expect(workspace.findFiles).toHaveBeenCalledWith('**/*.{ts,js,tsx,jsx,json,md}', '**/node_modules/**', 100);
  });

  it('should return matching file snippets', async () => {
    const mockFile = { fsPath: '/test/workspace/src/index.ts' };
    workspace.findFiles = vi.fn().mockResolvedValue([mockFile]);
    workspace.openTextDocument = vi.fn().mockResolvedValue({
      getText: () => 'const x = 1;\nconst test = 42;\nconsole.log(x);',
    });

    const result = await search.searchWorkspace('test');
    expect(result).toContain('/test/workspace/src/index.ts');
    expect(result).toContain('test');
  });

  it('should not include non-matching files', async () => {
    const mockFile = { fsPath: '/test/workspace/src/index.ts' };
    workspace.findFiles = vi.fn().mockResolvedValue([mockFile]);
    workspace.openTextDocument = vi.fn().mockResolvedValue({
      getText: () => 'const x = 1;\nconsole.log(x);',
    });

    const result = await search.searchWorkspace('nonexistent');
    expect(result).toBe('No matching workspace content found.');
  });

  it('should handle errors during file reading gracefully', async () => {
    workspace.findFiles = vi.fn().mockResolvedValue([{ fsPath: '/test/broken.ts' }]);
    workspace.openTextDocument = vi.fn().mockRejectedValue(new Error('File not found'));

    const result = await search.searchWorkspace('test');
    expect(result).toBe('No matching workspace content found.');
  });

  it('should limit content to 512 characters per file', async () => {
    const longContent = 'a'.repeat(1000);
    const mockFile = { fsPath: '/test/long.ts' };
    workspace.findFiles = vi.fn().mockResolvedValue([mockFile]);
    workspace.openTextDocument = vi.fn().mockResolvedValue({
      getText: () => longContent,
    });

    const result = await search.searchWorkspace('aaa');
    const firstFileContent = result.includes('/test/long.ts') ? result : '';
    expect(firstFileContent.length).toBeLessThanOrEqual(600);
  });

  it('should process up to 30 files', async () => {
    const files = Array.from({ length: 50 }, (_, i) => ({
      fsPath: `/test/file${i}.ts`,
    }));
    workspace.findFiles = vi.fn().mockResolvedValue(files);
    workspace.openTextDocument = vi.fn().mockImplementation(async () => ({
      getText: () => 'test content',
    }));

    await search.searchWorkspace('test');
    expect(workspace.openTextDocument).toHaveBeenCalledTimes(30);
  });
});
