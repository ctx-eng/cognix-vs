const VARIABLE_PATTERN = /\{\{(\w+)\}\}/g;

export function renderTemplate(template: string, variables: Record<string, string>): string {
  return Object.entries(variables).reduce((result, [key, value]) => {
    return result.replace(new RegExp(`\\{\\{${key}\\}\\}`, 'g'), value);
  }, template);
}

export function extractVariables(template: string): string[] {
  const variables: string[] = [];
  let match: RegExpExecArray | null;
  const regex = new RegExp(VARIABLE_PATTERN.source, 'g');
  while ((match = regex.exec(template)) !== null) {
    if (!variables.includes(match[1])) {
      variables.push(match[1]);
    }
  }
  return variables;
}
