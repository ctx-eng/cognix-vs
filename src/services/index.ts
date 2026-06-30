export class ServiceManager {
  private services = new Map<string, unknown>();

  register<T>(name: string, instance: T): this {
    this.services.set(name, instance);
    return this;
  }

  get<T>(name: string): T {
    const service = this.services.get(name);
    if (!service) {
      throw new Error(`Service "${name}" not registered`);
    }
    return service as T;
  }

  has(name: string): boolean {
    return this.services.has(name);
  }

  dispose(): void {
    for (const service of this.services.values()) {
      if (typeof (service as Record<string, unknown>).dispose === 'function') {
        ((service as Record<string, unknown>).dispose as () => void)();
      }
    }
    this.services.clear();
  }
}
