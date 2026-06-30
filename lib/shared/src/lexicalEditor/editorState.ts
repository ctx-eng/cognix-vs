export interface SerializedEditorState {
  root: {
    children: SerializedEditorNode[];
    direction: string | null;
    format: string;
    indent: number;
    type: string;
    version: number;
  };
}

export interface SerializedEditorNode {
  type: string;
  children?: SerializedEditorNode[];
  text?: string;
  [key: string]: any;
}

export function createEmptyEditorState(): SerializedEditorState {
  return {
    root: {
      children: [],
      direction: null,
      format: '',
      indent: 0,
      type: 'root',
      version: 1,
    },
  };
}
