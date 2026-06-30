export interface PromptMixin {
  mixInto(prompt: string): string;
}

export function newPromptMixin(mixin: string): PromptMixin {
  return {
    mixInto(prompt: string): string {
      return `${mixin}\n\n${prompt}`;
    },
  };
}

export const PromptMixin = {
  create(value: string): PromptMixin {
    return newPromptMixin(value);
  },
};
