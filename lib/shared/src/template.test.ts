import { describe, it, expect } from 'vitest';
import { renderTemplate, extractVariables } from './template';

describe('renderTemplate', () => {
  it('should replace simple variables', () => {
    const result = renderTemplate('Hello {{name}}', { name: 'World' });
    expect(result).toBe('Hello World');
  });

  it('should replace multiple occurrences of the same variable', () => {
    const result = renderTemplate('{{x}} + {{x}} = {{y}}', { x: '1', y: '2' });
    expect(result).toBe('1 + 1 = 2');
  });

  it('should replace multiple different variables', () => {
    const result = renderTemplate('{{a}} {{b}} {{c}}', { a: 'x', b: 'y', c: 'z' });
    expect(result).toBe('x y z');
  });

  it('should leave unknown variables unchanged', () => {
    const result = renderTemplate('Hello {{name}}', {});
    expect(result).toBe('Hello {{name}}');
  });

  it('should handle empty template', () => {
    const result = renderTemplate('', { x: 'y' });
    expect(result).toBe('');
  });

  it('should handle empty variables', () => {
    const result = renderTemplate('no variables here', {});
    expect(result).toBe('no variables here');
  });
});

describe('extractVariables', () => {
  it('should extract variable names from template', () => {
    const result = extractVariables('{{a}} and {{b}}');
    expect(result).toEqual(['a', 'b']);
  });

  it('should return unique variable names', () => {
    const result = extractVariables('{{x}} {{x}} {{y}}');
    expect(result).toEqual(['x', 'y']);
  });

  it('should return empty array for template without variables', () => {
    const result = extractVariables('no variables');
    expect(result).toEqual([]);
  });

  it('should return empty array for empty template', () => {
    const result = extractVariables('');
    expect(result).toEqual([]);
  });
});
