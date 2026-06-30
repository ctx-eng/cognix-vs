export function getDefaultSystemPrompt(): string {
  return 'You are Cognix, an AI coding assistant. Answer questions and help with programming tasks.';
}

export function getChatPreamble(context?: { repository?: string; filePath?: string }): string {
  let preamble = getDefaultSystemPrompt();
  if (context?.repository) {
    preamble += `\n\nWorking in repository: ${context.repository}`;
  }
  if (context?.filePath) {
    preamble += `\n\nCurrent file: ${context.filePath}`;
  }
  return preamble;
}

export function getSimplePreamble(): string {
  return getDefaultSystemPrompt();
}
