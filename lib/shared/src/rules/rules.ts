export interface Rule {
  id: string;
  title: string;
  description?: string;
  content: string;
  filePath?: string;
}

export function isRuleFilename(filename: string): boolean {
  return filename.endsWith('.cognix-rule.md') || filename.endsWith('.cognix-rules');
}

export function ruleTitle(rule: Rule): string {
  return rule.title;
}

export function parseRuleFile(content: string, filePath: string): Rule {
  return {
    id: filePath,
    title: filePath.split('/').pop() ?? 'untitled',
    content,
    filePath,
  };
}

export function ruleSearchPaths(directory: string): string[] {
  return [`${directory}/.cognix-rule.md`, `${directory}/.cognix-rules`, `${directory}/.github/cognix-rules`];
}
