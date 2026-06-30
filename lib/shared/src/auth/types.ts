export type AuthStatus = 'authenticated' | 'unauthenticated' | 'pending' | 'error';

export interface AuthState {
  status: AuthStatus;
  token?: string;
  serverEndpoint: string;
  username?: string;
  primaryEmail?: string;
  displayName?: string;
  avatarURL?: string;
}

export interface AuthProvider {
  authState: AuthState;
  onAuthChange: (listener: (state: AuthState) => void) => () => void;
}
