export interface MentionQuery {
  text: string;
  trigger?: string;
  query: string;
}

export function parseMentionQuery(text: string): MentionQuery {
  const atIndex = text.lastIndexOf('@');
  const hashIndex = text.lastIndexOf('#');
  const triggerIndex = Math.max(atIndex, hashIndex);

  if (triggerIndex >= 0) {
    return {
      text,
      trigger: text[triggerIndex],
      query: text.slice(triggerIndex + 1),
    };
  }

  return { text, query: text };
}

export function scanForMentionTriggerInUserTextInput(text: string): { startIndex: number; endIndex: number; trigger: string } | undefined {
  const atIndex = text.lastIndexOf('@');
  const hashIndex = text.lastIndexOf('#');
  const triggerIndex = Math.max(atIndex, hashIndex);

  if (triggerIndex >= 0) {
    const remaining = text.slice(triggerIndex + 1);
    if (remaining.length > 0 && !remaining.includes(' ')) {
      return {
        startIndex: triggerIndex,
        endIndex: text.length,
        trigger: text[triggerIndex],
      };
    }
  }
  return undefined;
}
