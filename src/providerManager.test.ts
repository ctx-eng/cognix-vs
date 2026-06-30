import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as vscode from 'vscode';

import { ProviderManager } from './providerManager';

const { workspace: ws, window: win } = vscode;

const mockConfig = (apiKey: string) => ({
  get: () => apiKey,
  has: () => false,
  inspect: () => undefined,
  update: async () => undefined,
});

describe('ProviderManager', () => {
  let manager: ProviderManager;

  beforeEach(() => {
    vi.clearAllMocks();
    manager = new ProviderManager({} as any);
  });

  it('should return undefined when API key is not set', async () => {
    vi.spyOn(ws, 'getConfiguration').mockReturnValue(mockConfig(''));
    vi.spyOn(win, 'showErrorMessage');

    const result = await manager.complete('test prompt');
    expect(result).toBeUndefined();
    expect(win.showErrorMessage).toHaveBeenCalledWith('Set cognixVs.openAIApiKey in your settings.');
  });

  it('should return undefined when API request fails', async () => {
    vi.spyOn(ws, 'getConfiguration').mockReturnValue(mockConfig('sk-test-key'));
    vi.spyOn(win, 'showErrorMessage');
    vi.spyOn(globalThis, 'fetch').mockRejectedValueOnce(new Error('Network error'));

    const result = await manager.complete('test prompt');
    expect(result).toBeUndefined();
    expect(win.showErrorMessage).toHaveBeenCalled();
  });

  it('should render templates with variables', async () => {
    vi.spyOn(ws, 'getConfiguration').mockReturnValue(mockConfig('sk-test-key'));
    const mockResponse = {
      json: () =>
        Promise.resolve({
          choices: [{ message: { content: 'fixed code' } }],
        }),
    };
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(mockResponse as any);

    const result = await manager.complete('Fix: {{selection}}', {
      selection: 'broken code',
    });
    expect(result).toBe('fixed code');
    expect(globalThis.fetch).toHaveBeenCalledWith(
      'https://api.openai.com/v1/chat/completions',
      expect.objectContaining({
        method: 'POST',
        body: expect.stringContaining('Fix: broken code'),
      }),
    );
  });

  it('should pass correct API request structure', async () => {
    vi.spyOn(ws, 'getConfiguration').mockReturnValue(mockConfig('sk-test-key'));
    const mockResponse = {
      json: () =>
        Promise.resolve({
          choices: [{ message: { content: 'response' } }],
        }),
    };
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(mockResponse as any);

    await manager.complete('Hello');
    const requestBody = (fetchSpy.mock.calls[0][1] as RequestInit).body as string;
    const callArgs = JSON.parse(requestBody);
    expect(callArgs).toMatchObject({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: 'Hello' }],
      max_tokens: 800,
      temperature: 0.2,
    });
  });

  it('should handle missing choices in API response', async () => {
    vi.spyOn(ws, 'getConfiguration').mockReturnValue(mockConfig('sk-test-key'));
    const mockResponse = {
      json: () => Promise.resolve({}),
    };
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(mockResponse as any);

    const result = await manager.complete('test');
    expect(result).toBeUndefined();
  });
});
