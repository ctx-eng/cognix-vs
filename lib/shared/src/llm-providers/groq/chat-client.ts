export interface GroqChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export function createGroqChatClient(apiKey: string) {
  return {
    async chat(messages: GroqChatMessage[], model: string = 'mixtral-8x7b-32768'): Promise<string> {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({ model, messages }),
      });
      const data = await response.json();
      return data?.choices?.[0]?.message?.content ?? '';
    },
  };
}
