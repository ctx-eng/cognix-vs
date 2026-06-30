import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { PromptEditor } from '@cognix/prompt-editor';

const defaultVariables = ['selection', 'file', 'language', 'symbol'];

const PromptEditorWrapper = (args: any) => {
  const [value, setValue] = useState(args.value || '');
  return (
    <div style={{ width: 500, padding: 16 }}>
      <PromptEditor {...args} value={value} onChange={setValue} />
    </div>
  );
};

const meta: Meta<typeof PromptEditorWrapper> = {
  title: 'PromptEditor/Editor',
  component: PromptEditorWrapper,
};

export default meta;

export const Empty: StoryObj<typeof PromptEditorWrapper> = {
  args: {
    value: '',
    availableVariables: defaultVariables,
    placeholder: 'Write your prompt template...',
  },
};

export const WithTemplate: StoryObj<typeof PromptEditorWrapper> = {
  args: {
    value: 'Fix the following {{language}} code:\n\n{{selection}}\n\nMake sure to preserve behavior.',
    availableVariables: defaultVariables,
  },
};
