export class PromptString {
  private value: string;

  constructor(value: string) {
    this.value = value;
  }

  static fromString(value: string): PromptString {
    return new PromptString(value);
  }

  static fromRaw(value: string): PromptString {
    return new PromptString(value);
  }

  toString(): string {
    return this.value;
  }

  toRaw(): string {
    return this.value;
  }

  async toFilteredString(filterProvider?: any): Promise<string> {
    if (filterProvider) {
      return filterProvider.filter(this.value);
    }
    return this.value;
  }

  concat(other: PromptString): PromptString {
    return new PromptString(this.value + other.value);
  }

  get length(): number {
    return this.value.length;
  }
}

export function promptString(value: string): PromptString {
  return new PromptString(value);
}
