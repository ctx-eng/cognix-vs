# Cognix-VS Implementation Plan

## Project Overview

**Cognix-VS** is a VS Code AI coding assistant extension that uses workspace context and LLM-powered reasoning to help developers understand, edit, and generate code.

```
Extension Host (activate)
  ├── ChatPanel          — Webview-based chat UI (working MVP)
  ├── WorkspaceSearch    — Workspace file search (basic keyword, no semantic)
  ├── ProviderManager    — LLM provider (OpenAI only, hardcoded)
  └── PromptLibrary      — Built-in prompt templates (static, in-memory)
```

**Current state**: Early prototype (0.1.0). Core chat flow works end-to-end, but 20+ module directories are single-line stubs. Tests are placeholders.

---

## Architecture Overview

### Current Architecture (what exists)

```
extension.ts
  ├── registers 4 commands
  ├── creates: WorkspaceSearch, ProviderManager, PromptLibrary
  └── ChatPanel.createOrShow(uri, search, provider, prompts)

chatPanel.ts
  ├── Webview with inline HTML/JS
  ├── Sends "ask" message → search.searchWorkspace() → providerManager.complete()
  └── Renders response in history div

workspaceSearch.ts
  ├── findFiles with glob **/*.{ts,js,tsx,jsx,json,md}
  ├── Case-insensitive substring match (first 30 files, 512 chars each)
  └── No indexing, no embeddings, no ranking

providerManager.ts
  ├── Reads cognixVs.openAIApiKey from settings
  ├── Calls OpenAI /v1/chat/completions (gpt-4o-mini)
  ├── {{variable}} template rendering
  └── No provider abstraction, no streaming

promptLibrary.ts
  ├── Two hardcoded prompts: "Fix code", "Document code"
  ├── Simple lookup by title
  └── openQuickPick() shows quick pick list
```

### Target Architecture (what we're building toward)

```
extension.ts
  ├── registerCommands()        — centralized command registration
  ├── registerCodeActions()     — inline code actions
  └── ServiceManager            — lifecycle for all services

services/
  ├── ChatService               — chat sessions, history, streaming
  ├── SearchService             — semantic + keyword search
  ├── CompletionService         — inline completions
  ├── EditService               — safe edit application
  └── NonStopService            — continuous background analysis

context/
  ├── ContextManager            — aggregates workspace + file + repo context
  ├── WorkspaceIndexer          — builds searchable index
  ├── LocalContextProvider      — file-level context extraction
  └── RepositoryManager         — git history, blame, diff

providers/
  ├── LlmProvider (interface)   — abstract LLM API
  ├── OpenAIProvider            — GPT-4o-mini, GPT-4o
  ├── AnthropicProvider         — Claude models
  └── ModelManager              — model listing, selection, config

prompts/
  ├── PromptLibrary             — built-in + user prompts
  ├── PromptBuilder             — dynamic template construction
  └── PromptStore               — persistence in workspace state

tools/
  ├── TreeSitterService         — AST parsing for code understanding
  ├── LspService / LspGraph     — LSP integration for symbols/types
  ├── JsonRpcClient             — generic JSON-RPC communication
  └── NetClient                 — HTTP client with retry/auth

ui/
  ├── ChatPanel (webview)       — full chat UI with markdown rendering
  ├── PromptLibraryView         — tree view for prompts
  ├── InlineEditActions         — code lenses, hover actions
  └── Notifications             — progress, error, status bar

infra/
  ├── Telemetry                 — usage tracking (opt-in)
  ├── Logger                    — structured logging
  ├── Config                    — typed settings access
  ├── Rules                     — validation rules engine
  └── Dev                       — dev mode flags, debug commands
```

---

## Current Code Quality Assessment

### What works well
- Extension activates, registers 4 commands, returns testing API
- Chat webview opens and sends/receives messages
- Workspace search scans files and returns matches
- OpenAI integration works (gpt-4o-mini)
- Prompt template rendering with {{variable}} substitution
- Inline edit for "Fix code" works

