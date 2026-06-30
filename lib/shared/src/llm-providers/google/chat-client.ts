export interface GoogleChatMessage {
  role: 'user' | 'model';
  parts: Array<{ text: string }>;
}

export function createGoogleChatClient(apiKey: string) {
  return {
    async chat(messages: GoogleChatMessage[]): Promise<string> {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: messages }),
      });
      const data = await response.json();
      return data?.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
    },
  };
}
