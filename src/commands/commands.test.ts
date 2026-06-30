import { describe, it, expect, vi } from 'vitest';
import { ServiceManager } from '../services';

describe('Commands', () => {
  it('should export registerCommands function', async () => {
    const mod = await import('./index');
    expect(mod.registerCommands).toBeDefined();
    expect(typeof mod.registerCommands).toBe('function');
  });

  it('should register commands with the provided context', async () => {
    const mod = await import('./index');
    const serviceManager = new ServiceManager();
    const context = {
      subscriptions: [] as { dispose: () => void }[],
      extensionUri: {} as any,
    } as any;

    const disposables = mod.registerCommands(context, serviceManager);
    expect(disposables.length).toBeGreaterThan(0);
    expect(context.subscriptions.length).toBeGreaterThan(0);
  });
});