### What needs improvement
- **No error handling**: ChatPanel doesn't handle empty prompts, search failures, or provider errors gracefully
- **No streaming**: Responses wait for full LLM completion before showing anything
- **No conversation history**: Each question is independent; no follow-up context
- **No semantic search**: Pure substring match, no ranking, limited to 30 files
- **No provider abstraction**: OpenAI hardcoded in URL, model name, and auth
- **No configuration UI**: API key is raw text setting
- **No progress indicators**: No feedback during LLM calls (can appear hung)
- **Duplicate integration tests**: `/src/test/suite/integrationTest.ts` and `/integration/activation.integration.ts` are identical
- **`.gitignore` too minimal**: Only ignores `node_modules`, not `out/` or `.vscode-test/`
- **No `.vscodeignore` for `out/test`**: Test files shipped in .vsix

### Stub modules inventory (20+ need real implementation)
| Priority | Module | Current stub | Needs |
|----------|--------|-------------|-------|
| P0 | services/ServiceManager | `init() → true` | Service lifecycle, DI container |
| P0 | commands/registerCommands | `→ []` | Centralize command registration |
| P1 | context/ContextManager | `→ "context"` | Actual context aggregation |
| P1 | completions/CompletionService | ``complete(p) → `completed ${p}` `` | Inline completion provider |
| P1 | edit/EditService | `→ true` | Safe edit with preview/diff |
| P1 | code-actions/registerCodeActions | `→ []` | Code action providers |
| P1 | models/ModelManager | `list() → []` | Model listing from providers |
| P2 | tree-sitter/TreeSitterService | stub | AST parsing |
| P2 | lsp/LspService | stub | LSP integration |
| P2 | graph/lsp/LspGraph | stub | Code graph from LSP |
| P2 | local-context/LocalContextProvider | stub | File-level context extraction |
| P2 | repository/RepositoryManager | stub | Git context |
| P2 | prompt-builder/PromptBuilder | stub | Dynamic prompt construction |
| P2 | prompts/PromptLibrary | stub | Duplicate prompt storage |
| P2 | autoedits/AutoEditService | stub | Automated edit application |
| P2 | non-stop/NonStopService | stub | Background analysis |
| P2 | supercompletions/SuperCompletionService | stub | Advanced completions |
| P3 | net/NetClient | stub | HTTP client |
| P3 | jsonrpc/JsonRpcClient | stub | JSON-RPC protocol |
| P3 | telemetry/Telemetry | stub | Usage tracking |
| P3 | rules/RuleEngine | stub | Validation rules |
| P3 | notifications/Notifications | stub | User notification helpers |
| P3 | dev/devMode | stub | Development mode |
| P3 | testutils/testUtils | stub | Test helpers |
| P3 | common/createLogger | stub | Logging |
| P3 | utils/utils | stub | General utilities |
| P3 | cognix-ignore/shouldIgnore | stub | File filtering |

---

## Implementation Roadmap

### Phase 1: Solidify the MVP (Weeks 1-2)

**Goal**: Make the existing MVP production-quality before adding features.

#### 1.1 Fix critical issues
- [ ] Add `.gitignore` entries for `out/`, `.vscode-test/`, `*.vsix`, `dist/`
- [ ] Add `out/test` and `integration/` to `.vscodeignore`
- [ ] Remove duplicate integration test (`src/test/suite/integrationTest.ts` or `integration/activation.integration.ts`)
- [ ] Fix vitest config to not include `integration/**/*` (those need VS Code host)
- [ ] Add proper error boundaries in ChatPanel (empty prompt, search failure, provider error)

#### 1.2 Improve existing modules
- [ ] **ChatPanel**: Add loading indicator, handle errors gracefully, show user messages in history
- [ ] **WorkspaceSearch**: Add progress reporting, increase file limit, improve relevance scoring
- [ ] **ProviderManager**: Add request timeout, retry logic, token counting, streaming support
- [ ] **PromptLibrary**: Add more built-in prompts (refactor, explain, add tests, optimize)

