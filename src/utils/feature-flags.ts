import { UserRole } from '~/types/user-role';

export type FeatureFlagName = keyof typeof FEATURE_FLAGS;

type FeatureFlagRule = {
  percentageOfUsers?: number;
  userRoles?: UserRole[];
} & { userRoles: UserRole[] };

export const FEATURE_FLAGS = {
  TEST_NEW_PRODUCTS_QUERY: true,
  ADVANCED_ANALYTICS: true,
  DISABLED_FEATURE: false,
  EXPERIMENTAL_FEATURE: false,
  MULTIPLE_ALLOWANCES: [{ userRoles: ['ADMIN', 'TESTER'] }, { userRoles: ['USER'] }],
} as const satisfies Record<string, FeatureFlagRule[] | boolean>;

export function canViewFeature(featureName: FeatureFlagName, userRole: UserRole) {
  const rules = FEATURE_FLAGS[featureName];
  if (typeof rules === 'boolean') return rules;
  return rules.some((rule) => checkRule(rule, userRole));
}

function checkRule({ userRoles }: FeatureFlagRule, userRole: UserRole) {
  return userHasValidRole(userRoles, userRole);
}

function userHasValidRole(allowedRoles: UserRole[] | undefined, userRole: UserRole) {
  return allowedRoles == null || allowedRoles.includes(userRole);
}
