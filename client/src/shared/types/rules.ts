export type RuleId = number;

export type Rule = {
  id: RuleId,
  name: string,
  type: RulesType,
};

export type RulesList = {[key: RuleId]: Rule};

export const RULES_TYPES = {
  TRANSCRIPTIONS: 'transcriptions',
};

export type RulesTypesKeys = keyof typeof RULES_TYPES;
export type RulesType = typeof RULES_TYPES[RulesTypesKeys];
