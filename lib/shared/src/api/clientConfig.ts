export interface CognixNotice {
  title: string;
  message: string;
  severity: 'info' | 'warning' | 'error';
}

export interface CognixClientConfig {
  notices?: CognixNotice[];
  multipleCompletions?: boolean;
  disableNonInteractive?: boolean;
  experimentalFeatures?: Record<string, boolean>;
}

export class ClientConfigSingleton {
  private config: CognixClientConfig = {};

  static getInstance(): ClientConfigSingleton {
    return new ClientConfigSingleton();
  }

  async getConfig(): Promise<CognixClientConfig> {
    return this.config;
  }

  setConfig(config: CognixClientConfig): void {
    this.config = config;
  }
}
