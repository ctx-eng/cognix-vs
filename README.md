# cognix-vs

Cognix for Visual Studio Code — an AI coding assistant that uses advanced search and workspace context to help you write and fix code.

## Development

Install dependencies:

```bash
npm install
```

Build the extension:

```bash
npm run compile
```

Run in VS Code extension development mode:

1. Open the workspace in VS Code.
2. Press `F5` to launch the Extension Development Host.
3. Run the `Cognix VS: Ask question` command.

## Testing

Cognix VS Code supports the following test categories:

1. Unit tests (`vitest`) stored next to code files as `.test.ts`.
2. Storybook UI stories in `webviews` stored as `.story.tsx`.
3. Integration tests in `integration`, running VS Code and using the extension's testing API.
4. End-to-end tests using Playwright against the VS Code UI.

Run tests with:

```bash
npm run test:unit
npm run storybook
npm run test:integration
npm run test:e2e
```

## Configuration

Add your OpenAI API key in user or workspace settings:

```json
{
  "cognixVs.openAIApiKey": "YOUR_API_KEY"
}
```

## Commands

- `Cognix VS: Start`
- `Cognix VS: Ask question`
- `Cognix VS: Fix code`
- `Cognix VS: Open prompt library`
