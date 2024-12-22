import { ReactNode } from 'react';
import { canViewFeature, FeatureFlagName } from '~/utils/feature-flags';
import { UserRole } from '~/types/user-role';

export function FeatureEnabled({
  featureFlag,
  userRole,
  children,
}: {
  featureFlag: FeatureFlagName;
  userRole: UserRole;
  children: ReactNode;
}) {
  return canViewFeature(featureFlag, userRole) ? children : null;
}
