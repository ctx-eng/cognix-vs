export interface ReferralCode {
  code: string;
  description?: string;
  maxUses?: number;
  expiresAt?: string;
}

export function isValidReferralCode(code: string): boolean {
  return /^[A-Z0-9]{6,12}$/i.test(code);
}
