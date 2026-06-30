import type { RangeData } from '../common/range';

export type ActiveTextEditorDiagnosticType = 'error' | 'warning' | 'info';

export interface ActiveTextEditorDiagnostic {
  type: ActiveTextEditorDiagnosticType;
  message: string;
  range: RangeData;
}

export interface ActiveTextEditorSelection {
  text: string;
  range: RangeData;
}

export interface ActiveTextEditorVisibleContent {
  text: string;
  range: RangeData;
}

export interface ActiveTextEditor {
  filePath: string;
  selection?: ActiveTextEditorSelection;
  visibleContent?: ActiveTextEditorVisibleContent;
  diagnostics?: ActiveTextEditorDiagnostic[];
}

export interface Editor {
  getActiveTextEditor(): ActiveTextEditor | undefined;
  getActiveTextEditorSelection(): ActiveTextEditorSelection | undefined;
  getActiveTextEditorVisibleContent(): ActiveTextEditorVisibleContent | undefined;
}

export class NoopEditor implements Editor {
  getActiveTextEditor(): ActiveTextEditor | undefined {
    return undefined;
  }

  getActiveTextEditorSelection(): ActiveTextEditorSelection | undefined {
    return undefined;
  }

  getActiveTextEditorVisibleContent(): ActiveTextEditorVisibleContent | undefined {
    return undefined;
  }
}
