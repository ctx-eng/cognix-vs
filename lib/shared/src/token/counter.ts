export class TokenCounter {
  count(text: string): number {
    // Simple estimation: ~4 characters per token
    return Math.ceil(text.length / 4);
  }

  countAsync(text: string): Promise<number> {
    return Promise.resolve(this.count(text));
  }
}

export class TokenCounterUtils {
  static truncateText(text: string, maxTokens: number): string {
    const maxChars = maxTokens * 4;
    if (text.length <= maxChars) return text;
    return text.slice(0, maxChars);
  }

  static countTokens(text: string): number {
    return Math.ceil(text.length / 4);
  }
}

export function getTokenCounterUtils(): TokenCounterUtils {
  return TokenCounterUtils;
}

export const tokenCounter = new TokenCounter();
