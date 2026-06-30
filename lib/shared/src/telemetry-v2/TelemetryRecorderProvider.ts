export interface ExtensionDetails {
  name: string;
  version: string;
}

export interface TelemetryRecorder {
  record(event: string, data?: Record<string, any>): void;
}

export const noOpTelemetryRecorder: TelemetryRecorder = {
  record(_event: string, _data?: Record<string, any>): void {},
};

export class TelemetryRecorderProvider {
  protected recorder: TelemetryRecorder;

  constructor(extensionDetails: ExtensionDetails) {
    this.recorder = noOpTelemetryRecorder;
  }

  getRecorder(): TelemetryRecorder {
    return this.recorder;
  }

  record(event: string, data?: Record<string, any>): void {
    this.recorder.record(event, data);
  }
}

export class NoOpTelemetryRecorderProvider extends TelemetryRecorderProvider {
  constructor() {
    super({ name: 'cognix', version: '1.0.0' });
  }
}

export class MockServerTelemetryRecorderProvider extends TelemetryRecorderProvider {
  private events: Array<{ event: string; data?: Record<string, any> }> = [];

  constructor() {
    super({ name: 'cognix', version: '1.0.0' });
  }

  getEvents(): Array<{ event: string; data?: Record<string, any> }> {
    return this.events;
  }

  record(event: string, data?: Record<string, any>): void {
    this.events.push({ event, data });
  }
}
