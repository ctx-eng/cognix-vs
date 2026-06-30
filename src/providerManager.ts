import * as vscode from 'vscode';
import { renderTemplate } from '@cognix/cognix-shared';

export class ProviderManager {
  constructor(private readonly context: vscode.ExtensionContext) {}

  public async complete(prompt: string, variables?: Record<string, string>): Promise<string | undefined> {
    const rendered = renderTemplate(prompt, variables ?? {});
    const apiKey = vscode.workspace.getConfiguration('cognixVs').get<string>('openAIApiKey');
    if (!apiKey) {
      vscode.window.showErrorMessage('Set cognixVs.openAIApiKey in your settings.');
      return undefined;
    }

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [{ role: 'user', content: rendered }],
          max_tokens: 800,
          temperature: 0.2,
        }),
      });
      const data = await response.json();
      return data?.choices?.[0]?.message?.content;
    } catch (error) {
      vscode.window.showErrorMessage(`AI request failed: ${error}`);
      return undefined;
    }
  }
}