#### 1.3 Testing
- [ ] Write real unit tests for WorkspaceSearch (mock vscode.workspace)
- [ ] Write real unit tests for ProviderManager (mock fetch)
- [ ] Write real unit tests for PromptLibrary
- [ ] Write real unit tests for ChatPanel message handling
- [ ] Fix vs code integration tests to actually test command execution

#### 1.4 Quality
- [ ] Add ESLint plugin for TypeScript (`@typescript-eslint`)
- [ ] Add Prettier config and format check script
- [ ] Add CI workflow (GitHub Actions: lint, test:unit, compile check)
- [ ] Add `npm run typecheck` for `tsc --noEmit`

---

### Phase 2: Service Layer & Provider Abstraction (Weeks 3-4)

**Goal**: Build the foundation for all future features.

#### 2.1 Service lifecycle (services/ServiceManager)
- [ ] Implement dependency injection container
- [ ] Service registration with lazy initialization
- [ ] Lifecycle hooks: init, dispose, reset
- [ ] Migrate extension.ts to use ServiceManager

#### 2.2 Centralized commands (commands/)
- [ ] Move all 4 commands from extension.ts into commands/index.ts
- [ ] Add command metadata (title, category, keybinding)
- [ ] Add command testing utilities

#### 2.3 Provider abstraction (models/ + new providers/)
- [ ] Define `LlmProvider` interface: `complete()`, `stream()`, `listModels()`, `countTokens()`
- [ ] **OpenAIProvider**: Streaming via SSE, multiple models, token tracking
- [ ] **AnthropicProvider**: Claude Haiku/Sonnet/Opus
- [ ] Update settings to `cognixVs.provider` (enum: openai, anthropic)
- [ ] ModelManager: discover available models from API, allow user selection
- [ ] API key management per provider

#### 2.4 Configuration improvements
- [ ] Typed config access with defaults and validation
- [ ] Add settings UI (provider picker, model picker, API key per provider)
- [ ] Config change watcher

---

### Phase 3: Context Engine & Semantic Search (Weeks 5-6)

**Goal**: Replace simple substring search with intelligent context retrieval.

#### 3.1 Context framework (context/)
- [ ] ContextManager: aggregate context from multiple sources
- [ ] ContextProvider interface: `getContext(query, options) → ContextItem[]`
- [ ] Scoring/ranking system for context items

#### 3.2 Workspace indexing (workspaceSearch.ts → context/WorkspaceIndexer)
- [ ] Build a file index on activation (async, progress reporting)
- [ ] Index metadata: file path, last modified, language, size, symbols
- [ ] TF-IDF or BM25 keyword scoring
- [ ] Respect `.gitignore` and `cognix-ignore` patterns
- [ ] Incremental index updates on file change

#### 3.3 Local context (local-context/)
- [ ] Extract context from open editors (visible code)
- [ ] Extract context from active selection
- [ ] Extract context from surrounding imports/functions

#### 3.4 Repository context (repository/)
- [ ] Git-aware context: current branch, recent commits, diff
- [ ] File blame info for authorship
- [ ] Repository structure overview

#### 3.5 Code actions (code-actions/)
- [ ] Register CodeAction providers for fix, document, refactor, explain
- [ ] Selection-aware actions (only show relevant actions)
- [ ] Quick fix for diagnostics (integrate with VS Code problem markers)

---

### Phase 4: Chat & Inline Editing (Weeks 7-8)

**Goal**: Rich chat experience with streaming, history, and safe edits.

#### 4.1 Chat improvements (ChatPanel + chat/)
- [ ] Markdown rendering for responses (syntax-highlighted code blocks)
- [ ] Streaming responses (SSE from provider → incremental webview update)
- [ ] Conversation history (persist to workspace state)
- [ ] Follow-up questions with context carry-over
- [ ] Source references (clickable file links from context)
- [ ] Cancel button for in-flight requests
- [ ] Webview state preservation across panel hide/show

