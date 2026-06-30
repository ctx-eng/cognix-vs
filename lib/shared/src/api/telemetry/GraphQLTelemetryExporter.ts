import { CognixGraphQLAPIClient } from '../graphql/client';

export interface TelemetryEvent {
  name: string;
  properties?: Record<string, any>;
  timestamp?: string;
}

export class GraphQLTelemetryExporter {
  private client: CognixGraphQLAPIClient;

  constructor(client: CognixGraphQLAPIClient) {
    this.client = client;
  }

  async export(events: TelemetryEvent[]): Promise<void> {
    if (events.length === 0) return;

    try {
      await this.client.fetch(
        `mutation ExportTelemetry($events: [TelemetryEvent!]!) {
                    exportTelemetry(events: $events)
                }`,
        { events },
      );
    } catch (error) {
      console.error('Failed to export telemetry:', error);
    }
  }
}
