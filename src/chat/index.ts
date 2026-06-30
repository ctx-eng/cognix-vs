import { WorkspaceSearch } from '../workspaceSearch';
import { ProviderManager } from '../providerManager';
import { PromptLibrary } from '../promptLibrary';
export class ChatPanel {
  public static createOrShow() {
    return new ChatPanel();
  }
  public async askQuestion(query: string) {
    return `answer for ${query}`;
  }
}
