export const TIME_RANGE = {
  YEARLY: 'YEARLY',
  MONTHLY: 'MONTHLY',
} as const;

export type TimeRange = keyof typeof TIME_RANGE;

export const DEFAULT_ITEMS_PER_PAGE = 20;
