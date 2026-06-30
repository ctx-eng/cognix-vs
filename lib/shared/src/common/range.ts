export interface RangeData {
  start: { line: number; character: number };
  end: { line: number; character: number };
}

export function toRangeData(range: { start: { line: number; character: number }; end: { line: number; character: number } }): RangeData {
  return {
    start: { line: range.start.line, character: range.start.character },
    end: { line: range.end.line, character: range.end.character },
  };
}

export function displayLineRange(range: RangeData): string {
  return `L${range.start.line + 1}-L${range.end.line + 1}`;
}

export function displayRange(range: RangeData): string {
  return `${range.start.line + 1}:${range.start.character + 1}-${range.end.line + 1}:${range.end.character + 1}`;
}

export function expandToLineRange(range: RangeData): RangeData {
  return {
    start: { line: range.start.line, character: 0 },
    end: { line: range.end.line, character: Number.MAX_SAFE_INTEGER },
  };
}
