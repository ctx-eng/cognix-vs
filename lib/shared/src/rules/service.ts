import type { Rule } from './rules';

export interface CandidateRule {
  rule: Rule;
  score: number;
}

export interface RuleProvider {
  getRules(): Promise<Rule[]>;
}

export interface RuleService {
  getRules(): Promise<Rule[]>;
  getCandidateRules(context: string): Promise<CandidateRule[]>;
}

export function createRuleService(providers: RuleProvider[]): RuleService {
  return {
    async getRules(): Promise<Rule[]> {
      const allRules = await Promise.all(providers.map((p) => p.getRules()));
      return allRules.flat();
    },
    async getCandidateRules(context: string): Promise<CandidateRule[]> {
      const rules = await this.getRules();
      return rules.map((rule) => ({
        rule,
        score: context.includes(rule.title) ? 1 : 0,
      }));
    },
  };
}

export function isRulesEnabled(): boolean {
  return true;
}
