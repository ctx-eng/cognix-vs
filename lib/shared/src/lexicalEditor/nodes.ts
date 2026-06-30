export interface MentionNode {
  type: 'mention';
  id: string;
  text: string;
  trigger: string;
  data?: Record<string, any>;
}

export interface TextNode {
  type: 'text';
  text: string;
  format?: number;
  style?: string;
}

export interface ParagraphNode {
  type: 'paragraph';
  children: Array<TextNode | MentionNode>;
}

export interface LineBreakNode {
  type: 'linebreak';
}

export type LexicalNode = TextNode | MentionNode | ParagraphNode | LineBreakNode;
