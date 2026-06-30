export class CompletionService {
  public complete(prompt: string) {
    return Promise.resolve(`completed ${prompt}`);
  }
}
