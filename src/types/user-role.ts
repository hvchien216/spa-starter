export const USER_ROLE = {
  ADMIN: 'Admin',
  USER: 'User',
  TESTER: 'Tester',
  SUBSCRIBER: 'Subscriber',
} as const;

export type UserRole = keyof typeof USER_ROLE;
