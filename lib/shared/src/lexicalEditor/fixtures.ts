import type { SerializedEditorState } from './editorState';

export const FILE_MENTION_EDITOR_STATE_FIXTURE: SerializedEditorState = {
  root: {
    children: [
      {
        type: 'paragraph',
        children: [
          { type: 'text', text: 'Check this file: ' },
          { type: 'mention', id: 'file:///test.ts', text: 'test.ts', trigger: '@' },
        ],
      },
    ],
    direction: null,
    format: '',
    indent: 0,
    type: 'root',
    version: 1,
  },
};

export const OLD_TEXT_FILE_MENTION_EDITOR_STATE_FIXTURE: SerializedEditorState = {
  root: {
    children: [
      {
        type: 'paragraph',
        children: [
          { type: 'text', text: 'See ' },
          { type: 'mention', id: 'file:///old.ts', text: 'old.ts', trigger: '#' },
        ],
      },
    ],
    direction: null,
    format: '',
    indent: 0,
    type: 'root',
    version: 1,
  },
};

export const UNKNOWN_NODES_EDITOR_STATE_FIXTURE: SerializedEditorState = {
  root: {
    children: [
      {
        type: 'unknown',
        children: [],
        direction: null,
        format: '',
        indent: 0,
        version: 1,
      } as any,
    ],
    direction: null,
    format: '',
    indent: 0,
    type: 'root',
    version: 1,
  },
};
