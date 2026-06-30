export interface Guardrails {
  check(input: string): Promise<GuardrailsResult>;
}

export type GuardrailsResult = GuardrailsStatusSuccess | GuardrailsStatusError | GuardrailsStatusFailed | GuardrailsStatusIndeterminate;

export interface GuardrailsStatusSuccess {
  status: 'success';
}

export interface GuardrailsStatusError {
  status: 'error';
  error: string;
}

export interface GuardrailsStatusFailed {
  status: 'failed';
  reasons: string[];
}

export interface GuardrailsStatusIndeterminate {
  status: 'indeterminate';
  message: string;
}

export type GuardrailsResultSink = 'user' | 'assistant';

export enum GuardrailsMode {
  Strict = 'strict',
  Moderate = 'moderate',
  Permissive = 'permissive',
}

export enum GuardrailsCheckStatus {
  Pass = 'pass',
  Fail = 'fail',
  Error = 'error',
  Indeterminate = 'indeterminate',
}

export function createGuardrailsImpl(): Guardrails {
  return {
    async check(input: string): Promise<GuardrailsResult> {
      return { status: 'success' };
    },
  };
}
