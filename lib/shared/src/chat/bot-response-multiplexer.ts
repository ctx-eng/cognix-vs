import { Typewriter } from './typewriter';

export class BotResponseMultiplexer {
  private typewriters: Map<string, Typewriter> = new Map();
  private subscribers: Map<string, Array<(text: string) => void>> = new Map();

  public getOrCreateTypewriter(id: string): Typewriter {
    if (!this.typewriters.has(id)) {
      const tw = new Typewriter();
      this.typewriters.set(id, tw);
      tw.onChange((text) => {
        const subs = this.subscribers.get(id);
        if (subs) {
          for (const cb of subs) cb(text);
        }
      });
    }
    return this.typewriters.get(id)!;
  }

  public subscribe(id: string, callback: (text: string) => void): () => void {
    if (!this.subscribers.has(id)) {
      this.subscribers.set(id, []);
    }
    this.subscribers.get(id)!.push(callback);
    return () => {
      const subs = this.subscribers.get(id);
      if (subs) {
        const idx = subs.indexOf(callback);
        if (idx >= 0) subs.splice(idx, 1);
      }
    };
  }

  public clear(id: string): void {
    this.typewriters.get(id)?.clear();
  }
}
