export class Typewriter {
  private text = '';
  private callbacks: Array<(text: string) => void> = [];

  constructor(private speed: number = 50) {}

  public write(char: string): void {
    this.text += char;
    this.notify();
  }

  public writeText(text: string): void {
    this.text += text;
    this.notify();
  }

  public getText(): string {
    return this.text;
  }

  public clear(): void {
    this.text = '';
    this.notify();
  }

  public onChange(callback: (text: string) => void): () => void {
    this.callbacks.push(callback);
    return () => {
      this.callbacks = this.callbacks.filter((cb) => cb !== callback);
    };
  }

  private notify(): void {
    for (const cb of this.callbacks) {
      cb(this.text);
    }
  }
}
