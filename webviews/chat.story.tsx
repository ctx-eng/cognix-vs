import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

const ChatWidget = ({ message }: { message: string }) => (
  <div style={{ padding: 16, fontFamily: 'sans-serif' }}>
    <strong>Cognix chat</strong>
    <div>{message}</div>
  </div>
);

const meta: Meta<typeof ChatWidget> = {
  title: 'Chat/Widget',
  component: ChatWidget
};

export default meta;

export const Default: StoryObj<typeof ChatWidget> = {
  args: {
    message: 'Ask a question about your workspace.'
  }
};
