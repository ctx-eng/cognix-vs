import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.test.ts', 'lib/**/*.test.ts', 'src/**/*.test.tsx'],
  },
  resolve: {
    alias: {
      vscode: path.resolve(__dirname, 'src/test/vscodeMock.ts'),
      '@cognix/cognix-shared': path.resolve(__dirname, 'lib/shared/src'),
      '@cognix/prompt-editor': path.resolve(__dirname, 'lib/prompt-editor/src'),
      '@microsoft/fetch-event-source': path.resolve(__dirname, 'src/test/vendorMocks.ts'),
      '@opentelemetry/api': path.resolve(__dirname, 'src/test/vendorMocks.ts'),
      immer: path.resolve(__dirname, 'src/test/vendorMocks.ts'),
    },
  },
});
