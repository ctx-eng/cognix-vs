export type { PromptTemplate, CompletionRequest, CompletionResponse, LlmProvider } from './types';

export { renderTemplate, extractVariables } from './template';

// Add anything else here that needs to be used outside of this library.

export * from './models/modelsService';
export { handleRateLimitError } from './models/sync';
export {
  type Model,
  type ServerModel,
  createModel,
  createModelFromServerModel,
    modelTier,
    toLegacyModel,
    FIXTURE_MODEL,
} from './models/model';
export { parseModelRef, type ModelRef, type ModelRefStr } from './models/ref';
export { type EditModel, type EditProvider, type ChatModel, type ChatProvider, ModelUsage, type ModelContextWindow } from './models/types';
export { FIXTURE_MODELS } from './models/fixtures';
export { ModelTag } from './models/tags';
export { getProviderName, getModelInfo, isCognixProModel, isCustomModel, toModelRefStr, isWaitlistModel } from './models/utils';
export { BotResponseMultiplexer } from './chat/bot-response-multiplexer';
export { ChatClient } from './chat/chat';
export { getDefaultSystemPrompt, getChatPreamble, getSimplePreamble } from './chat/preamble';
export type { SerializedChatInteraction, SerializedChatTranscript } from './chat/transcript';
export { serializeChatMessage } from './chat/transcript';
export { errorToChatError, DEFAULT_EVENT_SOURCE, EventSourceTelemetryMetadataMapping } from './chat/transcript/messages';
export type {
  AccountKeyedChatHistory,
  ChatHistoryKey,
  ChatError,
  EventSource,
  ChatHistory,
  ChatMessage,
  UserLocalHistory,
  SerializedChatMessage,
  RankedContext,
  ChatMessageWithSearch,
  ChatMessageSearch,
  ProcessingStep,
} from './chat/transcript/messages';
export { ProcessType } from './chat/transcript/messages';
export { COGNIX_PASSTHROUGH_VSCODE_OPEN_COMMAND_ID, webviewOpenURIForContextItem } from './chat/transcript/display-text';
export { Typewriter } from './chat/typewriter';
export { reformatBotMessageForChat } from './chat/viewHelpers';
export type {
  ContextGroup,
  ContextProvider,
  Disposable,
  LocalSearchProvider,
  RemoteSearchProvider,
  SearchProvider,
} from './codebase-context/context-status';
export {
  type ContextItem,
  type ContextItemFile,
  type ContextItemOpenCtx,
  ContextItemSource,
  type ContextItemWithContent,
  type ContextItemSymbol,
  type ContextFileType,
  type ContextMessage,
  type DefaultContext,
  type SymbolKind,
  type ContextItemTree,
  type ContextItemRepository,
  type ContextItemCurrentSelection,
  type ContextItemCurrentFile,
  type ContextItemCurrentRepository,
  type ContextItemCurrentDirectory,
  type ContextItemCurrentOpenTabs,
  type ContextItemMedia,
  FILE_RANGE_TOOLTIP_LABEL,
  GENERAL_HELP_LABEL,
  IGNORED_FILE_WARNING_LABEL,
  LARGE_FILE_WARNING_LABEL,
  NO_SYMBOL_MATCHES_HELP_LABEL,
} from './codebase-context/messages';
export * from './cognixPaths';
export type { CognixCommand, CognixCommandContext, CognixCommandType, CognixCommandMode, TerminalOutputArguments } from './commands/types';
export { CustomCommandType } from './commands/types';
export { type DefaultCognixCommands, DefaultChatCommands, DefaultEditCommands } from './commands/types';
export { dedupeWith, isDefined, isErrorLike, pluralize } from './common';
export { type RangeData, toRangeData, displayLineRange, displayRange, expandToLineRange } from './common/range';
export * from './common/abortController';
export {
  ProgrammingLanguage,
  languageFromFilename,
  markdownCodeBlockLanguageIDForFilename,
  extensionForLanguage,
} from './common/languages';
export { posixFilePaths, pathFunctionsForURI, defaultPathFunctions } from './common/path';
export { parseEvents } from './api/completions/parse';
export { isWindows, isMacOS } from './common/platform';
export {
  assertFileURI,
  isFileURI,
  uriBasename,
  uriDirname,
  uriExtname,
  uriParseNameAndExtension,
  SUPPORTED_URI_SCHEMAS,
  type FileURI,
} from './common/uri';
export { NoopEditor } from './editor';
export type {
  ActiveTextEditor,
  ActiveTextEditorDiagnostic,
  ActiveTextEditorDiagnosticType,
  ActiveTextEditorSelection,
  ActiveTextEditorVisibleContent,
  Editor,
} from './editor';
export {
  displayPath,
  displayPathWithLines,
  displayPathBasename,
  uriHasPrefix,
  displayPathDirname,
  displayPathWithoutWorkspaceFolderPrefix,
  setDisplayPathEnvInfo,
  fixPathSep,
  type DisplayPathEnvInfo,
} from './editor/displayPath';
export { forceHydration, hydrateAfterPostMessage } from './editor/hydrateAfterPostMessage';
export * from './editor/utils';
export { FeatureFlag, type FeatureFlagProvider, featureFlagProvider } from './experimentation/FeatureFlagProvider';
export type {
  Guardrails,
  GuardrailsResult,
  GuardrailsStatusError,
  GuardrailsStatusFailed,
  GuardrailsStatusIndeterminate,
  GuardrailsStatusSuccess,
  GuardrailsResultSink,
} from './guardrails';
export { createGuardrailsImpl, GuardrailsMode, GuardrailsCheckStatus } from './guardrails';
export type { GuardrailsClientConfig } from './guardrails/client';
export { CognixGuardrailsClient } from './guardrails/client';
export {
  CompletionStopReason,
  type CodeCompletionsClient,
  type CodeCompletionsParams,
  type SerializedCodeCompletionsParams,
  type CompletionResponseGenerator,
  type CompletionResponseWithMetaData,
  type CodeCompletionProviderOptions,
} from './inferenceClient/misc';
export type { Result } from './local-context';
export { logDebug, logError, setLogger } from './logger';
export { createOllamaClient, ollamaChatClient, type OllamaGenerateParams, OLLAMA_DEFAULT_URL } from './llm-providers/ollama';
export {
  MAX_BYTES_PER_FILE,
  MAX_CURRENT_FILE_TOKENS,
  ANSWER_TOKENS,
  NUM_CODE_RESULTS,
  NUM_TEXT_RESULTS,
  SURROUNDING_LINES,
} from './prompt/constants';
export { PromptMixin, newPromptMixin } from './prompt/prompt-mixin';
export * from './prompt/templates';
export { truncateTextNearestLine, truncatePromptStringStart, truncatePromptString } from './prompt/truncation';
export type { Message } from './api';
export {
  addClientInfoParams,
  getClientInfoQueryParams as getClientInfoParams,
  getClientIdentificationHeaders,
  setClientNameVersion,
  addCognixClientIdentificationHeaders,
} from './api/client-name-version';
export { CognixBrowserCompletionsClient } from './api/completions/browserClient';
export { CognixCompletionsClient } from './api/completions/client';
export type { CompletionLogger, CompletionRequestParameters } from './api/completions/client';
export * from './api/completions/types';
export { DOTCOM_URL, isDotCom, DOTCOM_WORKSPACE_UPGRADE_URL } from './api/environments';
export {
  AbortError,
  AuthConfigError,
  AuthError,
  AvailabilityError,
  EnterpriseUserDotComError,
  ExternalAuthProviderError,
  InvalidAccessTokenError,
  NeedsAuthChallengeError,
  NetworkError,
  RateLimitError,
  TimeoutError,
  TracedError,
  isAbortError,
  isAbortErrorOrSocketHangUp,
  isAuthError,
  isAvailabilityError,
  isContextWindowLimitError,
  isEnterpriseUserDotComError,
  isExternalProviderAuthError,
  isInvalidAccessTokenError,
  isNeedsAuthChallengeError,
  isNetworkError,
  isNetworkLikeError,
  isRateLimitError,
} from './api/errors';
export { CognixGraphQLAPIClient, graphqlClient } from './api/graphql';
export { ClientConfigSingleton, type CognixClientConfig, type CognixNotice } from './api/clientConfig';
export {
  isNodeResponse,
  INCLUDE_EVERYTHING_CONTEXT_FILTERS,
  EXCLUDE_EVERYTHING_CONTEXT_FILTERS,
  PromptMode,
  type BrowserOrNodeResponse,
  type ContextFilters,
  type CognixContextFilterItem,
  type RepoListResponse,
  type SuggestionsRepo,
  type RepoSuggestionsSearchResponse,
  type NLSSearchResult,
  type NLSSearchResponse,
  type NLSSearchFileMatch,
  type NLSSearchDynamicFilter,
  type NLSSearchDynamicFilterKind,
  type GraphQLAPIClientConfig,
  setJSONAcceptContentTypeHeaders,
  isCustomAuthChallengeResponse,
} from './api/graphql/client';
export type { CognixLLMSiteConfiguration, ContextSearchResult, Prompt, event } from './api/graphql/client';
export { RestClient } from './api/rest/client';
export { GraphQLTelemetryExporter } from './api/telemetry/GraphQLTelemetryExporter';
export { type BillingCategory, type BillingProduct } from './telemetry-v2';
export {
  MockServerTelemetryRecorderProvider,
  NoOpTelemetryRecorderProvider,
  TelemetryRecorderProvider,
  noOpTelemetryRecorder,
  type ExtensionDetails,
} from './telemetry-v2/TelemetryRecorderProvider';
export type { TelemetryRecorder } from './telemetry-v2/TelemetryRecorderProvider';
export * from './telemetry-v2/singleton';
export { events as telemetryEvents } from './telemetry-v2/events';
export { testFileUri } from './test/path-helpers';
export * from './test/constants';
export * from './tracing';
export {
  assertUnreachable,
  convertGitCloneURLToCodebaseName,
  createSubscriber,
  isError,
  nextTick,
  promise,
  type ReadonlyDeep,
} from './utils';
export type { CurrentUserCognixSubscription } from './api/graphql/client';
export * from './auth/types';
export * from './auth/tokens';
export * from './auth/referral';
export * from './chat/sse-iterator';
export { parseMentionQuery, type MentionQuery, scanForMentionTriggerInUserTextInput } from './mentions/query';
export {
  type ContextItemProps,
  mentionProvidersMetadata,
  openCtxProviderMetadata,
  FILE_CONTEXT_MENTION_PROVIDER,
  SYMBOL_CONTEXT_MENTION_PROVIDER,
  type ContextMentionProviderID,
  type ContextMentionProviderMetadata,
} from './mentions/api';
export { TokenCounter, getTokenCounterUtils, TokenCounterUtils } from './token/counter';
export { CORPUS_CONTEXT_ALLOCATION as ENHANCED_CONTEXT_ALLOCATION } from './token/constants';
export { tokensToChars, charsToTokens } from './token/utils';
export * from './prompt/prompt-string';
export { getCompletionsModelConfig } from './llm-providers/utils';
export * from './llm-providers/google/chat-client';
export * from './llm-providers/groq/chat-client';
export * from './fetch';
export * from './completions/types';
export * from './api/completions/parse';
export * from './cognix-ignore/context-filters-provider';
export * from './api/utils';
export * from './token';
export * from './token/constants';
export * from './configuration';
export {
  setOpenCtxControllerObservable,
  openctxController,
  type OpenCtxController,
  REMOTE_REPOSITORY_PROVIDER_URI,
  REMOTE_FILE_PROVIDER_URI,
  REMOTE_DIRECTORY_PROVIDER_URI,
  WEB_PROVIDER_URI,
  GIT_OPENCTX_PROVIDER_URI,
  CODE_SEARCH_PROVIDER_URI,
  GLOBAL_SEARCH_PROVIDER_URI,
  currentOpenCtxController,
  RULES_PROVIDER_URI,
} from './context/openctx/api';
export * from './context/openctx/context';
export * from './lexicalEditor/editorState';
export * from './lexicalEditor/nodes';
export {
  FILE_MENTION_EDITOR_STATE_FIXTURE,
  OLD_TEXT_FILE_MENTION_EDITOR_STATE_FIXTURE,
  UNKNOWN_NODES_EDITOR_STATE_FIXTURE,
} from './lexicalEditor/fixtures';
export { getSerializedParams } from './api/completions/utils';
export * from './misc/rpc/webviewAPI';
export {
  proxyExtensionAPI,
  addMessageListenersForExtensionAPI,
  createMessageAPIForWebview,
  type ResponseMessage,
  type RequestMessage,
  type GenericVSCodeWrapper,
  type GenericWebviewAPIWrapper,
  createMessageAPIForExtension,
} from './misc/rpc/rpc';
export * from './misc/observable';
export * from './misc/observableOperation';
export * from './misc/mutable';
export * from './configuration/resolver';
export * from './configuration/clientCapabilities';
export * from './configuration/environment';
export * from './singletons';
export * from './auth/authStatus';
export { fetchLocalOllamaModels } from './llm-providers/ollama/utils';
export * from './editor/editorState';
export {
  currentUserProductSubscription,
  checkIfEnterpriseUser,
  type UserProductSubscription,
  cachedUserProductSubscription,
  userProductSubscription,
} from './api/userProductSubscription';
export { siteVersion, currentSiteVersion, isValidVersion, checkVersion } from './api/siteVersion';
export { configOverwrites } from './models/configOverwrites';
export { isS2, isWorkspaceInstance } from './api/environments';
export { createGitDiff } from './editor/create-git-diff';

export { serialize, deserialize } from './lexicalEditor/atMentionsSerializer';

export { type Rule, isRuleFilename, ruleTitle, parseRuleFile, ruleSearchPaths } from './rules/rules';
export { type CandidateRule, type RuleProvider, createRuleService, type RuleService, isRulesEnabled } from './rules/service';

export type { SiteAndCognixAPIVersions } from './api/siteVersion';
export * from './chat/types';