#### 4.2 Inline editing (edit/ + autoedits/)
- [ ] EditService: apply edits with preview/diff view
- [ ] Undo support via VS Code workspace edit
- [ ] AutoEditService: apply edits without user confirmation (non-stop mode)
- [ ] Edit validation (syntax check before applying)

#### 4.3 Inline completions (completions/ + supercompletions/)
- [ ] CompletionService: register InlineCompletionItemProvider
- [ ] Context-aware completions (surrounding code, imports, types)
- [ ] Ghost text display with acceptance (Tab) / dismissal (Esc)
- [ ] SuperCompletionService: multi-line, function-level completions

#### 4.4 Non-stop mode (non-stop/)
- [ ] Continuous background analysis
- [ ] Automatic suggestions for errors/warnings as you type
- [ ] Debounced triggering on file save

---

### Phase 5: Prompt System & Advanced Tools (Weeks 9-10)

**Goal**: Complete the prompt ecosystem and advanced developer tools.

#### 5.1 Prompt library (promptLibrary.ts → prompts/)
- [ ] PromptLibrary: built-in + user-defined prompts
- [ ] Prompt persistence in workspace state / global state
- [ ] Prompt categories and tagging
- [ ] Prompt variables system ({{selection}}, {{file}}, {{symbol}}, {{language}})
- [ ] Prompt preview and testing UI
- [ ] PromptLibraryView: tree view in VS Code sidebar

#### 5.2 Prompt builder (prompt-builder/)
- [ ] Dynamic prompt construction from context
- [ ] Token budget management (fit context within model limits)
- [ ] Prompt templates with conditional sections

#### 5.3 Tree-sitter AST (tree-sitter/)
- [ ] TreeSitterService: parse files into AST
- [ ] Extract functions, classes, imports, exports
- [ ] Smart context selection (include relevant surrounding code)
- [ ] Code structure for better LLM understanding

#### 5.4 LSP integration (lsp/ + graph/)
- [ ] LspService: query hover, go-to-definition, references, completions
- [ ] LspGraph: build dependency/call graph from LSP data
- [ ] Type-aware context: include type definitions in LLM context

#### 5.5 Net & JSON-RPC (net/ + jsonrpc/)
- [ ] NetClient: reusable HTTP client with rate limiting, retry, auth
- [ ] JsonRpcClient: JSON-RPC 2.0 over HTTP or stdio
- [ ] Support for local LLM servers (llama.cpp, vLLM, ollama) via JSON-RPC

---

### Phase 6: Polish & Production Readiness (Weeks 11-12)

**Goal**: Ship a high-quality v1.0 release.

#### 6.1 Testing
- [ ] Comprehensive unit tests (80%+ coverage on core modules)
- [ ] Integration tests for commands, chat panel, edit workflows
- [ ] E2E tests with Playwright for critical user flows
- [ ] Test with multiple workspace sizes and configurations

#### 6.2 Documentation
- [ ] README with feature overview, setup, usage
- [ ] Configuration guide (all settings explained)
- [ ] Prompt authoring guide
- [ ] CHANGELOG

#### 6.3 Polish
- [ ] Telemetry (opt-in, privacy-first)
- [ ] Error recovery: graceful degradation when provider is unavailable
- [ ] Performance: lazy loading, index caching, debounced search
- [ ] Security: API key storage (use VS Code SecretStorage), no prompt logging
- [ ] Accessibility: webview ARIA labels, keyboard navigation, screen reader support

#### 6.4 Release
- [ ] Finalize `.vscodeignore` (exclude test files, source maps, configs)
- [ ] Pack and smoke-test .vsix
- [ ] Publish to VS Code marketplace (open source)
- [ ] Set up CI/CD for automated publishing

---

## Dependencies Graph

