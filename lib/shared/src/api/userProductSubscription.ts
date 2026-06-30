export interface UserProductSubscription {
  plan: string;
  status: 'active' | 'inactive' | 'trialing' | 'canceled';
  expiresAt?: string;
  currentPeriodEnd?: string;
}

let currentSubscription: UserProductSubscription | undefined;

export function currentUserProductSubscription(): UserProductSubscription | undefined {
  return currentSubscription;
}

export function cachedUserProductSubscription(): UserProductSubscription | undefined {
  return currentSubscription;
}

export const userProductSubscription = currentUserProductSubscription;

export function checkIfEnterpriseUser(): boolean {
  return currentSubscription?.plan === 'enterprise';
}
