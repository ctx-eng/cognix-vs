import React, { useCallback, useRef, useMemo } from 'react';

const VARIABLE_PATTERN = /\{\{(\w+)\}\}/g;

export interface PromptEditorProps {
  value: string;
  onChange: (value: string) => void;
  availableVariables?: string[];
  placeholder?: string;
  readOnly?: boolean;
}

interface Token {
  type: 'text' | 'variable';
  value: string;
  name?: string;
}

function tokenize(template: string): Token[] {
  const tokens: Token[] = [];
  let lastIndex = 0;
  const regex = new RegExp(VARIABLE_PATTERN.source, 'g');
  let match: RegExpExecArray | null;

  while ((match = regex.exec(template)) !== null) {
    if (match.index > lastIndex) {
      tokens.push({ type: 'text', value: template.slice(lastIndex, match.index) });
    }
    tokens.push({ type: 'variable', value: match[0], name: match[1] });
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < template.length) {
    tokens.push({ type: 'text', value: template.slice(lastIndex) });
  }

  return tokens;
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    border: '1px solid var(--vscode-input-border, #ccc)',
    borderRadius: 4,
    fontFamily: 'var(--vscode-editor-font-family, monospace)',
    fontSize: 'var(--vscode-editor-font-size, 13px)',
    position: 'relative',
  },
  highlightLayer: {
    padding: 8,
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    pointerEvents: 'none',
    minHeight: 80,
  },
  textarea: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    padding: 8,
    border: 'none',
    outline: 'none',
    resize: 'vertical',
    fontFamily: 'inherit',
    fontSize: 'inherit',
    lineHeight: 'inherit',
    color: 'transparent',
    caretColor: 'var(--vscode-editor-foreground, #000)',
    background: 'transparent',
    overflow: 'hidden',
    boxSizing: 'border-box',
  },
  variable: {
    color: 'var(--vscode-symbolIcon-variableForeground, #569cd6)',
    backgroundColor: 'var(--vscode-editor-selectionBackground, rgba(86, 156, 214, 0.15))',
    borderRadius: 3,
    padding: '0 2px',
  },
  variableList: {
    display: 'flex',
    gap: 4,
    flexWrap: 'wrap',
    padding: '4px 8px',
    borderTop: '1px solid var(--vscode-input-border, #eee)',
  },
  variableChip: {
    padding: '2px 8px',
    borderRadius: 4,
    cursor: 'pointer',
    fontSize: '0.85em',
    border: '1px solid var(--vscode-input-border, #ccc)',
    background: 'var(--vscode-button-secondaryBackground, #eee)',
    color: 'var(--vscode-button-secondaryForeground, #333)',
  },
};

export function PromptEditor({
  value,
  onChange,
  availableVariables = [],
  placeholder = 'Enter prompt template...',
  readOnly = false,
}: PromptEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const tokens = useMemo(() => tokenize(value), [value]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChange(e.target.value);
    },
    [onChange],
  );

  const insertVariable = useCallback(
    (variable: string) => {
      const el = textareaRef.current;
      if (!el) return;
      const start = el.selectionStart;
      const end = el.selectionEnd;
      const insertion = `{{${variable}}}`;
      const newValue = value.slice(0, start) + insertion + value.slice(end);
      onChange(newValue);
      requestAnimationFrame(() => {
        el.focus();
        const pos = start + insertion.length;
        el.setSelectionRange(pos, pos);
      });
    },
    [value, onChange],
  );

  return (
    <div style={styles.container}>
      <div style={{ position: 'relative', minHeight: 80 }}>
        <div style={styles.highlightLayer}>
          {tokens.map((token, i) =>
            token.type === 'variable' ? (
              <span key={i} style={styles.variable}>
                {token.value}
              </span>
            ) : (
              <span key={i}>{token.value}</span>
            ),
          )}
          {!value && <span style={{ color: 'var(--vscode-input-placeholderForeground, #999)' }}>{placeholder}</span>}
        </div>
        {!readOnly && (
          <textarea ref={textareaRef} value={value} onChange={handleChange} placeholder={placeholder} style={styles.textarea} />
        )}
      </div>
      {availableVariables.length > 0 && !readOnly && (
        <div style={styles.variableList}>
          {availableVariables.map((v) => (
            <button key={v} style={styles.variableChip as React.CSSProperties} onClick={() => insertVariable(v)} type="button">
              {'{{'}
              {v}
              {'}}'}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
