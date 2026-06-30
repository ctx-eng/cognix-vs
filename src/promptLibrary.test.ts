import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as vscode from 'vscode';

import { PromptLibrary } from './promptLibrary';

const { window: win } = vscode;

describe('PromptLibrary', () => {
  let library: PromptLibrary;

  beforeEach(() => {
    vi.clearAllMocks();
    library = new PromptLibrary({} as any);
  });

  it('should return prompt by exact title', () => {
    const prompt = library.getPrompt('Fix code');
    expect(prompt).toBeDefined();
    expect(prompt?.title).toBe('Fix code');
    expect(prompt?.description).toBe('Fix the selected code snippet and preserve behavior.');
    expect(prompt?.template).toContain('{{selection}}');
  });

  it('should return undefined for unknown prompt', () => {
    const prompt = library.getPrompt('Unknown prompt');
    expect(prompt).toBeUndefined();
  });

  it('should find "Document code" prompt', () => {
    const prompt = library.getPrompt('Document code');
    expect(prompt).toBeDefined();
    expect(prompt?.title).toBe('Document code');
    expect(prompt?.template).toContain('Write documentation comments');
  });

  it('should open quick pick with all prompts', () => {
    vi.spyOn(win, 'showQuickPick').mockResolvedValue(undefined as any);

    library.openQuickPick();
    expect(win.showQuickPick).toHaveBeenCalledOnce();
    const items = (win.showQuickPick as any).mock.calls[0][0];
    expect(items).toHaveLength(2);
    expect(items[0]).toMatchObject({ label: 'Fix code' });
    expect(items[1]).toMatchObject({ label: 'Document code' });
  });

  it('should show info message on prompt selection', async () => {
    vi.spyOn(win, 'showQuickPick').mockResolvedValue({ label: 'Fix code', description: '' });
    vi.spyOn(win, 'showInformationMessage');

    await library.openQuickPick();
    expect(win.showInformationMessage).toHaveBeenCalledWith('Selected prompt: Fix code');
  });

  it('should do nothing when quick pick is dismissed', async () => {
    vi.spyOn(win, 'showQuickPick').mockResolvedValue(undefined as any);

    await library.openQuickPick();
    expect(win.showInformationMessage).not.toHaveBeenCalled();
  });
});