```
Phase 2 (Service Layer)
  └── required by: Phases 3, 4, 5, 6

Phase 2.3 (Provider Abstraction)
  ├── required by: Phase 4.1 (Chat improvements)
  ├── required by: Phase 4.2 (Inline editing)
  └── required by: Phase 4.3 (Completions)

Phase 3 (Context Engine)
  ├── required by: Phase 4.1 (Chat — better context)
  ├── required by: Phase 4.3 (Completions — context-aware)
  └── required by: Phase 5.3 (Tree-sitter — enhanced context)

Phase 4.1 (Chat)
  └── required by: Phase 5.1 (Prompt library UI)

Phase 1 can start immediately (independent of other phases).
Phases 2 and 3 can proceed in parallel after Phase 1.
Phases 4 and 5 can proceed in parallel after Phases 2+3.
Phase 6 is the final polish and release phase.
```

---

## Recommended Sprint Plan

| Sprint | Focus | Key Deliverables |
|--------|-------|-----------------|
| Sprint 1 | Phase 1 — MVP hardening | Bug fixes, .gitignore, deduplicate tests, error handling, real unit tests, CI |
| Sprint 2 | Phase 2.1–2.2 — Services + Commands | ServiceManager DI, centralized commands, migrate extension.ts |
| Sprint 3 | Phase 2.3 — Provider abstraction | LlmProvider interface, OpenAI streaming, Anthropic, ModelManager |
| Sprint 4 | Phase 3.1–3.2 — Context Engine | ContextManager, WorkspaceIndexer with TF-IDF, incremental updates |
| Sprint 5 | Phase 3.3–3.5 — Context sources + Code actions | Local context, repo context, CodeAction providers |
| Sprint 6 | Phase 4.1 — Chat improvements | Streaming, markdown, history, follow-ups, source references |
| Sprint 7 | Phase 4.2–4.4 — Editing + Completions | EditService, diff preview, InlineCompletionProvider, non-stop |
| Sprint 8 | Phase 5.1–5.2 — Prompt system | User prompts, persistence, categories, PromptBuilder, tree view |
| Sprint 9 | Phase 5.3–5.5 — Advanced tools | Tree-sitter, LspService, NetClient, JsonRpcClient, local LLM support |
| Sprint 10 | Phase 6 — Release | Full test coverage, docs, telemetry, security audit, marketplace publish |

---

## Completed (Sprint 1)

- [x] Fix `.gitignore` — add `out/`, `.vscode-test/`, `*.vsix`, `dist/`
- [x] Fix `.vscodeignore` — add build artifacts and test sources
- [x] Remove duplicate integration test
- [x] Fix vitest config (exclude VS Code-hosted integration tests)
- [x] Add GitHub Actions CI workflow (`.github/workflows/ci.yml`)
- [x] Add error handling to ChatPanel (empty prompts, loading states, error display, VS Code theming)
- [x] Write real unit tests: 30 tests across 5 files (WorkspaceSearch, ProviderManager, PromptLibrary, Commands, shared template)
- [x] Add `@typescript-eslint` + Prettier config
- [x] Add `npm run typecheck` + `npm run format` scripts
- [x] Validate all checks pass (format, tests, typecheck, lint, compile)

## Completed (Sprint 2 — Shared Libraries)

- [x] Create `@cognix/cognix-shared` package (`lib/shared/`)
  - `PromptTemplate`, `CompletionRequest`, `CompletionResponse`, `LlmProvider`, `ContextItem` types
  - `renderTemplate()` and `extractVariables()` utilities
  - Unit tests for template utilities (10 tests)
- [x] Create `@cognix/prompt-editor` package (`lib/prompt-editor/`)
  - `PromptEditor` React component with `{{variable}}` syntax highlighting
  - Variable chip insertion UI
  - Storybook story at `webviews/promptEditor/promptEditor.story.tsx`
- [x] Wire packages into extension via tsconfig paths
  - Updated root `tsconfig.json` with `baseUrl` + `paths`
  - Updated `vitest.config.ts` with resolve aliases
  - Refactored `src/promptLibrary.ts` to import `PromptTemplate` from shared
  - Refactored `src/providerManager.ts` to import `renderTemplate` from shared
