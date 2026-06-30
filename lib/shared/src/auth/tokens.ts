export interface Token {
  value: string;
  expiresAt?: Date;
  type: 'access' | 'refresh' | 'id';
}

export interface TokenStore {
  getToken(): Token | undefined;
  setToken(token: Token): void;
  removeToken(): void;
}

let currentToken: Token | undefined;

export function createTokenStore(): TokenStore {
  return {
    getToken: () => currentToken,
    setToken: (token: Token) => {
      currentToken = token;
    },
    removeToken: () => {
      currentToken = undefined;
    },
  };
}

export function getAccessToken(): string | undefined {
  return currentToken?.value;
}
