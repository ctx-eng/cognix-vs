export interface EditorState {
  filePath?: string;
  content?: string;
  selection?: {
    start: { line: number; character: number };
    end: { line: number; character: number };
  };
  languageId?: string;
}
