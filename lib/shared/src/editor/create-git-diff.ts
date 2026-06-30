export interface GitDiffOptions {
  originalContent: string;
  modifiedContent: string;
  context?: number;
}

export function createGitDiff(options: GitDiffOptions): string {
  const { originalContent, modifiedContent, context = 3 } = options;
  const origLines = originalContent.split('\n');
  const modLines = modifiedContent.split('\n');

  if (origLines.length === modLines.length && origLines.every((l, i) => l === modLines[i])) {
    return '';
  }

  const result: string[] = ['--- original', '+++ modified'];

  const maxLen = Math.max(origLines.length, modLines.length);
  const hunks: Array<{ start: number; count: number }> = [];

  for (let i = 0; i < maxLen; i++) {
    if (origLines[i] !== modLines[i]) {
      const hunkStart = Math.max(0, i - context);
      const hunkEnd = Math.min(maxLen - 1, i + context);
      if (hunks.length > 0 && hunkStart <= hunks[hunks.length - 1].start + hunks[hunks.length - 1].count) {
        hunks[hunks.length - 1].count = hunkEnd - hunks[hunks.length - 1].start + 1;
      } else {
        hunks.push({ start: hunkStart, count: hunkEnd - hunkStart + 1 });
      }
    }
  }

  for (const hunk of hunks) {
    const start1 = hunk.start + 1;
    const count1 = Math.min(hunk.count, origLines.length - hunk.start);
    const start2 = hunk.start + 1;
    const count2 = Math.min(hunk.count, modLines.length - hunk.start);
    result.push(`@@ -${start1},${count1} +${start2},${count2} @@`);

    for (let i = hunk.start; i < hunk.start + hunk.count; i++) {
      const origLine = origLines[i] ?? '';
      const modLine = modLines[i] ?? '';
      if (origLine === modLine) {
        result.push(' ' + origLine);
      } else {
        if (i < origLines.length) result.push('-' + origLine);
        if (i < modLines.length) result.push('+' + modLine);
      }
    }
  }

  return result.join('\n');
}
