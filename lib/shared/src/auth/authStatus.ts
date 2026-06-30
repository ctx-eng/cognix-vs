export type AuthStatusType = 'signed-out' | 'signed-in' | 'pending';

export interface AuthStatusInfo {
  status: AuthStatusType;
  endpoint: string;
  username?: string;
}
