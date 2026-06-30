export interface GuardrailsClientConfig {
  endpoint: string;
  token?: string;
}

export class CognixGuardrailsClient {
  private config: GuardrailsClientConfig;

  constructor(config: GuardrailsClientConfig) {
    this.config = config;
  }

  async check(input: string): Promise<{ status: string; reasons?: string[] }> {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (this.config.token) {
      headers['Authorization'] = `token ${this.config.token}`;
    }

    const response = await fetch(`${this.config.endpoint}/guardrails/check`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ input }),
    });

    if (!response.ok) {
      throw new Error(`Guardrails check failed: ${response.status}`);
    }

    return response.json();
  }
}
