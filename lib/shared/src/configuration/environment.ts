export interface EnvironmentConfig {
  isApp: boolean;
  isWeb: boolean;
  isAgent: boolean;
  isVSCode: boolean;
  isJetBrains: boolean;
}

export function getEnvironment(): EnvironmentConfig {
  return {
    isApp: typeof process !== 'undefined' && process.env?.COGNIX_APP === 'true',
    isWeb: typeof window !== 'undefined' && typeof (window as any).__COGNIX_WEB__ !== 'undefined',
    isAgent: typeof process !== 'undefined' && process.env?.COGNIX_AGENT === 'true',
    isVSCode: typeof process !== 'undefined' && process.env?.VSCODE_PID !== undefined,
    isJetBrains: typeof process !== 'undefined' && process.env?.COGNIX_JETBRAINS === 'true',
  };
}
