import type { Observable } from '../../misc/observable';

export interface OpenCtxController {
  getProviders(): OpenCtxProvider[];
  getProvider(uri: string): OpenCtxProvider | undefined;
}

export interface OpenCtxProvider {
  uri: string;
  name: string;
}

export const REMOTE_REPOSITORY_PROVIDER_URI = 'remoteRepository';
export const REMOTE_FILE_PROVIDER_URI = 'remoteFile';
export const REMOTE_DIRECTORY_PROVIDER_URI = 'remoteDirectory';
export const WEB_PROVIDER_URI = 'web';
export const GIT_OPENCTX_PROVIDER_URI = 'git';
export const CODE_SEARCH_PROVIDER_URI = 'codeSearch';
export const GLOBAL_SEARCH_PROVIDER_URI = 'globalSearch';
export const RULES_PROVIDER_URI = 'rules';

let controller: OpenCtxController | undefined;

export function setOpenCtxControllerObservable(obs: Observable<OpenCtxController | undefined>): void {}
export function openctxController(): OpenCtxController | undefined {
  return controller;
}
export function currentOpenCtxController(): OpenCtxController | undefined {
  return controller;
}
