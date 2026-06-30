export interface OpenCtxContextItem {
  uri: string;
  title: string;
  content?: string;
  range?: {
    start: { line: number; character: number };
    end: { line: number; character: number };
  };
}

export interface OpenCtxContextResult {
  items: OpenCtxContextItem[];
}
