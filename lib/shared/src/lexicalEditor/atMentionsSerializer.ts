import type { SerializedEditorState } from './editorState';

export function serialize(state: SerializedEditorState): string {
  function serializeNode(node: any): string {
    if (node.type === 'text') return node.text ?? '';
    if (node.type === 'mention') return `${node.trigger}${node.text}`;
    if (node.children) return node.children.map(serializeNode).join('');
    return '';
  }
  return serializeNode(state.root);
}

export function deserialize(text: string): SerializedEditorState {
  return {
    root: {
      children: [{ type: 'paragraph', children: [{ type: 'text', text }] }],
      direction: null,
      format: '',
      indent: 0,
      type: 'root',
      version: 1,
    },
  };
}
