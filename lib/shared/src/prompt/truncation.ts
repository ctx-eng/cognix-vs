export function truncateTextNearestLine(text: string, maxChars: number): string {
  if (text.length <= maxChars) return text;
  const truncated = text.slice(0, maxChars);
  const lastNewline = truncated.lastIndexOf('\n');
  if (lastNewline >= maxChars / 2) {
    return truncated.slice(0, lastNewline);
  }
  return truncated;
}

export function truncatePromptStringStart(text: string, maxChars: number): string {
  if (text.length <= maxChars) return text;
  return '...' + text.slice(text.length - maxChars + 3);
}

export function truncatePromptString(text: string, maxChars: number): string {
  if (text.length <= maxChars) return text;
  return text.slice(0, maxChars - 3) + '...';
}
