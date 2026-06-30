import type { TelemetryRecorder } from './TelemetryRecorderProvider';
import { noOpTelemetryRecorder } from './TelemetryRecorderProvider';

let singleton: TelemetryRecorder = noOpTelemetryRecorder;

export function setTelemetryRecorder(recorder: TelemetryRecorder): void {
  singleton = recorder;
}

export function getTelemetryRecorder(): TelemetryRecorder {
  return singleton;
}

export function record(event: string, data?: Record<string, any>): void {
  singleton.record(event, data);
}
